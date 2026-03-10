import { Pool } from "pg";
import { BaseRepository } from "./BaseRepository.js";

export interface User {
  id: number;
  name: string;
  email: string;
}

export class UserRepository extends BaseRepository<User> {
  constructor(pool: Pool) {
    super(pool, "users");
  }

  async create(name: string, email: string) {
    const result = await this.pool.query(
      `INSERT INTO users(name,email)
       VALUES($1,$2)
       RETURNING *`,
      [name, email],
    );

    return result.rows[0];
  }

  async findByEmail(email: string) {
    const result = await this.pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    return result.rows[0];
  }
}
