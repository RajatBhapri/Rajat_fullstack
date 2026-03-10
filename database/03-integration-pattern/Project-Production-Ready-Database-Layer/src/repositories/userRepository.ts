import { query } from "../db.js";

export const userRepository = {
  async create(email: string) {
    const res = await query("INSERT INTO users(email) VALUES($1) RETURNING *", [
      email,
    ]);
    return res.rows[0];
  },

  async findAll() {
    const res = await query("SELECT * FROM users");
    return res.rows;
  },
};
