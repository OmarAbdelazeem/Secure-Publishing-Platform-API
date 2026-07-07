const writeLog = (level, message, context = {}) => {
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...context,
  };

  const output = JSON.stringify(entry);

  if (level === "error") {
    console.error(output);
    return;
  }

  console.log(output);
};

const logger = {
  info: (message, context) => writeLog("info", message, context),
  error: (message, context) => writeLog("error", message, context),
};

const requestLogger = (req, res, next) => {
  const startedAt = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;

    logger.info("HTTP request completed", {
      requestId: req.requestId,
      method: req.method,
      url: req.path,
      statusCode: res.statusCode,
      responseTimeMs: Number(durationMs.toFixed(2)),
    });
  });

  next();
};

module.exports = {
  logger,
  requestLogger,
};
