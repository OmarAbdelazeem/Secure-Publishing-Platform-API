# Product Requirements Document

## Secure Publishing Platform API

## 1. Project Overview

The Secure Publishing Platform API is a production-style backend application built with Node.js, Express, JavaScript, and PostgreSQL.

The main goal of this project is to help the developer master backend engineering fundamentals through a realistic authentication, authorization, and content-management API.

The application will allow users to register, verify their email, log in, manage their sessions, create posts, comment on posts, and perform role-based actions depending on their permissions.

This project is not only an authentication project. It is a complete backend learning project that includes authentication, authorization, database design, API architecture, security, testing, documentation, and deployment practices.

## 2. Goals

The project should help the developer learn and practice:

- Building a real Express backend from scratch.
- Structuring a maintainable Node.js application.
- Implementing secure authentication.
- Implementing refresh tokens and session management.
- Understanding cookies, JWTs, and token-based authentication.
- Building role-based access control.
- Building permission-based authorization.
- Protecting object-level resources.
- Designing database schemas.
- Writing migrations.
- Validating request data.
- Handling errors properly.
- Writing tests.
- Documenting APIs.
- Preparing an app for deployment.

## 3. Technology Stack

### Backend

- Node.js
- Express.js
- JavaScript

### Database

- PostgreSQL

### Database Tooling

- Prisma ORM

### Authentication

- JWT access tokens
- Refresh tokens
- Secure HTTP-only cookies
- Password hashing with bcrypt or argon2

### Validation

- Zod or Joi

### Testing

- Jest or Vitest
- Supertest

### Security

- Helmet
- CORS configuration
- Rate limiting
- Secure cookies
- CSRF protection where needed
- Input validation
- Password hashing
- Token hashing
- Audit logging

### Documentation

- OpenAPI / Swagger

### Development Environment

- Docker Compose
- Environment variables
- Nodemon

### Production Readiness

- Docker
- Health checks
- Structured logging
- Graceful shutdown
- CI-ready scripts

## 4. Target Users

### 4.1 Regular User

A regular user can:

- Register.
- Verify email.
- Log in.
- Log out.
- Read published posts.
- Comment on posts.
- Edit their own comments.
- Delete their own comments.
- View their own profile.
- Update their own profile.

### 4.2 Editor

An editor can:

- Do everything a regular user can do.
- Create posts.
- Edit their own posts.
- Delete their own posts.
- Publish or unpublish their own posts.
- Moderate comments on their own posts.

### 4.3 Admin

An admin can:

- Do everything an editor can do.
- View users.
- Disable users.
- Manage posts.
- Manage comments.
- View basic audit logs.
- Moderate content across the platform.

### 4.4 Super Admin

A super admin can:

- Do everything an admin can do.
- Change user roles.
- Manage admin accounts.
- View all audit logs.
- Perform sensitive system-level actions.

## 5. Core Product Concept

The application is a secure publishing platform.

Users can read posts and write comments.

Editors can create and manage posts.

Admins can manage users and moderate content.

Super admins can manage roles and permissions.

This gives the project real resources to protect, instead of only having login and logout endpoints.

The project should teach the difference between:

- Authentication: “Who is this user?”
- Authorization: “What is this user allowed to do?”
- Object-level authorization: “Can this user perform this action on this exact resource?”

## 6. Functional Requirements

### 6.1 Authentication

#### Register

The system must allow a new user to create an account using:

- Name
- Email
- Password

Rules:

- Email must be unique.
- Password must be securely hashed before storage.
- Raw passwords must never be stored.
- A newly registered user should receive the default role: `user`.
- A newly registered user should not be considered fully verified until email verification is complete.

Acceptance criteria:

- A valid user can register successfully.
- Duplicate emails are rejected.
- Invalid email format is rejected.
- Weak passwords are rejected.
- Password is stored as a hash.
- Response does not expose password hash.

#### Login

The system must allow users to log in using:

- Email
- Password

Rules:

- Password must be compared against the stored password hash.
- A successful login should issue an access token and refresh token.
- Failed login attempts should not reveal whether the email or password was incorrect.
- Login route should be rate-limited.

Acceptance criteria:

- Valid credentials return authenticated session data.
- Invalid credentials return a safe generic error.
- Access token is issued.
- Refresh token is issued.
- Refresh token is stored securely.
- Password hash is never returned.

#### Logout

The system must allow users to log out.

Rules:

- Logout should revoke the active refresh token.
- Auth cookies should be cleared.
- User should no longer be able to refresh using the revoked token.

Acceptance criteria:

- Logged-in user can log out.
- Refresh token becomes invalid after logout.
- Cookies are cleared after logout.
- Accessing protected routes after token expiry requires login again.

#### Refresh Token

The system must support refreshing access tokens.

Rules:

- Access tokens should be short-lived.
- Refresh tokens should be long-lived.
- Refresh tokens should be stored hashed in the database.
- Refresh tokens should rotate on every refresh.
- Reusing an old refresh token should trigger session revocation.

Acceptance criteria:

- Valid refresh token returns a new access token.
- Valid refresh token returns a new refresh token.
- Old refresh token becomes invalid after rotation.
- Reused refresh token is detected.
- Revoked refresh token cannot be used.

#### Forgot Password

The system must allow users to request a password reset.

Rules:

- User submits email.
- Response should be generic whether email exists or not.
- Reset token should be random, secure, hashed in database, and expire after a short time.
- Email sending should be abstracted through a mail service.

Acceptance criteria:

- Existing user can request reset email.
- Non-existing email receives same generic response.
- Reset token is not stored as plain text.
- Reset token expires.
- Reset flow is rate-limited.

#### Reset Password

The system must allow users to reset their password using a valid reset token.

Rules:

- Reset token must be valid.
- Reset token must not be expired.
- Reset token must be single-use.
- New password must be hashed.
- Existing sessions should be revoked after password reset.

Acceptance criteria:

- Valid token allows password reset.
- Expired token is rejected.
- Used token is rejected.
- New password works for login.
- Old password no longer works.
- Existing refresh tokens are revoked.

#### Email Verification

The system must support email verification.

Rules:

- New users receive verification token.
- Verification token should be secure, hashed, and expire.
- Users can request a new verification email.
- Certain actions may require verified email.

Acceptance criteria:

- User can verify email with valid token.
- Expired token is rejected.
- Used token cannot be reused.
- User verification status is updated.
- Verification email can be resent with rate limiting.

#### Current User

The system must provide an endpoint to get the currently authenticated user.

Acceptance criteria:

- Authenticated user can access their profile.
- Unauthenticated request is rejected.
- Response does not expose sensitive fields.

### 6.2 Authorization

### Roles

The system must support these roles:

- `user`
- `editor`
- `admin`
- `super_admin`

### Permissions

The system should support permissions such as:

- `post:read`
- `post:create`
- `post:update`
- `post:delete`
- `comment:create`
- `comment:update`
- `comment:delete`
- `user:read`
- `user:update`
- `user:disable`
- `role:update`
- `audit:read`

### Role Rules

#### User

Can:

- Read posts.
- Create comments.
- Update own comments.
- Delete own comments.
- View own profile.
- Update own profile.

Cannot:

- Create posts.
- Manage users.
- Change roles.
- Access audit logs.

#### Editor

Can:

- Read posts.
- Create posts.
- Update own posts.
- Delete own posts.
- Manage comments on own posts.

Cannot:

- Manage users.
- Change roles.
- Access sensitive admin endpoints.

#### Admin

Can:

- Manage users.
- Disable users.
- Manage posts.
- Manage comments.
- View basic audit logs.

Cannot:

- Change super admin accounts.
- Assign super admin role.
- Remove the last super admin.

#### Super Admin

Can:

- Manage all users.
- Change roles.
- Manage admins.
- View all audit logs.
- Perform sensitive administrative actions.

### 6.3 Object-Level Authorization

The system must protect resources based on ownership and permission.

Examples:

- A user can edit only their own comment.
- An editor can edit only their own post unless they are also an admin.
- An admin can moderate all posts and comments.
- A user cannot access another user’s private profile data.
- A super admin can change roles, but the system should prevent dangerous actions such as removing the last super admin.

Acceptance criteria:

- User cannot edit another user’s comment.
- User cannot delete another user’s post.
- Editor cannot update another editor’s post unless authorized.
- Admin can moderate posts.
- Super admin can change roles.
- Unauthorized access returns proper error response.

### 6.4 User Management

Admin and super admin users should be able to manage users.

Features:

- List users.
- View user details.
- Disable user account.
- Enable user account.
- Update user role.
- View user sessions.
- Revoke user sessions.

Rules:

- Only admins and super admins can view all users.
- Only super admins can change roles.
- Admins cannot promote users to super admin.
- Disabled users cannot log in.
- Disabled users should have active sessions revoked.

Acceptance criteria:

- Admin can list users.
- Regular user cannot list users.
- Super admin can change roles.
- Admin cannot assign super admin role.
- Disabled user cannot log in.
- Disabled user’s sessions are revoked.

### 6.5 Posts

The system must support posts.

Post fields:

- ID
- Author ID
- Title
- Slug
- Content
- Status
- Created at
- Updated at

Post statuses:

- `draft`
- `published`
- `archived`

Features:

- List published posts.
- View single published post.
- Create post.
- Update post.
- Delete post.
- Publish post.
- Archive post.

Rules:

- Anyone can read published posts.
- Only editors, admins, and super admins can create posts.
- Editors can update only their own posts.
- Admins can update all posts.
- Super admins can update all posts.
- Draft posts are visible only to the owner or admins.

Acceptance criteria:

- Public users can read published posts.
- Public users cannot read drafts.
- Editor can create post.
- Editor can update own post.
- Editor cannot update another editor’s post.
- Admin can update any post.
- User cannot create post.

### 6.6 Comments

The system must support comments on posts.

Comment fields:

- ID
- Post ID
- Author ID
- Content
- Status
- Created at
- Updated at

Comment statuses:

- `visible`
- `hidden`
- `deleted`

Features:

- List comments for a post.
- Create comment.
- Update own comment.
- Delete own comment.
- Admin can hide comment.
- Admin can delete comment.

Rules:

- Only authenticated users can comment.
- Users can update their own comments.
- Users can delete their own comments.
- Admins can moderate all comments.
- Editors can moderate comments on their own posts.

Acceptance criteria:

- Authenticated user can comment.
- Unauthenticated user cannot comment.
- User can update own comment.
- User cannot update another user’s comment.
- Editor can moderate comments on own post.
- Admin can moderate all comments.

### 6.7 Sessions

The system must track user sessions using refresh tokens.

Session information:

- User ID
- Refresh token hash
- IP address
- User agent
- Created at
- Expires at
- Revoked at
- Replaced by token ID

Features:

- View current sessions.
- Revoke one session.
- Revoke all other sessions.
- Revoke all sessions after password reset.
- Revoke all sessions after account disable.

Acceptance criteria:

- User can view own sessions.
- User can revoke own session.
- User cannot revoke another user’s session.
- Admin can revoke user sessions.
- Password reset revokes existing sessions.

### 6.8 Audit Logs

The system must record sensitive actions.

Examples:

- User registered.
- User logged in.
- User logged out.
- Password reset requested.
- Password changed.
- Email verified.
- Role changed.
- User disabled.
- Post deleted.
- Comment moderated.
- Refresh token reuse detected.

Audit log fields:

- ID
- Actor ID
- Action
- Target type
- Target ID
- Metadata
- IP address
- User agent
- Created at

Rules:

- Audit logs should be append-only.
- Regular users cannot access audit logs.
- Admins can view basic audit logs.
- Super admins can view all audit logs.

Acceptance criteria:

- Sensitive actions create audit log entries.
- Admin can view allowed logs.
- User cannot view audit logs.
- Audit logs cannot be modified through public API.

## 7. API Requirements

