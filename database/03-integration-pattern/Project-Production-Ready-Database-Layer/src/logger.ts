import { v4 as uuid } from "uuid";

export function log(message: string, data: any = {}) {
  console.log(
    JSON.stringify({
      id: uuid(),
      time: new Date().toISOString(),
      message,
      ...data,
    }),
  );
}
