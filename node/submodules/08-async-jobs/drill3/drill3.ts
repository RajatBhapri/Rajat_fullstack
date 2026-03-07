import express from "express";
import { emailQueue } from "./queue.js";

import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

const app = express();
app.use(express.json());

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

app.post("/send-email", async (req, res) => {
  const { to, subject } = req.body;

  const job = await emailQueue.add("email-job", {
    to,
    subject,
  });

  res.json({
    message: "Email job queued",
    jobId: job.id,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
