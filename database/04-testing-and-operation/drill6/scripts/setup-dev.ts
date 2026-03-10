import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

console.log("Setting up development database...");

execSync(
  `psql ${process.env.DATABASE_URL} -c "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email TEXT)"`,
  { stdio: "inherit" },
);
