class Semaphore {
  private count: number;
  private queue: Array<() => void>;

  constructor(max: number) {
    this.count = max;
    this.queue = [];
  }

  async acquire(): Promise<void> {
    if (this.count > 0) {
      this.count--;
      return;
    }

    await new Promise<void>((resolve) => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next && next();
    } else {
      this.count++;
    }
  }
}

async function runWithLimit<T>(
  limit: number,
  tasks: Array<() => Promise<T>>,
): Promise<T[]> {
  const semaphore = new Semaphore(limit);
  const results: T[] = new Array(tasks.length);

  const wrappedTasks = tasks.map((task, index) => {
    return (async () => {
      await semaphore.acquire();

      try {
        const result = await task();
        results[index] = result;
      } finally {
        semaphore.release();
      }
    })();
  });

  await Promise.all(wrappedTasks);
  return results;
}

function createTask(id: number, delay: number) {
  return async () => {
    console.log(`Start ${id}`);
    await new Promise((res) => setTimeout(res, delay));
    console.log(`End ${id}`);
    return id;
  };
}

const tasks = [
  createTask(1, 1000),
  createTask(2, 1000),
  createTask(3, 1000),
  createTask(4, 1000),
  createTask(5, 1000),
];

runWithLimit(2, tasks);
