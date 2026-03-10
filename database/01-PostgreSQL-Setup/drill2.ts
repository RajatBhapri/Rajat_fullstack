import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    console.log("Connected to Postgres");
    await pool.query(`DROP TABLE IF EXISTS tasks CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS users CASCADE`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE
      );
    `);

    console.log("Tables created");

    await pool.query(`
      INSERT INTO users (email)
      VALUES
        ('alice@example.com'),
        ('bob@example.com'),
        ('charlie@example.com')
      ON CONFLICT DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO tasks (title, completed)
      VALUES
        ('Buy groceries', false),
        ('Finish project', true),
        ('Read a book', false);
    `);

    console.log("Data inserted");

    const users = await pool.query(`SELECT * FROM users`);
    console.log("Users:");
    console.table(users.rows);

    const tasks = await pool.query(`SELECT * FROM tasks`);
    console.log("Tasks:");
    console.table(tasks.rows);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

main();
