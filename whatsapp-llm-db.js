/**
 * SQLite session memory for WhatsApp LLM gateway.
 * Tables: threads (per sender JID), messages (conversation history).
 */

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.WHATSAPP_DB_PATH || path.join(__dirname, 'whatsapp_llm.db');

let db = null;

export function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initSchema(db);
  }
  return db;
}

function initSchema(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS threads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jid TEXT NOT NULL UNIQUE,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
    CREATE INDEX IF NOT EXISTS idx_threads_jid ON threads(jid);

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      thread_id INTEGER NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (thread_id) REFERENCES threads(id)
    );
    CREATE INDEX IF NOT EXISTS idx_messages_thread_id ON messages(thread_id);
  `);
}

const MAX_HISTORY = 50;

/**
 * Get or create a thread for the given WhatsApp JID.
 * @param {string} jid - e.g. "1234567890@s.whatsapp.net"
 * @returns {{ threadId: number }}
 */
export function getOrCreateThread(jid) {
  const database = getDb();
  let row = database.prepare('SELECT id FROM threads WHERE jid = ?').get(jid);
  if (!row) {
    database.prepare('INSERT INTO threads (jid) VALUES (?)').run(jid);
    row = database.prepare('SELECT id FROM threads WHERE jid = ?').get(jid);
  }
  return { threadId: row.id };
}

/**
 * Append a message to a thread.
 * @param {number} threadId
 * @param {string} role - "user" | "assistant" | "system"
 * @param {string} content
 */
export function appendMessage(threadId, role, content) {
  getDb().prepare('INSERT INTO messages (thread_id, role, content) VALUES (?, ?, ?)').run(threadId, role, String(content));
}

/**
 * Get recent messages for a thread (oldest first), suitable for LLM context.
 * @param {number} threadId
 * @param {number} limit
 * @returns {{ role: string, content: string }[]}
 */
export function getRecentMessages(threadId, limit = MAX_HISTORY) {
  const rows = getDb()
    .prepare(
      'SELECT role, content FROM messages WHERE thread_id = ? ORDER BY id DESC LIMIT ?'
    )
    .all(threadId, limit);
  return rows.reverse().map((r) => ({ role: r.role, content: r.content }));
}
