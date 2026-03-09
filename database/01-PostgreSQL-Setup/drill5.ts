import pg from "./node_modules/@types/pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    console.log("Connected to Postgres");

    await pool.query(`
      ALTER TABLE tasks
      ADD CONSTRAINT tasks_title_check
      CHECK (LENGTH(title) > 0);
    `);

    console.log("CHECK constraint added");

    try {
      await pool.query(`INSERT INTO tasks (title) VALUES ($1)`, [""]);
    } catch (err: any) {
      console.log("Error inserting empty title:");
      console.log(err.message);
    }

    await pool.query(`
      ALTER TABLE users
      ADD CONSTRAINT users_email_unique UNIQUE(email);
    `);

    console.log("UNIQUE email constraint added");

    try {
      await pool.query(`INSERT INTO users (email) VALUES ($1)`, [
        "alice@example.com",
      ]);

      await pool.query(`INSERT INTO users (email) VALUES ($1)`, [
        "alice@example.com",
      ]);
    } catch (err: any) {
      console.log("Duplicate email error:");
      console.log(err.message);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    await pool.end();
  }
}

main();
