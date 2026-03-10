import pg from "pg"
import { config } from "./config.js"

const { Pool } = pg

export const pool = new Pool({
  connectionString: config.db.url,
  max: config.db.poolMax,
  idleTimeoutMillis: config.db.idleTimeout,
  ssl: config.db.ssl ? { rejectUnauthorized: false } : false
})

export async function query(text: string, params: any[] = []) {
  return pool.query(text, params)
}

export async function shutdown() {
  await pool.end()
}

process.on("SIGINT", shutdown)