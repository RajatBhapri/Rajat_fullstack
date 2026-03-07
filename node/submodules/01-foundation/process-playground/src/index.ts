import "dotenv/config";

const args = process.argv.slice(2);
const debugIndex = args.indexOf("--debug");
const debug = debugIndex !== -1;

if (debug) args.splice(debugIndex, 1);

if (debug) {
  console.log("Running in debug mode. Use --inspect to attach debugger.");
}
const greeting = process.env.GREETING || "Hello";
const name = process.env.NAME || "World";

console.log("Process ID:", process.pid);
console.log("Node version:", process.version);
console.log("Current working directory:", process.cwd());

if (args.length > 0) {
  console.log("Arguments:", args.join(" "));
} else {
  console.log("No arguments provided.");
}

console.log(`${greeting} ${name}`);

process.on("SIGINT", () => {
  console.log("Shutting down gracefully.");
  process.exit(0);
});

if (debug) {
  console.log("Press Ctrl+C to exit...");
  setInterval(() => {}, 1 << 30);
}
