import { Worker } from "bullmq";

const worker = new Worker(
  "send-email",
  async (job) => {
    const { to, subject } = job.data;

    console.log("JOB START");
    console.log("Job ID:", job.id);
    console.log("Attempt:", job.attemptsMade + 1);
    console.log("Time:", new Date().toISOString());

    if (Math.random() < 0.5) {
      throw new Error("Simulated email failure");
    }

    console.log(`Email sent to ${to}`);
    console.log("------ JOB END ------");

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
  console.log("Completed:", job.id);
});

worker.on("failed", (job, err) => {
  console.log("Failed:", job?.id);
  console.log("Attempts:", job?.attemptsMade);
  console.log("Error:", err.message);
});
