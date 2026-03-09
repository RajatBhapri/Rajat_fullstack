import { loadConfig } from "./config.js";
import { log } from "./logger.js";
import { TaskServer } from "./server.js";

const config = loadConfig();
const server = new TaskServer(config);

async function main() {
  log("info", "Starting application");
  await server.start();
}

main();

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

async function shutdown() {
  log("info", "Shutting down server...");
  await server.stop();
  process.exit(0);
}
