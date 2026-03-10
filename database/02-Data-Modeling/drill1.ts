import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE,
        color TEXT
      )
    `);

    await pool.query(`
      ALTER TABLE tasks
      ADD COLUMN IF NOT EXISTS category_id INTEGER
      REFERENCES categories(id)
    `);

    await pool.query(
      `INSERT INTO categories (name, color)
       VALUES 
       ('Work','blue'),
       ('Personal','green'),
       ('Shopping','orange')
       ON CONFLICT (name) DO NOTHING`,
    );

    await pool.query(`UPDATE tasks SET category_id = 1 WHERE id = 1`);

    await pool.query(`UPDATE tasks SET category_id = 2 WHERE id = 2`);

    await pool.query(`UPDATE tasks SET category_id = 3 WHERE id = 3`);

    const result = await pool.query(`
      SELECT c.name AS category, COUNT(t.id) AS task_count
      FROM categories c
      LEFT JOIN tasks t 
      ON t.category_id = c.id
      GROUP BY c.name
      ORDER BY c.name
    `);

    console.table(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();
