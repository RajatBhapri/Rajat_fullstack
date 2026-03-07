import { Worker } from "bullmq";
import { db } from "./db.js";

const worker = new Worker(
  "weather-fetch",
  async (job) => {
    const start = Date.now();
    const { city } = job.data;

    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current_weather=true";

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Weather API failed");
    }

    const data = await res.json();

    const temperature = data.current_weather.temperature;

    const duration = Date.now() - start;

    db.prepare(
      `
      INSERT INTO weather_logs 
      (city, temperature, fetched_at, duration_ms, attempt)
      VALUES (?, ?, ?, ?, ?)
    `,
    ).run(
      city,
      temperature,
      new Date().toISOString(),
      duration,
      job.attemptsMade + 1,
    );

    console.log("Weather saved:", temperature);

    return { temperature };
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  },
);

worker.on("completed", (job) => {
  console.log("Job completed:", job.id);
});

worker.on("failed", (job, err) => {
  console.log("Job failed:", job?.id);
  console.log("Attempts:", job?.attemptsMade);
  console.log("Error:", err.message);
});
