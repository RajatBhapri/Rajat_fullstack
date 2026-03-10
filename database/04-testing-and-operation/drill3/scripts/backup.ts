import { execSync } from "child_process";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const dbUrl = process.env.DATABASE_URL!;
const date = new Date().toISOString().split("T")[0];

const backupDir = "./backups";
const file = `${backupDir}/backup-${date}.sql`;

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

console.log("Creating backup...");

execSync(`pg_dump ${dbUrl} > ${file}`);

console.log(`Backup created: ${file}`);
