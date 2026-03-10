import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

for (let i = 0; i < 10; i++) {
  await pool.query("INSERT INTO users(email) VALUES($1)", [
    `user${i}@test.com`,
  ]);
}

console.log("Seed complete");
