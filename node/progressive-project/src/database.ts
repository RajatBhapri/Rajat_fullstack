import Database from "better-sqlite3";

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: "user" | "admin";
  created_at: string;
}

export class UserDatabase {
  constructor(private db = new Database(":memory:")) {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT,
      role TEXT,
      created_at TEXT
    )`,
      )
      .run();
  }

  createUser(email: string, passwordHash: string, role: string): User {
    const stmt = this.db
      .prepare(`INSERT INTO users(email,password_hash,role,created_at)
      VALUES(?,?,?,?)`);
    const info = stmt.run(email, passwordHash, role, new Date().toISOString());
    return {
      id: info.lastInsertRowid as number,
      email,
      password_hash: passwordHash,
      role: role as "user",
      created_at: new Date().toISOString(),
    };
  }

  getUserByEmail(email: string): User | null {
    return (
      this.db.prepare(`SELECT * FROM users WHERE email=?`).get(email) || null
    );
  }

  getUserById(id: number): User | null {
    return this.db.prepare(`SELECT * FROM users WHERE id=?`).get(id) || null;
  }
}
