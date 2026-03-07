import type { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({ level: "info" });
export const httpLogger = pinoHttp.default({ logger });

export interface ReqWithID extends Request {
  id: string;
}

export const assignRequestId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  (req as any).id = uuidv4();
  res.setHeader("X-Request-ID", (req as any).id);
  next();
};
