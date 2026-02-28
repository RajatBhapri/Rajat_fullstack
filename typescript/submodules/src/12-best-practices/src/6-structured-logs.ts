import pino from "pino";

const logger = pino();

function step1(operationId: string) {
  logger.info({ operationId }, "step1");
  step2(operationId);
}

function step2(operationId: string) {
  logger.info({ operationId }, "step2");
}

const operationId = crypto.randomUUID();

step1(operationId);