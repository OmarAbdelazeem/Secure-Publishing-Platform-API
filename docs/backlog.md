# Secure Publishing Platform API

**Product Backlog / Build Checklist**

## Project Stack

- Node.js
- Express.js
- JavaScript
- PostgreSQL
- Prisma
- JWT
- Refresh tokens
- HTTP-only cookies
- Zod or Joi
- Jest or Vitest
- Supertest
- Swagger/OpenAPI
- Docker

## Phase 0: Planning and Decisions

### 0.1 Finalize Core Decisions

- [ ] Decide project name.
- [ ] Decide package manager: npm, pnpm, or yarn.
- [ ] Decide validation library: Zod or Joi.
- [ ] Decide test runner: Jest or Vitest.
- [ ] Decide password hashing library: bcrypt or argon2.
- [ ] Decide token transport strategy:
- [ ] Access token in response body or cookie.
- [ ] Refresh token in HTTP-only cookie.
- [ ] Decide API response format.
- [ ] Decide error response format.
- [ ] Decide password strength rules.
- [ ] Decide email verification policy:
- [ ] Required before commenting?
- [ ] Required before creating posts?
- [ ] Decide whether post deletion is soft delete or hard delete.
- [ ] Decide whether comment deletion is soft delete or hard delete.

## Phase 1: Project Foundation

### 1.1 Initialize Project

- [ ] Create project folder.
- [ ] Initialize package.json.
- [ ] Install Express.
- [ ] Install development tools.
- [ ] Create src folder.
- [ ] Create app.js.
- [ ] Create server.js.
- [ ] Separate Express app from server startup.
- [ ] Add development script.
- [ ] Add production start script.

### 1.2 Configure Environment Variables

- [ ] Install dotenv.
- [ ] Create .env.
- [ ] Create .env.example.
- [ ] Add .env to .gitignore.
- [ ] Create src/config/env.js.
- [ ] Load environment variables.
- [ ] Validate required environment variables.
- [ ] Fail fast if required variables are missing.

### 1.3 Basic Middleware

- [ ] Add JSON body parser.
- [ ] Add URL-encoded body parser if needed.
- [ ] Add cookie parser.
- [ ] Add request ID middleware.
- [ ] Add request logger.
- [ ] Add security headers with Helmet.
- [ ] Add CORS configuration.

### 1.4 Base Routes

- [ ] Create GET /health.
- [ ] Create GET /api/version.
- [ ] Add 404 not-found middleware.
- [ ] Add centralized error handler.
- [ ] Standardize success response format.
- [ ] Standardize error response format.

## Phase 2: Database Foundation

### 2.1 PostgreSQL Setup

- [ ] Install PostgreSQL locally or use Docker.
- [ ] Create Docker Compose file for PostgreSQL.
- [ ] Add DATABASE_URL to .env.
- [ ] Test database connection.

### 2.2 Prisma Setup

- [ ] Install Prisma.
- [ ] Install Prisma Client.
- [ ] Initialize Prisma.
- [ ] Create prisma/schema.prisma.
- [ ] Configure PostgreSQL datasource.
- [ ] Generate Prisma Client.
- [ ] Create database utility/client file.

### 2.3 Initial Schema

- [ ] Create User model.
- [ ] Create Role model.
- [ ] Create Permission model.
- [ ] Create RolePermission model.
- [ ] Create initial migration.
- [ ] Apply migration.
- [ ] Verify tables exist.

### 2.4 Seed Data

- [ ] Create seed script.
- [ ] Seed roles:
- [ ] user
- [ ] editor
- [ ] admin
- [ ] super_admin
- [ ] Seed permissions.
- [ ] Seed role-permission relationships.
- [ ] Create development super admin.
- [ ] Make seed script idempotent.

## Phase 3: Project Architecture

### 3.1 Create Folder Structure

- [ ] Create src/config.
- [ ] Create src/middlewares.
- [ ] Create src/utils.
- [ ] Create src/modules.
- [ ] Create src/modules/auth.
- [ ] Create src/modules/users.
- [ ] Create src/modules/roles.
- [ ] Create src/modules/posts.
- [ ] Create src/modules/comments.
- [ ] Create src/modules/audit.

