# Secure Publishing Platform API

Secure Publishing Platform API is a production-style backend learning project for building a secure publishing and content-management API with authentication, authorization, database design, testing, documentation, and deployment practices.

The platform will support user registration, email verification, login, refresh-token sessions, posts, comments, roles, permissions, moderation, and audit-friendly security practices.

## Tech Stack

- Node.js
- Express.js
- JavaScript
- PostgreSQL
- Prisma
- JWT access tokens
- Refresh tokens in HTTP-only cookies
- Zod
- Jest + Supertest
- Swagger/OpenAPI
- Docker

## Documentation

- [Product requirements](docs/product-requirements.md)
- [User stories](docs/user-stories.md)
- [System design](docs/system-design.md)
- [Sprint plan](docs/sprint-plan.md)
- [Backlog](docs/backlog.md)
- [Technical decisions](docs/technical-decisions.md)

## Current Status

Current phase: **Sprint 2**

This repository currently has the Express foundation and local PostgreSQL/Prisma database foundation.

## Planned SDLC Workflow

1. Use the Markdown documents in `docs/` as the source of truth.
2. Create a GitHub issue for each user story, task, or bug.
3. Create a feature branch for each issue.
4. Implement the smallest useful change for that issue.
5. Add or update tests for behavior changes.
6. Open a pull request with acceptance criteria, testing notes, and security notes.
7. Review before merging into `main`.

## Security Notes

- Do not commit secrets, `.env` files, private keys, or production credentials.
- Do not log passwords, raw access tokens, refresh tokens, or cookies.
- Passwords will be hashed before storage.
- Refresh tokens will be stored in HTTP-only cookies and hashed before persistence.
- Inputs will be validated with Zod.
- Error responses should be safe and should not expose internal stack traces in production.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Start the local PostgreSQL database:

```bash
docker compose up -d postgres
```

Run Prisma migrations and seed data:

```bash
npm run db:migrate
npm run db:seed
```

Start the API:

```bash
npm run dev
```

Verify the API:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/version
```

Open Prisma Studio if you want to inspect seeded roles and permissions:

```bash
npm run db:studio
```

Development super admin seeding is optional. Set `DEV_SUPER_ADMIN_NAME`, `DEV_SUPER_ADMIN_EMAIL`, and `DEV_SUPER_ADMIN_PASSWORD_HASH` in `.env` to enable it.

Sprint 2 seeds the `user` role and creates the `User` to `Role` relationship needed for default role assignment. Actual assignment during registration is deferred to Sprint 4.
