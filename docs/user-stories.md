# User Stories

## Secure Publishing Platform API

## 1. Overview
This document defines the user stories for the Secure Publishing Platform API.

The project is a production-style backend built with:
- Node.js
- Express.js
- JavaScript
- PostgreSQL
- Prisma
- JWT authentication
- Refresh tokens
- Role-based access control
- Permission-based authorization
- Secure cookies
- API validation
- Testing
- Documentation
- Production-readiness practices

The goal of these user stories is to describe what the system should do from the perspective of users, admins, super admins, and developers.

## 2. Actors

### Visitor
A visitor is someone who is not logged in.

### Registered User
A registered user has an account but may or may not have verified their email.

### Verified User
A verified user has completed email verification.

### Editor
An editor can create and manage posts.

### Admin
An admin can manage users, posts, comments, and view some audit logs.

### Super Admin
A super admin has the highest level of access and can manage roles and sensitive system settings.

### System
The backend system itself.

### Developer
The person building, testing, documenting, and deploying the backend.

## 3. User Story Format
Each story follows this format:

```
As a [type of user],
I want [some goal],
So that [some reason].
```

Each story also includes acceptance criteria that describe when the story is complete.

## Epic 1: Project Foundation

### US-001: Initialize Express Application
As a developer,  
I want to initialize a clean Express.js application,  
So that the project has a strong foundation.

**Acceptance criteria:**
- Express is installed and configured.
- The app can start successfully.
- The server listens on a configurable port.
- The project uses JavaScript.
- The app and server are separated into different files.
- The app can be imported in tests without starting the server.

### US-002: Add Project Folder Structure
As a developer,  
I want a clear folder structure,  
So that the codebase stays maintainable as the project grows.

**Acceptance criteria:**
- The project has a `src` directory.
- Routes, controllers, services, repositories, middlewares, config, and utils are separated.
- Auth, users, posts, comments, roles, and audit modules have their own folders.
- Route files do not contain business logic.
- Business logic is placed in service files.
- Database logic is placed in repository files.

### US-003: Add Environment Configuration
As a developer,  
I want environment variables to configure the application,  
So that secrets and environment-specific values are not hardcoded.

**Acceptance criteria:**
- The app reads configuration from environment variables.
- Required variables are validated during startup.
- The app fails fast if required environment variables are missing.

• `.env.example` exists.

• `.env` is ignored by Git.
- Sensitive values are not committed to source control.

### US-004: Add Health Check Endpoint
As a developer,  
I want a health check endpoint,  
So that I can verify the API is running.

**Acceptance criteria:**
- `GET /health` returns a successful response.
- The response includes API status.
- The response includes environment name.
- The response does not expose sensitive configuration.
- The route works without authentication.

### US-005: Add API Version Endpoint
As a developer,  
I want an API version endpoint,  
So that clients can know which version of the API they are using.

**Acceptance criteria:**
- `GET /api/version` returns the API version.
- The route works without authentication.
- The version value comes from configuration or package metadata.
- The response format is consistent with the rest of the API.

### US-006: Add Centralized Error Handler
As a developer,  
I want centralized error handling,  
So that all API errors are consistent and safe.

**Acceptance criteria:**
- All thrown errors are handled by one error middleware.
- Validation errors return a structured response.
- Unauthorized errors return a structured response.
- Forbidden errors return a structured response.
- Not-found errors return a structured response.
- Production errors do not expose stack traces.
- Development errors may include useful debugging details.

### US-007: Add Not Found Handler
As a developer,  
I want unknown routes to return a proper 404 response,  
So that clients receive clear API errors.

**Acceptance criteria:**
- Unknown routes return HTTP 404.
- The response includes a consistent error format.
- The response does not crash the server.
- The response does not expose internal route details.

### US-008: Add Request Logging
As a developer,  
I want incoming requests to be logged,  
So that I can debug and monitor API behavior.

**Acceptance criteria:**
- Each request is logged.
- Logs include method, URL, status code, and response time.
- Logs include request ID.
- Logs do not include passwords.
- Logs do not include raw tokens.
- Logs do not include cookies.

### US-009: Add Request ID Middleware
As a developer,  
I want every request to have a request ID,  
So that logs and errors can be traced.

**Acceptance criteria:**
- Each request receives a unique request ID.
- The request ID is available in the request object.
- The request ID appears in response headers.
- The request ID appears in logs.
- Existing client-provided request IDs may be reused safely.

## Epic 2: Database Foundation

### US-010: Set Up PostgreSQL
As a developer,  
I want PostgreSQL as the database,  
So that the app uses a real production-style relational database.

**Acceptance criteria:**
- PostgreSQL is configured locally.
- The app connects to PostgreSQL using `DATABASE_URL`.
- Database connection errors are handled.
- The database can run through Docker Compose.
- The app does not use an in-memory database for development.

### US-011: Set Up Prisma
As a developer,  
I want Prisma configured,  
So that I can model the database and run migrations.

**Acceptance criteria:**
- Prisma is installed.
- Prisma schema exists.
- Prisma client is generated.
- The app can query the database through Prisma.
- Prisma configuration uses environment variables.

### US-012: Create Initial Database Migration
As a developer,  
I want an initial migration,  
So that the database schema is version-controlled.

**Acceptance criteria:**
- A migration exists for the first schema.
- The migration can be applied locally.
- The migration creates required tables.
- The migration can be reset during development.
- Schema changes are not done manually in the database.

### US-013: Seed Roles and Permissions
As a developer,  
I want default roles and permissions seeded,  
So that the system has initial authorization data.

**Acceptance criteria:**
- Roles are seeded: `user`, `editor`, `admin`, `super_admin`.
- Permissions are seeded.
- Role-permission relationships are seeded.
- Seed script can be run repeatedly without duplicating data.
- A first super admin can be created safely for development.

## Epic 3: User Registration

### US-014: Register New User
As a visitor,  
I want to create an account,  
So that I can access authenticated features.

