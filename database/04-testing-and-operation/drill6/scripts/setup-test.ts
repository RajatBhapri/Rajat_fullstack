import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

console.log("Setting up test database...");

execSync(`psql ${process.env.DATABASE_URL} -c "DROP TABLE IF EXISTS users"`, {
  stdio: "inherit",
});

execSync(
  "psql $DATABASE_URL -c 'CREATE TABLE users(id SERIAL PRIMARY KEY, email TEXT)'",
  {
    stdio: "inherit",
  },
);
