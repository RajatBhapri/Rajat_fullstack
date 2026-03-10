import sqlite3 from "sqlite3";

export function createDb(memory = true) {
  const db = new sqlite3.Database(memory ? ":memory:" : "./test.db");
  return db;
}
