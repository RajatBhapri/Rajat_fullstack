import Database from "better-sqlite3";

export const db = new Database("jobs.db");

db.exec(`
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  status TEXT,
  result TEXT,
  created_at TEXT,
  updated_at TEXT
)
`);
