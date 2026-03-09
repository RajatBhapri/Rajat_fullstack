import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UserDatabase } from "../database.js";

const SECRET = "supersecret";

export interface JWTPayload {
  userId: number;
}

export class AuthService {
  constructor(private userDb: UserDatabase) {}

  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);

    return this.userDb.createUser(email, hash, "user");
  }

  async login(email: string, password: string): Promise<string> {
    const user = this.userDb.getUserByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });

    return token;
  }

  verifyToken(token: string): JWTPayload {
    return jwt.verify(token, SECRET) as JWTPayload;
  }
}
