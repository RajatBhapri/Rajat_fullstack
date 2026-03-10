import { pool } from "./db.js";
import { recordQuery } from "./metrics.js";

export async function runQuery(sql: string, params: any[] = []) {
  const start = Date.now();

  const res = await pool.query(sql, params);

  const duration = Date.now() - start;

  recordQuery(duration);

  if (duration > 100) {
    console.log("⚠️ Slow query:", sql);
  }

  return res;
}

export async function getDbSize() {
  const res = await pool.query(
    "SELECT pg_database_size(current_database()) as size",
  );

  return res.rows[0];
}