**Acceptance criteria:**
- `POST /api/auth/register` exists.
- Request requires name, email, and password.
- Email must be valid.
- Password must meet strength requirements.
- Duplicate emails are rejected.
- Password is hashed before storage.
- New user receives the `user` role.
- Response does not include password hash.
- User starts as unverified.

### US-015: Prevent Duplicate Registration
As a visitor,  
I want the system to prevent duplicate accounts with the same email,  
So that each email belongs to only one account.

**Acceptance criteria:**
- Email field has a unique database constraint.
- Registering with an existing email fails.
- The response uses a safe error message.
- The app handles race conditions caused by simultaneous requests.
- Duplicate email errors do not crash the server.

### US-016: Validate Registration Data
As a visitor,  
I want clear validation errors when registration data is invalid,  
So that I can fix my input.

**Acceptance criteria:**
- Missing name is rejected.
- Missing email is rejected.
- Invalid email is rejected.
- Missing password is rejected.
- Weak password is rejected.
- Extra unsafe fields are ignored or rejected.
- Validation errors use the standard API error format.

### US-017: Hash User Password
As a system,  
I want passwords to be hashed before storage,  
So that raw passwords are never saved.

**Acceptance criteria:**
- Passwords are hashed using bcrypt or argon2.
- Raw password is never stored.
- Raw password is never logged.
- Password hash is not returned in API responses.
- Password comparison works during login.

### US-018: Create Email Verification Token After Registration
As a system,  
I want to create an email verification token after registration,  
So that new users can verify their email addresses.

**Acceptance criteria:**
- A verification token is generated after registration.
- The raw token is returned only to the email service.
- The token is stored as a hash in the database.
- The token has an expiration time.
- The token is linked to the user.
- Old unused verification tokens may be invalidated or ignored.

## Epic 4: Email Verification

### US-019: Send Verification Email
As a registered user,  
I want to receive a verification email,  
So that I can verify my account.

**Acceptance criteria:**
- Verification email is sent after registration.
- Email service is abstracted behind a utility or service.
- Development mode can log email links instead of sending real emails.
- Email content includes a verification link or token.
- Raw verification tokens are not logged in production.

### US-020: Verify Email
As a registered user,  
I want to verify my email,  
So that my account becomes trusted.

**Acceptance criteria:**
- `POST /api/auth/verify-email` exists.
- Endpoint accepts verification token.
- Token is hashed and compared with stored token hash.
- Expired tokens are rejected.
- Used tokens are rejected.
- Valid token marks user email as verified.
- Token is marked as used after successful verification.
- User receives a success response.

### US-021: Reject Invalid Verification Token
As a registered user,  
I want invalid verification tokens to be rejected,  
So that account verification stays secure.

**Acceptance criteria:**
- Random invalid tokens are rejected.
- Expired tokens are rejected.
- Already-used tokens are rejected.
- Tokens for deleted or disabled users are rejected.
- Error response does not expose sensitive token details.

### US-022: Resend Verification Email
As an unverified user,

I want to request another verification email,  
So that I can verify my account if the first email was lost.

**Acceptance criteria:**
- `POST /api/auth/resend-verification` exists.
- Only unverified users can request a new verification email.
- Already verified users receive a safe response.
- New verification token is generated.
- Old token is invalidated or made unusable.
- Endpoint is rate-limited.

### US-023: Restrict Sensitive Actions for Unverified Users
As a system,  
I want to restrict some actions for unverified users,  
So that important actions require a verified email.

**Acceptance criteria:**
- Unverified users can log in.
- Unverified users can access limited account features.
- Unverified users cannot create posts.
- Unverified users may be blocked from commenting depending on policy.
- Error message explains that email verification is required.
- Verified users can access allowed features.

## Epic 5: Login and Authentication

### US-024: Login User
As a registered user,  
I want to log in with email and password,  
So that I can access my account.

**Acceptance criteria:**
- `POST /api/auth/login` exists.
- Request requires email and password.
- Email and password are validated.
- Password is compared with stored password hash.
- Valid credentials return authenticated session data.
- Invalid credentials return a generic error.
- Password hash is not returned.
- Login attempts are rate-limited.

### US-025: Reject Invalid Login Credentials
As a system,  
I want invalid login attempts to fail safely,  
So that attackers cannot learn account information.

**Acceptance criteria:**
- Wrong email fails.
- Wrong password fails.
- Disabled user fails.
- Error message does not reveal whether email or password was wrong.
- Failed login does not generate tokens.
- Failed login may be logged without sensitive data.

### US-026: Issue Access Token
As a registered user,  
I want to receive an access token after login,  
So that I can access protected API routes.

**Acceptance criteria:**
- Access token is created after successful login.
- Access token contains user identifier.
- Access token has a short expiration time.
- Access token is signed with a secret.
- Access token does not contain sensitive data.
- Protected routes can verify the access token.

### US-027: Issue Refresh Token
As a registered user,  
I want to receive a refresh token after login,  
So that I can stay logged in without repeatedly entering my password.

**Acceptance criteria:**
- Refresh token is created after successful login.
- Refresh token is cryptographically secure.
- Refresh token is stored as a hash in the database.
- Refresh token has an expiration time.
- Refresh token is linked to the user session.
- Refresh token is sent using a secure cookie strategy.

### US-028: Authenticate Protected Routes
As a registered user,  
I want protected routes to recognize me,  
So that I can access private features.

**Acceptance criteria:**
- Authentication middleware exists.
- Middleware reads the access token.
- Middleware verifies token signature.
- Middleware rejects expired tokens.
- Middleware rejects invalid tokens.
- Middleware attaches authenticated user to the request.
- Protected routes reject unauthenticated requests.

### US-029: Get Current User
As a registered user,  
I want to get my current account information,  
So that I can confirm I am logged in.

**Acceptance criteria:**
- `GET /api/auth/me` exists.
- Route requires authentication.
- Response includes safe user profile data.
- Response includes role information.
- Response may include permissions.
- Response does not include password hash.
- Response does not include raw tokens.

## Epic 6: Logout and Session Management

### US-030: Logout Current Session
As a logged-in user,  
I want to log out,  
So that my current session becomes invalid.

