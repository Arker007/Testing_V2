/**
 * Infrastructure Layer Public Barrel Facade
 */
const logger = require("./logger");
const storage = require("./storage");
const security = require("./security");
const cache = require("./cache");

module.exports = {
  logger: logger.logger,
  httpLogger: logger.httpLogger,
  storage,
  security,
  cache,
};
