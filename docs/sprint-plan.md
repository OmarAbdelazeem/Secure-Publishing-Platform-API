# Secure Publishing Platform API Sprint Plan

## Project Style

This sprint plan assumes:

- JavaScript, not TypeScript.
- Express.js backend.
- PostgreSQL database.
- Prisma ORM.
- JWT access tokens.
- Refresh tokens stored in HTTP-only cookies.
- Production-style architecture.
- Security and testing included throughout the project.

The project will be built in small, focused sprints. Each sprint should produce working code, not only theory.

## Sprint 0: Planning and Technical Decisions

### Sprint Goal

Finalize the important technical decisions before coding.

### Main Outcome

We know exactly what stack, conventions, and security choices we will use.

### Tasks

- [ ] Choose project name.
- [ ] Choose package manager.
- [ ] Choose validation library.
- [ ] Choose test runner.
- [ ] Choose password hashing library.
- [ ] Choose token strategy.
- [ ] Choose cookie strategy.
- [ ] Choose API response format.
- [ ] Choose error response format.
- [ ] Choose password rules.
- [ ] Choose email verification policy.
- [ ] Choose post deletion behavior.
- [ ] Choose comment deletion behavior.

### Recommended Decisions

- Project name: secure-publishing-api
- Package manager: npm
- Validation: Zod
- Testing: Jest + Supertest
- Password hashing: bcrypt
- Access token: sent in response body
- Refresh token: HTTP-only cookie
- Post deletion: soft delete/archive
- Comment deletion: soft delete/status change

### Learning Focus

- Why technical decisions matter.
- How early architecture choices affect the whole app.
- Why production apps need consistency.

### Definition of Done

- All major stack decisions are documented.
- Project rules are clear.
- We are ready to initialize the project.

## Sprint 1: Express Project Foundation

### Sprint Goal

Create the first working Express server with clean structure, environment config, and basic error handling.

### Main Outcome

The API runs locally and has a healthy production-style foundation.

### User Stories Covered

- US-001: Initialize Express Application
- US-002: Add Project Folder Structure
- US-003: Add Environment Configuration
- US-004: Add Health Check Endpoint
- US-005: Add API Version Endpoint
- US-006: Add Centralized Error Handler
- US-007: Add Not Found Handler
- US-008: Add Request Logging
- US-009: Add Request ID Middleware

### Tasks

- [ ] Initialize package.json.
- [ ] Install Express.
- [ ] Create src/app.js.
- [ ] Create src/server.js.
- [ ] Separate app setup from server startup.
- [ ] Install dotenv.
- [ ] Create .env.
- [ ] Create .env.example.
- [ ] Add .gitignore.
- [ ] Create environment config file.
- [ ] Add JSON body parser.
- [ ] Add request ID middleware.
- [ ] Add basic request logger.
- [ ] Add GET /health.
- [ ] Add GET /api/version.
- [ ] Add 404 middleware.
- [ ] Add centralized error middleware.
- [ ] Add development and start scripts.

### Deliverables

- Running Express app.
- Health route.
- Version route.
- Error handling.
- Clean folder structure.
- Environment config.

### Learning Focus

- Express app lifecycle.
- Middleware order.
- Difference between app.js and server.js.
- Error middleware.
- Environment variables.
- Project structure.

### Definition of Done

- npm run dev starts the API.
- GET /health works.
- Unknown routes return 404.
- Errors use a consistent response format.
- The app can be imported in tests later without starting the server.

## Sprint 2: Database and Prisma Foundation

### Sprint Goal

Connect the app to PostgreSQL using Prisma and create the first database schema.

### Main Outcome

The app has a working relational database with users, roles, and permissions.

### User Stories Covered

- US-010: Set Up PostgreSQL
- US-011: Set Up Prisma
- US-012: Create Initial Database Migration
- US-013: Seed Roles and Permissions
- US-045: Assign Default Role
- US-119: Enforce Unique Email
- US-120: Enforce Valid Foreign Keys

### Tasks

- [ ] Create Docker Compose file for PostgreSQL.
- [ ] Add DATABASE_URL.
- [ ] Install Prisma.
- [ ] Install Prisma Client.
- [ ] Initialize Prisma.
- [ ] Configure PostgreSQL datasource.
- [ ] Create Prisma client utility.
- [ ] Create User model.
- [ ] Create Role model.
- [ ] Create Permission model.
- [ ] Create RolePermission model.
- [ ] Add unique email constraint.
- [ ] Add relationships.
- [ ] Create migration.
- [ ] Apply migration.
- [ ] Create seed script.
- [ ] Seed roles.
- [ ] Seed permissions.
- [ ] Seed role-permission mappings.
- [ ] Seed development super admin.