**Acceptance criteria:**
- `POST /api/auth/logout` exists.
- Route revokes the current refresh token.
- Auth cookies are cleared.
- Revoked refresh token cannot be used again.
- Logout succeeds even if access token is close to expiration.
- Logout creates an audit log entry.

### US-031: Refresh Access Token
As a logged-in user,  
I want to refresh my access token,  
So that I do not need to log in again when the access token expires.

**Acceptance criteria:**
- `POST /api/auth/refresh` exists.
- Endpoint reads refresh token.
- Refresh token hash is checked in database.
- Expired refresh token is rejected.
- Revoked refresh token is rejected.
- Valid refresh token returns a new access token.
- Valid refresh token rotates the refresh token.

### US-032: Rotate Refresh Token
As a system,  
I want refresh tokens to rotate after use,  
So that stolen refresh tokens are harder to reuse.

**Acceptance criteria:**
- Every successful refresh invalidates the old refresh token.
- A new refresh token is generated.
- New refresh token is stored as a hash.
- Old token stores reference to replacement token where useful.
- Old token cannot be used again.
- Token chain can be inspected during suspicious activity.

### US-033: Detect Refresh Token Reuse
As a system,  
I want to detect reused refresh tokens,  
So that stolen tokens can be handled securely.

**Acceptance criteria:**
- Reuse of a revoked refresh token is detected.
- Suspicious token reuse revokes related token family or session.
- User may be forced to log in again.
- Event is recorded in audit logs.
- Response does not reveal internal token details.

### US-034: View Own Sessions
As a logged-in user,  
I want to view my active sessions,  
So that I can see where I am logged in.

**Acceptance criteria:**
- `GET /api/auth/sessions` exists.
- Route requires authentication.
- User sees only their own sessions.
- Response includes user agent, IP, created date, and expiration date.
- Response does not expose token hashes.
- Revoked sessions are clearly marked or excluded.

### US-035: Revoke Own Session
As a logged-in user,  
I want to revoke one of my sessions,  
So that I can log out from another device.

**Acceptance criteria:**
- `DELETE /api/auth/sessions/:sessionId` exists.
- User can revoke only their own sessions.
- Revoked session can no longer refresh tokens.
- User cannot revoke another user’s session.
- Revocation creates an audit log entry.

### US-036: Revoke All Other Sessions
As a logged-in user,  
I want to revoke all sessions except the current one,  
So that I can secure my account.

**Acceptance criteria:**
- Endpoint exists for revoking all other sessions.
- Route requires authentication.
- Current session remains active.
- Other refresh tokens are revoked.
- Action creates an audit log entry.
- Response shows number of sessions revoked.

## Epic 7: Password Management

### US-037: Request Password Reset
As a registered user,  
I want to request a password reset,  
So that I can recover access if I forget my password.

**Acceptance criteria:**
- `POST /api/auth/forgot-password` exists.
- Request requires email.
- Response is generic whether email exists or not.
- Existing user receives reset email.
- Reset token is stored as a hash.
- Reset token expires.
- Endpoint is rate-limited.
- Raw reset token is not logged in production.

### US-038: Reset Password
As a registered user,  
I want to reset my password using a valid token,  
So that I can regain access to my account.

**Acceptance criteria:**
- `POST /api/auth/reset-password` exists.
- Request requires token and new password.
- Token is validated securely.
- Expired token is rejected.
- Used token is rejected.
- New password is hashed.
- Old password no longer works.
- Reset token is marked as used.
- Existing sessions are revoked.

### US-039: Reject Weak New Password
As a registered user,  
I want weak new passwords to be rejected,  
So that my account remains secure.

**Acceptance criteria:**
- New password must meet password rules.
- Password validation is reused across register and reset flows.
- Weak password returns validation error.
- Password rules are documented.
- Password is not partially accepted.

### US-040: Change Password While Logged In
As a logged-in user,  
I want to change my password,  
So that I can update my credentials securely.

**Acceptance criteria:**
- `POST /api/auth/change-password` exists.
- Route requires authentication.
- Request requires current password.
- Request requires new password.
- Current password must be correct.
- New password must meet strength rules.
- New password is hashed.
- Other sessions are revoked after password change.
- Action creates an audit log entry.

### US-041: Prevent Password Reset Token Reuse
As a system,  
I want reset tokens to be single-use,  
So that a reset link cannot be reused after success.

**Acceptance criteria:**
- Used reset token is rejected.
- Reset token has `used_at` value after successful reset.
- Multiple reset attempts with same token fail.
- Used-token errors do not expose sensitive details.

## Epic 8: User Profile

### US-042: View Own Profile
As a logged-in user,  
I want to view my profile,  
So that I can see my account details.

**Acceptance criteria:**
- Authenticated user can view own profile.
- Response includes id, name, email, role, status, and verification state.
- Response does not include password hash.
- Response does not include token data.
- Unauthenticated request is rejected.

### US-043: Update Own Profile
As a logged-in user,  
I want to update my profile,  
So that I can keep my account information current.

**Acceptance criteria:**
- User can update allowed profile fields.
- User cannot update role.
- User cannot update account status.
- User cannot update password through profile route.
- Invalid data is rejected.
- Update changes `updated_at`.

### US-044: Prevent Users from Viewing Private Data of Others
As a logged-in user,  
I want other users to be prevented from viewing my private account data,  
So that my personal data is protected.

**Acceptance criteria:**
- Users cannot access another user’s private profile.
- Admins can access user management data.
- Public user information, if exposed, is limited.
- Authorization checks happen before returning data.
- Forbidden requests return HTTP 403.

## Epic 9: Role-Based Access Control

### US-045: Assign Default Role
As a system,  
I want new accounts to receive the default user role,  
So that all users have predictable permissions.

**Acceptance criteria:**
- New users receive `user` role.
- Default role comes from seeded data.
- Registration fails safely if default role is missing.
- New users do not receive elevated permissions.

### US-046: Check Permissions with Middleware
As a developer,  
I want reusable authorization middleware,  
So that protected routes can enforce permissions consistently.

