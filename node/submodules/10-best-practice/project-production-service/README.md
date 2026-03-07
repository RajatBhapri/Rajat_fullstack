# Production-Ready Service

A Node.js + TypeScript API demonstrating production best practices:

- Structured logging with request IDs
- `/healthz`, `/readyz`, `/metrics` endpoints
- Graceful shutdown on SIGINT/SIGTERM
- Config from `.env` with required keys

---

## Setup

```bash
npm install
```

### Create a .env file in the project root:

```bash
DB_URL=mongodb://localhost:27017/mydb
API_KEY=my-secret-api-key
```

## Run Locally

```bash
npx tsx src/app.ts
```

Endpoints

- /healthz — Liveness check

- /readyz — Readiness check (DB alive)

- /metrics — Prometheus metrics

- /users — Sample users API

- /jobs — Sample jobs API

## Docker

### Build docker image:

```bash
docker build -t production-service .
```

### Run container

```bash
docker run -p 3000:3000 production-service
```

## Test endpoints in container:

```bash
curl http://localhost:3000/healthz
curl http://localhost:3000/readyz
curl http://localhost:3000/metrics
```
