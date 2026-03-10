import { TaskRepository } from "../repositories/TaskRepository.js";

class MockTaskRepository {
  tasks = [{ id: 1, title: "Test", user_id: 1, completed: false }];

  async findByUser(userId: number) {
    return this.tasks.filter((t) => t.user_id === userId);
  }

  async markComplete(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) task.completed = true;
  }
}

test("find tasks by user", async () => {
  const repo = new MockTaskRepository();

  const tasks = await repo.findByUser(1);

  expect(tasks.length).toBe(1);
});