**Acceptance criteria:**
- Authorization middleware exists.
- Middleware can check required permission.
- Middleware can check role when needed.
- Middleware returns 401 when user is not authenticated.
- Middleware returns 403 when user lacks permission.
- Route files can compose authentication and authorization middleware.

### US-047: Restrict Admin Routes
As an admin,

I want admin routes to be restricted,  
So that only authorized staff can access administrative features.

**Acceptance criteria:**
- Admin routes require authentication.
- Admin routes require admin-level permissions.
- Regular users are rejected.
- Editors are rejected unless explicitly allowed.
- Admin and super admin users can access allowed routes.

### US-048: Restrict Super Admin Routes
As a super admin,  
I want sensitive routes to be restricted to super admins,  
So that dangerous actions are controlled.

**Acceptance criteria:**
- Role-change routes require super admin access.
- Admin-management routes require super admin access.
- Regular admins cannot assign super admin role.
- Regular admins cannot remove super admin privileges.
- Unauthorized access is logged where appropriate.

### US-049: Load User Permissions
As a system,  
I want to load a user’s permissions during authorization,  
So that access checks are based on assigned role capabilities.

**Acceptance criteria:**
- User role is loaded with permissions.
- Permissions are checked consistently.
- Disabled users are rejected.
- Missing role data causes safe failure.
- Permission loading avoids unnecessary repeated database queries where possible.

## Epic 10: Object-Level Authorization

### US-050: Enforce Ownership on Comments
As a user,  
I want only my own comments to be editable by me,  
So that other users cannot change my content.

**Acceptance criteria:**
- User can update own comment.
- User cannot update another user’s comment.
- User can delete own comment.
- User cannot delete another user’s comment.
- Admin can moderate any comment.
- Editor can moderate comments on their own posts.

### US-051: Enforce Ownership on Posts
As an editor,

I want to manage my own posts,  
So that I can control content I created.

**Acceptance criteria:**
- Editor can create posts.
- Editor can update own posts.
- Editor can delete own posts.
- Editor cannot update another editor’s post.
- Editor cannot delete another editor’s post.
- Admin can manage all posts.

### US-052: Prevent Access to Draft Posts
As an editor,

I want draft posts to be private,  
So that unpublished content is not visible publicly.

**Acceptance criteria:**
- Visitors cannot view draft posts.
- Regular users cannot view draft posts.
- Post owner can view own drafts.
- Admin can view drafts for moderation.
- Super admin can view drafts.
- Published posts remain public.

### US-053: Prevent Horizontal Privilege Escalation
As a system,  
I want users to be blocked from accessing resources belonging to others,  
So that object-level authorization is enforced.

**Acceptance criteria:**
- Users cannot access other users’ private records by changing URL IDs.
- Users cannot modify another user’s comments.
- Editors cannot modify another editor’s posts.
- Session IDs are checked against authenticated user.
- Forbidden resource access returns HTTP 403 or 404 based on security policy.

### US-054: Prevent Vertical Privilege Escalation
As a system,  
I want users to be blocked from performing higher-privilege actions,  
So that roles cannot be bypassed.

**Acceptance criteria:**
- Regular users cannot create posts.
- Editors cannot manage users.
- Admins cannot assign super admin role.
- Admins cannot remove super admin role.
- Only super admins can change roles.
- Permission checks are enforced server-side.

## Epic 11: User Management

### US-055: List Users
As an admin,

I want to list users,  
So that I can manage the platform.

**Acceptance criteria:**
- `GET /api/users` exists.
- Route requires admin permission.
- Regular users cannot access it.
- Editors cannot access it.
- Results are paginated.
- Results can be filtered by role or status.
- Response does not include password hashes.

### US-056: View User Details
As an admin,

I want to view user details,  
So that I can inspect user accounts.

**Acceptance criteria:**
- `GET /api/users/:id` exists.
- Route requires admin permission.
- Admin can view allowed user details.
- Super admin can view higher-level details.
- Response does not include password hash.
- Invalid user ID returns not found.

### US-057: Disable User Account
As an admin,

I want to disable a user account,  
So that abusive or compromised accounts can be blocked.

**Acceptance criteria:**
- `PATCH /api/users/:id/status` exists.
- Admin can disable regular users.
- Admin cannot disable super admins.
- Disabled user cannot log in.
- Disabled user’s active sessions are revoked.
- Action creates an audit log entry.

### US-058: Enable User Account
As an admin,

I want to re-enable a disabled account,  
So that a user can regain access.

**Acceptance criteria:**
- Admin can enable disabled users.
- Enabled user can log in again.
- Action creates an audit log entry.
- Invalid status values are rejected.
- Regular users cannot enable accounts.

### US-059: Change User Role
As a super admin,  
I want to change a user’s role,  
So that I can manage platform permissions.

**Acceptance criteria:**
- `PATCH /api/users/:id/role` exists.
- Route requires super admin permission.
- Role must be valid.
- Super admin can promote user to editor or admin.
- Super admin can demote users.
- Action creates an audit log entry.
- Response includes updated role.

### US-060: Prevent Unsafe Role Changes
As a system,  
I want to prevent unsafe role changes,  
So that the platform does not lose administrative control.

**Acceptance criteria:**
- System prevents removing the last super admin.
- Admin cannot assign super admin role.
- Admin cannot demote super admins.
- Users cannot change their own role.
- Invalid role names are rejected.
- Role changes are audited.

### US-061: Revoke User Sessions as Admin
As an admin,

I want to revoke a user’s sessions,  
So that compromised accounts can be secured.

**Acceptance criteria:**
- Admin can revoke sessions for regular users.
- Super admin can revoke sessions for admins.
- Regular user cannot revoke another user’s sessions.
- Revoked sessions cannot refresh tokens.
- Action creates an audit log entry.

## Epic 12: Posts

### US-062: List Published Posts
As a visitor,  
I want to view published posts,  
So that I can read public content.

