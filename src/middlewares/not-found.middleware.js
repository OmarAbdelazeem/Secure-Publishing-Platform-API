const { AppError } = require("../utils/app-error");

const notFoundMiddleware = (req, res, next) => {
  next(new AppError("Route not found.", 404, "NOT_FOUND"));
};

module.exports = {
  notFoundMiddleware,
};