### Deliverables

- PostgreSQL running locally.
- Prisma configured.
- Initial migration.
- Seeded roles and permissions.
- Development super admin account.

### Learning Focus

- PostgreSQL basics.
- Prisma schema design.
- Migrations.
- Seed scripts.
- Relationships.
- Unique constraints.
- Role-permission modeling.

### Definition of Done

- Database starts with Docker.
- Prisma can connect.
- Migration runs successfully.
- Roles and permissions are seeded.
- Seed script can be run multiple times safely.

## Sprint 3: App Architecture and Core Utilities

### Sprint Goal

Create reusable architecture pieces before building business features.

### Main Outcome

The app has production-style utilities for errors, responses, validation, passwords, tokens, cookies, and
logging.

### User Stories Covered

- US-002: Add Project Folder Structure
- US-006: Add Centralized Error Handler
- US-087: Validate All Request Inputs
- US-091: Standardize Success Responses
- US-092: Standardize Error Responses
- US-093: Add Pagination

### Tasks

- [ ] Create src/config.
- [ ] Create src/middlewares.
- [ ] Create src/utils.
- [ ] Create src/modules.
- [ ] Create module folders.
- [ ] Create custom AppError class.
- [ ] Create async error wrapper.
- [ ] Create success response helper.
- [ ] Create error response helper.
- [ ] Create validation middleware.
- [ ] Create password utility.
- [ ] Create JWT utility placeholder.
- [ ] Create crypto/token utility.
- [ ] Create cookie utility.
- [ ] Create logger utility.
- [ ] Create pagination utility.

### Deliverables

- Shared utilities.
- Validation middleware.
- Standard response shape.
- Standard error shape.
- Reusable architecture.

### Learning Focus

- Separation of concerns.
- Thin controllers.
- Service layer.
- Repository layer.
- Middleware design.
- Reusable utilities.

### Definition of Done

- Controllers can use response helpers.
- Errors flow through centralized middleware.
- Validation middleware supports body, params, and query.
- The architecture is ready for auth implementation.

## Sprint 4: Registration and Password Hashing

### Sprint Goal

Implement secure user registration.

### Main Outcome

Visitors can register, and passwords are safely hashed.

### User Stories Covered

- US-014: Register New User
- US-015: Prevent Duplicate Registration
- US-016: Validate Registration Data
- US-017: Hash User Password
- US-018: Create Email Verification Token After Registration
- US-076: Record User Registration

### Tasks

- [ ] Create auth routes.
- [ ] Create auth controller.
- [ ] Create auth service.
- [ ] Create auth repository.
- [ ] Create register validation schema.
- [ ] Validate name.
- [ ] Validate email.
- [ ] Validate password strength.
- [ ] Check duplicate email.
- [ ] Hash password.
- [ ] Assign default user role.
- [ ] Create user.
- [ ] Exclude password hash from response.
- [ ] Create verification token placeholder.
- [ ] Add registration audit log placeholder.
- [ ] Handle duplicate email database error.

### Deliverables

- POST /api/auth/register
- Password hashing utility.
- Safe user response.
- Register validation.

### Learning Focus

- Password hashing.
- Validation.
- Unique constraints.
- Service/repository pattern.
- Safe API responses.
- Account creation flow.

### Definition of Done

- Valid user can register.
- Duplicate email fails safely.
- Invalid data fails validation.
- Password is hashed in database.
- Password hash is never returned.

## Sprint 5: Email Verification

### Sprint Goal

Add email verification tokens and verification endpoints.

### Main Outcome

New users can verify their email with a secure one-time token.

### User Stories Covered

- US-019: Send Verification Email
- US-020: Verify Email
- US-021: Reject Invalid Verification Token
- US-022: Resend Verification Email
- US-023: Restrict Sensitive Actions for Unverified Users
- US-103: Test Email Verification Flow

### Tasks

- [ ] Create EmailVerificationToken Prisma model.
- [ ] Create migration.
- [ ] Generate secure verification token.
- [ ] Hash verification token.
- [ ] Store token hash.
- [ ] Set token expiration.
- [ ] Create email service.
- [ ] Add development email logging.
- [ ] Send verification email after registration.
- [ ] Create POST /api/auth/verify-email.
- [ ] Validate token.
- [ ] Compare hashed token.
- [ ] Reject expired token.
- [ ] Reject used token.
- [ ] Mark user as verified.
- [ ] Mark token as used.
- [ ] Create POST /api/auth/resend-verification.
- [ ] Add rate limiting placeholder.
- [ ] Add audit logs.