### 3.2 Create Base Utilities

- [ ] Create async error wrapper.
- [ ] Create custom error class.
- [ ] Create response helper.
- [ ] Create password utility.
- [ ] Create JWT utility.
- [ ] Create token/crypto utility.
- [ ] Create cookie utility.
- [ ] Create logger utility.
- [ ] Create pagination utility.

### 3.3 Create Validation Middleware

- [ ] Pick Zod or Joi.
- [ ] Create reusable validation middleware.
- [ ] Validate request body.
- [ ] Validate request params.
- [ ] Validate request query.
- [ ] Return consistent validation errors.

## Phase 4: Authentication — Registration

### 4.1 Register Validation

- [ ] Create register schema.
- [ ] Validate name.
- [ ] Validate email.
- [ ] Validate password strength.
- [ ] Reject invalid request body.
- [ ] Reject unsafe extra fields if needed.

### 4.2 Register Logic

- [ ] Create auth routes file.
- [ ] Create auth controller.
- [ ] Create auth service.
- [ ] Create auth repository.
- [ ] Check if email already exists.
- [ ] Hash password.
- [ ] Assign default user role.
- [ ] Create user.
- [ ] Exclude password hash from response.
- [ ] Return created user response.

### 4.3 Register Security

- [ ] Add unique email constraint.
- [ ] Handle duplicate email database errors.
- [ ] Avoid logging raw password.
- [ ] Avoid returning password hash.
- [ ] Add audit log for registration.

## Phase 5: Email Verification

### 5.1 Database Model

- [ ] Create EmailVerificationToken model.
- [ ] Add fields:
- [ ] id
- [ ] userId
- [ ] tokenHash
- [ ] expiresAt
- [ ] usedAt
- [ ] createdAt
- [ ] Create migration.
- [ ] Apply migration.

### 5.2 Token Generation

- [ ] Generate secure random verification token.
- [ ] Hash verification token before storing.
- [ ] Set expiration date.
- [ ] Link token to user.
- [ ] Invalidate or ignore old tokens.

### 5.3 Email Service

- [ ] Create email utility/service.
- [ ] Add development mode email logging.
- [ ] Add production-ready email interface.
- [ ] Create verification email template.
- [ ] Send verification email after registration.

### 5.4 Verify Email Endpoint

- [ ] Create POST /api/auth/verify-email.
- [ ] Validate token input.
- [ ] Hash provided token.
- [ ] Find matching token.
- [ ] Reject expired token.
- [ ] Reject used token.
- [ ] Mark user as verified.
- [ ] Mark token as used.
- [ ] Add audit log.

### 5.5 Resend Verification

- [ ] Create POST /api/auth/resend-verification.
- [ ] Require authentication or email input depending on design.
- [ ] Prevent resend for verified users.
- [ ] Generate new token.
- [ ] Send new verification email.
- [ ] Add rate limiting.
- [ ] Add audit log.

## Phase 6: Authentication — Login

### 6.1 Login Validation

- [ ] Create login schema.
- [ ] Validate email.
- [ ] Validate password.
- [ ] Return generic validation errors where appropriate.

### 6.2 Login Logic

- [ ] Create POST /api/auth/login.
- [ ] Find user by email.
- [ ] Check if user exists.
- [ ] Check if user is disabled.
- [ ] Compare password with password hash.
- [ ] Return generic invalid credentials error on failure.
- [ ] Generate access token.
- [ ] Generate refresh token.
- [ ] Store refresh token hash.
- [ ] Set refresh token cookie.
- [ ] Return safe user data.
- [ ] Add audit log.

### 6.3 Login Security

- [ ] Add rate limiting.
- [ ] Do not reveal if email exists.
- [ ] Do not log password.
- [ ] Do not return password hash.
- [ ] Do not put sensitive data in JWT payload.

## Phase 7: JWT and Protected Routes

### 7.1 Access Token Utility

- [ ] Create function to sign access token.
- [ ] Create function to verify access token.
- [ ] Add expiration config.
- [ ] Add JWT secret config.
- [ ] Keep token payload minimal.

### 7.2 Authentication Middleware

