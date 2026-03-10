import { Pool } from "pg";
import { BaseRepository } from "./BaseRepository.js";

export interface Task {
  id: number;
  title: string;
  user_id: number;
  completed: boolean;
}

export class TaskRepository extends BaseRepository<Task> {
  constructor(pool: Pool) {
    super(pool, "tasks");
  }

  async create(title: string, userId: number) {
    const result = await this.pool.query(
      `INSERT INTO tasks(title,user_id)
       VALUES($1,$2)
       RETURNING *`,
      [title, userId],
    );

    return result.rows[0];
  }

  async findByUser(userId: number) {
    const result = await this.pool.query(
      `SELECT * FROM tasks
       WHERE user_id=$1`,
      [userId],
    );

    return result.rows;
  }

  async markComplete(taskId: number) {
    const result = await this.pool.query(
      `UPDATE tasks
     SET completed=true
     WHERE id=$1
     RETURNING *`,
      [taskId],
    );
    return result.rows[0];
  }
}
