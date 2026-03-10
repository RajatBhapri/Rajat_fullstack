import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    console.log("Resetting tables...");

    await pool.query(`DROP TABLE IF EXISTS tasks5`);
    await pool.query(`DROP TABLE IF EXISTS users5`);

    await pool.query(`
      CREATE TABLE users5 (
        id SERIAL PRIMARY KEY,
        name TEXT
      )
    `);

    await pool.query(`
      CREATE TABLE tasks5 (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users5(id),
        title TEXT,
        metadata JSONB
      )
    `);

    console.log("Tables created.");

    await pool.query(`
      INSERT INTO users5 (name)
      VALUES ('Rajat'), ('Bob'), ('Charlie')
    `);

    console.log("Users inserted.");

    await pool.query(`
      INSERT INTO tasks5 (user_id, title, metadata)
      VALUES
      (1, 'Finish report', '{"priority":"high","tags":["important"],"due_date":"2024-01-15"}'),
      (2, 'Buy groceries', '{"priority":"low","tags":["home","shopping"]}'),
      (1, 'Prepare presentation', '{"priority":"high","tags":["work"]}'),
      (3, 'Workout', '{"priority":"medium","tags":["health"]}')
    `);

    console.log("Tasks with JSON metadata inserted.");

    console.log("\nTasks with HIGH priority:");

    const highPriority = await pool.query(`
      SELECT id, title, metadata
      FROM tasks5
      WHERE metadata->>'priority' = 'high'
    `);

    console.table(highPriority.rows);

    console.log("\nTasks tagged as 'important':");

    const importantTasks = await pool.query(`
      SELECT id, title, metadata
      FROM tasks5
      WHERE metadata->'tags' ? 'important'
    `);

    console.table(importantTasks.rows);

    console.log("\nUpdating JSON metadata...");

    await pool.query(`
      UPDATE tasks5
      SET metadata = metadata || '{"completed_at":"2024-01-20"}'
      WHERE id = 1
    `);

    const updatedTask = await pool.query(`
      SELECT id, title, metadata
      FROM tasks5
      WHERE id = 1
    `);

    console.log("Updated task:");
    console.table(updatedTask.rows);

    console.log("\nCreating GIN index on metadata...");

    await pool.query(`
      CREATE INDEX tasks5_metadata_idx
      ON tasks5
      USING GIN (metadata)
    `);

    console.log("GIN index created.");

    console.log("\nRunning JSON query performance test...");

    const start = Date.now();

    const result = await pool.query(`
      SELECT *
      FROM tasks5
      WHERE metadata->>'priority' = 'high'
    `);

    const end = Date.now();

    console.log("High priority tasks found:", result.rowCount);
    console.log("Query time (ms):", end - start);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

main();
