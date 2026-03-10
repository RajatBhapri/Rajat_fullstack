import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE_URL!;
const file = process.argv[2];

if (!file) {
  console.log("Usage: npm run db:restore backups/<file>.sql");
  process.exit(1);
}

console.log("Restoring database...");

execSync(`psql ${dbUrl} < ${file}`, { stdio: "inherit" });

console.log("Restore complete");
