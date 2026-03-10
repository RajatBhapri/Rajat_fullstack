import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool: Pool;

export function createPool() {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  pool.on("connect", () => {
    console.log("Database connected");
  });

  pool.on("error", (err) => {
    console.error("Unexpected database error", err);
  });

  return pool;
}

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}

export async function connectWithRetry(retries = 5) {
  while (retries) {
    try {
      await pool.query("SELECT 1");
      console.log("Database ready");
      return;
    } catch (err) {
      console.log("Database connection failed. Retrying...");
      retries--;

      await new Promise((res) => setTimeout(res, 2000));
    }
  }

  throw new Error("Database connection failed after retries");
}

export async function closePool() {
  if (pool) {
    await pool.end();
    console.log("Database connections closed");
  }
}