- [ ] Create authenticate middleware.
- [ ] Read access token from request.
- [ ] Verify token signature.
- [ ] Reject missing token.
- [ ] Reject expired token.
- [ ] Reject invalid token.
- [ ] Load user from database.
- [ ] Reject disabled users.
- [ ] Attach user to request.

### 7.3 Current User Endpoint

- [ ] Create GET /api/auth/me.
- [ ] Require authentication.
- [ ] Return current user.
- [ ] Include role.
- [ ] Include permissions if useful.
- [ ] Exclude sensitive fields.

## Phase 8: Refresh Tokens and Sessions

### 8.1 Refresh Token Model

- [ ] Create RefreshToken model.
- [ ] Add fields:
- [ ] id
- [ ] userId
- [ ] tokenHash
- [ ] expiresAt
- [ ] revokedAt
- [ ] replacedByTokenId
- [ ] ipAddress
- [ ] userAgent
- [ ] createdAt
- [ ] Create migration.
- [ ] Apply migration.
- [ ] Add indexes for token hash and user ID.

### 8.2 Refresh Endpoint

- [ ] Create POST /api/auth/refresh.
- [ ] Read refresh token from HTTP-only cookie.
- [ ] Hash incoming refresh token.
- [ ] Find token record.
- [ ] Reject missing token.
- [ ] Reject expired token.
- [ ] Reject revoked token.
- [ ] Generate new access token.
- [ ] Generate new refresh token.
- [ ] Store new refresh token hash.
- [ ] Revoke old refresh token.
- [ ] Link old token to replacement token.
- [ ] Set new refresh token cookie.

### 8.3 Refresh Token Reuse Detection

- [ ] Detect use of revoked token.
- [ ] Identify related token family/session.
- [ ] Revoke related active tokens.
- [ ] Add audit log for suspicious reuse.
- [ ] Return safe error response.
- [ ] Force user to log in again.

### 8.4 Logout

- [ ] Create POST /api/auth/logout.
- [ ] Read refresh token from cookie.
- [ ] Hash token.
- [ ] Revoke token if found.
- [ ] Clear refresh token cookie.
- [ ] Return success response.
- [ ] Add audit log.

### 8.5 Session Management

- [ ] Create GET /api/auth/sessions.
- [ ] Return current user’s active sessions.
- [ ] Exclude token hashes.
- [ ] Create DELETE /api/auth/sessions/:sessionId.
- [ ] Allow user to revoke own session.
- [ ] Prevent user from revoking another user’s session.
- [ ] Create revoke all other sessions endpoint.
- [ ] Add audit logs for session revocation.

## Phase 9: Forgot and Reset Password

### 9.1 Password Reset Model

- [ ] Create PasswordResetToken model.
- [ ] Add fields:
- [ ] id
- [ ] userId
- [ ] tokenHash
- [ ] expiresAt
- [ ] usedAt
- [ ] createdAt
- [ ] Create migration.
- [ ] Apply migration.
- [ ] Add token hash index.

### 9.2 Forgot Password

- [ ] Create POST /api/auth/forgot-password.
- [ ] Validate email.
- [ ] Always return generic success response.
- [ ] If user exists, generate reset token.
- [ ] Hash reset token.
- [ ] Store token.
- [ ] Send reset email.
- [ ] Add rate limiting.
- [ ] Avoid leaking account existence.
- [ ] Add safe audit/security log.

### 9.3 Reset Password

- [ ] Create POST /api/auth/reset-password.
- [ ] Validate token.
- [ ] Validate new password.
- [ ] Hash incoming token.
- [ ] Find token record.
- [ ] Reject invalid token.
- [ ] Reject expired token.
- [ ] Reject used token.
- [ ] Hash new password.
- [ ] Update user password.
- [ ] Mark reset token as used.
- [ ] Revoke existing user sessions.
- [ ] Add audit log.

### 9.4 Change Password

- [ ] Create POST /api/auth/change-password.
- [ ] Require authentication.
- [ ] Validate current password.
- [ ] Validate new password.
- [ ] Compare current password.
- [ ] Hash new password.
- [ ] Update password.
- [ ] Revoke other sessions.
- [ ] Add audit log.

## Phase 10: Authorization and RBAC

### 10.1 Permission System

