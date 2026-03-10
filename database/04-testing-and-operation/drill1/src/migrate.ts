import { createDb } from "./db";

export function runMigrations(db: any) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE
    );
  `);
}