**Acceptance criteria:**
- `GET /api/posts` exists.
- Route works without authentication.
- Only published posts are visible publicly.
- Results are paginated.
- Results can be sorted by date.
- Response includes author public information.
- Draft and archived posts are hidden from public users.

### US-063: View Published Post
As a visitor,  
I want to view a published post,  
So that I can read its content.

**Acceptance criteria:**
- `GET /api/posts/:id` exists.
- Published post is visible publicly.
- Draft post is not visible publicly.
- Archived post visibility follows project rules.
- Invalid post ID returns not found.
- Response includes safe author data.

### US-064: Create Post
As an editor,

I want to create a post,  
So that I can publish content.

**Acceptance criteria:**
- `POST /api/posts` exists.
- Route requires authentication.
- Route requires post creation permission.
- Request requires title and content.
- Slug is generated or validated.
- New post is linked to authenticated editor.
- User role cannot create posts.
- Action creates an audit log entry.

### US-065: Update Own Post
As an editor,

I want to update my own post,  
So that I can improve my content.

**Acceptance criteria:**
- `PATCH /api/posts/:id` exists.
- Editor can update own post.
- Editor cannot update another editor’s post.
- Admin can update any post.
- Invalid data is rejected.
- Update changes `updated_at`.
- Action creates an audit log entry.

### US-066: Delete Own Post
As an editor,

I want to delete my own post,  
So that I can remove content I created.

**Acceptance criteria:**
- `DELETE /api/posts/:id` exists.
- Editor can delete own post.
- Editor cannot delete another editor’s post.
- Admin can delete any post.
- Delete can be soft delete or status-based archive.
- Action creates an audit log entry.

### US-067: Publish Post
As an editor,

I want to publish my post,  
So that visitors can read it.

**Acceptance criteria:**
- `PATCH /api/posts/:id/publish` exists.
- Editor can publish own post.
- Editor cannot publish another editor’s post.
- Admin can publish any post.
- Published post becomes publicly visible.
- Action creates an audit log entry.

### US-068: Archive Post
As an editor,

I want to archive my post,  
So that it is no longer publicly active.

**Acceptance criteria:**
- `PATCH /api/posts/:id/archive` exists.
- Editor can archive own post.
- Editor cannot archive another editor’s post.
- Admin can archive any post.
- Archived post is hidden or handled according to visibility rules.
- Action creates an audit log entry.

### US-069: Validate Post Data
As a developer,  
I want post request data to be validated,  
So that invalid content does not enter the system.

**Acceptance criteria:**
- Title is required.
- Content is required.
- Status must be valid.
- Title length is limited.
- Content length has a reasonable limit.
- Invalid data returns validation error.

## Epic 13: Comments

### US-070: List Comments for Post
As a visitor,  
I want to view comments on a post,  
So that I can read discussion around the content.

**Acceptance criteria:**
- `GET /api/posts/:postId/comments` exists.
- Route works without authentication.
- Only visible comments are returned publicly.
- Hidden or deleted comments are excluded.
- Results are paginated.
- Response includes safe author data.

### US-071: Create Comment
As a verified user,  
I want to comment on a post,  
So that I can participate in discussion.

**Acceptance criteria:**
- `POST /api/posts/:postId/comments` exists.
- Route requires authentication.
- Route may require verified email.
- Comment content is required.
- Comment is linked to authenticated user.
- Comment is linked to target post.
- Users cannot comment on non-existing posts.
- Users cannot comment on unavailable posts.

### US-072: Update Own Comment
As a user,  
I want to update my own comment,  
So that I can fix mistakes.

**Acceptance criteria:**
- `PATCH /api/comments/:id` exists.
- User can update own comment.
- User cannot update another user’s comment.
- Admin can update or moderate any comment.
- Empty comment content is rejected.
- Update changes `updated_at`.

### US-073: Delete Own Comment
As a user,  
I want to delete my own comment,  
So that I can remove my contribution.

**Acceptance criteria:**
- `DELETE /api/comments/:id` exists.
- User can delete own comment.
- User cannot delete another user’s comment.
- Admin can delete any comment.
- Deleted comment is no longer publicly visible.
- Action creates an audit log entry if required.

### US-074: Hide Comment as Admin
As an admin,

I want to hide inappropriate comments,  
So that I can moderate discussions.

**Acceptance criteria:**
- `PATCH /api/comments/:id/hide` exists.
- Route requires admin or moderation permission.
- Admin can hide any comment.
- Editor can hide comments on their own posts.
- Hidden comments are not publicly visible.
- Action creates an audit log entry.

### US-075: Prevent Commenting on Draft Posts
As a system,  
I want users to be blocked from commenting on draft posts,  
So that private content is not discussed publicly.

**Acceptance criteria:**
- Users cannot comment on draft posts.
- Users cannot comment on archived posts if policy forbids it.
- Admins may still moderate existing comments.
- Error response is clear and safe.

## Epic 14: Audit Logs

### US-076: Record User Registration
As a system,  
I want to record registration events,  
So that account creation can be audited.

**Acceptance criteria:**
- Successful registration creates audit log entry.
- Log includes actor or target user.
- Log includes IP address where available.
- Log includes user agent where available.
- Log does not include password.

### US-077: Record Login Events
As a system,  
I want to record login events,  
So that suspicious account activity can be reviewed.

**Acceptance criteria:**
- Successful login creates audit log entry.
- Failed login may create a limited security log.
- Log includes IP address and user agent.
- Log does not include password.
- Log does not expose tokens.

### US-078: Record Password Changes
As a system,  
I want to record password reset and password change events,  
So that account security actions are traceable.

**Acceptance criteria:**
- Password reset success is logged.
- Password change success is logged.
- Forgot password request may be logged safely.
- Logs do not reveal whether unknown emails exist.
- Logs do not include reset tokens.

### US-079: Record Role Changes
As a system,  
I want to record role changes,  
So that permission changes can be audited.

**Acceptance criteria:**
- Role change creates audit log entry.
- Log includes actor ID.
- Log includes target user ID.
- Log includes old role and new role.
- Only authorized users can view role-change logs.

