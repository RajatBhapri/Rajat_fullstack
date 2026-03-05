import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";

const app = express();
app.use(express.json());


const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

app.use(
  pinoHttp({
    logger,
    genReqId: () => randomUUID(), // request ID
  })
);


let tasks: { id: number; title: string }[] = [];


// Create Task
app.post("/tasks", (req, res) => {
  const start = Date.now();

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
  };

  tasks.push(newTask);

  req.log.info({ taskId: newTask.id }, "Task created");

  const duration = Date.now() - start;

  req.log.info(
    { status: 201, duration },
    "Request completed"
  );

  res.status(201).json(newTask);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  req.log.debug("Fetching all tasks");
  res.json(tasks);
});


app.listen(3000, () => {
  logger.info("Server started on port 3000");
});