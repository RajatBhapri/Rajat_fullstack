import { createProjectWithTasks } from "./project";

async function main() {
  try {
    const projectId = await createProjectWithTasks({ name: "My Project1" }, [
      { title: "Setup DB" },
      { title: "Create Transactions" },
      { title: "Test Rollback" },
    ]);

    console.log("Project created with ID:", projectId);
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
