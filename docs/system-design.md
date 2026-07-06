# Secure Publishing Platform API

## System Design Document

## 1. System Overview

The Secure Publishing Platform API is a production-style backend system built with Node.js, Express.js, JavaScript, PostgreSQL, and Prisma. The system provides:

- User registration
- Login/logout
- JWT authentication
- Refresh token sessions
- Email verification
- Forgot/reset password
- Role-based access control
- Permission-based authorization
- User management
- Posts
- Comments
- Object-level authorization
- Audit logging
- API validation
- Testing
- API documentation
- Docker-based development and deployment readiness

The main purpose of this backend is to teach real-world backend architecture, not only basic Express routing.

## 2. High-Level Architecture

The backend follows a layered architecture.

```
Client
  |
  v
Express App
  |
  v
Global Middleware
  |
  v
Route Middleware
  |
  v
Routes
  |
  v
Controllers
  |
  v
Services
  |
  v
Repositories
  |
  v
Prisma ORM
  |
  v
PostgreSQL Database
```

Each layer has one clear responsibility.

## 3. Main Components

### 3.1 Client

The client can be:

- Frontend web app
- Mobile app
- Postman
- Thunder Client
- curl
- Admin dashboard in the future

The client sends HTTP requests to the API. Example:

```
POST /api/auth/login
GET /api/posts
POST /api/posts
PATCH /api/users/:id/role
```

### 3.2 Express Application

The Express app handles:

- Routing
- Middleware execution
- Request parsing
- Error handling
- Security headers
- CORS
- Cookies
- API response formatting

The Express app is created in:

```
src/app.js
```

The server startup is handled separately in:

```
src/server.js
```

This separation is important because tests can import the app without starting the actual HTTP server.

### 3.3 Global Middleware

Global middleware runs before route-specific logic. Global middleware includes:

- JSON body parser
- Cookie parser
- Request ID middleware
- Request logger
- Helmet security headers
- CORS
- Rate limiting where needed
- Request size limits

Example flow:

```
Request
  ↓
Parse JSON body
  ↓
Attach request ID
  ↓
Log request
  ↓
Apply security headers
  ↓
Apply CORS
  ↓
Route handler
```

### 3.4 Routes

Routes define the API endpoints. Routes should not contain business logic. Example route responsibility:

```
router.post(
  "/register",
  validate(registerSchema),
  authController.register
);
```

The route decides:

- URL path
- HTTP method
- Middleware stack
- Controller function

Routes live inside module folders. Example:

```
src/modules/auth/auth.routes.js
src/modules/users/users.routes.js
src/modules/posts/posts.routes.js
src/modules/comments/comments.routes.js
```

### 3.5 Controllers

Controllers handle HTTP-specific logic. A controller should:

- Read request data
- Call the correct service
- Send the response
- Avoid business logic
- Avoid direct database queries

Example responsibility:

```
Controller receives req.body
Controller calls authService.register()
Controller sends success response
```

Controllers should stay thin.

### 3.6 Services

Services contain business logic. A service handles rules like:

- Can this user register?
- Is this password valid?
- Should this refresh token be rotated?
- Can this editor update this post?
- Should this user’s sessions be revoked?
- Should an audit log be created?

Services can call:

- Repositories
- Utilities
- Other services

Most important backend thinking happens in the service layer.

### 3.7 Repositories

Repositories handle database access. A repository should:

- Query the database
- Create records
- Update records
- Delete records
- Hide Prisma query details from services

Example:

```
authRepository.findUserByEmail()
authRepository.createUser()
postRepository.findPostById()
commentRepository.updateComment()
```

Repositories should not decide business rules. They only perform data access.

### 3.8 Prisma ORM

Prisma is used as the database access layer. Responsibilities:

- Define database models
- Generate Prisma Client
- Run migrations
- Enforce relations
- Query PostgreSQL

Prisma schema file:

```
prisma/schema.prisma
```

### 3.9 PostgreSQL Database

PostgreSQL stores the application data. Main tables:

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

PostgreSQL is the source of truth.

## 4. Folder Structure

Recommended folder structure:

