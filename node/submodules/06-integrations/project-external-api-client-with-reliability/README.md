# External API Client with Reliability

A small Node.js TypeScript project that demonstrates a **reliable external API client** with retries, timeouts, authentication, and tests.

## Features

- Typed API client
- Timeout handling
- Retry on server errors
- Structured error handling
- Authentication support (API token)
- Request ID logging
- Latency metrics
- Idempotency key support for POST requests
- Test suite using MSW and Vitest

## Project Structure

```
src
 ├─ client.ts      # HTTP helper with retry, timeout
 ├─ github.ts      # Typed GitHub API wrapper
 └─ errors.ts      # Structured API errors

tests
 └─ github.test.ts # MSW test suite
```

## Install

```
npm install
```

## Run Tests

```
npm test
```

## Environment Variables

Set GitHub token if needed:

```
export GITHUB_TOKEN=your_token
```

## What This Project Demonstrates

- Building a reliable API client
- Handling external API failures
- Testing integrations with mocked APIs
