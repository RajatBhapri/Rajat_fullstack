import express from "express";
import { pool } from "./db.js";

import { TaskRepository } from "./repositories/TaskRepository.js";
import { UserRepository } from "./repositories/UserRepository.js";

import { createTaskRoutes } from "./routes/taskRoutes.js";
import { createUserRoutes } from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

const taskRepo = new TaskRepository(pool);
const userRepo = new UserRepository(pool);

/* Routes */
app.use("/tasks", createTaskRoutes(taskRepo));
app.use("/users", createUserRoutes(userRepo));

/* Health check */
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

/* graceful shutdown */
const shutdown = async () => {
  await pool.end();
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
