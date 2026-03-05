import express from "express";
import { z } from "zod";

const app = express();

const tasks = [
  { id: 1, title: "Task 1", completed: true, createdAt: 1 },
  { id: 2, title: "Task 2", completed: false, createdAt: 2 },
  { id: 3, title: "Task 3", completed: true, createdAt: 3 },
  { id: 4, title: "Task 4", completed: false, createdAt: 4 },
  { id: 5, title: "Task 5", completed: true, createdAt: 5 },
];


const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(2),
  completed: z
    .enum(["true", "false"])
    .transform(val => val === "true")
    .optional(),
  sort: z.enum(["createdAt", "title"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("asc"),
});

app.get("/tasks", (req, res) => {
  const result = querySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json(result.error.issues);
  }

  const { page, limit, completed, sort, order } = result.data;

  let resultTasks = [...tasks];


  if (completed !== undefined) {
    resultTasks = resultTasks.filter(t => t.completed === completed);
  }


  resultTasks.sort((a, b) => {
    if (order === "asc") {
      return a[sort] > b[sort] ? 1 : -1;
    } else {
      return a[sort] < b[sort] ? 1 : -1;
    }
  });


  const total = resultTasks.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = resultTasks.slice(start, end);

  res.json({
    data: paginated,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`)
});