### Auth Routes

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
POST   /api/auth/verify-email
POST   /api/auth/resend-verification
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/change-password
GET    /api/auth/sessions
DELETE /api/auth/sessions/:sessionId
```

### User Routes

```
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
PATCH  /api/users/:id/status
PATCH  /api/users/:id/role
DELETE /api/users/:id/sessions
```

### Post Routes

```
GET    /api/posts
GET    /api/posts/:id
POST   /api/posts
PATCH  /api/posts/:id
DELETE /api/posts/:id
PATCH  /api/posts/:id/publish
PATCH  /api/posts/:id/archive
```

### Comment Routes

```
GET    /api/posts/:postId/comments
POST   /api/posts/:postId/comments
PATCH  /api/comments/:id
DELETE /api/comments/:id
PATCH  /api/comments/:id/hide
```

### Admin Routes

```
GET    /api/admin/audit-logs
GET    /api/admin/stats
```

### System Routes

```
GET    /health
GET    /api/version
```

## 8. Database Requirements

The database should include the following tables:

- users
- roles
- permissions
- role_permissions
- refresh_tokens
- email_verification_tokens
- password_reset_tokens
- posts
- comments
- audit_logs

## 9. Suggested Database Models

### User

Fields:

- id
- name
- email
- password_hash
- email_verified_at
- role_id
- status
- created_at
- updated_at

Statuses:

- `active`
- `disabled`

### Role

Fields:

- id
- name
- created_at
- updated_at

### Permission

Fields:

- id
- action
- resource
- created_at
- updated_at

### RolePermission

Fields:

- id
- role_id
- permission_id

### RefreshToken

Fields:

- id
- user_id
- token_hash
- expires_at
- revoked_at
- replaced_by_token_id
- ip_address
- user_agent
- created_at

### EmailVerificationToken

Fields:

- id
- user_id
- token_hash
- expires_at
- used_at
- created_at

### PasswordResetToken

Fields:

- id
- user_id
- token_hash
- expires_at
- used_at
- created_at

### Post

Fields:

- id
- author_id
- title
- slug
- content
- status
- created_at
- updated_at

### Comment

Fields:

- id
- post_id
- author_id
- content
- status
- created_at
- updated_at

### AuditLog

Fields:

- id
- actor_id
- action
- target_type
- target_id
- metadata
- ip_address
- user_agent
- created_at

## 10. Security Requirements

The application must follow these security rules:

- Passwords must be hashed.
- Raw passwords must never be logged.
- Raw passwords must never be returned in API responses.
- Refresh tokens must be stored hashed.
- Reset password tokens must be stored hashed.
- Email verification tokens must be stored hashed.
- Access tokens must have short expiration.
- Refresh tokens must rotate.
- Sensitive routes must be rate-limited.
- Login errors must not reveal whether email exists.
- Forgot password response must not reveal whether email exists.
- Secure cookies must use `httpOnly`.
- Production cookies must use `secure`.
- CORS must be restricted to allowed origins.
- Request bodies must be validated.
- Unknown fields should be rejected where appropriate.
- Object-level authorization must be checked.
- Admin actions must be logged.
- Sensitive errors must not expose stack traces in production.
- Environment variables must be validated at startup.
- Secrets must never be committed to source control.

## 11. Validation Requirements

All incoming request bodies, params, and query strings must be validated.

Examples:

Register request:

- Name is required.
- Email must be valid.
- Password must meet strength rules.

Login request:

- Email is required.
- Password is required.

Create post request:

- Title is required.
- Content is required.
- Status must be valid.

Update role request:

- Role must be one of the allowed roles.
- Only super admin can perform the action.

## 12. Error Handling Requirements

The API should return consistent error responses.

Example error response:

```json
{
"success": false,
"message": "Invalid credentials",
"code": "INVALID_CREDENTIALS"
}
```

Example validation error response:

```json
{
"success": false,
"message": "Validation failed",
"code": "VALIDATION_ERROR",
"errors": [
{
"field": "email",
"message": "Email must be valid"
}
]
}
```

Rules:

- Use proper HTTP status codes.
- Do not leak internal error details.
- Use centralized error middleware.
- Log unexpected errors.
- Return safe messages to clients.

## 13. Logging Requirements

The application should use structured logging.

Logs should include:

- Request ID
- Method
- URL
- Status code
- Response time
- User ID when available
- IP address
- Error message
- Error stack in development only

Sensitive values must not be logged:

- Passwords
- Raw tokens
- Authorization headers
- Cookies
- Reset tokens
- Verification tokens

## 14. Testing Requirements

The project must include automated tests.

### Authentication Tests

- Register user.
- Reject duplicate email.
- Reject weak password.
- Login with valid credentials.
- Reject invalid credentials.
- Refresh access token.
- Reject revoked refresh token.
- Logout revokes refresh token.
- Forgot password returns generic response.
- Reset password changes password.
- Reset token cannot be reused.
- Email verification works.
- Expired verification token fails.

### Authorization Tests

- User cannot access admin routes.
- Editor can create posts.
- User cannot create posts.
- Editor can edit own post.
- Editor cannot edit another editor’s post.
- Admin can manage posts.
- Super admin can change roles.
- Admin cannot assign super admin role.
- User cannot edit another user’s comment.

### API Tests

- Invalid request body returns validation error.
- Missing auth token returns unauthorized error.
- Invalid auth token returns unauthorized error.
- Unknown route returns 404.
- Health route returns success.

## 15. Documentation Requirements

The project should include API documentation using OpenAPI or Swagger.

Documentation should include:

- Auth routes.
- User routes.
- Post routes.
- Comment routes.
- Admin routes.
- Request body examples.
- Response examples.
- Error examples.
- Authentication requirements.
- Role requirements.

The README should include:

- Project overview.
- Tech stack.
- Setup instructions.
- Environment variables.
- Database setup.
- Migration commands.
- Seed commands.
- Test commands.
- API documentation URL.
- Deployment notes.

## 16. Environment Variables

The application should use environment variables for configuration.

Examples:

```
NODE_ENV
PORT
DATABASE_URL
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN
COOKIE_SECRET
CLIENT_URL
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
EMAIL_FROM
BCRYPT_SALT_ROUNDS
```

Environment variables should be validated when the application starts.

If required variables are missing, the app should fail fast with a clear error.

## 17. Folder Structure

The project should use a modular structure.

```
src/
  app.js
  server.js
  config/
    env.js
    database.js
    cors.js
  modules/
    auth/
      auth.routes.js
      auth.controller.js
      auth.service.js
      auth.repository.js
      auth.validation.js
    users/
      users.routes.js
      users.controller.js
      users.service.js
      users.repository.js
      users.validation.js
    roles/
      roles.routes.js
      roles.service.js
      permissions.js
    posts/
      posts.routes.js
      posts.controller.js
      posts.service.js
      posts.repository.js
      posts.validation.js
    comments/
      comments.routes.js
      comments.controller.js
      comments.service.js
      comments.repository.js
      comments.validation.js
    audit/
      audit.routes.js
      audit.service.js
      audit.repository.js
  middlewares/
    authenticate.js
    authorize.js
    validate.js
    error-handler.js
    not-found.js
    rate-limit.js
    request-id.js
  utils/
    jwt.js
    password.js
    crypto.js
    email.js
    logger.js
    cookies.js
  prisma/
    schema.prisma
  tests/
