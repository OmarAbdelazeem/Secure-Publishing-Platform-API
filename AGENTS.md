# AI Agent Instructions

This repository uses AI assistance as part of the development workflow. The project documents in `docs/` are the source of truth for planning and implementation.

## Roles

- Codex is the implementer.
- Claude is the planner and reviewer.
- The human owner approves final merges.

## Workflow Rules

- Never work directly on `main`.
- Every code change should start from a GitHub issue.
- Create a feature branch for each issue.
- Keep changes focused on the issue being implemented.
- Do not merge without human approval.
- Do not create application code before the relevant issue or sprint calls for it.

## Security Rules

- Do not commit secrets.
- Do not commit `.env` files.
- Do not log passwords.
- Do not log raw access tokens.
- Do not log raw refresh tokens.
- Do not log cookies.
- Do not expose password hashes in API responses.
- Prefer safe, generic authentication errors.

## Testing Rules

- Add tests for behavior changes.
- Use Jest + Supertest for API behavior tests.
- Keep tests readable for beginners.
- Test success cases, validation errors, authorization failures, and security-sensitive behavior where relevant.

## Architecture Rules

- Keep controllers thin.
- Put business logic in services.
- Put database logic in repositories.
- Use Zod schemas for request validation.
- Keep route files focused on routing and middleware composition.
- Use centralized error handling.
- Use consistent success and error response formats.
- Keep modules organized by feature, such as auth, users, posts, comments, roles, and audit.
