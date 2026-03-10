import { Router } from "express";
import { TaskRepository } from "../repositories/TaskRepository.js";

export function createTaskRoutes(taskRepo: TaskRepository) {
  const router = Router();

  router.get("/user/:id", async (req, res) => {
    try {
      const tasks = await taskRepo.findByUser(Number(req.params.id));
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { title, userId } = req.body;
      if (!title || !userId)
        return res.status(400).json({ error: "title and userId required" });

      const task = await taskRepo.create(title, userId);
      res.status(201).json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

  router.post("/:id/complete", async (req, res) => {
    try {
      const task = await taskRepo.markComplete(Number(req.params.id));
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

  return router;
}
