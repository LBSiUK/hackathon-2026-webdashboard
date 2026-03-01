/**
 * Patch Baileys to use MACOS platform instead of WEB for pairing.
 * WhatsApp returns 405 Connection Failure when using WEB; MACOS works.
 * Runs automatically after npm install (postinstall).
 */
const fs = require('fs');
const path = require('path');

const file = path.join(
  __dirname,
  '..',
  'node_modules',
  '@whiskeysockets',
  'baileys',
  'lib',
  'Utils',
  'validate-connection.js'
);

if (!fs.existsSync(file)) {
  console.log('patch-baileys: Baileys not installed, skip.');
  process.exit(0);
}

let content = fs.readFileSync(file, 'utf8');
if (content.includes("Platform.WEB,")) {
  content = content.replace(
    'platform: proto.ClientPayload.UserAgent.Platform.WEB,',
    'platform: proto.ClientPayload.UserAgent.Platform.MACOS,'
  );
  fs.writeFileSync(file, content);
  console.log('patch-baileys: Applied MACOS platform fix for WhatsApp pairing.');
} else {
  console.log('patch-baileys: Already patched or format changed.');
}
