const express = require("express");

const systemRoutes = require("./routes/system.routes");
const { requestIdMiddleware } = require("./middlewares/request-id.middleware");
const { requestLogger } = require("./utils/logger");
const { notFoundMiddleware } = require("./middlewares/not-found.middleware");
const { errorMiddleware } = require("./middlewares/error.middleware");

const createApp = () => {
  const app = express();

  app.disable("x-powered-by");

  app.use(express.json());
  app.use(requestIdMiddleware);
  app.use(requestLogger);

  app.use("/", systemRoutes);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
};

module.exports = createApp;
