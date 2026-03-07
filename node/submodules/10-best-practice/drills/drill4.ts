import express from "express";

const app = express();

let dbConnected = true;
let redisConnected = true;

let inflight = 0;
app.use((req, res, next) => {
  inflight++;
  res.on("finish", () => inflight--);
  next();
});

app.get("/", (_req, res) => {
  res.send("Server is running");
});

const PORT = 3000;
const HOST = "127.0.0.1";
const server = app.listen(PORT, HOST, () => {
  console.log(`Drill 4 server running on http://${HOST}:${PORT}`);
});

const shutdown = async (signal: string) => {
  console.log(`Received ${signal}, shutting down...`);

  server.close(async () => {
    console.log("Stopped accepting new requests");

    while (inflight > 0) {
      console.log(`Waiting for ${inflight} inflight request(s)...`);
      await new Promise((r) => setTimeout(r, 200));
    }

    if (dbConnected) {
      console.log("Closing DB...");
      await new Promise((r) => setTimeout(r, 300));
      dbConnected = false;
      console.log("DB closed");
    }

    if (redisConnected) {
      console.log("Closing Redis...");
      await new Promise((r) => setTimeout(r, 300));
      redisConnected = false;
      console.log("Redis closed");
    }

    console.log("Shutdown complete");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

setInterval(() => {}, 1 << 30);
