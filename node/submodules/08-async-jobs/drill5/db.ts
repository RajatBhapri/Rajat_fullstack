import Database from "better-sqlite3";

export const db = new Database("weather.db");

db.exec(`
CREATE TABLE IF NOT EXISTS weather_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT,
  temperature REAL,
  fetched_at TEXT,
  duration_ms INTEGER,
  attempt INTEGER
);
`);
