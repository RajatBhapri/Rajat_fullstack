import { Queue } from "bullmq";

export const weatherQueue = new Queue("weather-fetch", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

export async function startScheduler() {
  await weatherQueue.add(
    "fetch-weather",
    {
      city: "Delhi",
    },
    {
      repeat: {
        pattern: "* * * * *", // every minute
      },
      jobId: "weather-cron-job",
      removeOnComplete: false,
      removeOnFail: false,
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    },
  );
}
