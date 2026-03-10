import fs from "fs";
import path from "path";
import { pool } from "./db.js";

async function runMigrations() {
  const migrationsPath = "./migrations";

  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE,
      applied_at TIMESTAMP DEFAULT NOW()
    )
  `);

  const files = fs.readdirSync(migrationsPath).sort();

  const result = await pool.query("SELECT name FROM migrations");
  const applied = result.rows.map((r) => r.name);

  for (const file of files) {
    if (applied.includes(file)) {
      console.log(`Skipping ${file}`);
      continue;
    }

    console.log(`Running ${file}`);

    const sql = fs.readFileSync(path.join(migrationsPath, file), "utf8");

    await pool.query("BEGIN");

    try {
      await pool.query(sql);

      await pool.query("INSERT INTO migrations(name) VALUES($1)", [file]);

      await pool.query("COMMIT");

      console.log(`${file} applied`);
    } catch (err) {
      await pool.query("ROLLBACK");
      console.error("Migration failed:", err);
      process.exit(1);
    }
  }

  console.log("All migrations complete");

  await pool.end();
}

runMigrations();
