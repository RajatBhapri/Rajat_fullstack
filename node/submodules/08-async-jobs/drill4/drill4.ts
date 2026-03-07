import express from "express";
import { emailQueue } from "./queue.js";

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { to, subject, idempotencyKey } = req.body;

  if (!idempotencyKey) {
    return res.status(400).json({
      error: "idempotencyKey required",
    });
  }

  const job = await emailQueue.add(
    "send-email",
    { to, subject },
    {
      jobId: idempotencyKey,
    },
  );

  res.json({
    message: "Job queued",
    jobId: job.id,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
