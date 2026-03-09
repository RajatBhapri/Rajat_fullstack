import { Router } from "express";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { FileStorage } from "../storage";
import { TaskEventEmitter } from "../events";
import type { Task } from "../models/task";

const storage = new FileStorage();
const events = new TaskEventEmitter();
export const taskRouter = Router();

taskRouter.get("/", async (req, res) => {
  const tasks = await storage.loadNotes();
  res.json(tasks);
});

taskRouter.post("/", async (req, res) => {
  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).default("low"),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const task: Task = {
    id: uuid(),
    title: parsed.data.title,
    description: parsed.data.description,
    priority: parsed.data.priority,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const tasks = await storage.loadNotes();
  tasks.push(task);
  await storage.saveNotes(tasks);
  events.emitTaskCreated(task);
  res.status(201).json(task);
});

taskRouter.put("/:id", async (req, res) => {
  const tasks = await storage.loadNotes();
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });

  Object.assign(task, req.body, { updatedAt: new Date().toISOString() });
  await storage.saveNotes(tasks);
  events.emitTaskUpdated(task);
  res.json(task);
});

taskRouter.delete("/:id", async (req, res) => {
  let tasks = await storage.loadNotes();
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });

  tasks = tasks.filter((t) => t.id !== req.params.id);
  await storage.saveNotes(tasks);
  events.emitTaskDeleted(task.id);
  res.status(204).send();
});
