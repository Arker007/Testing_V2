/**
 * Global Error Handler Middleware
 * Unified error serialization for AppErrors, Multer, SQLite/LibSQL constraints, and syntax errors.
 */
const { AppError } = require("../errors");
const { logger } = require("../config/logger");
const { env } = require("../config/env");

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  // Handle JSON parsing syntax errors
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    logger.warn({ err, url: req.originalUrl }, "Malformed JSON payload in request body");
    return res.status(400).json({
      success: false,
      error: "Malformed JSON payload",
      details: env.IS_PROD ? undefined : err.message,
    });
  }

  // Handle Multer upload errors
  if (err.name === "MulterError" || err.code?.startsWith?.("LIMIT_")) {
    logger.warn({ err, url: req.originalUrl }, "File upload limit or format error");
    return res.status(400).json({
      success: false,
      error: err.message || "File upload error",
      code: err.code || "UPLOAD_ERROR",
    });
  }

  // Handle SQLite / LibSQL UNIQUE constraint errors
  if (err.code === "SQLITE_CONSTRAINT" || err.message?.includes("UNIQUE constraint failed")) {
    logger.warn({ err, url: req.originalUrl }, "Database unique constraint violation");
    return res.status(409).json({
      success: false,
      error: "A record with this identifier or unique property already exists",
      code: "CONFLICT",
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const isOperational = err.isOperational || statusCode < 500;

  if (!isOperational || statusCode >= 500) {
    logger.error(
      {
        err,
        statusCode,
        method: req.method,
        url: req.originalUrl || req.url,
      },
      err.message || "Unhandled server error"
    );
  } else if (statusCode >= 400) {
    logger.warn(
      {
        statusCode,
        method: req.method,
        url: req.originalUrl || req.url,
        details: err.details,
      },
      err.message
    );
  }

  const response = {
    success: false,
    error: isOperational
      ? err.message
      : env.IS_PROD
        ? "Internal Server Error"
        : err.message || "Internal Server Error",
  };

  if (err.details) {
    response.details = err.details;
  }
  if (err.code) {
    response.code = err.code;
  }

  res.status(statusCode).json(response);
}

module.exports = errorHandler;
