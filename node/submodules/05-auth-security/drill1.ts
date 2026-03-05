import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dbPath = path.join(__dirname, "app.db");
const db = new Database(dbPath);


db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL
  )
`).run();


function createUser(email: string, passwordHash: string, role: string) {
  return db.prepare(
    "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)"
  ).run(email, passwordHash, role);
}

function getUserByEmail(email: string) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

function closeDb() {
  db.close();
}

process.on("exit", closeDb);
process.on("SIGINT", () => { closeDb(); process.exit(); });
process.on("SIGTERM", () => { closeDb(); process.exit(); });


createUser("alice@example.com", "hashedpassword123", "admin");
console.log(getUserByEmail("alice@example.com"));
