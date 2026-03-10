import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("PostgreSQL Time:", res.rows[0]);
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err);
  } finally {
    await pool.end();
  }
}

testConnection();