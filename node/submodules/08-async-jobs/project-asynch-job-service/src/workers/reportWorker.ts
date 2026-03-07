import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { db } from "../db/db.js";
import { generateFakePdf } from "../services/reportService.js";

export const worker = new Worker(
  "report-jobs",
  async (job) => {
    const jobId = job.id;

    db.prepare(`UPDATE jobs SET status='running', updated_at=? WHERE id=?`).run(
      new Date().toISOString(),
      jobId,
    );

    const result = await generateFakePdf(jobId!);

    db.prepare(
      `UPDATE jobs SET status='complete', result=?, updated_at=? WHERE id=?`,
    ).run(result, new Date().toISOString(), jobId);

    return result;
  },
  {
    connection: redisConnection,
  },
);

worker.on("failed", (job) => {
  db.prepare(`UPDATE jobs SET status='failed', updated_at=? WHERE id=?`).run(
    new Date().toISOString(),
    job?.id,
  );
});
