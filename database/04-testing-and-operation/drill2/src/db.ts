import pg from "pg";
import sqlite3 from "sqlite3";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export function createDb() {
  if (process.env.DB_TYPE === "sqlite") {
    return new sqlite3.Database(":memory:");
  }

  return new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}
