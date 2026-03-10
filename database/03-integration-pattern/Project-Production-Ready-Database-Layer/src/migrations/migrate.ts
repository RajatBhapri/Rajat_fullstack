import fs from "fs";
import { query } from "../db.js";

const file = "./src/migrations/001_create_users.sql";

const cmd = process.argv[2];

async function migrate() {
  const sql = fs.readFileSync(file).toString();
  await query(sql);
  console.log("migration applied");
}

async function rollback() {
  await query("DROP TABLE IF EXISTS users CASCADE");
  console.log("rollback done");
}

async function reset() {
  await rollback();
  await migrate();
}

if (cmd === "up") migrate();
if (cmd === "down") rollback();
if (cmd === "reset") reset();
