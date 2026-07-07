const crypto = require("crypto");

const REQUEST_ID_HEADER = "x-request-id";

const isSafeRequestId = (value) => {
  return typeof value === "string" && /^[a-zA-Z0-9._:-]{1,128}$/.test(value);
};

const requestIdMiddleware = (req, res, next) => {
  const incomingRequestId = req.get(REQUEST_ID_HEADER);
  const requestId = isSafeRequestId(incomingRequestId)
    ? incomingRequestId
    : crypto.randomUUID();

  req.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);

  next();
};

module.exports = {
  requestIdMiddleware,
};
