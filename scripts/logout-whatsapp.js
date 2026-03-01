/**
 * Remove WhatsApp (Baileys) session so you can re-pair with a new QR code.
 * Run: npm run whatsapp:logout
 * Then run: npm run whatsapp:llm
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const authDir = path.join(root, 'baileys_auth');
const qrFile = path.join(root, 'whatsapp-qr.png');

if (fs.existsSync(authDir)) {
  fs.rmSync(authDir, { recursive: true });
  console.log('Removed baileys_auth/ – session cleared.');
} else {
  console.log('No baileys_auth/ found – already logged out.');
}
if (fs.existsSync(qrFile)) {
  fs.unlinkSync(qrFile);
  console.log('Removed whatsapp-qr.png');
}
console.log('\nRun: npm run whatsapp:llm');
console.log('Then scan the new QR code with WhatsApp (Linked Devices → Link a device).');
