# Robust API Runner

## Overview

Production-ready Express + Postgres API with hot reload, PM2 cluster mode, and Docker support.

## Setup

1. Install dependencies

```bash
npm install
```

2. Run in development

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Run in production

```bash
npm start
```

## PM2 Cluster

Start with PM2

```bash
pm2 start ecosystem.config.cjs
pm2 logs
pm2 restart <name>
pm2 delete all
```

## Docker

Build Docker image

```bash
docker build -t robust-api-runner .
```

Run container

```bash
docker run -p 3000:3000 robust-api-runner
```

Stop container

```bash
docker ps
docker stop id
```
