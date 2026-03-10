import { Pool } from "pg";

export abstract class BaseRepository<T> {
  constructor(
    protected pool: Pool,
    protected table: string,
  ) {}

  async findAll(): Promise<T[]> {
    const result = await this.pool.query(`SELECT * FROM ${this.table}`);
    return result.rows;
  }

  async findById(id: number): Promise<T | null> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.table} WHERE id = $1`,
      [id],
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<void> {
    await this.pool.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
  }
}