```
src/
  app.js
  server.js
  config/
    env.js
    database.js
    cors.js
    cookies.js
  middlewares/
    authenticate.js
    authorize.js
    validate.js
    error-handler.js
    not-found.js
    request-id.js
    rate-limit.js
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
      audit.controller.js
      audit.service.js
      audit.repository.js
  utils/
    app-error.js
    async-handler.js
    response.js
    password.js
    jwt.js
    crypto.js
    logger.js
    pagination.js
    sanitize-user.js
prisma/
  schema.prisma
  seed.js
tests/
  integration/
  helpers/
```

## 5. Request Lifecycle

Every request follows this general flow:

1. Client sends HTTP request
2. Express receives request
3. Global middleware runs
4. Route is matched
5. Route-specific middleware runs
6. Validation middleware validates input
7. Authentication middleware checks user identity
8. Authorization middleware checks permissions
9. Controller receives request
10. Controller calls service
11. Service applies business rules
12. Repository queries database
13. Service returns result
14. Controller sends response
15. Error handler catches errors if needed

Example protected request:

```
PATCH /api/posts/123
Request
  ↓
JSON parser
  ↓
Request ID
  ↓
Logger
  ↓
Route match
  ↓
Validate params/body
  ↓
Authenticate user
  ↓
Authorize post:update permission
  ↓
Controller
  ↓
Post service
  ↓
Check post ownership
  ↓
Post repository
  ↓
Database
  ↓
Response
```

## 6. Authentication Design

The system uses:

- Short-lived JWT access tokens
- Long-lived refresh tokens
- HTTP-only refresh token cookies
- Refresh token rotation
- Refresh token hashing in the database

### 6.1 Access Token

The access token is a JWT. Purpose:

- Authenticate API requests
- Prove user identity
- Avoid querying session table on every request

Recommended expiration:

```
15 minutes
```

Example payload:

```
{
  "sub": "user_id",
  "role": "user",
  "iat": 123456789,
  "exp": 123456999
}
```

The access token should not contain:

- Password hash
- Email verification token
- Reset token
- Refresh token
- Sensitive profile data

### 6.2 Refresh Token

The refresh token is a secure random token. Purpose:

- Get a new access token after the access token expires
- Keep the user logged in
- Represent a user session

Refresh tokens are stored in the database as hashes. The raw refresh token is only sent to the client in an HTTP-only cookie. Recommended expiration:

```
7 to 30 days
```

### 6.3 Login Flow

```
User submits email and password
  ↓
Validate input
  ↓
Find user by email
  ↓
Check user exists
  ↓
Check user is not disabled
  ↓
Compare password with password hash
  ↓
Generate access token
  ↓
Generate refresh token
  ↓
Hash refresh token
  ↓
Store refresh token session in database
  ↓
Set refresh token cookie
  ↓
Return access token and safe user data
```

### 6.4 Refresh Token Flow

```
Client calls POST /api/auth/refresh
  ↓
Server reads refresh token cookie
  ↓
Hash incoming refresh token
  ↓
Find token hash in database
  ↓
Check token exists
  ↓
Check token is not expired
  ↓
Check token is not revoked
  ↓
Generate new access token
  ↓
Generate new refresh token
  ↓
Hash new refresh token
  ↓
Store new refresh token
  ↓
Revoke old refresh token
  ↓
Set new refresh token cookie
  ↓
Return new access token
```

### 6.5 Refresh Token Reuse Detection

If a revoked refresh token is used again, this may mean the token was stolen. Flow:

```
Revoked refresh token is submitted
  ↓
System detects token was already revoked
  ↓
System treats it as suspicious
  ↓
System revokes related active tokens
  ↓
System creates audit log
  ↓
User must log in again
```

This teaches an important production security concept: refresh tokens should not simply be long-lived static tokens.

### 6.6 Logout Flow

```
Client calls POST /api/auth/logout
  ↓
Server reads refresh token cookie
  ↓
Hash token
  ↓
Find token record
  ↓
Mark refresh token as revoked
  ↓
Clear refresh token cookie
  ↓
Create audit log
  ↓
Return success response
```

