const { defineConfig } = require("prisma/config");
const dotenv = require("dotenv");
const { DEFAULT_DATABASE_URL } = require("./src/config/database-url");

dotenv.config({ quiet: true });

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || DEFAULT_DATABASE_URL,
  },
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },
});
