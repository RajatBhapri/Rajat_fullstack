import express from "express";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "app.db");
const db = new Database(dbPath);

type User = {
  id: number;
  email: string;
  password_hash: string;
};

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )
`,
).run();

const app = express();
app.use(express.json());

async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10);
}

async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

function getUserByEmail(email: string): User | undefined {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | User
    | undefined;
}

async function createUser(email: string, password: string) {
  const passwordHash = await hashPassword(password);
  return db
    .prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)")
    .run(email, passwordHash);
}

app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const existing = getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: "Email already exists" });
  }

  try {
    const userRole = role || "user";
    await db
      .prepare(
        "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)",
      )
      .run(email, await hashPassword(password), userRole);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValid = await comparePassword(password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
