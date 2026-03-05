import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

const tasks = [{ id: 1, title: "Task A" }];


function sendProblem(res: any, status: number, title: string, detail: string) {
  return res.status(status).json({
    type: "about:blank",
    title,
    status,
    detail,
  });
}


const taskSchema = z.object({
  title: z.string().min(1),
});


app.post("/tasks", (req, res) => {
  const result = taskSchema.safeParse(req.body);

  if (!result.success) {
  const firstError = result.error.issues[0];

  return sendProblem(
    res,
    400,
    "Validation Error",
    firstError?.message || "Invalid request body"
  );
}

  const newTask = {
    id: tasks.length + 1,
    title: result.data.title,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});



app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return sendProblem(res, 404, "Not Found", "Task not found");
  }

  res.json(task);
});


app.use((err: any, req: any, res: any, next: any) => {
  return sendProblem(res, 500, "Internal Server Error", "Something went wrong");
});


app.listen(3000);