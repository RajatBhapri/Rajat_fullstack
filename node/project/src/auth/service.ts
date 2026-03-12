import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../database.js";

const SECRET = "secret";

export class AuthService {
  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);

    db.prepare(
      "INSERT INTO users (email,password_hash,role,created_at) VALUES (?,?,?,?)",
    ).run(email, hash, "user", new Date().toISOString());
  }

  async login(email: string, password: string) {
    const user = db.prepare("SELECT * FROM users WHERE email=?").get(email);

    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) throw new Error("Invalid password");

    return jwt.sign({ id: user.id }, SECRET);
  }

  verifyToken(token: string) {
    return jwt.verify(token, SECRET);
  }
}
