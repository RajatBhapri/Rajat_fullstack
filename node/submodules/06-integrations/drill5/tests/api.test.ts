import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./server.js";
import { fetchJson } from "../http/fetchJson.js";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