### Deliverables

- Verification token model.
- Verification email flow.
- Verify email endpoint.
- Resend verification endpoint.

### Learning Focus

- One-time tokens.
- Token hashing.
- Expiration.
- Email abstraction.
- Why raw tokens should not be stored.

### Definition of Done

- User receives verification token in development mode.
- Valid token verifies account.
- Expired/used/invalid tokens fail.
- Verification state is saved on user.

## Sprint 6: Login and Access Tokens

### Sprint Goal

Implement login and access-token authentication.

### Main Outcome

Users can log in and access protected routes with JWT access tokens.

### User Stories Covered

- US-024: Login User
- US-025: Reject Invalid Login Credentials
- US-026: Issue Access Token
- US-028: Authenticate Protected Routes
- US-029: Get Current User
- US-086: Protect Against Account Enumeration

### Tasks

- [ ] Create login validation schema.
- [ ] Create POST /api/auth/login.
- [ ] Find user by email.
- [ ] Reject disabled users.
- [ ] Compare password.
- [ ] Return generic invalid credentials error.
- [ ] Create access token signing utility.
- [ ] Create access token verification utility.
- [ ] Keep JWT payload minimal.
- [ ] Create authenticate middleware.
- [ ] Read access token from request.
- [ ] Verify access token.
- [ ] Load user from database.
- [ ] Attach user to request.
- [ ] Create GET /api/auth/me.
- [ ] Add login audit log.

### Deliverables

- Login endpoint.
- JWT access token utility.
- Authentication middleware.
- Current user endpoint.

### Learning Focus

- JWT basics.
- Access tokens.
- Generic login errors.
- Auth middleware.
- Protected routes.
- Why JWT payloads should be minimal.

### Definition of Done

- Valid credentials log in successfully.
- Invalid credentials fail safely.
- Access token works on protected routes.
- /api/auth/me returns current user.
- Password hash is never returned.

## Sprint 7: Refresh Tokens, Logout, and Sessions

### Sprint Goal

Build real session management using refresh tokens and rotation.

### Main Outcome

The app supports secure long-lived sessions, logout, token rotation, and session revocation.

### User Stories Covered

- US-027: Issue Refresh Token
- US-030: Logout Current Session
- US-031: Refresh Access Token
- US-032: Rotate Refresh Token
- US-033: Detect Refresh Token Reuse
- US-034: View Own Sessions
- US-035: Revoke Own Session
- US-036: Revoke All Other Sessions
- US-100: Test Refresh Token Flow
- US-101: Test Logout Flow

### Tasks

- [ ] Create RefreshToken Prisma model.
- [ ] Create migration.
- [ ] Generate refresh token.
- [ ] Hash refresh token.
- [ ] Store token hash.
- [ ] Store IP address.
- [ ] Store user agent.
- [ ] Store expiration.
- [ ] Set refresh token in HTTP-only cookie.
- [ ] Create POST /api/auth/refresh.
- [ ] Validate refresh token from cookie.
- [ ] Rotate refresh token.
- [ ] Revoke old refresh token.
- [ ] Create new refresh token.
- [ ] Detect revoked token reuse.
- [ ] Revoke related session/token family.
- [ ] Create POST /api/auth/logout.
- [ ] Clear refresh token cookie.
- [ ] Create GET /api/auth/sessions.
- [ ] Create DELETE /api/auth/sessions/:sessionId.
- [ ] Create revoke all other sessions endpoint.
- [ ] Add audit logs.

### Deliverables

- Refresh token model.
- Refresh endpoint.
- Token rotation.
- Logout endpoint.
- Session listing.
- Session revocation.

### Learning Focus

- Refresh tokens.
- Token hashing.
- HTTP-only cookies.
- Token rotation.
- Logout with JWT.
- Session invalidation.
- Token reuse detection.

### Definition of Done

- Login creates refresh token session.
- Refresh rotates tokens.
- Old refresh token cannot be reused.
- Logout revokes refresh token.
- User can view and revoke own sessions.

## Sprint 8: Forgot Password, Reset Password, and

Change Password

### Sprint Goal

Build secure password recovery and password update flows.

### Main Outcome

Users can recover and change passwords safely.

### User Stories Covered

- US-037: Request Password Reset
- US-038: Reset Password
- US-039: Reject Weak New Password
- US-040: Change Password While Logged In
- US-041: Prevent Password Reset Token Reuse
- US-078: Record Password Changes
- US-102: Test Password Reset Flow

### Tasks

