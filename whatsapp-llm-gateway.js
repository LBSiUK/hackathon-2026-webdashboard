/**
 * WhatsApp LLM Gateway
 * - WhatsApp: @whiskeysockets/baileys (QR auth)
 * - Brain: Dashboard /chat (DigitalOcean Gradient) or Vercel AI SDK (OpenAI/OpenRouter)
 * - Memory: SQLite threads (whatsapp-llm-db.js)
 * Run: npm run whatsapp:llm
 */

import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import makeWASocket, { useMultiFileAuthState, DisconnectReason, Browsers, areJidsSameUser, jidNormalizedUser, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys';
import pino from 'pino';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import QRCode from 'qrcode';
import { getOrCreateThread, appendMessage, getRecentMessages } from './whatsapp-llm-db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const AUTH_DIR = path.join(__dirname, 'baileys_auth');
const QR_FILE = path.join(__dirname, 'whatsapp-qr.png');

// Chat API = same Gradient backend as dashboard (server.py /chat). Default: local server.
const CHAT_API_URL = (process.env.CHAT_API_URL || 'http://localhost:5020').replace(/\/$/, '');

// Optional: OpenAI/OpenRouter if not using Chat API
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEFAULT_MODEL = OPENROUTER_API_KEY ? 'openai/gpt-4o-mini' : 'gpt-4o-mini';
const LLM_MODEL = process.env.WHATSAPP_LLM_MODEL || DEFAULT_MODEL;
const MAX_TOKENS = parseInt(process.env.WHATSAPP_LLM_MAX_TOKENS || '1024', 10);

/** Call dashboard /chat (Gradient). Returns reply text or null on error. */
async function callChatApi(messages) {
  const url = `${CHAT_API_URL}/chat`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Chat API ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  return (data && data.content) ? String(data.content).trim() : '';
}

function getOpenAI() {
  if (OPENROUTER_API_KEY) {
    return createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: OPENROUTER_API_KEY,
    });
  }
  if (OPENAI_API_KEY) {
    return createOpenAI({ apiKey: OPENAI_API_KEY });
  }
  throw new Error('Set CHAT_API_URL (use Gradient), or OPENAI_API_KEY / OPENROUTER_API_KEY in .env');
}

function extractTextFromMessage(msg) {
  if (!msg) return '';
  if (typeof msg.conversation === 'string') return msg.conversation;
  if (msg.extendedTextMessage?.text) return msg.extendedTextMessage.text;
  if (msg.imageMessage?.caption) return msg.imageMessage.caption;
  return '';
}

async function saveQrToFile(qr) {
  try {
    await QRCode.toFile(QR_FILE, qr, { width: 400, margin: 2 });
    console.log('QR code saved to', QR_FILE, '- scan with WhatsApp on your phone.');
  } catch (e) {
    console.error('Failed to save QR:', e.message);
  }
}

// In-memory message store for getMessage retries (fixes "waiting for this message")
const msgStore = new Map();

