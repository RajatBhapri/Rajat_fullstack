import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

console.log("Loaded API_KEY:", process.env.API_KEY);

// API_KEY=123 node script.js   to override API_key

const demo = process.env.API_KEY || 987;

console.log(demo);

function requireEnv(name:any) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }

  return value;
}

const API_KEY = requireEnv("API_KEY");
console.log(API_KEY);