- [ ] Define permissions list.
- [ ] Define role-permission mapping.
- [ ] Seed permissions.
- [ ] Seed role permissions.
- [ ] Add helper to check user permission.

### 10.2 Authorization Middleware

- [ ] Create authorize middleware.
- [ ] Check if request has authenticated user.
- [ ] Load user role and permissions.
- [ ] Check required permission.
- [ ] Return 401 for unauthenticated requests.
- [ ] Return 403 for authenticated but unauthorized requests.
- [ ] Support multiple allowed permissions if needed.

### 10.3 Role-Specific Protection

- [ ] Protect admin routes.
- [ ] Protect super admin routes.
- [ ] Protect editor routes.
- [ ] Test regular user access.
- [ ] Test editor access.
- [ ] Test admin access.
- [ ] Test super admin access.

## Phase 11: User Management

### 11.1 User Routes

- [ ] Create users routes file.
- [ ] Create users controller.
- [ ] Create users service.
- [ ] Create users repository.
- [ ] Register user routes in app.

### 11.2 List Users

- [ ] Create GET /api/users.
- [ ] Require admin permission.
- [ ] Add pagination.
- [ ] Add filter by role.
- [ ] Add filter by status.
- [ ] Exclude password hash.
- [ ] Return pagination metadata.

### 11.3 View User Details

- [ ] Create GET /api/users/:id.
- [ ] Require admin permission.
- [ ] Validate user ID.
- [ ] Return safe user data.
- [ ] Return not found for missing user.
- [ ] Exclude password hash.

### 11.4 Update Own Profile

- [ ] Create profile update endpoint.
- [ ] Require authentication.
- [ ] Allow safe fields only.
- [ ] Prevent role update.
- [ ] Prevent status update.
- [ ] Validate input.
- [ ] Return updated profile.

### 11.5 Disable or Enable User

- [ ] Create PATCH /api/users/:id/status.
- [ ] Require admin permission.
- [ ] Validate status.
- [ ] Prevent unsafe actions against super admins.
- [ ] Disable user.
- [ ] Revoke disabled user’s sessions.
- [ ] Enable user.
- [ ] Add audit log.

### 11.6 Change User Role

- [ ] Create PATCH /api/users/:id/role.
- [ ] Require super admin permission.
- [ ] Validate role.
- [ ] Prevent users from changing own role.
- [ ] Prevent removing last super admin.
- [ ] Update role.
- [ ] Add audit log.

### 11.7 Admin Session Revocation

- [ ] Create endpoint to revoke user sessions.
- [ ] Require admin or super admin permission.
- [ ] Prevent unsafe revocation of higher-privilege users.
- [ ] Revoke sessions.
- [ ] Add audit log.

## Phase 12: Posts

### 12.1 Post Model

- [ ] Create Post model.
- [ ] Add fields:
- [ ] id
- [ ] authorId
- [ ] title
- [ ] slug
- [ ] content
- [ ] status
- [ ] createdAt
- [ ] updatedAt
- [ ] Add post status enum or equivalent.
- [ ] Create migration.
- [ ] Apply migration.
- [ ] Add indexes for author and status.

### 12.2 Post Module Structure

- [ ] Create posts routes file.
- [ ] Create posts controller.
- [ ] Create posts service.
- [ ] Create posts repository.
- [ ] Create posts validation file.
- [ ] Register post routes in app.

### 12.3 List Posts

- [ ] Create GET /api/posts.
- [ ] Public users see only published posts.
- [ ] Authenticated owners can see own drafts where appropriate.
- [ ] Admins can see all posts if using admin filters.
- [ ] Add pagination.
- [ ] Add sorting.
- [ ] Add filtering by status where allowed.

### 12.4 View Single Post

- [ ] Create GET /api/posts/:id.
- [ ] Public can view published posts.
- [ ] Public cannot view drafts.
- [ ] Owner can view own draft.
- [ ] Admin can view any post.
- [ ] Return not found or forbidden based on chosen policy.

### 12.5 Create Post

- [ ] Create POST /api/posts.
- [ ] Require authentication.
- [ ] Require verified email.
- [ ] Require post:create permission.
- [ ] Validate title.
- [ ] Validate content.
- [ ] Generate slug.
- [ ] Create post linked to authenticated user.
- [ ] Add audit log.

