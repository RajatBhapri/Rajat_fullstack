# Async Job Service

A simple **Node.js background job system** that processes long-running tasks using a queue and worker.

## Features

- Submit async jobs
- Background worker processing
- Job status tracking
- Retries and idempotency
- SQLite database storage
- Integration tests with Vitest

## Requirements

- Node.js (v18+)
- Redis
- npm

## Install

```bash
npm install
```

## Start Redis

```bash
redis-server
```

## Build

```bash
npm run build
```

## Run

```bash
node dist/index.js
```

Server runs at:

```
http://localhost:3000
```

## API

### Submit Job

```
POST /submit-report
```

### Check Job Status

```
GET /jobs/:id
```
