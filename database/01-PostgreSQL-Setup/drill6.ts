import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Database connection error:", err);
});

interface User {
  id: number;
  email: string;
  created_at: Date;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  user_id: number | null;
}

async function getUser(id: number): Promise<User | null> {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows[0] || null;
}

async function createTask(userId: number, title: string): Promise<Task> {
  const result = await pool.query(
    `INSERT INTO tasks (title, user_id)
     VALUES ($1, $2)
     RETURNING *`,
    [title, userId],
  );

  return result.rows[0];
}

async function getUserTasks(userId: number): Promise<Task[]> {
  const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
    userId,
  ]);

  return result.rows;
}

async function main() {
  try {
    const user = await getUser(1);
    console.log("User:", user);

    const task = await createTask(1, "Practice Node + Postgres");
    console.log("Created Task:", task);

    const tasks = await getUserTasks(1);
    console.log("User Tasks:", tasks);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

main();
