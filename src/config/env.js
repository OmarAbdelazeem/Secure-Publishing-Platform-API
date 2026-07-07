const dotenv = require("dotenv");

dotenv.config({ quiet: true });

const allowedNodeEnvs = new Set(["development", "test", "production"]);

const parsePort = (value) => {
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  return port;
};

const loadEnv = () => {
  const nodeEnv = process.env.NODE_ENV || "development";

  if (!allowedNodeEnvs.has(nodeEnv)) {
    throw new Error("NODE_ENV must be development, test, or production.");
  }

  const apiVersion = process.env.API_VERSION || "1.0.0";

  if (!apiVersion.trim()) {
    throw new Error("API_VERSION must not be empty.");
  }

  return {
    nodeEnv,
    port: parsePort(process.env.PORT || "3000"),
    apiVersion,
  };
};

const env = loadEnv();

module.exports = {
  env,
  loadEnv,
};
