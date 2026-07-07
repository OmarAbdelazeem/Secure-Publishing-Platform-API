const { AppError } = require("../utils/app-error");
const { sendError } = require("../utils/response");
const { logger } = require("../utils/logger");
const { env } = require("../config/env");

const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const error =
    err instanceof AppError
      ? err
      : new AppError("Internal server error.", 500, "INTERNAL_SERVER_ERROR");

  if (!(err instanceof AppError)) {
    logger.error("Unexpected error", {
      requestId: req.requestId,
      method: req.method,
      path: req.path,
      error: err.message,
      stack: env.nodeEnv === "development" ? err.stack : undefined,
    });
  }

  return sendError(res, {
    statusCode: error.statusCode,
    message: error.message,
    code: error.code,
    details: error.details,
    requestId: req.requestId,
  });
};

module.exports = {
  errorMiddleware,
};
