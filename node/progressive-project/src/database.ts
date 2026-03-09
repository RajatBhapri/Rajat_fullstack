import Database from "better-sqlite3";

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: "user" | "admin";
  created_at: string;
}

type DB = InstanceType<typeof Database>;

export class UserDatabase {
  constructor(private db: DB) {
    this.init();
  }

  private init() {
    this.db
      .prepare(
        `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE,
          password_hash TEXT,
          role TEXT,
          created_at TEXT
        )
      `,
      )
      .run();
  }

  createUser(email: string, passwordHash: string, role: string): User {
    const now = new Date().toISOString();

    const result = this.db
      .prepare(
        `
        INSERT INTO users (email,password_hash,role,created_at)
        VALUES (?,?,?,?)
      `,
      )
      .run(email, passwordHash, role, now);

    return {
      id: Number(result.lastInsertRowid),
      email,
      password_hash: passwordHash,
      role: role as "user" | "admin",
      created_at: now,
    };
  }

  getUserByEmail(email: string): User | null {
    const user = this.db
      .prepare("SELECT * FROM users WHERE email=?")
      .get(email);

    return (user as User) || null;
  }

  getUserById(id: number): User | null {
    const user = this.db.prepare("SELECT * FROM users WHERE id=?").get(id);

    return (user as User) || null;
  }
}
