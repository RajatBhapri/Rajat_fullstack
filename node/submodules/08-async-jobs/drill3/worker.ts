import { Worker } from "bullmq";
import IORedis from "ioredis";
import { sendEmail } from "./emailProcessor.js";

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
});

const worker = new Worker(
  "send-email",
  async (job) => {
    const { to, subject } = job.data;

    await sendEmail(to, subject);

    return { success: true };
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed`, err.message);
});
