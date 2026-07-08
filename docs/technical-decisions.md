# Technical Decisions

## Sprint 0 Decision Record

This document captures the initial technical decisions for the Secure Publishing Platform API before any application code is written. It is based on the product requirements, user stories, backlog, sprint plan, and agent workflow rules.

## 1. Project Name

- **Decision:** The project name is **Secure Publishing Platform API**.
- **Repository name:** `Secure-Publishing-Platform-API`.
- **Reason:** This name matches the product requirements and clearly describes the backend as a secure publishing and content-management API.
- **Security impact:** Naming does not directly affect security, but clear naming helps keep documentation, issues, branches, and deployment references consistent.
- **Implementation notes:** Use the project name in documentation and API metadata. Use the repository name for GitHub and local repository references.

## 2. Runtime and Language

- **Decision:** Use Node.js with JavaScript, not TypeScript.
- **Reason:** The sprint plan explicitly calls for JavaScript and a beginner-friendly backend learning path.
- **Security impact:** JavaScript requires disciplined validation, error handling, and testing because type safety is not enforced at compile time.
- **Implementation notes:** Use modern CommonJS or ES module syntax consistently once the project is initialized in Sprint 1.

## 3. Package Manager

- **Decision:** Use npm.
- **Reason:** npm is the default Node.js package manager and is beginner-friendly.
- **Security impact:** Dependency versions should be locked with `package-lock.json` after the project is initialized.
- **Implementation notes:** Do not create `package.json` during Sprint 0. Initialize npm during Sprint 1.

## 4. Backend Framework

- **Decision:** Use Express.js.
- **Reason:** Express is the framework specified across the PRD, sprint plan, backlog, and user stories.
- **Security impact:** Express requires explicit middleware setup for request parsing, cookies, security headers, CORS, validation, rate limiting, and error handling.
- **Implementation notes:** Do not initialize Express during Sprint 0. Sprint 1 should separate the app setup from server startup.

## 5. Database

- **Decision:** Use PostgreSQL.
- **Reason:** The project is intended to teach production-style relational database design.
- **Security impact:** PostgreSQL supports constraints, relationships, transactions, indexes, and durable session/token storage.
- **Implementation notes:** Configure the database through `DATABASE_URL` during the database sprint. Do not commit real database credentials.

## 6. ORM

- **Decision:** Use Prisma.
- **Reason:** Prisma is listed in the project stack and provides schema modeling, migrations, and a generated database client.
- **Security impact:** Prisma helps reduce raw SQL usage, but authorization, field filtering, and safe error handling must still be implemented in application code.
- **Implementation notes:** Prisma setup belongs in Sprint 2. Database logic should live in repositories.

## 7. Validation Library

- **Decision:** Use Zod.
- **Reason:** Zod is the preferred decision in the sprint plan and agent architecture rules.
- **Security impact:** Zod will help reject invalid, malformed, or unsafe input before business logic runs.
- **Implementation notes:** Create reusable validation middleware later for request body, params, and query validation.

## 8. Test Runner and API Testing Library

- **Decision:** Use Jest with Supertest.
- **Reason:** This combination is preferred in the sprint plan and supports readable API behavior tests.
- **Security impact:** Tests should cover authentication, authorization, validation failures, token rotation, token reuse detection, safe errors, and sensitive-field filtering.
- **Implementation notes:** Do not install test packages during Sprint 0. Add tests with behavior changes once application code exists.

## 9. Password Hashing Library

- **Decision:** Use bcrypt.
- **Reason:** bcrypt is the preferred Sprint 0 decision and is a common, proven password hashing library for Node.js projects.
- **Security impact:** Raw passwords must never be stored, logged, returned in responses, or committed.
- **Implementation notes:** Password comparison should happen only against the stored hash. Password hashes must be excluded from all API responses.

## 10. Access Token Strategy

