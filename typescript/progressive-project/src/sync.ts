import type { Storage } from "./storage.js";
import type { TaskCollection } from "./collection.js";

export interface RemoteSync {
  push(data: TaskCollection): Promise<void>;
  pull(): Promise<TaskCollection>;
}

export class TaskSyncManager {
  constructor(
    private storage: Storage<TaskCollection>,
    private remote?: RemoteSync,
  ) {}

  async save(): Promise<void> {}

  async load(): Promise<TaskCollection> {
    const data = await this.storage.load("tasks");
    return (
      data ?? {
        tasks: [],
        metadata: { total: 0, completed: 0, lastModified: new Date() },
      }
    );
  }

  async sync(): Promise<void> {
    if (!this.remote) return;
    const data = await this.load();
    await this.remote.push(data);
  }
}
