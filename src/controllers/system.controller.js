const { env } = require("../config/env");
const { sendSuccess } = require("../utils/response");

const getHealth = (req, res) => {
  return sendSuccess(res, {
    message: "API is healthy.",
    data: {
      status: "ok",
      environment: env.nodeEnv,
    },
  });
};

const getVersion = (req, res) => {
  return sendSuccess(res, {
    message: "API version retrieved successfully.",
    data: {
      version: env.apiVersion,
    },
  });
};

module.exports = {
  getHealth,
  getVersion,
};
