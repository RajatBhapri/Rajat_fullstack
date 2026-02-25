abstract class store<T> {
  abstract get(key: string): T | undefined;
  abstract set(key: string, value: T): void;
  abstract has(key: string): boolean;
}

class XStore<T> extends store<T> {
  private map = new Map<string, T>();

  get(key: string): T | undefined {
    return this.map.get(key);
  }
  set(key: string, value: T): void {
    this.map.set(key, value);
  }
  has(key: string): boolean {
    return key ? true : false;
  }
}

const store1 = new XStore<number>();

store1.set("a", 42);
console.log(store1.get("a")); // 42

//--------------------------------------------using interface----------------------------------------------------
interface IStore<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  has(key: string): boolean;
}

class MemoryStore<T> implements IStore<T> {
  private map = new Map<string, T>();

  get(key: string): T | undefined {
    return this.map.get(key);
  }

  set(key: string, value: T): void {
    this.map.set(key, value);
  }

  has(key: string): boolean {
    return this.map.has(key);
  }
}

const store2 = new MemoryStore<number>();

store2.set("a", 4233);
console.log(store2.get("a")); // 42