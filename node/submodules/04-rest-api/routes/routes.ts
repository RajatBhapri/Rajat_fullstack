import express from "express"
import type { Request, Response, NextFunction } from "express"
import { Router } from "express"
import {tasks} from "../tasks.js"

const router = Router()

router.get("/", (req, res) => {
  res.json({
    data: tasks,
    total: tasks.length,
  });
});

router.get("/:id",(req:Request ,res:Response) => {
  const id = Number(req.params.id);

  const task = tasks.find(t => t.id === id);

  res.status(200).json(task);
})

router.put("/:id",(req:Request ,res:Response) => {
  const id = Number(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

   task.name = req.body.name;

  res.status(200).json(task);


})

router.delete("/:id",(req:Request ,res:Response) => {
    const id = Number(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  
  const updatedTasks = tasks.filter(t => t.id !== id);

  tasks.length = 0;
  tasks.push(...updatedTasks);

  res.status(200).json({ message: "Task deleted", task });


})

router.post("/", (req: Request, res: Response) => {
  const newTask = req.body
  if (!newTask) {
    return res.status(400).json({ message: "Name is required" });
  }

  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.get("/", (req, res) => {
  res.status(200).json({tasks});
});

router.post("/", (req, res) => {
  const t = req.body
  tasks.push(t)
})

export default router;