```

## 18. Non-Functional Requirements

### Performance

- API should respond quickly for common requests.
- Database queries should use indexes where needed.
- Pagination should be used for list endpoints.
- Avoid returning large unpaginated datasets.

### Reliability

- App should handle unexpected errors gracefully.
- App should shut down gracefully.
- Database connection errors should be handled.
- Health check route should exist.

### Maintainability

- Business logic should not live directly inside route files.
- Reusable logic should be extracted.
- Controllers should stay thin.
- Services should contain business rules.
- Repositories should contain database access logic.
- Middlewares should handle cross-cutting concerns.

### Security

- Secure defaults should be used.
- Sensitive operations should be audited.
- Tokens should be handled carefully.
- Role and permission checks should be centralized.

## 19. Milestones

### Milestone 1: Project Setup

Deliverables:

- Express app setup.
- JavaScript project structure.
- Environment config.
- Health route.
- Error handler.
- 404 handler.
- Request logger.
- Basic README.

Learning outcome:

- Understand Express app structure and middleware flow.

### Milestone 2: Database Setup

Deliverables:

- PostgreSQL setup.
- Prisma setup.
- Initial schema.
- User and role models.
- Migrations.
- Seed roles and permissions.

Learning outcome:

- Understand database modeling, migrations, and seed scripts.

### Milestone 3: Basic Auth

Deliverables:

- Register endpoint.
- Login endpoint.
- Password hashing.
- JWT access token.
- Auth middleware.
- Current user endpoint.

Learning outcome:

- Understand authentication basics.

### Milestone 4: Refresh Tokens and Sessions

Deliverables:

- Refresh token model.
- Refresh endpoint.
- Token rotation.
- Logout endpoint.
- Session listing.
- Session revocation.

Learning outcome:

- Understand real-world token session management.

### Milestone 5: Email Verification

Deliverables:

- Verification token generation.
- Resend verification endpoint.
- Verify email endpoint.
- Email service abstraction.

Learning outcome:

- Understand token-based verification flows.

### Milestone 6: Forgot and Reset Password

Deliverables:

- Forgot password endpoint.
- Reset password endpoint.
- Reset token hashing.
- Session invalidation after password reset.

Learning outcome:

- Understand secure password reset flows.

### Milestone 7: RBAC

Deliverables:

- Role model.
- Permission model.
- Authorization middleware.
- Admin-only routes.
- Super-admin-only role update route.

Learning outcome:

- Understand roles, permissions, and authorization middleware.

### Milestone 8: Posts and Comments

Deliverables:

- Post CRUD.
- Comment CRUD.
- Ownership checks.
- Admin moderation.
- Editor permissions.

Learning outcome:

- Understand object-level authorization.

### Milestone 9: Audit Logs

Deliverables:

- Audit log model.
- Audit log service.
- Log sensitive actions.
- Admin audit log route.

Learning outcome:

- Understand traceability and security monitoring.

### Milestone 10: Testing

Deliverables:

- Auth tests.
- RBAC tests.
- Object-level authorization tests.
- Validation tests.
- Error handling tests.

Learning outcome:

- Understand backend testing and security regression testing.

### Milestone 11: API Documentation

Deliverables:

- Swagger/OpenAPI setup.
- Documented endpoints.
- Request and response examples.
- Auth documentation.

Learning outcome:

- Understand API documentation and contracts.

### Milestone 12: Production Readiness

Deliverables:

- Dockerfile.
- Docker Compose.
- Production environment config.
- Health checks.
- Graceful shutdown.
- Deployment-ready README.

Learning outcome:

- Understand how to prepare a backend app for deployment.

## 20. Success Criteria

The project is successful when:

- Users can register, verify email, log in, refresh sessions, and log out.
- Password reset works securely.
- JWT access tokens work.
- Refresh token rotation works.
- Refresh token reuse is detected.
- Roles and permissions are enforced.
- Object ownership is enforced.
- Users cannot access unauthorized resources.
- Admins can manage users and content.
- Super admins can manage roles.
- Sensitive actions are logged.
- API has validation and consistent errors.
- Tests cover major auth and authorization flows.
- API is documented.
- App can run locally with Docker Compose.
- App is ready for deployment.

## 21. Out of Scope for Version 1

The first version will not include:

- Frontend application.
- Real payment system.
- Real-time chat.
- File uploads.
- Social login.
- Two-factor authentication.
- Multi-tenant organizations.
- Background job queue.
- Advanced search.
- Notification system.

These can be added later after the core backend is complete.

## 22. Future Enhancements

After version 1, the project can be extended with:

- Two-factor authentication.
- OAuth login with Google or GitHub.
- File uploads for avatars and post images.
- Background jobs for email sending.
- Redis for token/session caching.
- Advanced permission system.
- Organization/team-based access control.
- API versioning.
- Webhooks.
- Notification system.
- Full admin dashboard frontend.
- Observability with metrics and tracing.

## 23. Learning Philosophy

This project should be built slowly and intentionally.

The goal is not only to make the endpoints work.

The goal is to understand why each decision exists:

- Why we hash passwords.
- Why we use short-lived access tokens.
- Why refresh tokens should rotate.
- Why cookies need security flags.
- Why validation belongs before business logic.
- Why authorization must check the exact resource.
- Why route files should not contain all business logic.
- Why tests are important for auth systems.
- Why production apps need logging and error handling.

This project should be treated as a real backend system, not a quick tutorial.

## 24. Final Product Name

Recommended project name:

```
secure-publishing-api
```

Alternative names:

```
auth-rbac-express-api
secure-content-api
node-authz-platform
express-security-api
```

Recommended name:

```
secure-publishing-api
```
