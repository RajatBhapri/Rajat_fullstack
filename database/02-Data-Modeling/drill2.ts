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
      CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS task_tags (
        task_id INTEGER REFERENCES tasks(id),
        tag_id INTEGER REFERENCES tags(id)
      )
    `);

    await pool.query(`
      INSERT INTO tags (name)
      VALUES ('urgent'), ('home'), ('office')
      ON CONFLICT (name) DO NOTHING
    `);

    await pool.query(`
      INSERT INTO task_tags (task_id, tag_id)
      VALUES 
      (1,1),
      (1,3),
      (2,2)
      ON CONFLICT DO NOTHING
    `);

    const result = await pool.query(`
      SELECT t.title, tg.name AS tag
      FROM tasks t
      JOIN task_tags tt ON t.id = tt.task_id
      JOIN tags tg ON tt.tag_id = tg.id
      ORDER BY t.title
    `);

    console.table(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();
