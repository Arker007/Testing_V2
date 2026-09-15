/**
 * Production Logger Configuration (Pino)
 * Structured JSON logging in production and test isolation.
 */
const pino = require("pino");
const pinoHttp = require("pino-http");
const { env } = require("../../config/env");

const logLevel = env.IS_TEST
  ? "silent"
  : (process.env.LOG_LEVEL || (env.IS_PROD ? "info" : "debug"));

const logger = pino({
  level: logLevel,
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "password",
      "token",
      "data.password",
    ],
    censor: "[REDACTED]",
  },
});

const httpLogger = pinoHttp({
  logger,
  autoLogging: {
    ignore: (req) =>
      req.url === "/health" ||
      req.url.startsWith("/@") ||
      req.url.startsWith("/src/") ||
      req.url.startsWith("/frontend/") ||
      req.url.startsWith("/node_modules/"),
  },
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});

module.exports = {
  logger,
  httpLogger,
};
