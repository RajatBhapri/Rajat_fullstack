import { EventEmitter } from "events";

export class TaskEventEmitter extends EventEmitter {
  emitTaskCreated(task: unknown) {
    this.emit("taskCreated", task);
  }

  emitTaskUpdated(task: unknown) {
    this.emit("taskUpdated", task);
  }

  emitTaskDeleted(id: string) {
    this.emit("taskDeleted", id);
  }
}
