# Claude Instructions

This repository is the **Secure Publishing Platform API**, a production-style backend learning project for secure authentication, authorization, publishing, comments, moderation, testing, API documentation, and deployment readiness.

## Review Source Documents

Claude should check future code reviews against the linked GitHub issue and these project documents:

- `README.md`
- `AGENTS.md`
- `docs/product-requirements.md`
- `docs/user-stories.md`
- `docs/system-design.md`
- `docs/backlog.md`
- `docs/sprint-plan.md`
- `docs/technical-decisions.md`

## Project Stack

- Node.js
- Express.js
- JavaScript
- PostgreSQL
- Prisma
- JWT access tokens
- Refresh tokens
- HTTP-only cookies
- Zod
- Jest
- Supertest

## Architecture Expectations

- Controllers should be thin.
- Services contain business logic.
- Repositories contain database queries.
- Routes should not contain business logic.
- Route files should compose routes, middleware, validation, and controllers.
- Shared error, response, validation, token, password, cookie, and logging behavior should live in reusable utilities or middleware.

## Security Expectations

- Never commit secrets.
- Never commit `.env` files.
- Never log passwords.
- Never log cookies.
- Never log raw access tokens.
- Never log raw refresh tokens.
- Never log verification tokens or password reset tokens.
- Passwords must be hashed before storage.
- Refresh tokens must be hashed before storage.
- Password hashes and token hashes must never be returned in API responses.
- JWT payloads should be minimal and must not contain sensitive data.
- Authentication errors should be safe and generic where needed.

## Validation and Responses

- All input must be validated.
- Use Zod for request body, params, and query validation.
- Errors must use the canonical error format from `docs/technical-decisions.md` section 14: `success`, `message`, and `error: { code, details }`, with optional top-level `requestId`.
- API responses must use the standard success format.
- Validation errors should include useful field-level details when safe.
- Production errors must not expose stack traces or internal implementation details.

## Testing Expectations

- Every behavior change should include tests.
- Use Jest and Supertest for API behavior tests.
- Cover success cases, validation failures, authentication failures, authorization failures, and security-sensitive behavior where appropriate.
- Documentation-only changes do not require tests.
