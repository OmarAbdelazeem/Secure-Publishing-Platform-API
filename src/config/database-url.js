const DEFAULT_DATABASE_URL =
  "postgresql://secure_publishing_user:secure_publishing_password@localhost:5432/secure_publishing_platform_api?schema=public";

const getDatabaseUrl = () => {
  return process.env.DATABASE_URL || DEFAULT_DATABASE_URL;
};

module.exports = {
  DEFAULT_DATABASE_URL,
  getDatabaseUrl,
};
