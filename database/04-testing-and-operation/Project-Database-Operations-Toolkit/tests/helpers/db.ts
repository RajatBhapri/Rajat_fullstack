import sqlite3 from "sqlite3";

export function createTestDb() {
  return new sqlite3.Database(":memory:");
}
