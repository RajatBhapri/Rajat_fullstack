import { loadConfig } from "./config.js";
import { TaskServer } from "./server.js";
import { logger } from "./logger.js";
import "dotenv/config";

const config = loadConfig();
const server = new TaskServer(config);

await server.start();

process.on("SIGINT", async () => {
  logger.info("Shutting down...");
  await server.stop();
  process.exit(0);
});
