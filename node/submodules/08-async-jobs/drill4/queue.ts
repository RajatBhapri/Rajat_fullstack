import { Queue } from "bullmq";

export const emailQueue = new Queue("send-email", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },

  defaultJobOptions: {
    attempts: 5,

    backoff: {
      type: "exponential",
      delay: 2000,
    },

    removeOnComplete: false,
    removeOnFail: false,
  },
});