Logout does not magically invalidate an already issued access token unless we add access-token blocklisting. Instead, access tokens expire quickly.

### 6.7 Current User Flow

```
Client calls GET /api/auth/me
  ↓
Authentication middleware verifies access token
  ↓
System loads user from database
  ↓
System checks user is active
  ↓
Controller returns safe user profile
```

## 7. Authorization Design

Authentication answers:

```
Who is this user?
```

Authorization answers:

```
What is this user allowed to do?
```

Object-level authorization answers:

```
Can this user perform this action on this exact resource?
```

### 7.1 Roles

The system has four roles:

```
user
editor
admin
super_admin
```

### 7.2 Permissions

Example permissions:

```
post:read
post:create
post:update
post:delete
comment:create
comment:update
comment:delete
comment:moderate
user:read
user:update
user:disable
role:update
audit:read
```

### 7.3 Role-Permission Mapping

```
user
  - post:read
  - comment:create
  - comment:update_own
  - comment:delete_own
editor
  - post:read
  - post:create
  - post:update_own
  - post:delete_own
  - comment:create
  - comment:update_own
  - comment:delete_own
  - comment:moderate_own_posts
admin
  - post:read
  - post:create
  - post:update
  - post:delete
  - comment:create
  - comment:update
  - comment:delete
  - comment:moderate
  - user:read
  - user:update
  - user:disable
  - audit:read_basic
super_admin
  - all admin permissions
  - role:update
  - audit:read_all
  - admin:manage
```

We can implement this either as:

```
role → permissions
```

or:

```
role → permissions + ownership policy
```

For this project, we should use both:

- Permissions for general access
- Ownership checks for specific resources
- •
- •

### 7.4 Authorization Middleware

Example route:

```
router.post(
  "/posts",
  authenticate,
  requireVerifiedEmail,
  authorize("post:create"),
  validate(createPostSchema),
  postController.createPost
);
```

Flow:

```
Check user is authenticated
  ↓
Check user has required permission
  ↓
Allow request to continue
```

### 7.5 Object-Level Authorization

Object-level authorization happens inside services because the service can load the specific resource. Example:

```
PATCH /api/posts/:id
```

The middleware can check:

```
Does user have post:update permission?
```

But the service must check:

```
Is this post owned by this editor?
Or is the user an admin?
```

Example rule:

```
Editor can update own post.
Admin can update any post.
User cannot update posts.
```

## 8. Database Design

### 8.1 Entity Relationship Overview

```
User
  belongs to Role
Role
  has many RolePermissions
Permission
  has many RolePermissions
User
  has many RefreshTokens
  has many EmailVerificationTokens
  has many PasswordResetTokens
  has many Posts
  has many Comments
  has many AuditLogs as actor
Post
  belongs to User as author
  has many Comments
Comment
  belongs to User as author
  belongs to Post
AuditLog
  optionally belongs to User as actor
```

### 8.2 Main Tables

### users

Stores user accounts. Fields:

```
id
name
email
password_hash
email_verified_at
role_id
status
created_at
updated_at
```

Important constraints:

```
email unique
role_id foreign key
```

Indexes:

```
email
role_id
status
created_at
```

### roles

Stores role names. Fields:

```
id
name
created_at
updated_at
```

Example values:

```
user
editor
admin
super_admin
```

### permissions

Stores permission records. Fields:

```
id
action
resource
created_at
updated_at
```

Example:

```
action: create
resource: post
```

or combined as:

```
name: post:create
```

For simplicity, we can use one name  field:

```
post:create
user:disable
role:update
```

### role_permissions

Connects roles and permissions. Fields:

```
id
role_id
permission_id
```

This allows a role to have many permissions.

### refresh_tokens

Stores refresh token sessions. Fields:

```
id
user_id
token_hash
expires_at
revoked_at
replaced_by_token_id
ip_address
user_agent
created_at
```

Important indexes:

```
token_hash
user_id
expires_at
revoked_at
```

### email_verification_tokens

Stores email verification tokens. Fields:

```
id
user_id
token_hash
expires_at
used_at
created_at
```

Important indexes:

```
token_hash
user_id
expires_at
```

### password_reset_tokens

Stores password reset tokens. Fields:

```
id
user_id
token_hash
expires_at
used_at
created_at
```

Important indexes:

```
token_hash
user_id
expires_at
```

### posts

Stores publishing content. Fields:

```
id
author_id
title
slug
content
status
created_at
updated_at
```

Statuses:

```
draft
published
archived
deleted
```

Important indexes:

```
author_id
slug
status
created_at
```

### comments

Stores comments on posts. Fields:

```
id
post_id
author_id
content
status
created_at
updated_at
```

Statuses:

```
visible
hidden
deleted
```

Important indexes:

```
post_id
author_id
status
created_at
```

### audit_logs

Stores sensitive system actions. Fields:

```
id
actor_id
action
target_type
target_id
metadata
ip_address
user_agent
created_at
```

Important indexes:

```
actor_id
action
target_type
target_id
created_at
```

## 9. API Design

### 9.1 Auth Routes

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

### 9.2 User Routes

```
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/me
PATCH  /api/users/:id/status
PATCH  /api/users/:id/role
DELETE /api/users/:id/sessions
```

### 9.3 Post Routes

```
GET    /api/posts
GET    /api/posts/:id
POST   /api/posts
PATCH  /api/posts/:id
DELETE /api/posts/:id
PATCH  /api/posts/:id/publish
PATCH  /api/posts/:id/archive
```

### 9.4 Comment Routes

```
GET    /api/posts/:postId/comments
POST   /api/posts/:postId/comments
PATCH  /api/comments/:id
DELETE /api/comments/:id
PATCH  /api/comments/:id/hide
```

### 9.5 Admin Routes

```
GET    /api/admin/audit-logs
GET    /api/admin/stats
```

### 9.6 System Routes

```
GET    /health
GET    /api/version
```

## 10. API Response Design

### 10.1 Success Response

Standard shape:

```
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

Example:

```
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "Ali",
      "email": "ali@example.com",
      "role": "user"
    },
    "accessToken": "jwt_access_token"
  }
}
```

### 10.2 Error Response

Standard shape:

```
{
  "success": false,
  "message": "Invalid credentials",
  "code": "INVALID_CREDENTIALS"
}
```

Validation error:

```
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

### 10.3 Paginated Response

```
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 100,
      "totalPages": 10,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

## 11. Security Design

### 11.1 Password Security

Rules:

- Never store raw passwords.
- Never log raw passwords.
- Never return password hash.
- Use bcrypt or argon2.
- Use strong password validation.
- Revoke sessions after password reset.
- Revoke other sessions after password change.

### 11.2 Token Security

Rules:

- Access tokens are short-lived.
- Refresh tokens are long-lived but rotated.
- Refresh tokens are stored hashed.
- Reset tokens are stored hashed.
- Verification tokens are stored hashed.
- Raw tokens should not be logged.
- Token reuse should be detected.

### 11.3 Cookie Security

Refresh token cookie should use:

```
httpOnly: true
secure: true in production
sameSite: lax or strict
```

Purpose:

- httpOnly  prevents JavaScript access.
- secure  ensures HTTPS-only cookies in production.
- sameSite  helps reduce CSRF risk.

### 11.4 CORS

CORS should be configured using environment variables. Development example:

```
CLIENT_URL=http://localhost:3000
```

Production should not use wildcard origin with credentials.

### 11.5 CSRF

Because refresh tokens are stored in cookies, we need a CSRF strategy for state-changing routes. Possible strategy:

```
Use HTTP-only refresh token cookie
Use access token in Authorization header
Only refresh/logout endpoints rely on cookies
Use SameSite=Lax or Strict
Optionally add CSRF token for cookie-based state-changing endpoints
```

For this project, the safest educational approach is:

```
Access token in Authorization header
Refresh token in HTTP-only cookie
CSRF protection for refresh/logout if needed
Strict CORS
SameSite cookie protection
```

### 11.6 Rate Limiting

Rate-limit sensitive routes:

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/resend-verification
```