async function connect() {
  const logger = pino({ level: 'warn' });
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const sock = makeWASocket({
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    printQRInTerminal: false,
    browser: Browsers.macOS('Chrome'),
    logger,
    getMessage: async (key) => {
      if (!key.id) return undefined;
      return msgStore.get(key.id) || undefined;
    },
  });

  sock.ev.on('connection.update', async (update) => {
    const { connection, qr } = update;
    if (qr) await saveQrToFile(qr);
    if (connection === 'close') {
      const statusCode = update.lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log('Connection closed. Reconnect:', shouldReconnect, statusCode);
      if (shouldReconnect) connect();
    } else if (connection === 'open') {
      const backend = (OPENAI_API_KEY || OPENROUTER_API_KEY) ? 'OpenAI/OpenRouter' : 'Dashboard /chat (Gradient @ ' + CHAT_API_URL + ')';
      console.log('WhatsApp connected. LLM backend:', backend);
      if (!OPENAI_API_KEY && !OPENROUTER_API_KEY) {
        console.log('Make sure the dashboard server is running: ' + CHAT_API_URL);
      }
      try { fs.unlinkSync(QR_FILE); } catch (_) {}
    }
  });

  sock.ev.on('creds.update', saveCreds);

  // Self-chat = "message yourself". Can be our number JID or WhatsApp's LID (e.g. 112682896220297@lid).
  const isSelfChat = (jid) => {
    if (!jid) return false;
    if (jid.endsWith('@lid')) return true; // "Message yourself" is often represented as @lid when fromMe
    return !!(state.creds?.me?.id && areJidsSameUser(state.creds.me.id, jid));
  };

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    console.log('[WhatsApp] messages.upsert type=', type, 'count=', messages?.length);
    if (type !== 'notify') {
      console.log('[WhatsApp] Skip: type is', type, '(only "notify" is processed)');
      return;
    }
    for (const m of messages || []) {
      // Store every message so getMessage can return it for retry/re-encryption
      if (m.key.id && m.message) {
        msgStore.set(m.key.id, m.message);
        // Auto-expire after 1 hour
        setTimeout(() => msgStore.delete(m.key.id), 3600000);
      }
      const jid = m.key.remoteJid;
      const fromMe = m.key.fromMe;
      const text = extractTextFromMessage(m.message).trim();
      if (fromMe) {
        if (isSelfChat(jid)) {
          console.log('[WhatsApp] Self-chat message, processing as user.');
        } else {
          console.log('[WhatsApp] Skip: fromMe (not self-chat). me.id=', state.creds?.me?.id, 'remoteJid=', jid);
          continue;
        }
      }
      if (!jid || jid.endsWith('@g.us')) {
        console.log('[WhatsApp] Skip: jid=', jid, '(group or missing)');
        continue;
      }
      if (!text) {
        console.log('[WhatsApp] Skip: no text (e.g. media-only)');
        continue;
      }

      console.log('[WhatsApp] Incoming from', jid, ':', text.slice(0, 50) + (text.length > 50 ? '...' : ''));

      // Mark as read (skip for self-chat to avoid encryption issues)
      if (!fromMe) {
        try {
          await sock.readMessages([m.key]);
        } catch (e) {
          console.warn('[WhatsApp] readMessages failed:', e?.message);
        }
      }

      const { threadId } = getOrCreateThread(jid);
      appendMessage(threadId, 'user', text);
      const history = getRecentMessages(threadId);
      const messagesForLlm = history.map(({ role, content }) => ({ role, content }));

      let reply = '';
      try {
        if (OPENAI_API_KEY || OPENROUTER_API_KEY) {
          const provider = getOpenAI();
          const result = streamText({
            model: provider(LLM_MODEL),
            messages: messagesForLlm,
            maxTokens: MAX_TOKENS,
          });
          let fullText = '';
          for await (const chunk of result.textStream) {
            fullText += chunk;
          }
          reply = (fullText && fullText.trim()) || 'No response.';
        } else {
          console.log('[WhatsApp] Calling Chat API', CHAT_API_URL + '/chat');
          reply = await callChatApi(messagesForLlm);
          if (!reply) reply = 'No response.';
          console.log('[WhatsApp] Got reply length:', reply.length);
        }
        appendMessage(threadId, 'assistant', reply);
        // For self-chat (LID), send to our normalized number JID so the reply actually appears
        let sendTo = jid;
        if (jid.endsWith('@lid') && state.creds?.me?.id) {
          sendTo = jidNormalizedUser(state.creds.me.id);
        }
        console.log('[WhatsApp] Sending reply to', sendTo, '(original jid:', jid + ')');
        await sock.sendMessage(sendTo, { text: reply });
        console.log('[WhatsApp] Reply sent OK');
      } catch (e) {
        console.error('[WhatsApp] LLM or send error:', e?.message || e);
        appendMessage(threadId, 'assistant', '[Error]');
        const errMsg = (e && e.message) ? e.message : 'Something went wrong.';
        try {
          await sock.sendMessage(jid, { text: 'Sorry, ' + errMsg.slice(0, 200) + (errMsg.length > 200 ? '…' : '') + '. Is the dashboard running at ' + CHAT_API_URL + '?' });
        } catch (sendErr) {
          console.error('[WhatsApp] sendMessage failed:', sendErr?.message);
        }
      }
    }
  });

  return sock;
}

connect().catch((e) => {
  console.error('Startup error:', e);
  process.exit(1);
});
