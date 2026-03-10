import { createDb } from "./db";
import dotenv from "dotenv";

dotenv.config();

async function resetDb() {
  const db: any = createDb();

  if (process.env.DB_TYPE === "sqlite") {
    db.run("DROP TABLE IF EXISTS users");
    db.run("CREATE TABLE users(id INTEGER PRIMARY KEY, email TEXT)");
  } else {
    await db.query("DROP TABLE IF EXISTS users CASCADE");
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email TEXT
      )
    `);
  }

  console.log("Database reset complete");

  if (db.end) await db.end(); // close postgres pool
}

resetDb().catch(console.error);