- [ ] Create PasswordResetToken Prisma model.
- [ ] Create migration.
- [ ] Create forgot password validation.
- [ ] Create POST /api/auth/forgot-password.
- [ ] Always return generic response.
- [ ] Generate reset token if user exists.
- [ ] Hash reset token.
- [ ] Store reset token.
- [ ] Send reset email in development mode.
- [ ] Create reset password validation.
- [ ] Create POST /api/auth/reset-password.
- [ ] Validate reset token.
- [ ] Reject expired token.
- [ ] Reject used token.
- [ ] Hash new password.
- [ ] Update password.
- [ ] Mark token as used.
- [ ] Revoke existing sessions.
- [ ] Create POST /api/auth/change-password.
- [ ] Require current password.
- [ ] Validate new password.
- [ ] Revoke other sessions.
- [ ] Add audit logs.

### Deliverables

- Forgot password endpoint.
- Reset password endpoint.
- Change password endpoint.
- Reset token model.
- Session invalidation after reset.

### Learning Focus

- Password reset security.
- Account enumeration prevention.
- Single-use tokens.
- Session revocation after credential changes.
- Safe email flows.

### Definition of Done

- Forgot password does not reveal account existence.
- Valid reset token changes password.
- Used/expired tokens fail.
- Old password no longer works.
- Existing sessions are revoked after reset.

## Sprint 9: RBAC and Permission Middleware

### Sprint Goal

Implement role-based and permission-based authorization.

### Main Outcome

The API can protect routes based on user permissions.

### User Stories Covered

- US-046: Check Permissions with Middleware
- US-047: Restrict Admin Routes
- US-048: Restrict Super Admin Routes
- US-049: Load User Permissions
- US-054: Prevent Vertical Privilege Escalation
- US-104: Test Authorization Rules

### Tasks

- [ ] Define permission constants.
- [ ] Define role-permission mapping.
- [ ] Update seed script if needed.
- [ ] Load user role and permissions.
- [ ] Create permission checker helper.
- [ ] Create authorize middleware.
- [ ] Return 401 for unauthenticated users.
- [ ] Return 403 for unauthorized users.
- [ ] Protect editor routes.
- [ ] Protect admin routes.
- [ ] Protect super admin routes.
- [ ] Add tests for role access.

### Deliverables

- Permission system.
- Authorization middleware.
- Protected admin/editor/super-admin routes.

### Learning Focus

- Authentication vs authorization.
- Roles vs permissions.
- Middleware composition.
- Least privilege.
- Vertical privilege escalation.

### Definition of Done

- Regular user cannot access editor/admin routes.
- Editor cannot access admin routes.
- Admin cannot access super-admin-only routes.
- Super admin can access sensitive routes.
- Authorization logic is reusable.

## Sprint 10: User Management

### Sprint Goal

Build admin user-management features.

### Main Outcome

Admins and super admins can manage users safely.

### User Stories Covered

- US-042: View Own Profile
- US-043: Update Own Profile
- US-044: Prevent Users from Viewing Private Data of Others
- US-055: List Users
- US-056: View User Details
- US-057: Disable User Account
- US-058: Enable User Account
- US-059: Change User Role
- US-060: Prevent Unsafe Role Changes
- US-061: Revoke User Sessions as Admin
- US-116: Get Admin Stats
- US-117: View Recently Registered Users

### Tasks

- [ ] Create users routes.
- [ ] Create users controller.
- [ ] Create users service.
- [ ] Create users repository.
- [ ] Create profile update validation.
- [ ] Create own profile update endpoint.
- [ ] Create GET /api/users.
- [ ] Add pagination.
- [ ] Add filters by role and status.
- [ ] Create GET /api/users/:id.
- [ ] Create PATCH /api/users/:id/status.
- [ ] Prevent unsafe status updates.
- [ ] Revoke sessions when user is disabled.
- [ ] Create PATCH /api/users/:id/role.
- [ ] Require super admin.
- [ ] Prevent users from changing own role.
- [ ] Prevent removing last super admin.
- [ ] Create admin session revocation endpoint.
- [ ] Create GET /api/admin/stats.
- [ ] Add audit logs.

### Deliverables

- User profile management.
- Admin user listing.
- User status management.
- Role management.
- Admin stats endpoint.

### Learning Focus

- Admin APIs.
- Safe role changes.
- User lifecycle.
- Pagination.
- Filtering.
- Privilege escalation prevention.

### Definition of Done

- User can update own safe profile fields.
- Admin can list and view users.
- Admin can disable normal users.
- Super admin can change roles.
- Last super admin cannot be removed.
- Disabled users cannot log in.

## Sprint 11: Posts Module

### Sprint Goal

Build the content publishing system.

### Main Outcome

