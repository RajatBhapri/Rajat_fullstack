type Events = {
  "user:updated": { id: string; name: string };
};

class EventBus<E extends Record<string, any>> {
  private handlers: {
    [K in keyof E]?: ((payload: E[K]) => void)[];
  } = {};

  on<K extends keyof E>(event: K, fn: (payload: E[K]) => void) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event]!.push(fn);
  }

  emit<K extends keyof E>(event: K, payload: E[K]) {
    this.handlers[event]?.forEach(fn => fn(payload));
  }
}

const bus = new EventBus<Events>();

bus.on("user:updated", data => {
  console.log("updated:", data.id, data.name);
});

bus.emit("user:updated", { id: "1", name: "New Name" });

// bus.emit("user:updated", { wrong: true }); // error