### 12.6 Update Post

- [ ] Create PATCH /api/posts/:id.
- [ ] Require authentication.
- [ ] Require post:update permission.
- [ ] Validate request.
- [ ] Check object ownership.
- [ ] Allow editor to update own post.
- [ ] Allow admin to update any post.
- [ ] Add audit log.

### 12.7 Delete Post

- [ ] Create DELETE /api/posts/:id.
- [ ] Require authentication.
- [ ] Require post:delete permission.
- [ ] Check object ownership.
- [ ] Decide soft delete/archive behavior.
- [ ] Delete or archive post.
- [ ] Add audit log.

### 12.8 Publish Post

- [ ] Create PATCH /api/posts/:id/publish.
- [ ] Require authentication.
- [ ] Require permission.
- [ ] Check ownership.
- [ ] Change status to published.
- [ ] Add audit log.

### 12.9 Archive Post

- [ ] Create PATCH /api/posts/:id/archive.
- [ ] Require authentication.
- [ ] Require permission.
- [ ] Check ownership.
- [ ] Change status to archived.
- [ ] Add audit log.

## Phase 13: Comments

### 13.1 Comment Model

- [ ] Create Comment model.
- [ ] Add fields:
- [ ] id
- [ ] postId
- [ ] authorId
- [ ] content
- [ ] status
- [ ] createdAt
- [ ] updatedAt
- [ ] Add comment status enum or equivalent.
- [ ] Create migration.
- [ ] Apply migration.
- [ ] Add indexes for post and author.

### 13.2 Comment Module Structure

- [ ] Create comments routes file.
- [ ] Create comments controller.
- [ ] Create comments service.
- [ ] Create comments repository.
- [ ] Create comments validation file.
- [ ] Register comment routes in app.

### 13.3 List Comments

- [ ] Create GET /api/posts/:postId/comments.
- [ ] Public users see visible comments only.
- [ ] Add pagination.
- [ ] Validate post ID.
- [ ] Return comments with safe author data.

### 13.4 Create Comment

- [ ] Create POST /api/posts/:postId/comments.
- [ ] Require authentication.
- [ ] Require verified email if chosen policy says so.
- [ ] Validate content.
- [ ] Check target post exists.
- [ ] Prevent comments on drafts.
- [ ] Prevent comments on archived posts if chosen policy says so.
- [ ] Create comment linked to user and post.

### 13.5 Update Comment

- [ ] Create PATCH /api/comments/:id.
- [ ] Require authentication.
- [ ] Validate content.
- [ ] Check object ownership.
- [ ] Allow user to update own comment.
- [ ] Allow admin to moderate any comment.
- [ ] Add audit log if admin action.

### 13.6 Delete Comment

- [ ] Create DELETE /api/comments/:id.
- [ ] Require authentication.
- [ ] Check object ownership.
- [ ] Allow user to delete own comment.
- [ ] Allow admin to delete any comment.
- [ ] Soft delete or mark as deleted.
- [ ] Add audit log.

### 13.7 Hide Comment

- [ ] Create PATCH /api/comments/:id/hide.
- [ ] Require authentication.
- [ ] Require moderation permission.
- [ ] Allow admin to hide any comment.
- [ ] Allow editor to hide comments on own posts.
- [ ] Change status to hidden.
- [ ] Add audit log.

## Phase 14: Object-Level Authorization

### 14.1 Ownership Helpers

- [ ] Create helper to check post ownership.
- [ ] Create helper to check comment ownership.
- [ ] Create helper to check session ownership.
- [ ] Create helper to check admin override rules.
- [ ] Keep ownership logic reusable.

### 14.2 Protect User Resources

- [ ] Prevent user from viewing private data of another user.
- [ ] Prevent user from modifying another user.
- [ ] Prevent user from revoking another user’s sessions.
- [ ] Allow admin-level exceptions where appropriate.

### 14.3 Protect Post Resources

- [ ] Prevent editor from editing another editor’s post.
- [ ] Prevent editor from deleting another editor’s post.
- [ ] Allow admin to manage all posts.
- [ ] Allow super admin to manage all posts.

### 14.4 Protect Comment Resources

