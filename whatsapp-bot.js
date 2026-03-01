/**
 * WhatsApp bot: same LLM and message history as the dashboard chat.
 * Run: npm run whatsapp  (or node whatsapp-bot.js)
 * Scans QR saved to whatsapp-qr.png in this directory; open and scan with WhatsApp.
 */

const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

const CHAT_API_URL = process.env.CHAT_API_URL || process.env.BASE_URL || 'http://localhost:5020';
const QR_FILE = path.join(__dirname, 'whatsapp-qr.png');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, 'wwebjs_auth') }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('qr', async (qr) => {
  try {
    await QRCode.toFile(QR_FILE, qr, { width: 400, margin: 2 });
    console.log('QR code saved to:', QR_FILE);
    console.log('Open this file and scan with WhatsApp on your phone.');
  } catch (e) {
    console.error('Failed to save QR file:', e.message);
  }
});

client.on('ready', () => {
  console.log('WhatsApp client is ready. You can message this number; the LLM will reply with shared dashboard history.');
});

client.on('authenticated', () => {
  console.log('Authenticated. If a QR was saved, you can delete it after this session.');
});

client.on('message', async (msg) => {
  const from = msg.from;
  const body = (msg.body || '').trim();
  if (!body) return;

  const isFromMe = msg.fromMe;
  if (isFromMe) return;

  try {
    const res = await fetch(`${CHAT_API_URL.replace(/\/$/, '')}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: body }),
    });
    const data = await res.json().catch(() => ({}));
    const reply = (data && data.content) ? String(data.content) : (res.ok ? 'No response.' : `Error ${res.status}`);
    await msg.reply(reply);
  } catch (e) {
    console.error('Chat API error:', e.message);
    await msg.reply('Sorry, the assistant is unavailable right now.').catch(() => {});
  }
});

client.initialize().catch((e) => {
  console.error('WhatsApp init failed:', e);
  process.exit(1);
});
