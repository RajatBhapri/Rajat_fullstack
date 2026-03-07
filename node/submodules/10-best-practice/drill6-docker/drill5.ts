import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const requiredEnv = ["DB_URL", "API_KEY"];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(` Required env var ${key} is missing!`);
    process.exit(1);
  }
}

const DB_URL = process.env.DB_URL!;
const API_KEY = process.env.API_KEY!;
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app = express();

app.get("/", (_req, res) => {
  res.send(`Connected to DB: ${DB_URL} with API_KEY: ${API_KEY}`);
});

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`Drill 5 server running on http://127.0.0.1:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down Drill 5 server...");
  server.close(() => process.exit(0));
});
process.on("SIGTERM", () => {
  console.log("Shutting down Drill 5 server...");
  server.close(() => process.exit(0));
});

setInterval(() => {}, 1 << 30);
