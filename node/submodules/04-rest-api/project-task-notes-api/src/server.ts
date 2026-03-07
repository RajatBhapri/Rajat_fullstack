import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
import swaggerUi from "swagger-ui-express";

import { TaskSchema } from "./schema.js";
import { tasks } from "./tasks.js";
import { problem } from "./errors.js";

const app = express();
app.use(express.json());

const logger = pino();

app.use(
  pinoHttp({
    logger,
    genReqId: () => randomUUID(),
  }),
);

app.post("/api/tasks", (req, res) => {
  const start = Date.now();

  const parsed = TaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return problem(res, 400, "Invalid Request", parsed.error.message);
  }

  const task = {
    id: tasks.length + 1,
    title: parsed.data.title,
  };

  tasks.push(task);

  const latency = Date.now() - start;

  req.log.info({ taskId: task.id, latency }, "Task created");

  res.status(201).json(task);
});

app.get("/api/tasks", (req, res) => {
  let result = [...tasks];

  const { page = "1", limit = "10", sort } = req.query;

  if (sort === "title") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  const start = (Number(page) - 1) * Number(limit);
  const paginated = result.slice(start, start + Number(limit));

  res.json({
    page: Number(page),
    limit: Number(limit),
    data: paginated,
  });
});

app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return problem(res, 404, "Not Found", "Task not found");
  }

  res.json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const parsed = TaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return problem(res, 400, "Invalid Request", parsed.error.message);
  }

  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return problem(res, 404, "Not Found", "Task not found");
  }

  task.title = parsed.data.title;

  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return problem(res, 404, "Not Found", "Task not found");
  }

  tasks.splice(index, 1);

  res.status(204).send();
});

app.get("/metrics", (req, res) => {
  res.json({
    tasks_total: tasks.length,
    uptime: process.uptime(),
  });
});

const spec = {
  openapi: "3.0.0",
  info: {
    title: "Task Notes API",
    version: "1.0.0",
  },
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

app.listen(3000, () => {
  logger.info("Server running on port 3000");
});