Editors can create/manage posts, and visitors can read published content.

### User Stories Covered

- US-051: Enforce Ownership on Posts
- US-052: Prevent Access to Draft Posts
- US-062: List Published Posts
- US-063: View Published Post
- US-064: Create Post
- US-065: Update Own Post
- US-066: Delete Own Post
- US-067: Publish Post
- US-068: Archive Post
- US-069: Validate Post Data

### Tasks

- [ ] Create Post Prisma model.
- [ ] Create migration.
- [ ] Add post statuses.
- [ ] Create posts routes.
- [ ] Create posts controller.
- [ ] Create posts service.
- [ ] Create posts repository.
- [ ] Create post validation schemas.
- [ ] Create GET /api/posts.
- [ ] Create GET /api/posts/:id.
- [ ] Create POST /api/posts.
- [ ] Create PATCH /api/posts/:id.
- [ ] Create DELETE /api/posts/:id.
- [ ] Create PATCH /api/posts/:id/publish.
- [ ] Create PATCH /api/posts/:id/archive.
- [ ] Generate slug.
- [ ] Add ownership checks.
- [ ] Add admin override.
- [ ] Add audit logs.

### Deliverables

- Post CRUD.
- Draft/published/archive statuses.
- Post ownership checks.
- Public post reading.

### Learning Focus

- Resource modeling.
- CRUD design.
- Slug generation.
- Ownership checks.
- Public vs private resource visibility.
- Object-level authorization.

### Definition of Done

- Visitors can read published posts.
- Visitors cannot read drafts.
- Editor can create posts.
- Editor can update own posts.
- Editor cannot update another editor’s posts.
- Admin can manage all posts.

## Sprint 12: Comments Module

### Sprint Goal

Add comments with ownership and moderation rules.

### Main Outcome

Users can comment on posts, and admins/editors can moderate comments.

### User Stories Covered

- US-050: Enforce Ownership on Comments
- US-070: List Comments for Post
- US-071: Create Comment
- US-072: Update Own Comment
- US-073: Delete Own Comment
- US-074: Hide Comment as Admin
- US-075: Prevent Commenting on Draft Posts

### Tasks

- [ ] Create Comment Prisma model.
- [ ] Create migration.
- [ ] Add comment statuses.
- [ ] Create comments routes.
- [ ] Create comments controller.
- [ ] Create comments service.
- [ ] Create comments repository.
- [ ] Create comment validation schemas.
- [ ] Create GET /api/posts/:postId/comments.
- [ ] Create POST /api/posts/:postId/comments.
- [ ] Create PATCH /api/comments/:id.
- [ ] Create DELETE /api/comments/:id.
- [ ] Create PATCH /api/comments/:id/hide.
- [ ] Prevent comments on drafts.
- [ ] Prevent comments on archived posts if policy says so.
- [ ] Add comment ownership checks.
- [ ] Add editor moderation for own posts.
- [ ] Add admin moderation override.
- [ ] Add audit logs for moderation.

### Deliverables

- Comment CRUD.
- Comment statuses.
- Ownership checks.
- Moderation endpoints.

### Learning Focus

- Nested resources.
- Parent-child relationships.
- Resource ownership.
- Moderation rules.
- More complex authorization logic.

### Definition of Done

- Users can comment on published posts.
- Users cannot comment on drafts.
- Users can edit/delete own comments.
- Users cannot edit/delete others’ comments.
- Admin can moderate all comments.
- Editor can moderate comments on own posts.

## Sprint 13: Object-Level Authorization Hardening

### Sprint Goal

Review and strengthen all ownership and privilege checks.

### Main Outcome

The project is protected against broken object-level authorization and common privilege escalation
mistakes.

### User Stories Covered

- US-050: Enforce Ownership on Comments
- US-051: Enforce Ownership on Posts
- US-053: Prevent Horizontal Privilege Escalation
- US-054: Prevent Vertical Privilege Escalation
- US-105: Test Object-Level Authorization

### Tasks

- [ ] Create reusable ownership helpers.
- [ ] Check session ownership.
- [ ] Check comment ownership.
- [ ] Check post ownership.
- [ ] Check admin override rules.
- [ ] Prevent user from accessing another user’s private data.
- [ ] Prevent editor from modifying another editor’s posts.
- [ ] Prevent user from revoking another user’s sessions.
- [ ] Prevent admin from modifying super admin account.
- [ ] Prevent admin from assigning super admin role.
- [ ] Review every route that receives an ID param.
- [ ] Add object-level authorization tests.

### Deliverables

- Ownership helper utilities.
- Hardened authorization rules.
- Object-level authorization tests.

