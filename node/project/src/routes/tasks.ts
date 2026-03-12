import { Router } from "express";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { FileStorage } from "../storage.js";
import type { Task } from "../models/task.js";

export const taskRouter = Router();
const storage = new FileStorage();

// GET all tasks
taskRouter.get("/", async (_req, res) => {
  const tasks = await storage.loadNotes();
  res.json(tasks);
});

// GET task by ID
taskRouter.get("/:id", async (req, res) => {
  const tasks = await storage.loadNotes();

  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// CREATE task
taskRouter.post("/", async (req, res) => {
  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).default("low"),
  });

  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  const task: Task = {
    id: uuid(),
    title: parsed.data.title,
    ...(parsed.data.description && { description: parsed.data.description }),
    priority: parsed.data.priority,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const tasks = await storage.loadNotes();
  tasks.push(task);

  await storage.saveNotes(tasks);

  res.status(201).json(task);
});

// UPDATE task
taskRouter.put("/:id", async (req, res) => {
  const tasks = await storage.loadNotes();

  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[index] = {
    ...tasks[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  await storage.saveNotes(tasks);

  res.json(tasks[index]);
});

// DELETE task
taskRouter.delete("/:id", async (req, res) => {
  const tasks = await storage.loadNotes();

  const filtered = tasks.filter((t) => t.id !== req.params.id);

  if (filtered.length === tasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  await storage.saveNotes(filtered);

  res.json({ message: "Task deleted" });
});
