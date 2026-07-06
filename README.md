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
- [Sprint plan](docs/sprint-plan.md)
- [Backlog](docs/backlog.md)
- [Technical decisions](docs/technical-decisions.md)

## Current Status

Current phase: **Sprint 0**

This repository is currently in the planning and SDLC setup stage. Application code has not been initialized yet.

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

Coming soon.

The Express application, package setup, database setup, and local development commands will be added during Sprint 1.