### Learning Focus

- BOLA.
- Horizontal privilege escalation.
- Vertical privilege escalation.
- Ownership policies.
- Route-level vs resource-level authorization.

### Definition of Done

- Every route with:id has authorization reviewed.
- Users cannot access resources by changing IDs.
- Admin override rules are intentional and tested.
- Privilege escalation paths are blocked.

## Sprint 14: Audit Logging

### Sprint Goal

Implement full audit logging for sensitive actions.

### Main Outcome

Important security and admin actions are traceable.

### User Stories Covered

- US-076: Record User Registration
- US-077: Record Login Events
- US-078: Record Password Changes
- US-079: Record Role Changes
- US-080: Record Content Moderation Actions
- US-081: View Audit Logs as Admin
- US-082: Protect Audit Logs from Modification
- US-118: View Recently Moderated Content

### Tasks

- [ ] Create AuditLog Prisma model.
- [ ] Create migration.
- [ ] Create audit repository.
- [ ] Create audit service.
- [ ] Add reusable audit function.
- [ ] Log registration.
- [ ] Log login.
- [ ] Log logout.
- [ ] Log email verification.
- [ ] Log password reset.
- [ ] Log password change.
- [ ] Log role changes.
- [ ] Log user disable/enable.
- [ ] Log session revocation.
- [ ] Log token reuse detection.
- [ ] Log post moderation.
- [ ] Log comment moderation.
- [ ] Create GET /api/admin/audit-logs.
- [ ] Add pagination.
- [ ] Add filters.
- [ ] Restrict logs by role.
- [ ] Ensure no update/delete audit routes exist.

### Deliverables

- Audit log model.
- Audit service.
- Admin audit log endpoint.
- Sensitive event logging.

### Learning Focus

- Security traceability.
- Append-only records.
- Admin observability.
- Safe metadata.
- Audit failure handling.

### Definition of Done

- Sensitive actions create audit logs.
- Admin can view allowed logs.
- Super admin can view full logs.
- Regular users cannot view logs.
- Audit logs cannot be modified through public API.

## Sprint 15: Security Hardening

### Sprint Goal

Add security middleware and abuse-prevention features.

### Main Outcome

The API has production-style security protections.

### User Stories Covered

- US-083: Add Security Headers
- US-084: Configure CORS
- US-085: Rate Limit Authentication Routes
- US-086: Protect Against Account Enumeration
- US-088: Use Secure Cookies
- US-089: Add CSRF Protection Strategy
- US-090: Prevent Sensitive Data in Responses

### Tasks

- [ ] Install Helmet.
- [ ] Configure Helmet.
- [ ] Configure CORS from environment.
- [ ] Avoid wildcard CORS in production.
- [ ] Install rate limiting package.
- [ ] Rate limit register.
- [ ] Rate limit login.
- [ ] Rate limit forgot password.
- [ ] Rate limit reset password.
- [ ] Rate limit resend verification.
- [ ] Configure request size limit.
- [ ] Disable x-powered-by.
- [ ] Configure secure cookie options.
- [ ] Implement or document CSRF strategy.
- [ ] Redact sensitive data from logs.
- [ ] Review all responses for sensitive fields.
- [ ] Hide stack traces in production.

### Deliverables

- Helmet setup.
- Safe CORS setup.
- Rate limiting.
- Secure cookie configuration.
- Sensitive data redaction.
- CSRF decision documented or implemented.

### Learning Focus

- HTTP security headers.
- CORS.
- CSRF.
- Rate limiting.
- Cookie security.
- Sensitive data leaks.
- Production error safety.

### Definition of Done

- Sensitive auth routes are rate-limited.
- Cookies use secure options.
- Production does not expose stack traces.
- CORS is restricted.
- Sensitive fields are not logged or returned.

## Sprint 16: Testing Foundation and Core Tests

### Sprint Goal

Add automated tests for the most important backend flows.

### Main Outcome

The app has regression tests for auth, authorization, validation, and errors.

### User Stories Covered

- US-098: Test Registration Flow
- US-099: Test Login Flow
- US-100: Test Refresh Token Flow
- US-101: Test Logout Flow
- US-102: Test Password Reset Flow
- US-103: Test Email Verification Flow
- US-104: Test Authorization Rules
- US-105: Test Object-Level Authorization
- US-106: Test Validation Middleware
- US-107: Test Error Handling

### Tasks

