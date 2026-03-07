import pino from "pino";
import type { LoggerOptions } from "pino";

const isDev = process.env.NODE_ENV !== "production";

const options: LoggerOptions = {
  level: "info",
  base: {
    pid: false,
    hostname: false,
  },
};

export const logger: pino.Logger = isDev
  ? pino({
      ...options,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss",
        },
      },
    })
  : pino(options);
