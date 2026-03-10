import { execSync } from "child_process";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const backupDir = "./backups";

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

const timestamp = Date.now();
const file = `${backupDir}/backup-${timestamp}.sql`;

console.log("Creating backup...");

execSync(`pg_dump "${process.env.DATABASE_URL}" > ${file}`, {
  stdio: "inherit",
});

console.log("Backup created:", file);
