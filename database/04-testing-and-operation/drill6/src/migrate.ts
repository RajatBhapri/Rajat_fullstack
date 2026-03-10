import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  console.log("Running zero-downtime migration...");

  await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS name TEXT
  `);

  console.log("Migration complete");
}

migrate();