- [ ] Install Jest.
- [ ] Install Supertest.
- [ ] Create test environment.
- [ ] Create test database config.
- [ ] Create test setup file.
- [ ] Create database cleanup helper.
- [ ] Create user factory.
- [ ] Create auth helper.
- [ ] Test health route.
- [ ] Test unknown route.
- [ ] Test validation errors.
- [ ] Test registration.
- [ ] Test login.
- [ ] Test protected routes.
- [ ] Test refresh token flow.
- [ ] Test logout.
- [ ] Test password reset.
- [ ] Test email verification.
- [ ] Test RBAC.
- [ ] Test object-level authorization.
- [ ] Test posts.
- [ ] Test comments.
- [ ] Test audit log access.

### Deliverables

- Test setup.
- Auth tests.
- RBAC tests.
- Object-level authorization tests.
- Error handling tests.
- Validation tests.

### Learning Focus

- Integration testing.
- Supertest.
- Test database.
- Test factories.
- Security regression tests.
- How tests protect auth systems.

### Definition of Done

- Tests run with one command.
- Tests use isolated test data.
- Major auth flows are tested.
- Permission rules are tested.
- Ownership rules are tested.

## Sprint 17: API Documentation

### Sprint Goal

Document the API with Swagger/OpenAPI.

### Main Outcome

The backend has usable API documentation for development and portfolio presentation.

### User Stories Covered

- US-095: Create Swagger Documentation
- US-096: Document Authentication Requirements
- US-097: Document Request and Response Examples

### Tasks

- [ ] Install Swagger/OpenAPI tooling.
- [ ] Create OpenAPI config.
- [ ] Serve docs route.
- [ ] Add API metadata.
- [ ] Document auth endpoints.
- [ ] Document user endpoints.
- [ ] Document post endpoints.
- [ ] Document comment endpoints.
- [ ] Document admin endpoints.
- [ ] Document health endpoints.
- [ ] Add request examples.
- [ ] Add response examples.
- [ ] Add validation error examples.
- [ ] Add unauthorized error examples.
- [ ] Add forbidden error examples.
- [ ] Document pagination format.
- [ ] Document auth requirements.

### Deliverables

- Swagger/OpenAPI docs.
- Route documentation.
- Request/response examples.

### Learning Focus

- API contracts.
- Documentation standards.
- Developer experience.
- Communicating auth requirements.

### Definition of Done

- API docs are available locally.
- Major endpoints are documented.
- Protected routes show authentication requirements.
- Request and response examples are included.

## Sprint 18: Developer Experience and README

### Sprint Goal

Make the project easy to run, understand, test, and maintain.

### Main Outcome

Another developer can clone and run the project.

### User Stories Covered

- US-108: Add Development Scripts
- US-109: Add Linting and Formatting
- US-110: Add README

### Tasks

- [ ] Install ESLint.
- [ ] Install Prettier.
- [ ] Configure ESLint.
- [ ] Configure Prettier.
- [ ] Add lint script.
- [ ] Add format script.
- [ ] Add dev script.
- [ ] Add start script.
- [ ] Add test script.
- [ ] Add test:watch script.
- [ ] Add db:migrate script.
- [ ] Add db:seed script.
- [ ] Add db:studio script.
- [ ] Add db:reset script.
- [ ] Write README project overview.
- [ ] Add setup instructions.
- [ ] Add environment variable documentation.
- [ ] Add database setup instructions.
- [ ] Add testing instructions.
- [ ] Add API docs link.
- [ ] Add security notes.
- [ ] Add deployment notes.

### Deliverables

- ESLint config.
- Prettier config.
- Useful scripts.
- Complete README.

### Learning Focus

- Developer experience.
- Code style.
- Project maintainability.
- How to present a backend project professionally.

### Definition of Done

- Project can be installed and run from README.
- Scripts are clear.
- Code style tools work.
- README explains the project well.

## Sprint 19: Docker and Production Readiness

### Sprint Goal

Prepare the backend for production-style deployment.

### Main Outcome

The app can run in containers and shut down safely.

### User Stories Covered

- US-111: Add Docker Compose for Local Development
- US-112: Add Dockerfile
- US-113: Add Graceful Shutdown
- US-114: Add Production Logging
- US-115: Add Deployment Configuration Notes

### Tasks

- [ ] Create Dockerfile.
- [ ] Create .dockerignore.
- [ ] Improve Docker Compose file.
- [ ] Add app service if desired.
- [ ] Add PostgreSQL service.
- [ ] Test Docker build.
- [ ] Test app container connection to database.
- [ ] Add graceful shutdown.
- [ ] Handle SIGTERM.
- [ ] Handle SIGINT.
- [ ] Close HTTP server.
- [ ] Disconnect Prisma.
- [ ] Improve production logging.
- [ ] Configure production environment behavior.
- [ ] Document migration deployment command.
- [ ] Document production start command.
- [ ] Document HTTPS/cookie assumptions.
- [ ] Document CORS production setup.

