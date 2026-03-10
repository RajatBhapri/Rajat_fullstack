import { execSync } from "child_process";

console.log("Creating database...");

execSync(`sudo -u postgres psql -c "CREATE DATABASE toolkitdb"`, {
  stdio: "inherit",
});

console.log("Database created");
