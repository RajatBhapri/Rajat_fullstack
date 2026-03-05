import Database from "better-sqlite3";
import path from "path";

// 1️⃣ Connect to the database (file will be created automatically)
const dbPath = path.join(__dirname, "app.db");
const db = new Database(dbPath);

// 2️⃣ Create the users table
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL
  )
`).run();

// 3️⃣ Function to create a new user
export function createUser(email: string, passwordHash: string, role: string) {
  const stmt = db.prepare(`
    INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)
  `);
  return stmt.run(email, passwordHash, role);
}

// 4️⃣ Function to get a user by email
export function getUserByEmail(email: string) {
  const stmt = db.prepare(`
    SELECT * FROM users WHERE email = ?
  `);
  return stmt.get(email); // returns undefined if not found
}

// 5️⃣ Function to close the database
export function closeDb() {
  db.close();
}

// 6️⃣ Close DB on process exit
process.on("exit", closeDb);
process.on("SIGINT", () => {
  closeDb();
  process.exit();
});
process.on("SIGTERM", () => {
  closeDb();
  process.exit();
});