### US-080: Record Content Moderation Actions
As a system,  
I want to record post and comment moderation actions,  
So that admin actions are traceable.

**Acceptance criteria:**
- Post deletion is logged.
- Post archive is logged.
- Comment hiding is logged.
- Comment deletion is logged.
- Log includes actor, target type, and target ID.

### US-081: View Audit Logs as Admin
As an admin,

I want to view allowed audit logs,  
So that I can monitor platform activity.

**Acceptance criteria:**
- `GET /api/admin/audit-logs` exists.
- Route requires admin permission.
- Regular users cannot access audit logs.
- Results are paginated.
- Admin sees only allowed logs.
- Super admin can see all logs.

### US-082: Protect Audit Logs from Modification
As a system,  
I want audit logs to be append-only,  
So that historical security records cannot be tampered with through the API.

**Acceptance criteria:**
- No public update endpoint exists for audit logs.
- No public delete endpoint exists for audit logs.
- Audit logs are created only through internal service.
- Unauthorized users cannot modify audit records.

## Epic 15: Security and Abuse Prevention

### US-083: Add Security Headers
As a developer,  
I want security headers enabled,  
So that common browser-facing risks are reduced.

**Acceptance criteria:**
- Helmet is configured.
- Security headers are applied globally.
- Configuration works in development and production.
- Headers do not break API usage.

### US-084: Configure CORS
As a developer,  
I want CORS configured safely,  
So that only allowed clients can access the API.

**Acceptance criteria:**
- CORS allowed origins come from environment variables.
- Wildcard origin is not used in production with credentials.
- Credentials are allowed only when needed.
- Invalid origins are rejected.
- CORS behavior is tested manually or with integration tests.

### US-085: Rate Limit Authentication Routes
As a system,  
I want sensitive authentication routes rate-limited,  
So that brute-force and abuse attempts are reduced.

**Acceptance criteria:**
- Login route is rate-limited.
- Forgot password route is rate-limited.
- Resend verification route is rate-limited.
- Reset password route is rate-limited.
- Rate-limit responses use standard error format.
- Rate limits can be configured by environment.

### US-086: Protect Against Account Enumeration
As a system,  
I want auth responses to avoid leaking account existence,  
So that attackers cannot easily discover registered emails.

**Acceptance criteria:**
- Login failure uses generic message.
- Forgot password always returns generic message.
- Resend verification does not expose sensitive account state.
- Timing differences are not intentionally obvious.
- Logs remain useful without leaking sensitive data to clients.

### US-087: Validate All Request Inputs
As a developer,  
I want all incoming data validated,  
So that invalid or malicious input does not reach business logic.

**Acceptance criteria:**
- Request body validation exists.
- Request params validation exists.
- Request query validation exists.
- Validation middleware is reusable.
- Invalid data returns consistent validation errors.
- Business logic assumes validated input.

### US-088: Use Secure Cookies
As a system,  
I want refresh tokens stored in secure cookies,  
So that browser-based authentication is safer.

**Acceptance criteria:**
- Refresh token cookie is HTTP-only.
- Production cookie uses `secure`.
- Cookie uses an appropriate `sameSite` value.
- Cookie expiration matches refresh token policy.
- Logout clears the cookie.
- Refresh response rotates the cookie.

### US-089: Add CSRF Protection Strategy
As a developer,  
I want a CSRF protection strategy for cookie-based auth,  
So that cross-site requests cannot abuse authenticated cookies.

**Acceptance criteria:**
- CSRF risk is documented.
- State-changing routes are protected when using cookies.
- CSRF token or equivalent protection is implemented.
- Safe methods like GET are handled correctly.
- Tests or manual checks verify protection.

### US-090: Prevent Sensitive Data in Responses
As a system,  
I want sensitive fields removed from API responses,  
So that secrets are not exposed.

**Acceptance criteria:**
- Password hash is never returned.
- Token hashes are never returned.
- Raw tokens are only returned where intentionally required.
- Internal IDs are exposed only where acceptable.
- Error responses do not expose stack traces in production.

## Epic 16: API Response Design

### US-091: Standardize Success Responses
As a developer,  
I want successful responses to follow a consistent format,  
So that API clients can consume data predictably.

**Acceptance criteria:**
- Success responses include `success: true`.
- Response includes data where appropriate.
- Pagination metadata is included for list endpoints.
- Empty successful responses are handled consistently.
- Response format is documented.

### US-092: Standardize Error Responses
As a developer,  
I want error responses to follow a consistent format,  
So that API clients can handle errors predictably.

**Acceptance criteria:**
- Error responses include `success: false`.
- Error responses include message.
- Error responses include error code.
- Validation errors include field-level details.
- Internal errors are logged.
- Internal errors return safe client messages.

### US-093: Add Pagination
As a developer,  
I want list endpoints to support pagination,  
So that large datasets do not hurt performance.

**Acceptance criteria:**
- User list is paginated.
- Post list is paginated.
- Comment list is paginated.
- Audit log list is paginated.
- Pagination params are validated.
- Response includes pagination metadata.

### US-094: Add Filtering and Sorting
As an admin or user,

I want list endpoints to support filtering and sorting,  
So that I can find data efficiently.

**Acceptance criteria:**
- Users can be filtered by role and status.
- Posts can be filtered by status and author where allowed.
- Comments can be filtered by status where allowed.
- Audit logs can be filtered by action or actor.
- Sorting params are validated.
- Unsupported filters are rejected or ignored consistently.

## Epic 17: API Documentation

### US-095: Create Swagger Documentation
As a developer,  
I want Swagger documentation,  
So that I can understand and test the API easily.

**Acceptance criteria:**
- Swagger/OpenAPI is configured.
- Documentation is available at a local route.
- Auth endpoints are documented.
- User endpoints are documented.
- Post endpoints are documented.
- Comment endpoints are documented.
- Admin endpoints are documented.

### US-096: Document Authentication Requirements
As a developer,  
I want API docs to show which routes require authentication,  
So that clients know how to call protected endpoints.

