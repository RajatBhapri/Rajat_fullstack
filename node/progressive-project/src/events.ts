import { EventEmitter } from "events";

export class TaskEventEmitter extends EventEmitter {
  emitTaskCreated(task: any): void {
    this.emit("taskCreated", task);
  }

  emitTaskUpdated(task: any): void {
    this.emit("taskUpdated", task);
  }

  emitTaskDeleted(id: string): void {
    this.emit("taskDeleted", id);
  }
}
