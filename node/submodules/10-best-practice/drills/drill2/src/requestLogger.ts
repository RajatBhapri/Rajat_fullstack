import pinoHttp from "pino-http";
import { logger } from "./logger.js"; // ES module
import { randomUUID } from "crypto";
import type { Request, Response } from "express";

export const requestLogger = pinoHttp({
  logger,
  genReqId: () => randomUUID(),
  customProps: (req: Request) => ({
    requestId: req.id, // TS now knows type
  }),
  serializers: {
    req: (req: Request) => ({
      method: req.method,
      url: req.url,
      headers: req.headers,
    }),
    res: (res: Response) => ({
      statusCode: res.statusCode,
    }),
  },
});