**Acceptance criteria:**
- Protected routes are marked in docs.
- JWT/cookie auth strategy is explained.
- Example authenticated requests are included.
- Unauthorized response examples are included.
- Forbidden response examples are included.

### US-097: Document Request and Response Examples
As a developer,  
I want request and response examples in the docs,  
So that the API is easier to use.

**Acceptance criteria:**
- Register request example exists.
- Login request example exists.
- Post creation request example exists.
- Comment creation request example exists.
- Validation error example exists.
- Auth error example exists.
- Pagination response example exists.

## Epic 18: Testing

### US-098: Test Registration Flow
As a developer,  
I want automated tests for registration,  
So that user creation remains reliable.

**Acceptance criteria:**
- Valid registration succeeds.
- Duplicate email fails.
- Invalid email fails.
- Weak password fails.
- Password is hashed.
- Response excludes password hash.

### US-099: Test Login Flow
As a developer,  
I want automated tests for login,  
So that authentication remains reliable.

**Acceptance criteria:**
- Valid login succeeds.
- Wrong password fails.
- Unknown email fails safely.
- Disabled user cannot log in.
- Login returns access token.
- Login creates refresh token session.

### US-100: Test Refresh Token Flow
As a developer,  
I want automated tests for refresh tokens,  
So that session security remains reliable.

**Acceptance criteria:**
- Valid refresh succeeds.
- Refresh rotates token.
- Old refresh token cannot be reused.
- Expired refresh token fails.
- Revoked refresh token fails.
- Token reuse detection works.

### US-101: Test Logout Flow
As a developer,  
I want automated tests for logout,  
So that users can safely end sessions.

**Acceptance criteria:**
- Logout revokes current refresh token.
- Logout clears cookie.
- Revoked token cannot refresh.
- Logout creates audit log entry.

### US-102: Test Password Reset Flow
As a developer,  
I want automated tests for password reset,  
So that account recovery remains secure.

**Acceptance criteria:**
- Forgot password returns generic response.
- Reset token is hashed.
- Valid reset changes password.
- Used reset token fails.
- Expired reset token fails.
- Existing sessions are revoked after reset.

### US-103: Test Email Verification Flow
As a developer,  
I want automated tests for email verification,  
So that account verification remains reliable.

**Acceptance criteria:**
- Valid token verifies email.
- Expired token fails.
- Used token fails.
- Resend verification creates new token.
- Verified user cannot unnecessarily verify again.

### US-104: Test Authorization Rules
As a developer,  
I want automated tests for RBAC,  
So that users cannot access unauthorized features.

**Acceptance criteria:**
- User cannot access admin route.
- Editor cannot manage users.
- Admin can manage regular users.
- Admin cannot assign super admin role.
- Super admin can change roles.
- Missing permission returns forbidden.

### US-105: Test Object-Level Authorization
As a developer,  
I want tests for ownership rules,  
So that users cannot access resources they do not own.

**Acceptance criteria:**
- User can edit own comment.
- User cannot edit another user’s comment.
- Editor can edit own post.
- Editor cannot edit another editor’s post.
- Admin can manage all posts.
- User cannot revoke another user’s session.

### US-106: Test Validation Middleware
As a developer,  
I want tests for validation,  
So that invalid request data is rejected consistently.

**Acceptance criteria:**
- Invalid request body fails.
- Invalid params fail.
- Invalid query values fail.
- Validation error format is consistent.
- Valid request reaches controller.

### US-107: Test Error Handling
As a developer,  
I want tests for error handling,  
So that API errors remain predictable.

**Acceptance criteria:**
- Unknown route returns 404.
- Unauthorized request returns 401.
- Forbidden request returns 403.
- Validation error returns 400 or 422 based on chosen convention.
- Unexpected error returns safe response.
- Production mode hides stack traces.

## Epic 19: Developer Experience

### US-108: Add Development Scripts
As a developer,  
I want useful package scripts,  
So that I can run common tasks easily.

**Acceptance criteria:**
- Script exists to start development server.
- Script exists to start production server.
- Script exists to run tests.
- Script exists to run migrations.
- Script exists to seed database.
- Script exists to open Prisma Studio if used.

### US-109: Add Linting and Formatting
As a developer,  
I want linting and formatting tools,  
So that code quality stays consistent.

**Acceptance criteria:**
- ESLint is configured.
- Prettier is configured.
- Lint script exists.
- Format script exists.
- Project follows consistent code style.
- Generated files are excluded where appropriate.

### US-110: Add README
As a developer,  
I want a complete README,  
So that the project can be understood and run by others.

**Acceptance criteria:**
- README explains project purpose.
- README lists tech stack.
- README explains setup.
- README includes environment variable instructions.
- README explains database migration and seed commands.
- README explains test commands.
- README links to API docs.
- README includes basic security notes.

## Epic 20: Production Readiness

### US-111: Add Docker Compose for Local Development
As a developer,  
I want Docker Compose for local services,  
So that PostgreSQL can run consistently across machines.

**Acceptance criteria:**
- `docker-compose.yml` exists.
- PostgreSQL service is configured.
- Database volume is configured.
- Environment variables are supported.
- App can connect to Dockerized database.
- Setup instructions are documented.

### US-112: Add Dockerfile
As a developer,  
I want a Dockerfile,  
So that the API can be containerized for production.

**Acceptance criteria:**
- Dockerfile exists.
- Image installs dependencies.
- Image copies application code.
- Image can run the production server.
- Sensitive `.env` files are not copied.
- Docker build succeeds.

### US-113: Add Graceful Shutdown
As a developer,  
I want graceful shutdown handling,  
So that the server closes safely during deployment or crashes.

**Acceptance criteria:**
- App listens for termination signals.
- Server stops accepting new connections.
- Existing requests can complete where possible.
- Prisma database connection is closed.
- Shutdown events are logged.

### US-114: Add Production Logging
As a developer,  
I want structured production logging,  
So that deployed issues can be investigated.

**Acceptance criteria:**
- Logger outputs structured logs.
- Logs include request ID.
- Error logs include safe details.
- Sensitive data is redacted.
- Log level is controlled by environment.

