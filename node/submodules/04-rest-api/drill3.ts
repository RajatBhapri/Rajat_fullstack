import express from "express";
import type{ Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { z } from "zod";

const app = express();
app.use(express.json());

const tasks: any[] = [];

const taskSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional(),
});

app.post("/tasks", (req, res) => {
  const result = taskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error.issues);
  }

  const newTask = {
    id: tasks.length + 1,
    title: result.data.title,
    completed: result.data.completed ?? false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// 2

const querySchema = z.object({
  limit: z.string().transform(val => parseInt(val)).optional(),
});

app.get("/tasks", (req, res) => {
  const result = querySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json(result.error.issues);
  }

  const limit = result.data.limit;

  let resultTasks = tasks;

  if (limit) {
    resultTasks = tasks.slice(0, limit);
  }

  res.json(resultTasks);
});

// 3 and 4

const validate =
  (schema: ZodSchema, target: "body" | "query") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      return res.status(400).json(result.error.issues);
    }

    req[target] = result.data;
    next();
  };

  app.post("/tasks", validate(taskSchema, "body"), (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed ?? false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// 5

const taskSchema1 = z.object({
  title: z.string(),
  completed: z.boolean().optional(),
});

type TaskInput = z.infer<typeof taskSchema>;

const createTask = (data: TaskInput) => {
  console.log(data.title); // string
};










app.listen(3000);