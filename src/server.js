const createApp = require("./app");
const { env } = require("./config/env");
const { logger } = require("./utils/logger");

const app = createApp();

const server = app.listen(env.port, () => {
  logger.info("Server started", {
    environment: env.nodeEnv,
    port: env.port,
  });
});

const shutdown = (signal) => {
  logger.info("Shutdown signal received", { signal });

  server.close(() => {
    logger.info("Server stopped");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