### US-115: Add Deployment Configuration Notes
As a developer,  
I want deployment notes,  
So that the app can be deployed correctly.

**Acceptance criteria:**
- README explains production environment variables.
- README explains migration process.
- README explains secure cookie requirements.
- README explains CORS production configuration.
- README explains HTTPS assumption.
- README explains how to run the app in production.

## Epic 21: Admin Dashboard API Support

### US-116: Get Admin Stats
As an admin,

I want to view basic platform statistics,  
So that I can understand platform activity.

**Acceptance criteria:**
- `GET /api/admin/stats` exists.
- Route requires admin permission.
- Response includes user count.
- Response includes post count.
- Response includes comment count.
- Response includes recent activity summary.
- Regular users cannot access the endpoint.

### US-117: View Recently Registered Users
As an admin,

I want to view recently registered users,  
So that I can monitor new account activity.

**Acceptance criteria:**
- Admin can filter users by creation date.
- Results are paginated.
- Response excludes sensitive fields.
- Regular users cannot access this data.

### US-118: View Recently Moderated Content
As an admin,

I want to view recently moderated posts and comments,  
So that moderation activity can be reviewed.

**Acceptance criteria:**
- Admin can view recent moderation actions through audit logs.
- Results are paginated.
- Logs include actor and target.
- Regular users cannot access moderation history.

## Epic 22: Data Integrity

### US-119: Enforce Unique Email
As a system,  
I want emails to be unique at the database level,  
So that duplicate accounts cannot exist.

**Acceptance criteria:**
- Email column has a unique constraint.
- App-level validation checks duplicates.
- Database duplicate errors are handled gracefully.
- Email matching is case-insensitive if supported by chosen design.

### US-120: Enforce Valid Foreign Keys
As a system,  
I want database relationships enforced,  
So that orphaned records are avoided.

**Acceptance criteria:**
- User has valid role ID.
- Post has valid author ID.
- Comment has valid post ID.
- Comment has valid author ID.
- Token records have valid user ID.
- Deletion behavior is intentionally configured.

### US-121: Add Useful Indexes
As a developer,  
I want useful database indexes,  
So that common queries perform well.

**Acceptance criteria:**
- Email lookup is indexed.
- Refresh token hash lookup is indexed.
- Reset token hash lookup is indexed.
- Verification token hash lookup is indexed.
- Post author lookup is indexed.
- Comment post lookup is indexed.
- Audit log timestamp lookup is indexed.

## Epic 23: Final Learning Outcomes

### US-122: Understand Authentication
As a learner,  
I want to understand authentication deeply,  
So that I can build secure login systems in future projects.

**Acceptance criteria:**
- Developer can explain password hashing.
- Developer can explain access tokens.
- Developer can explain refresh tokens.
- Developer can explain token rotation.
- Developer can explain logout behavior with JWT.
- Developer can explain session invalidation.

### US-123: Understand Authorization
As a learner,  
I want to understand authorization deeply,  
So that I can control what users are allowed to do.

**Acceptance criteria:**
- Developer can explain roles.
- Developer can explain permissions.
- Developer can explain middleware authorization.
- Developer can explain object-level authorization.
- Developer can explain horizontal privilege escalation.
- Developer can explain vertical privilege escalation.

### US-124: Understand Production Backend Structure
As a learner,  
I want to understand production backend structure,  
So that I can build maintainable Node.js applications.

**Acceptance criteria:**
- Developer can explain route/controller/service/repository separation.
- Developer can explain centralized error handling.
- Developer can explain validation middleware.
- Developer can explain logging.
- Developer can explain environment config.
- Developer can explain testing strategy.

### US-125: Understand Backend Security Basics
As a learner,  
I want to understand backend security basics,  
So that I can avoid common security mistakes.

**Acceptance criteria:**
- Developer can explain secure cookies.
- Developer can explain CORS.
- Developer can explain CSRF.
- Developer can explain rate limiting.
- Developer can explain account enumeration.
- Developer can explain safe error messages.
- Developer can explain why tokens are hashed.

## 4. MVP Scope
The MVP should include:
- Project setup
- Database setup
- Register
- Login
- Logout
- Refresh tokens
- Current user endpoint
- Email verification
- Forgot password
- Reset password
- Role-based access control
- User management
- Posts
- Comments
- Object-level authorization
- Audit logs
- Validation
- Error handling
- Testing
- API documentation
- Docker-based local setup

## 5. Out of Scope for Version 1
The following features are not required for Version 1:
- Frontend application
- OAuth login
- Two-factor authentication
- File uploads
- Image uploads
- Payment system
- Real-time notifications
- WebSockets
- Multi-tenant organizations
- Full-text search
- Background job queue
- Redis caching
- Webhooks

## 6. Recommended Build Order
The recommended order is:
1. Project foundation
2. Database setup
3. User model, roles, and permissions
4. Register
5. Login
6. Authentication middleware
7. Refresh tokens
8. Logout
9. Session management
10. Email verification
11. Forgot/reset password
12. RBAC middleware
13. User management
14. Posts
15. Comments
16. Object-level authorization
17. Audit logs
18. Security hardening
19. Tests
20. API documentation
21. Docker and deployment readiness

## 7. Definition of Done
A user story is considered complete when:
- The route or feature works correctly.
- Request validation is implemented.
- Authorization rules are enforced.
- Errors use the standard response format.
- Sensitive data is not exposed.
- Relevant logs or audit logs are created.
- Tests are written where appropriate.
- Documentation is updated where appropriate.
- The implementation follows the project folder structure.
- The code is readable and maintainable.

## 8. Final Note
These user stories are intentionally detailed because this project is meant to teach production backend development, not only Express basics.

The goal is to build slowly and understand every layer:
- HTTP
- Express
- Middleware
- Validation
- Database modeling
- Authentication
- Authorization
- Security
- Testing
- Documentation
- Deployment

By completing these stories, the project will become a serious backend portfolio project and a strong foundation for mastering Node.js and backend engineering.
