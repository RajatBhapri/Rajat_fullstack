declare module "better-sqlite3" {
  interface RunResult {
    changes: number;
    lastInsertRowid: number;
  }

  interface Statement {
    run(...args: any[]): RunResult;
    get(...args: any[]): any;
    all(...args: any[]): any[];
    iterate(...args: any[]): IterableIterator<any>;
    bind(...args: any[]): Statement;
  }

  class Database {
    constructor(filename: string, options?: any);
    prepare(sql: string): Statement;
    exec(sql: string): void;
    close(): void;
  }

  export default Database;
}
