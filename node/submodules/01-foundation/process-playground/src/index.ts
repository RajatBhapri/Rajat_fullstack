import * as dotenv from "dotenv";

dotenv.config();


process.on("SIGINT", () => {
  console.log("\nShutting down gracefully.");
  process.exit(0);
});


const appName = process.env.APP_NAME || "Default App";
const appPort = process.env.APP_PORT || "8080";


const args = process.argv;



console.log("=== INFO CLI ===");
console.log("Process ID:", process.pid);
console.log("Node Version:", process.version);
console.log("Working Directory:", process.cwd());
console.log("App Name:", appName);
console.log("App Port:", appPort);