Purpose:

- Reduce brute force attacks
- Reduce email spam
- Reduce token guessing attempts

### 11.7 Sensitive Data Redaction

Never return or log:

```
password
password_hash
raw access token in logs
raw refresh token
refresh token hash
reset token
reset token hash
verification token
verification token hash
cookies
authorization header
```

## 12. Validation Design

Every input should be validated before reaching business logic. Validate:

```
req.body
req.params
req.query
```

Example validation layers:

```
Route
  ↓
validate(schema)
  ↓
authenticate
  ↓
authorize
  ↓
controller
```

Validation examples:

- Register body
- Login body
- Reset password body
- Update user role body
- Create post body
- Update comment body
- Pagination query
- ID params

Recommended library:

```
Zod
```

## 13. Error Handling Design

The app uses centralized error handling. Error flow:

```
Service throws AppError
  ↓
asyncHandler catches error
  ↓
Express forwards error
  ↓
errorHandler formats response
  ↓
Client receives consistent error
```

Types of errors:

```
ValidationError
UnauthorizedError
ForbiddenError
NotFoundError
ConflictError
TooManyRequestsError
InternalServerError
```

HTTP status examples:

```
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
429 Too Many Requests
500 Internal Server Error
```

Production rule:

```
Never expose stack traces in production.
```

## 14. Logging and Audit Design

### 14.1 Application Logs

Application logs are for developers and operations. Log:

- Request ID
- HTTP method
- URL
- Status code
- Response time
- User ID when available
- Error message
- Stack trace in development only

Do not log:

- Passwords
- Raw tokens
- Cookies
- Authorization headers

### 14.2 Audit Logs

Audit logs are business/security records. Audit sensitive actions:

```
user.registered
user.login
user.logout
user.email_verified
password.reset_requested
password.reset_completed
password.changed
session.revoked
refresh_token.reuse_detected
user.disabled
user.enabled
role.changed
post.created
post.updated
post.deleted
post.published
post.archived
comment.hidden
comment.deleted
```

Audit logs should be append-only through the public API.

## 15. Deployment Design

### 15.1 Local Development

Local development uses:

```
Node.js app
PostgreSQL via Docker Compose
.env file
Prisma migrations
Prisma seed
```

Local flow:

```
docker compose up -d
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

### 15.2 Production Deployment

Production deployment should use:

```
Docker image
PostgreSQL managed database or server database
Environment variables
HTTPS
Secure cookies
Restricted CORS
Database migrations before app start
Structured logging
Health checks
```

### 15.3 Health Check

Health endpoint:

```
GET /health
```

Response:

```
{
  "success": true,
  "message": "API is healthy",
  "data": {
    "status": "ok",
    "environment": "development"
  }
}
```

This endpoint should not expose sensitive data.

### 15.4 Graceful Shutdown

When the app receives shutdown signals:

```
SIGTERM
SIGINT
```

It should:

```
Stop accepting new requests
Wait for active requests where possible
Close HTTP server
Disconnect Prisma
Log shutdown result
Exit process
```

## 16. Scalability Design

This project starts as a monolithic backend. That is the right choice for learning.

```
One Express app
One PostgreSQL database
One codebase
Modular internal structure
```

The app can later scale by:

- Adding Redis for rate limiting/session caching
- Moving email sending to background jobs
- Adding queue workers
- Adding read replicas
- Adding file storage service
- Splitting admin APIs if needed
- Adding caching for public posts

But Version 1 should stay simple and well-structured.

## 17. Future Architecture Enhancements

Future improvements:

```
Redis
Background jobs
Email queue
OAuth login
Two-factor authentication
File uploads
Cloud storage
Metrics
Distributed tracing
API versioning
Webhooks
Admin dashboard frontend
```

These are intentionally out of scope for Version 1.

## 18. Key Design Decisions

### 18.1 JavaScript Instead of TypeScript

The project uses JavaScript because the goal is to practice JavaScript deeply. To keep the code production-style, we will use:

- Clear folder structure
- Strong validation
- JSDoc where useful
- Tests
- Consistent error handling
- Clean service/repository separation

### 18.2 Modular Monolith

The system is a modular monolith. Meaning:

```
One app, but organized by modules.
```

Modules:

```
auth
users
roles
posts
comments
audit
```

This gives us clean architecture without the complexity of microservices.

### 18.3 Access Token + Refresh Token

We use two tokens because:

```
Access token = short-lived identity proof
Refresh token = long-lived session
```

This gives better security than one long-lived JWT.

### 18.4 HTTP-Only Refresh Token Cookie

Refresh token is stored in an HTTP-only cookie because it should not be readable by JavaScript. This reduces token theft risk from XSS.

### 18.5 Hashed Refresh Tokens

Refresh tokens are stored hashed in the database. Reason:

```
If database leaks, attackers should not get usable refresh tokens.
```

### 18.6 Service Layer Authorization

Some authorization happens in middleware. But object-level authorization happens in services because the service can load the resource from the database. Example:

```
Middleware checks: user has post:update
Service checks: this is the user's own post
```

## 19. Example End-to-End Flows

### 19.1 Register and Verify Email

```
POST /api/auth/register
  ↓