- [ ] Prevent user from editing another user’s comment.
- [ ] Prevent user from deleting another user’s comment.
- [ ] Allow admin to moderate all comments.
- [ ] Allow editor to moderate comments on own posts.

### 14.5 Prevent Privilege Escalation

- [ ] Prevent regular user from accessing editor routes.
- [ ] Prevent editor from accessing admin routes.
- [ ] Prevent admin from assigning super admin role.
- [ ] Prevent admin from modifying super admin account.
- [ ] Prevent removing the last super admin.

## Phase 15: Audit Logs

### 15.1 Audit Log Model

- [ ] Create AuditLog model.
- [ ] Add fields:
- [ ] id
- [ ] actorId
- [ ] action
- [ ] targetType
- [ ] targetId
- [ ] metadata
- [ ] ipAddress
- [ ] userAgent
- [ ] createdAt
- [ ] Create migration.
- [ ] Apply migration.
- [ ] Add indexes for action, actor, and created date.

### 15.2 Audit Service

- [ ] Create audit service.
- [ ] Create audit repository.
- [ ] Create reusable function to record actions.
- [ ] Ensure logs do not contain sensitive data.
- [ ] Ensure audit failure does not crash critical user flow unless necessary.

### 15.3 Log Sensitive Events

- [ ] Log registration.
- [ ] Log login.
- [ ] Log logout.
- [ ] Log password change.
- [ ] Log password reset.
- [ ] Log email verification.
- [ ] Log role changes.
- [ ] Log user disable/enable.
- [ ] Log session revocation.
- [ ] Log post moderation.
- [ ] Log comment moderation.
- [ ] Log refresh token reuse detection.

### 15.4 Admin Audit Routes

- [ ] Create GET /api/admin/audit-logs.
- [ ] Require admin permission.
- [ ] Add pagination.
- [ ] Add filters by action.
- [ ] Add filters by actor.
- [ ] Restrict sensitive logs to super admin.
- [ ] Exclude sensitive metadata.

## Phase 16: Security Hardening

### 16.1 Security Middleware

- [ ] Configure Helmet.
- [ ] Configure CORS safely.
- [ ] Configure cookie parser.
- [ ] Configure request size limits.
- [ ] Disable unnecessary Express headers.
- [ ] Trust proxy only when deployed behind proxy.

### 16.2 Rate Limiting

- [ ] Rate limit login.
- [ ] Rate limit forgot password.
- [ ] Rate limit reset password.
- [ ] Rate limit resend verification.
- [ ] Rate limit register.
- [ ] Use stricter limits for sensitive routes.
- [ ] Return standard error response.

### 16.3 Cookie Security

- [ ] Use HTTP-only refresh token cookie.
- [ ] Use secure in production.
- [ ] Use appropriate sameSite setting.
- [ ] Set cookie expiration.
- [ ] Clear cookie on logout.
- [ ] Rotate cookie on refresh.

### 16.4 CSRF Protection

- [ ] Decide CSRF strategy.
- [ ] Implement CSRF token flow if needed.
- [ ] Protect state-changing routes.
- [ ] Exclude safe routes where appropriate.
- [ ] Document CSRF behavior.

### 16.5 Sensitive Data Protection

- [ ] Redact passwords from logs.
- [ ] Redact tokens from logs.
- [ ] Redact cookies from logs.
- [ ] Remove password hash from all responses.
- [ ] Remove token hashes from all responses.
- [ ] Hide stack traces in production.

## Phase 17: API Response and Pagination

### 17.1 Response Helpers

- [ ] Create success response helper.
- [ ] Create error response helper.
- [ ] Use consistent response format across controllers.
- [ ] Include request ID in error responses if useful.

### 17.2 Pagination

- [ ] Create pagination utility.
- [ ] Validate page.
- [ ] Validate limit.
- [ ] Set max limit.
- [ ] Return pagination metadata.
- [ ] Apply pagination to users.
- [ ] Apply pagination to posts.
- [ ] Apply pagination to comments.
- [ ] Apply pagination to audit logs.

### 17.3 Filtering and Sorting

- [ ] Validate filter values.
- [ ] Validate sort values.
- [ ] Add user filters.
- [ ] Add post filters.
- [ ] Add comment filters.
- [ ] Add audit log filters.
- [ ] Prevent unsafe dynamic sorting.

