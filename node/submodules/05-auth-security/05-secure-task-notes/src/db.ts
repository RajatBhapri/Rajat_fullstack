import Database from "better-sqlite3";
import path from "path";
import type { Database as DatabaseType } from "better-sqlite3";

const dbPath = path.join(__dirname, "../data/app.db");

export const db: DatabaseType = new Database(dbPath);

export function closeDb() {
  db.close();
}
