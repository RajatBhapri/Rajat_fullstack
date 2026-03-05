import express, { urlencoded } from "express";
import { tasks } from "./tasks";
import tasksRouter from "./routes/routes.js";

const app = express();
app.use(urlencoded())
app.use(express.json());

app.use("/tasks", tasksRouter)  // both drill 1 and 2



app.get("/users/:id/tasks", (req, res) => {
  const userId = Number(req.params.id);
  console.log(userId);

  const userTasks = tasks.find((t) => t.id === userId);
  if (!tasks) {
    res.json({ msg: "not found" })
  }
  res.status(200).json(userTasks);
});

const server = app.listen(3000);
