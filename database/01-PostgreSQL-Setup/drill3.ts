import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTask(title: string) {
  const result = await pool.query(
    `INSERT INTO tasks (title) VALUES ($1) RETURNING *`,
    [title],
  );

  console.log("Created Task:", result.rows[0]);
}

async function getTasksByStatus(completed: boolean) {
  const result = await pool.query(`SELECT * FROM tasks WHERE completed = $1`, [
    completed,
  ]);

  console.log(`Tasks with completed=${completed}`);
  console.table(result.rows);
}

async function markTaskComplete(id: number) {
  const result = await pool.query(
    `UPDATE tasks SET completed = true WHERE id = $1 RETURNING *`,
    [id],
  );

  console.log("Updated Task:", result.rows[0]);
}

async function deleteTask(id: number) {
  const result = await pool.query(
    `DELETE FROM tasks WHERE id = $1 RETURNING *`,
    [id],
  );

  console.log("Deleted Task:", result.rows[0]);
}

async function main() {
  try {
    console.log("Connected to Postgres");

    await createTask("Learn PostgreSQL");
    await createTask("Build Node backend");

    await getTasksByStatus(false);

    await markTaskComplete(1);

    await getTasksByStatus(true);

    await deleteTask(2);

    const allTasks = await pool.query(`SELECT * FROM tasks`);
    console.log("All Remaining Tasks:");
    console.table(allTasks.rows);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

main();
