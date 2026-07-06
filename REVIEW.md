# Claude PR Review Guide

Use this guide when reviewing future Codex pull requests for the Secure Publishing Platform API.

## Review Priorities

Focus on:

- Correctness
- Security
- Authentication
- Authorization
- Validation
- Tests
- Maintainability

Important findings should be real issues that can break behavior, leak data, weaken authentication, expose secrets, skip validation, create authorization bugs, corrupt data, or make future changes risky.

## Review Style

- Lead with important findings.
- Keep comments specific and actionable.
- Treat style and naming comments as **Nit** only.
- Do not request large rewrites unless necessary for correctness, security, or maintainability.
- Do not comment on formatting that CI or lint can catch.
- Do not block documentation-only PRs for missing tests.

## Required Checks

- Always check whether the PR satisfies the linked GitHub issue.
- Always check that Codex did not modify unrelated files.
- Always check that new API routes have validation and tests where appropriate.
- Always check that controllers stay thin.
- Always check that business logic belongs in services.
- Always check that database queries belong in repositories.
- Always check that routes do not contain business logic.
- Always check that password hashes, token hashes, cookies, and JWT behavior are safe.
- Always check that passwords, cookies, raw tokens, refresh tokens, reset tokens, and verification tokens are not logged.
- Always check that secrets and `.env` files were not committed.
- Always check that API success responses and error responses follow the documented formats.

## Security Review Checklist

- Inputs are validated before business logic.
- Protected routes require authentication.
- Role or permission checks are enforced where needed.
- Object-level authorization is enforced for user-owned resources.
- Passwords are hashed before storage.
- Refresh tokens are opaque, hashed before storage, rotated on refresh, and revoked on logout.
- Revoked refresh token reuse is detected and handled safely.
- Cookies use secure settings appropriate to the environment.
- JWT payloads are minimal and do not include sensitive data.
- Error responses do not expose stack traces, database internals, token details, or account existence where that would be unsafe.

## Documentation-Only PRs

For documentation-only PRs:

- Check accuracy against `README.md`, `AGENTS.md`, `docs/product-requirements.md`, `docs/user-stories.md`, `docs/backlog.md`, `docs/sprint-plan.md`, and `docs/technical-decisions.md`.
- Check consistency with the project stack and Sprint plan.
- Check that instructions do not conflict with existing security rules.
- Do not demand tests.
