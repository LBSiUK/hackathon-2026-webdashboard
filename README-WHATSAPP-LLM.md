# WhatsApp LLM Gateway

Message the same LLM from WhatsApp. Uses **Baileys** (QR auth), **Vercel AI SDK** (OpenAI / OpenRouter), and **SQLite** for per-sender thread memory.

## Run

```bash
npm run whatsapp:llm
```

On first run, a QR code is saved to `whatsapp-qr.png`. Open it with your phone (WhatsApp → Linked Devices → Link a device) and scan. After that, the session is stored in `baileys_auth/` and you won’t need to scan again unless you log out.

If you see **405 Connection Failure** or “could not connect” on your phone, the project applies a small patch to Baileys so WhatsApp accepts pairing (it now expects the MACOS platform). The patch runs automatically after `npm install`; if you still get 405, run `node scripts/patch-baileys.js` and try again.

## Environment (.env)

Use **one** of:

- **OpenAI**  
  `OPENAI_API_KEY=sk-...`  
  Default model: `gpt-4o-mini`.

- **OpenRouter** (Claude, Llama, etc.)  
  `OPENROUTER_API_KEY=sk-or-...`  
  Default model: `openai/gpt-4o-mini`. Use any [OpenRouter model id](https://openrouter.ai/docs#models), e.g. `anthropic/claude-3.5-sonnet`.

Optional:

- `WHATSAPP_LLM_MODEL` – model name (e.g. `gpt-4o`, `anthropic/claude-3.5-sonnet`).
- `WHATSAPP_LLM_MAX_TOKENS` – max response length (default `1024`).
- `WHATSAPP_DB_PATH` – path to SQLite DB (default: `whatsapp_llm.db` in project root).

## Flow

1. Incoming WhatsApp message (DM only; groups are ignored).
2. Thread for sender JID is created or loaded from SQLite.
3. User message is appended to that thread.
4. Recent messages (up to 50) are sent to the LLM via Vercel AI SDK.
5. Reply is streamed from the model, then sent back as one WhatsApp message and stored in the thread.

## Files

- `whatsapp-llm-gateway.js` – Baileys client, QR auth, message handler, LLM call.
- `whatsapp-llm-db.js` – SQLite threads and messages.
- `whatsapp_llm.db` – created on first run (session memory).
- `baileys_auth/` – WhatsApp session (do not commit).
