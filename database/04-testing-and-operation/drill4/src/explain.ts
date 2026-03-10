import { pool } from "./db.js";

async function run() {
  const result = await pool.query(
    "EXPLAIN ANALYZE SELECT * FROM users WHERE email = $1",
    ["user500@test.com"],
  );

  console.log(result.rows);

  process.exit(0);
}

run();
