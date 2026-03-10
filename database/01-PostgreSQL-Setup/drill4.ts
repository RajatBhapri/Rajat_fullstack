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

    await pool.query(`
      ALTER TABLE tasks
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);
    `);

    console.log("user_id column added");

    await pool.query(`INSERT INTO tasks (title, user_id) VALUES ($1, $2)`, [
      "Finish backend API",
      1,
    ]);

    await pool.query(`INSERT INTO tasks (title, user_id) VALUES ($1, $2)`, [
      "Study PostgreSQL joins",
      2,
    ]);

    await pool.query(`INSERT INTO tasks (title, user_id) VALUES ($1, $2)`, [
      "Unassigned task",
      null,
    ]);

    console.log("Tasks inserted");

    const userTasks = await pool.query(
      `SELECT * FROM tasks WHERE user_id = $1`,
      [1],
    );

    console.log("Tasks for user_id = 1");
    console.table(userTasks.rows);

    const joinResult = await pool.query(`
      SELECT t.title, u.email
      FROM tasks t
      JOIN users u 
      ON t.user_id = u.id
    `);

    console.log("Tasks with user emails (INNER JOIN)");
    console.table(joinResult.rows);

    const leftJoin = await pool.query(`
      SELECT t.title, u.email
      FROM tasks t
      LEFT JOIN users u 
      ON t.user_id = u.id
    `);

    console.log("All tasks including unassigned ones (LEFT JOIN)");
    console.table(leftJoin.rows);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

main();
