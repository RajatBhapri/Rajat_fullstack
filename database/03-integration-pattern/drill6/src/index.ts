import { query } from "./db";
import { getMetrics } from "./monitor";

async function main() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE
    )
  `);

  await query(
    `INSERT INTO users(email) VALUES($1) ON CONFLICT (email) DO NOTHING`,
    ["rajat1@example.com"],
  );

  await query("SELECT * FROM users", [], true);

  console.log("DB Metrics:", getMetrics());
}

main().catch(console.error);
