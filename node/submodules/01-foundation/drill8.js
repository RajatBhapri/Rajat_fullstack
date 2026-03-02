console.time("demo");

console.log("App started at:", new Date().toLocaleTimeString());

console.timeEnd("demo");

console.log(process.memoryUsage());

console.log(import.meta.resolve("express"));

console.log("Node version:", process.version);