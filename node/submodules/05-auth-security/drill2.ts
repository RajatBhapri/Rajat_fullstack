import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "app2.db");
const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL
  )
`).run();

type User = {
  id: number;
  email: string;
  password_hash: string;
  role: string;
};

async function hashPassword(plain: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(plain, saltRounds);
}

async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

async function createUser(email: string, plainPassword: string, role: string) {
  const passwordHash = await hashPassword(plainPassword);
  return db.prepare(
    "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)"
  ).run(email, passwordHash, role);
}

function getUserByEmail(email: string): User | undefined {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as User | undefined;
}

function closeDb() {
  db.close();
}

process.on("exit", closeDb);
process.on("SIGINT", () => { closeDb(); process.exit(); });
process.on("SIGTERM", () => { closeDb(); process.exit(); });

async function test() {
  await createUser("123@example.com", "mypassword", "user");

  const user = getUserByEmail("123@example.com");

  if (!user) {
    console.log("User not found");
    return;
  }

  console.log("Stored user:", user);

  const isCorrect = await comparePassword("mypassword", user.password_hash);
  console.log("Correct password:", isCorrect);

  const isWrong = await comparePassword("wrongpassword", user.password_hash);
  console.log("Wrong password:", isWrong);
}

test();