Validate input
  ↓
Hash password
  ↓
Create user with role=user
  ↓
Generate verification token
  ↓
Hash verification token
  ↓
Store token
  ↓
Send verification email
  ↓
Return safe user response
POST /api/auth/verify-email
  ↓
Validate token
  ↓
Hash token
  ↓
Find matching token
  ↓
Check expiration
  ↓
Check used_at
  ↓
Update user.email_verified_at
  ↓
Mark token used
  ↓
Return success
```

### 19.2 Login and Refresh Session

```
POST /api/auth/login
  ↓
Validate credentials
  ↓
Compare password
  ↓
Create access token
  ↓
Create refresh token
  ↓
Hash refresh token
  ↓
Store refresh token
  ↓
Set refresh cookie
  ↓
Return access token
POST /api/auth/refresh
  ↓
Read refresh cookie
  ↓
Hash token
  ↓
Find token
  ↓
Validate token
  ↓
Rotate token
  ↓
Return new access token
```

### 19.3 Editor Creates Post

```
POST /api/posts
  ↓
Authenticate user
  ↓
Require verified email
  ↓
Authorize post:create
  ↓
Validate body
  ↓
Create post
  ↓
Attach author_id from authenticated user
  ↓
Create audit log
  ↓
Return post
```

### 19.4 Editor Updates Own Post

```
PATCH /api/posts/:id
  ↓
Authenticate user
  ↓
Authorize post:update
  ↓
Validate params and body
  ↓
Load post
  ↓
Check if post.author_id === user.id
  ↓
If yes, update post
  ↓
If no, check if user is admin
  ↓
If not admin, reject
  ↓
Create audit log
  ↓
Return updated post
```

### 19.5 User Updates Own Comment

```
PATCH /api/comments/:id
  ↓
Authenticate user
  ↓
Validate body
  ↓
Load comment
  ↓
Check comment.author_id === user.id
  ↓
If yes, update comment
  ↓
If no, check admin/moderator permission
  ↓
If unauthorized, reject
  ↓
Return updated comment
```

## 20. System Design Summary

The Secure Publishing Platform API is designed as a modular Express backend with production-style practices. The system uses:

```
Express for HTTP routing
Middleware for cross-cutting concerns
Controllers for HTTP handling
Services for business logic
Repositories for database access
Prisma for ORM and migrations
PostgreSQL for persistent data
JWT for access tokens
Refresh tokens for sessions
Cookies for refresh token storage
RBAC for route-level authorization
Ownership checks for object-level authorization
Audit logs for sensitive actions
Validation for safe input handling
Centralized errors for consistent API responses
Docker for development and deployment readiness
```

The most important learning outcome is understanding that a real backend is not just routes and database queries. A production backend must carefully handle:

```
Authentication
Authorization
Validation
Security
Data modeling
Error handling
Logging
Testing
Documentation
Deployment
```

This system design gives us the blueprint we will follow when we start coding the project.
