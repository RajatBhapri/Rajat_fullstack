import express from "express";
import { reportQueue } from "./queues/reportQueue.js";
import { db } from "./db/db.js";

const app = express();
app.use(express.json());

app.post("/submit-report", async (req, res) => {
  const { idempotencyKey } = req.body;

  if (!idempotencyKey) {
    return res.status(400).json({ error: "idempotencyKey required" });
  }

  const existing = db
    .prepare(`SELECT * FROM jobs WHERE id=?`)
    .get(idempotencyKey);

  if (existing) {
    return res.json(existing);
  }

  db.prepare(
    `INSERT INTO jobs (id,status,created_at,updated_at)
     VALUES (?,?,?,?)`,
  ).run(
    idempotencyKey,
    "pending",
    new Date().toISOString(),
    new Date().toISOString(),
  );

  await reportQueue.add(
    "generate-report",
    {},
    {
      jobId: idempotencyKey,
    },
  );

  res.json({ jobId: idempotencyKey });
});

app.get("/jobs/:id", (req, res) => {
  const job = db.prepare(`SELECT * FROM jobs WHERE id=?`).get(req.params.id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  res.json(job);
});

export default app;
