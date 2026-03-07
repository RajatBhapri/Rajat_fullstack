import bcrypt from "bcrypt";
import { db } from "./db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export async function registerUser(email: string, password: string) {
  const hash = await bcrypt.hash(password, 10);

  db.prepare("INSERT INTO users (email,password_hash,role) VALUES (?,?,?)").run(
    email,
    hash,
    "user",
  );
}

dotenv.config();

const SECRET = process.env.JWT_SECRET as string;

export async function loginUser(email: string, password: string) {
  const user = db
    .prepare("SELECT * FROM users WHERE email=?")
    .get(email) as any;

  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) return null;

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
    expiresIn: "1h",
  });

  return token;
}
