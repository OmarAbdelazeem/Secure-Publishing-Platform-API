const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const dotenv = require("dotenv");
const { getDatabaseUrl } = require("./database-url");

dotenv.config({ quiet: true });

const globalForPrisma = globalThis;
const adapter = new PrismaPg({ connectionString: getDatabaseUrl() });

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

module.exports = {
  prisma,
};
