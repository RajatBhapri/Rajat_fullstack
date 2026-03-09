import { EventEmitter } from "events";
import type { Task } from "./models/task";

export class TaskEventEmitter extends EventEmitter {
  emitTaskCreated(task: Task) {
    this.emit("taskCreated", task);
  }
  emitTaskUpdated(task: Task) {
    this.emit("taskUpdated", task);
  }
  emitTaskDeleted(id: string) {
    this.emit("taskDeleted", id);
  }
}