## Phase 18: Testing

### 18.1 Test Setup

- [ ] Choose Jest or Vitest.
- [ ] Install Supertest.
- [ ] Create test database.
- [ ] Create test environment config.
- [ ] Add test setup file.
- [ ] Add database cleanup helper.
- [ ] Add test user factory.
- [ ] Add auth helper for tests.

### 18.2 Foundation Tests

- [ ] Test GET /health.
- [ ] Test GET /api/version.
- [ ] Test unknown route returns 404.
- [ ] Test centralized error handler.
- [ ] Test validation middleware.

### 18.3 Auth Tests

- [ ] Test registration success.
- [ ] Test duplicate email rejection.
- [ ] Test invalid registration data.
- [ ] Test password hashing.
- [ ] Test login success.
- [ ] Test login failure.
- [ ] Test disabled user cannot log in.
- [ ] Test current user endpoint.
- [ ] Test protected route without token.
- [ ] Test protected route with invalid token.

### 18.4 Token and Session Tests

- [ ] Test refresh token success.
- [ ] Test refresh token rotation.
- [ ] Test old refresh token fails.
- [ ] Test revoked token fails.
- [ ] Test expired token fails.
- [ ] Test token reuse detection.
- [ ] Test logout revokes token.
- [ ] Test session list.
- [ ] Test session revocation.

### 18.5 Email Verification Tests

- [ ] Test verification token creation.
- [ ] Test valid email verification.
- [ ] Test expired token rejection.
- [ ] Test used token rejection.
- [ ] Test resend verification.
- [ ] Test verified users cannot unnecessarily verify again.

### 18.6 Password Reset Tests

- [ ] Test forgot password generic response.
- [ ] Test reset token creation.
- [ ] Test valid password reset.
- [ ] Test expired reset token.
- [ ] Test used reset token.
- [ ] Test sessions revoked after reset.
- [ ] Test old password fails after reset.

### 18.7 RBAC Tests

- [ ] Test user cannot access admin routes.
- [ ] Test editor cannot manage users.
- [ ] Test admin can list users.
- [ ] Test admin cannot assign super admin.
- [ ] Test super admin can change roles.
- [ ] Test missing permission returns 403.

### 18.8 Object-Level Authorization Tests

- [ ] Test user can edit own comment.
- [ ] Test user cannot edit another user’s comment.
- [ ] Test editor can update own post.
- [ ] Test editor cannot update another editor’s post.
- [ ] Test admin can manage any post.
- [ ] Test user cannot revoke another user’s session.

### 18.9 Posts and Comments Tests

- [ ] Test public post listing.
- [ ] Test draft posts hidden from public.
- [ ] Test editor can create post.
- [ ] Test regular user cannot create post.
- [ ] Test authenticated user can comment.
- [ ] Test unauthenticated user cannot comment.
- [ ] Test comment on draft post is rejected.

### 18.10 Audit Tests

- [ ] Test audit log created for registration.
- [ ] Test audit log created for login.
- [ ] Test audit log created for role change.
- [ ] Test audit log created for password reset.
- [ ] Test user cannot view audit logs.
- [ ] Test admin can view allowed audit logs.

## Phase 19: API Documentation

### 19.1 Swagger/OpenAPI Setup

- [ ] Install Swagger tooling.
- [ ] Create OpenAPI config.
- [ ] Serve docs route.
- [ ] Protect docs in production if desired.
- [ ] Add base API metadata.

### 19.2 Document Routes

- [ ] Document auth routes.
- [ ] Document user routes.
- [ ] Document post routes.
- [ ] Document comment routes.
- [ ] Document admin routes.
- [ ] Document health routes.

### 19.3 Document Examples

- [ ] Add register request/response example.
- [ ] Add login request/response example.
- [ ] Add validation error example.
- [ ] Add auth error example.
- [ ] Add forbidden error example.
- [ ] Add paginated response example.
- [ ] Add role/permission notes.

## Phase 20: Developer Experience

### 20.1 Linting and Formatting

