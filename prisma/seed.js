const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const dotenv = require("dotenv");
const { getDatabaseUrl } = require("../src/config/database-url");

dotenv.config({ quiet: true });

const adapter = new PrismaPg({ connectionString: getDatabaseUrl() });
const prisma = new PrismaClient({ adapter });

const roles = [
  { name: "user", description: "Default role for registered users." },
  { name: "editor", description: "Can create and manage owned publishing content." },
  { name: "admin", description: "Can moderate content and manage users." },
  { name: "super_admin", description: "Highest-privilege administrative role." },
];

const permissions = [
  { name: "post:read", description: "Read published posts." },
  { name: "post:create", description: "Create posts." },
  { name: "post:update_own", description: "Update owned posts." },
  { name: "post:update", description: "Update any post." },
  { name: "post:delete_own", description: "Delete or archive owned posts." },
  { name: "post:delete", description: "Delete or archive any post." },
  { name: "comment:create", description: "Create comments." },
  { name: "comment:update_own", description: "Update owned comments." },
  { name: "comment:update", description: "Update any comment." },
  { name: "comment:delete_own", description: "Delete owned comments." },
  { name: "comment:delete", description: "Delete any comment." },
  { name: "comment:moderate_own_posts", description: "Moderate comments on owned posts." },
  { name: "comment:moderate", description: "Moderate any comment." },
  { name: "user:read", description: "Read user records." },
  { name: "user:update", description: "Update user records." },
  { name: "user:disable", description: "Disable users." },
  { name: "role:update", description: "Change user roles." },
  { name: "audit:read_basic", description: "Read basic audit logs." },
  { name: "audit:read_all", description: "Read all audit logs." },
  { name: "admin:manage", description: "Manage admin accounts and sensitive settings." },
];

const rolePermissionMap = {
  user: [
    "post:read",
    "comment:create",
    "comment:update_own",
    "comment:delete_own",
  ],
  editor: [
    "post:read",
    "post:create",
    "post:update_own",
    "post:delete_own",
    "comment:create",
    "comment:update_own",
    "comment:delete_own",
    "comment:moderate_own_posts",
  ],
  admin: [
    "post:read",
    "post:create",
    "post:update",
    "post:delete",
    "comment:create",
    "comment:update",
    "comment:delete",
    "comment:moderate",
    "user:read",
    "user:update",
    "user:disable",
    "audit:read_basic",
  ],
  super_admin: permissions.map((permission) => permission.name),
};

const seedRoles = async () => {
  const roleRecords = {};

  for (const role of roles) {
    roleRecords[role.name] = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
  }

  return roleRecords;
};

const seedPermissions = async () => {
  const permissionRecords = {};

  for (const permission of permissions) {
    permissionRecords[permission.name] = await prisma.permission.upsert({
      where: { name: permission.name },
      update: { description: permission.description },
      create: permission,
    });
  }

  return permissionRecords;
};

const seedRolePermissions = async (roleRecords, permissionRecords) => {
  for (const [roleName, permissionNames] of Object.entries(rolePermissionMap)) {
    for (const permissionName of permissionNames) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: roleRecords[roleName].id,
            permissionId: permissionRecords[permissionName].id,
          },
        },
        update: {},
        create: {
          roleId: roleRecords[roleName].id,
          permissionId: permissionRecords[permissionName].id,
        },
      });
    }
  }
};

const seedDevelopmentSuperAdmin = async (superAdminRole) => {
  const name = process.env.DEV_SUPER_ADMIN_NAME;
  const email = process.env.DEV_SUPER_ADMIN_EMAIL;
  const passwordHash = process.env.DEV_SUPER_ADMIN_PASSWORD_HASH;

  if (!name || !email || !passwordHash) {
    console.log(
      "Skipping development super admin seed. Set DEV_SUPER_ADMIN_NAME, DEV_SUPER_ADMIN_EMAIL, and DEV_SUPER_ADMIN_PASSWORD_HASH to enable it."
    );
    return;
  }

  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      roleId: superAdminRole.id,
      status: "active",
    },
    create: {
      name,
      email,
      passwordHash,
      emailVerifiedAt: new Date(),
      roleId: superAdminRole.id,
      status: "active",
    },
  });

  console.log(`Development super admin is seeded for ${email}.`);
};

const main = async () => {
  const roleRecords = await seedRoles();
  const permissionRecords = await seedPermissions();

  await seedRolePermissions(roleRecords, permissionRecords);
  await seedDevelopmentSuperAdmin(roleRecords.super_admin);

  console.log("Database seed completed.");
};

main()
  .catch((error) => {
    console.error("Database seed failed.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
