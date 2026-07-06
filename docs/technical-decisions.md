# Technical Decisions

## Sprint 0 Decisions

These decisions define the initial direction for the Secure Publishing Platform API. They should stay aligned with the product requirements, user stories, sprint plan, and backlog.

| Decision | Choice |
| --- | --- |
| Project name | Secure Publishing Platform API |
| Package manager | npm |
| Runtime | Node.js |
| Web framework | Express.js |
| Language | JavaScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation library | Zod |
| Test runner | Jest + Supertest |
| Password hashing | bcrypt |
| API documentation | Swagger/OpenAPI |
| Local infrastructure | Docker |

## Authentication Decisions

### Access Token Strategy

- Access tokens will be JWTs.
- Access tokens will be short-lived.
- Access tokens will be returned in the response body after successful login or refresh.
- Clients will send access tokens with protected API requests.
- Raw access tokens must never be logged.

### Refresh Token Cookie Strategy

- Refresh tokens will be long-lived compared with access tokens.
- Refresh tokens will be stored in secure HTTP-only cookies.
- Refresh token cookies should use secure production settings, including `HttpOnly`, `Secure`, and appropriate `SameSite` behavior.
- Refresh tokens will be hashed before storage.
- Refresh tokens should rotate on refresh.
- Reuse of an old refresh token should revoke the affected session.
- Raw refresh tokens and cookies must never be logged.

## API Response Decisions

### Success Response Format

Use a consistent JSON success format:

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

For list endpoints, include pagination metadata when needed:

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

### Error Response Format

Use a consistent JSON error format:

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

Production error responses must not expose stack traces or sensitive internal details.

## Password Rules

Passwords should be validated with Zod and must meet these minimum rules:

- At least 8 characters.
- Include at least one uppercase letter.
- Include at least one lowercase letter.
- Include at least one number.
- Include at least one symbol.

Raw passwords must never be stored, logged, returned, or committed.

## Email Verification Policy

- New users start as unverified.
- Email verification is required before creating posts.
- Email verification is required before commenting.
- Reading published content does not require email verification.
- Verification tokens must be securely generated, hashed before storage, and expire after a defined period.

## Deletion Behavior

### Post Deletion

Posts should use soft deletion or archive behavior instead of immediate hard deletion. This supports moderation, auditability, and safer recovery during development.

### Comment Deletion

Comments should use soft deletion or a status change instead of immediate hard deletion. Deleted comments should no longer display normal content to readers, but the system may preserve enough metadata for moderation and audit purposes.