- [ ] Install ESLint.
- [ ] Install Prettier.
- [ ] Configure ESLint.
- [ ] Configure Prettier.
- [ ] Add lint script.
- [ ] Add format script.
- [ ] Add ignore files.

### 20.2 Scripts

- [ ] Add dev script.
- [ ] Add start script.
- [ ] Add test script.
- [ ] Add test:watch script.
- [ ] Add lint script.
- [ ] Add format script.
- [ ] Add db:migrate script.
- [ ] Add db:seed script.
- [ ] Add db:studio script.
- [ ] Add db:reset script.

### 20.3 README

- [ ] Add project description.
- [ ] Add features list.
- [ ] Add tech stack.
- [ ] Add setup instructions.
- [ ] Add environment variable instructions.
- [ ] Add database setup instructions.
- [ ] Add migration instructions.
- [ ] Add seed instructions.
- [ ] Add test instructions.
- [ ] Add API documentation link.
- [ ] Add security notes.
- [ ] Add deployment notes.

## Phase 21: Production Readiness

### 21.1 Docker

- [ ] Create Dockerfile.
- [ ] Add .dockerignore.
- [ ] Create Docker Compose file.
- [ ] Add PostgreSQL service.
- [ ] Add app service if desired.
- [ ] Test local container build.
- [ ] Test app connects to database from container.

### 21.2 Production Config

- [ ] Validate production environment variables.
- [ ] Set secure cookie behavior in production.
- [ ] Configure CORS production origin.
- [ ] Disable stack traces in production.
- [ ] Set production log level.
- [ ] Document HTTPS requirement.

### 21.3 Graceful Shutdown

- [ ] Listen for SIGTERM.
- [ ] Listen for SIGINT.
- [ ] Stop accepting new requests.
- [ ] Close HTTP server.
- [ ] Disconnect Prisma.
- [ ] Log shutdown process.

### 21.4 Deployment Preparation

- [ ] Add migration deployment command.
- [ ] Add production start command.
- [ ] Add health check route for platform.
- [ ] Document deployment steps.
- [ ] Document rollback considerations.
- [ ] Document secret configuration.

## Phase 22: Final Review

### 22.1 Security Review

- [ ] Passwords are hashed.
- [ ] Tokens are hashed where required.
- [ ] Sensitive data is not logged.
- [ ] Sensitive data is not returned.
- [ ] Auth routes are rate-limited.
- [ ] CORS is restricted.
- [ ] Cookies are secure.
- [ ] CSRF strategy is implemented or documented.
- [ ] Object-level authorization is tested.
- [ ] Admin actions are audited.

### 22.2 Code Quality Review

- [ ] Controllers are thin.
- [ ] Services contain business logic.
- [ ] Repositories contain database queries.
- [ ] Middleware is reusable.
- [ ] Validation is centralized.
- [ ] Errors are consistent.
- [ ] Responses are consistent.
- [ ] Tests are meaningful.
- [ ] README is complete.

### 22.3 Portfolio Review

- [ ] Project has a clear README.
- [ ] Project explains learning goals.
- [ ] API docs are available.
- [ ] Important security decisions are documented.
- [ ] Screenshots or examples are added if useful.
- [ ] Project can be run by another developer.
- [ ] Project demonstrates production backend concepts.

## MVP Cut Line

If we want a smaller first release, the MVP should include:
- [ ] Express project setup.
- [ ] Environment validation.
- [ ] PostgreSQL and Prisma setup.
- [ ] User, role, and permission models.
- [ ] Register.
- [ ] Login.
- [ ] Access token auth.
- [ ] Refresh token rotation.
- [ ] Logout.
- [ ] Current user endpoint.
- [ ] Basic RBAC.
- [ ] Posts.
- [ ] Comments.
- [ ] Object-level authorization.
- [ ] Error handling.
- [ ] Request validation.
- [ ] Basic tests.
- [ ] README.

Everything else can be added after the MVP, but for learning production-level backend development, we should eventually complete the full backlog.

## Recommended First Task

Start with:
- [ ] Create project folder.
- [ ] Initialize package.json.
- [ ] Install Express.
- [ ] Create src/app.js.
- [ ] Create src/server.js.
- [ ] Add GET /health.
- [ ] Add centralized 404 handler.
- [ ] Add centralized error handler.
