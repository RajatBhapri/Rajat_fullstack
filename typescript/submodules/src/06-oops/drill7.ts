abstract class Store<T> {
  abstract get(key: string): T | undefined;
}

class XStore<T> extends Store<T> {
  private map = new Map<string, T>();
  private OpenState = false;

  Open() {
    this.OpenState = true;
  }

  close() {
    this.OpenState = false;
  }

  checkstate() {
    if (!this.OpenState) {
      throw new Error("state is closed");
    }
  }

  get(key: string): T | undefined {
    this.checkstate();
    return this.map.get(key);
  }
  set(key: string, value: T): void {
    this.checkstate();
    this.map.set(key, value);
  }
  has(key: string): boolean {
    this.checkstate();
    return this.map.has(key);
  }
}

const store1 = new XStore();

store1.Open();
store1.set("rajat", 2);
console.log(store1.get("rajat"));
console.log(store1.has("rajat"));
