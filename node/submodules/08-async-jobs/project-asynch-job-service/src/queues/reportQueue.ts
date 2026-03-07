import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const reportQueue = new Queue("report-jobs", {
  connection: redisConnection,

  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  },
});
