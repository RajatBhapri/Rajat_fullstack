import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await pool.query(`DROP TABLE IF EXISTS tasks1`);
    await pool.query(`DROP TABLE IF EXISTS users1`);

    await pool.query(`
      CREATE TABLE users1 (
        id SERIAL PRIMARY KEY,
        name TEXT,
        task_count INTEGER DEFAULT 0
      )
    `);

    await pool.query(`
      CREATE TABLE tasks1 (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users1(id),
        title TEXT
      )
    `);

    await pool.query(`
      INSERT INTO users1 (name) VALUES ('Alice'), ('Bob'), ('Charlie')
    `);

    await pool.query(`
      CREATE OR REPLACE FUNCTION update_task_count()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE users1 SET task_count = task_count + 1 WHERE id = NEW.user_id;
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE users1 SET task_count = task_count - 1 WHERE id = OLD.user_id;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql
    `);

    await pool.query(`
      CREATE TRIGGER task_count_insert
      AFTER INSERT ON tasks1
      FOR EACH ROW
      EXECUTE FUNCTION update_task_count()
    `);

    await pool.query(`
      CREATE TRIGGER task_count_delete
      AFTER DELETE ON tasks1
      FOR EACH ROW
      EXECUTE FUNCTION update_task_count()
    `);

    console.log("users1 table with denormalized task_count created.");

    console.log("Inserting 1000 tasks1...");
    const start = Date.now();

    for (let i = 1; i <= 1000; i++) {
      const user_id = (i % 3) + 1;
      await pool.query(`INSERT INTO tasks1 (user_id, title) VALUES ($1, $2)`, [
        user_id,
        `Task ${i}`,
      ]);
    }

    const end = Date.now();
    console.log(`Inserted 1000 tasks1 in ${(end - start) / 1000} seconds.`);

    console.log("Counting tasks1 live for user 1:");
    let liveStart = Date.now();
    const liveCount = await pool.query(
      `SELECT COUNT(*) FROM tasks1 WHERE user_id = 1`,
    );
    let liveEnd = Date.now();
    console.log("Live count:", liveCount.rows[0].count);
    console.log("Query time (ms):", liveEnd - liveStart);

    console.log("Using stored task_count for user 1:");
    let denormStart = Date.now();
    const denormCount = await pool.query(
      `SELECT task_count FROM users1 WHERE id = 1`,
    );
    let denormEnd = Date.now();
    console.log("Denormalized count:", denormCount.rows[0].task_count);
    console.log("Query time (ms):", denormEnd - denormStart);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();