### Deliverables

- Dockerfile.
- Docker Compose setup.
- Graceful shutdown.
- Production configuration notes.
- Deployment-ready README section.

### Learning Focus

- Containers.
- Production config.
- Graceful shutdown.
- Deployment concerns.
- Environment-specific behavior.

### Definition of Done

- Docker image builds.
- App can run with Docker.
- Database connection works.
- App shuts down gracefully.
- Production notes are documented.

## Sprint 20: Final Review and Portfolio Polish

### Sprint Goal

Review security, quality, documentation, and portfolio readiness.

### Main Outcome

The project is ready to be shown as a serious backend portfolio project.

### User Stories Covered

- US-122: Understand Authentication
- US-123: Understand Authorization
- US-124: Understand Production Backend Structure
- US-125: Understand Backend Security Basics

### Tasks

- [ ] Review all auth flows.
- [ ] Review all authorization checks.
- [ ] Review object-level authorization.
- [ ] Review sensitive data exposure.
- [ ] Review logs for secrets.
- [ ] Review error responses.
- [ ] Review tests.
- [ ] Review README.
- [ ] Review API docs.
- [ ] Review Docker setup.
- [ ] Review environment variables.
- [ ] Run all tests.
- [ ] Run lint.
- [ ] Run format.
- [ ] Create final project summary.
- [ ] Document key learning outcomes.
- [ ] Add example API requests if useful.
- [ ] Add architecture diagram later if desired.

### Deliverables

- Final security review.
- Final code quality review.
- Final README polish.
- Final portfolio-ready version.

### Learning Focus

- Production review mindset.
- Security checklist thinking.
- Portfolio presentation.
- Explaining technical decisions.

### Definition of Done

- Tests pass.
- Lint passes.
- README is complete.
- API docs are complete.
- Security decisions are documented.
- Project can be explained clearly in interviews.

## Recommended Sprint Order

- Sprint 0 → Planning and Technical Decisions
- Sprint 1 → Express Project Foundation
- Sprint 2 → Database and Prisma Foundation
- Sprint 3 → App Architecture and Core Utilities
- Sprint 4 → Registration and Password Hashing
- Sprint 5 → Email Verification
- Sprint 6 → Login and Access Tokens
- Sprint 7 → Refresh Tokens, Logout, and Sessions
- Sprint 8 → Forgot Password, Reset Password, and Change Password
- Sprint 9 → RBAC and Permission Middleware
- Sprint 10 → User Management
- Sprint 11 → Posts Module
- Sprint 12 → Comments Module
- Sprint 13 → Object-Level Authorization Hardening
- Sprint 14 → Audit Logging
- Sprint 15 → Security Hardening
- Sprint 16 → Testing Foundation and Core Tests
- Sprint 17 → API Documentation
- Sprint 18 → Developer Experience and README
- Sprint 19 → Docker and Production Readiness
- Sprint 20 → Final Review and Portfolio Polish

## Suggested MVP Sprint Cut

The first serious MVP should include Sprints 0–13.
That gives us:

- Project setup
- Database setup
- Register
- Login
- JWT auth
- Refresh tokens
- Logout
- Sessions
- Password reset
- Email verification
- RBAC
- User management
- Posts
- Comments
- Object-level authorization

After that, Sprints 14–20 make it production-grade:

- Audit logs
- Security hardening
- Tests
- API docs
- Docker
- README
- Final review

## How We Will Work Through Each Sprint

For every sprint, we should follow this routine:

### 1. Explain the concept

Before writing code, explain what we are building and why it exists.

### 2. Design the flow

Draw or describe the request flow.
Example:
```text
Request → Route → Middleware → Controller → Service → Repository → Database
```

### 3. Build the files

Create the needed files step by step.

### 4. Explain every important line

No copy-paste coding without understanding.

### 5. Test manually

Use Postman, Insomnia, Thunder Client, or curl.

### 6. Add automated tests where appropriate

Especially for auth, authorization, and security-sensitive flows.

### 7. Review mistakes and improvements

At the end of each sprint, review:

- What we built.
- What we learned.
- What can go wrong.
- What production apps do differently.

## First Sprint To Start With

We should begin with:

**Sprint 0: Planning and Technical Decisions**

Then immediately move into:

**Sprint 1: Express Project Foundation**

The first coding result will be a running Express API with:

- src/app.js
- src/server.js
- .env
- .env.example
- GET /health
- GET /api/version
- Central 404 handler
- Central error handler
- Request ID middleware
- Basic logging
