import Database from "better-sqlite3";

export const db = new Database("users.db");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT,
  created_at TEXT
)
`);
