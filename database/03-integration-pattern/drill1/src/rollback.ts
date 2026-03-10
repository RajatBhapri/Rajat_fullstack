import { pool } from "./db.js";

async function rollback() {
  const res = await pool.query(`
    SELECT name
    FROM migrations
    ORDER BY id DESC
    LIMIT 1
  `);

  if (res.rows.length === 0) {
    console.log("No migrations to rollback");
    return;
  }

  const last = res.rows[0].name;

  console.log("Rolling back:", last);

  if (last === "002_add_categories.sql") {
    await pool.query("ALTER TABLE projects DROP COLUMN category_id");
    await pool.query("DROP TABLE IF EXISTS categories");
  }

  await pool.query("DELETE FROM migrations WHERE name=$1", [last]);

  console.log("Rollback complete");

  await pool.end();
}

rollback();
