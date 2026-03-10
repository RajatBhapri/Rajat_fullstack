# Database Operations Toolkit

## Setup

Install dependencies:

```
npm install
```

Create a `.env` file:

```
DATABASE_URL=postgresql://taskuser:secret@localhost:5432/toolkitdb
```

Make sure PostgreSQL is running.

## Database Scripts

Create database

```
npm run db:create
```

Run migrations

```
npm run db:migrate
```

Seed database

```
npm run db:seed
```

Reset database (drop, migrate, seed)

```
npm run db:reset
```

Create backup

```
npm run db:backup
```

Restore database

```
npm run db:restore <backup-file>
```

Example:

```
npm run db:restore backups/backup-123456.sql
```

## Running the Project

Typical workflow:

```
npm run db:create
npm run db:migrate
npm run db:seed
```

Then run the application normally.
