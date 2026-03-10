import { withTransaction } from "./transaction";

interface Project {
  name: string;
}

interface Task {
  title: string;
}

export async function createProjectWithTasks(project: Project, tasks: Task[]) {
  return withTransaction(async (client) => {
    const projectRes = await client.query(
      `INSERT INTO project1 (name) VALUES ($1) RETURNING id`,
      [project.name],
    );
    const projectId = projectRes.rows[0].id;

    for (const task of tasks) {
      await client.query(
        `INSERT INTO task1 (project_id, title) VALUES ($1, $2)`,
        [projectId, task.title],
      );
    }

    return projectId;
  });
}

export async function testRollback() {
  try {
    await createProjectWithTasks({ name: "Rollback Project1" }, [
      { title: "Task 1" },
      { title: "Task 2" },
    ]);
    console.log("Project created successfully");
  } catch (err: any) {
    console.log("Rollback successful:", err.message);
  }
}
