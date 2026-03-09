import { Router } from "express";
import { z } from "zod";
import type { Task } from "../models/task.js";

export const taskRouter: Router = Router();

const tasks: Task[] = [];

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

taskRouter.get("/", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    data: tasks.slice(start, end),
    page,
    limit,
    total: tasks.length,
  });
});

taskRouter.post("/", (req, res) => {
  const result = taskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  const now = new Date().toISOString();

  const task: Task = {
    id: Date.now().toString(),
    title: result.data.title,
    description: result.data.description,
    priority: result.data.priority,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(task);

  res.status(201).json(task);
});

taskRouter.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

taskRouter.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const result = taskSchema.partial().safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  Object.assign(task, result.data);

  task.updatedAt = new Date().toISOString();

  res.json(task);
});

taskRouter.delete("/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);

  res.json({ success: true });
});
