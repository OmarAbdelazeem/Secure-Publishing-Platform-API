const sendSuccess = (
  res,
  { statusCode = 200, message = "Request completed successfully.", data = {}, meta }
) => {
  const body = {
    success: true,
    message,
    data,
  };

  if (meta) {
    body.meta = meta;
  }

  return res.status(statusCode).json(body);
};

const sendError = (
  res,
  {
    statusCode = 500,
    message = "Something went wrong.",
    code = "INTERNAL_SERVER_ERROR",
    details = [],
    requestId,
  }
) => {
  const body = {
    success: false,
    message,
    error: {
      code,
      details,
    },
  };

  if (requestId) {
    body.requestId = requestId;
  }

  return res.status(statusCode).json(body);
};

module.exports = {
  sendSuccess,
  sendError,
};
