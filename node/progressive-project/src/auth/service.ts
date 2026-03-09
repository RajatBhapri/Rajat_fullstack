import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UserDatabase, User } from "../database";
import { loadConfig } from "../config";

const config = loadConfig();

export class AuthService {
  constructor(private userDb: UserDatabase) {}

  async register(email: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    return this.userDb.createUser(email, hash, "user");
  }

  async login(email: string, password: string): Promise<string> {
    const user = this.userDb.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      throw new Error("Invalid credentials");

    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: "1h",
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, config.jwtSecret);
  }
}