- **Decision:** Use short-lived JWT access tokens returned in the response body.
- **Reason:** The sprint plan prefers access tokens in the response body, and the PRD requires JWT access tokens.
- **Security impact:** Short lifetimes reduce the damage from token exposure. Access tokens must not contain sensitive data and must never be logged.
- **Implementation notes:** Keep the JWT payload minimal, such as user ID and safe authorization context. Protected routes should verify the token and load the current user as needed.

## 11. Refresh Token Strategy

- **Decision:** Use long-lived opaque random refresh tokens stored hashed in the database.
- **Reason:** The PRD and sprint plan require refresh tokens, secure storage, rotation, and reuse detection.
- **Security impact:** Hashing refresh tokens protects sessions if the database is exposed. Rotation and reuse detection help detect stolen tokens.
- **Implementation notes:** Rotate the refresh token on every successful refresh. Revoke the old token, store the new token hash, and link token family or replacement metadata where useful.

## 12. Cookie Strategy

- **Decision:** Transport refresh tokens in HTTP-only secure cookies.
- **Reason:** The project requirements call for refresh tokens in HTTP-only cookies.
- **Security impact:** `HttpOnly` reduces token theft through client-side JavaScript. Production cookies must use `Secure`. SameSite and CSRF protections must be considered for state-changing routes.
- **Implementation notes:** Logout must clear the refresh token cookie. Refresh must rotate the cookie. Cookie expiration should match the refresh token policy.

## 13. API Success Response Format

- **Decision:** Use a consistent JSON success envelope.
- **Reason:** The PRD, user stories, and agent rules require consistent success responses.
- **Security impact:** Consistent responses reduce accidental exposure of sensitive fields by encouraging centralized response helpers.
- **Implementation notes:** Use this base format:

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

For paginated lists, include metadata:

