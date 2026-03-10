import { query } from "./db";

async function main() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE
      )
    `);

    await query(`INSERT INTO users(email) VALUES($1)`, ["rajat@example.com"]);
    await query(`INSERT INTO users(email) VALUES($1)`, ["rajat@example.com"]);
  } catch (err: any) {
    console.log("Caught Error in main:", err);
  } finally {
    process.exit(0);
  }
}

main();
