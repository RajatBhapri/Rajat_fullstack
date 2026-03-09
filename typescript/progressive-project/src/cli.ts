import { Command } from "commander";
import { TaskManager } from "./TaskManager.js";

export class TaskCLI {
  constructor(private manager: TaskManager) {}

  async run(args: string[]) {
    const program = new Command();

    program.command("add <title>").action((title) => {
      const task = this.manager.add({
        title,
        completed: false,
        priority: "medium",
      });
      console.log(task);
    });

    program.parse(args);
  }
}