```json
{
  "success": true,
  "message": "Resources retrieved successfully.",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

## 14. API Error Response Format

- **Decision:** Use a consistent JSON error envelope.
- **Reason:** The PRD and user stories require structured validation, auth, forbidden, not-found, and internal error responses.
- **Security impact:** Safe error responses prevent leaking stack traces, account existence, token details, database internals, and route internals.
- **Implementation notes:** This section is the canonical API error response format for implementation and review. Use this base format:

```json
{
  "success": false,
  "message": "Something went wrong.",
  "error": {
    "code": "ERROR_CODE",
    "details": []
  }
}
```

Validation errors should include field-level details when safe. Unexpected internal errors should be logged and return a safe client message.

Validation errors should use the same envelope and place field-level validation details inside `error.details`:

```json
{
  "success": false,
  "message": "Validation failed.",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Email must be valid."
      }
    ]
  }
}
```

Responses may include a top-level `requestId` when available to help trace logs and support debugging:

```json
{
  "success": false,
  "message": "Route not found.",
  "error": {
    "code": "NOT_FOUND",
    "details": []
  },
  "requestId": "request_id"
}
```

## 15. Password Rules

- **Decision:** Passwords must meet minimum strength requirements.
- **Reason:** The PRD and user stories require weak passwords to be rejected.
- **Security impact:** Stronger passwords reduce account takeover risk.
- **Implementation notes:** Validate passwords with Zod. Minimum rules:
  - At least 8 characters.
  - At least one uppercase letter.
  - At least one lowercase letter.
  - At least one number.
  - At least one symbol.

## 16. Email Verification Policy

- **Decision:** New users start unverified, and email verification is required before creating posts or comments.
- **Reason:** The backlog asks whether verification is required for posts and comments; requiring it gives a safer publishing baseline.
- **Security impact:** Verification helps reduce spam, abuse, and low-trust account actions.
- **Implementation notes:** Verification tokens must be secure random tokens, stored as hashes, expire after a defined period, and be single-use or safely invalidated after use.

## 17. Post Deletion Behavior

- **Decision:** Use soft delete or archive behavior for posts.
- **Reason:** The sprint plan recommends soft delete/archive, and publishing platforms benefit from auditability and moderation history.
- **Security impact:** Soft deletion preserves evidence for moderation and audit workflows while preventing deleted content from appearing to normal readers.
- **Implementation notes:** Deleted or archived posts should be excluded from normal public reads unless an authorized moderation route intentionally includes them.

## 18. Comment Deletion Behavior

- **Decision:** Use soft delete or status change behavior for comments.
- **Reason:** The sprint plan recommends soft delete/status change for comments.
- **Security impact:** Soft deletion supports moderation and audit workflows without permanently losing context.
- **Implementation notes:** Deleted comments should not display their original content to normal readers, but the system may preserve metadata needed for moderation.

## 19. Logging Policy

- **Decision:** Use structured request and application logging.
- **Reason:** The PRD and user stories require logs for debugging, monitoring, auditing, and production readiness.
- **Security impact:** Logs must not include passwords, raw access tokens, raw refresh tokens, cookies, reset tokens, verification tokens, or token hashes.
- **Implementation notes:** Logs should include safe fields such as request ID, method, path, status code, response time, environment, and safe user or session identifiers when appropriate.

## 20. Request ID Policy

- **Decision:** Every request should have a request ID.
- **Reason:** User story US-009 requires traceable requests across logs and errors.
- **Security impact:** Request IDs improve incident investigation without exposing sensitive data.
- **Implementation notes:** Generate a unique request ID when the client does not provide one. Reuse existing client-provided request IDs only when safe. Include the request ID in response headers and logs.

## 21. Security Baseline

- **Decision:** Build with a security-first backend baseline from the start.
- **Reason:** The project goal is a secure publishing platform, not only a basic CRUD API.
- **Security impact:** This reduces common risks around authentication, authorization, input handling, tokens, cookies, and error leakage.
- **Implementation notes:** Baseline requirements:
  - Use Helmet for security headers.
  - Configure CORS intentionally.
  - Rate-limit sensitive routes such as login, resend verification, and password reset.
  - Validate all request input.
  - Use centralized error handling.
  - Use safe generic auth errors.
  - Do not commit secrets or `.env` files.
  - Do not expose password hashes, token hashes, or sensitive internals in responses.
  - Consider CSRF protection for cookie-based auth flows.

## 22. API Documentation Approach

- **Decision:** Use OpenAPI/Swagger.
- **Reason:** The PRD, backlog, sprint plan, and user stories all call for Swagger/OpenAPI documentation.
- **Security impact:** API docs should explain auth requirements without exposing secrets, real tokens, or production credentials.
- **Implementation notes:** Document endpoints, request examples, response examples, validation errors, auth errors, forbidden errors, pagination, JWT access-token usage, and refresh-cookie behavior.

## 23. Docker and Local Development Approach

- **Decision:** Use Docker Compose for local PostgreSQL.
- **Reason:** The project requirements call for Docker Compose and a production-style local development setup.
- **Security impact:** Local service configuration should avoid committing real secrets and should use environment variables.
- **Implementation notes:** Add Docker Compose in the database or local-development sprint, not Sprint 0. A Dockerfile for the app belongs later in production readiness work.

## 24. Initial Sprint Workflow

- **Decision:** Sprint work should follow issue-driven feature branches with human approval before merge.
- **Reason:** `AGENTS.md` defines Codex as implementer, Claude as planner/reviewer, and the human owner as final merge approver.
- **Security impact:** Small reviewed changes reduce the chance of accidentally merging secrets, unsafe auth behavior, or broad unreviewed changes.
- **Implementation notes:** Do not work directly on `main`. Every code change should start from a GitHub issue, use a feature branch, include tests for behavior changes, and keep controllers thin, services for business logic, and repositories for database logic.

## Definition of Done

- [x] All major stack decisions documented.
- [x] Security-related auth decisions documented.
- [x] API response formats documented.
- [x] Ready to begin Sprint 1.
