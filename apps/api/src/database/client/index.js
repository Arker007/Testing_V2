/**
 * Database Client Module Facade
 */
const {
  db,
  initDatabase,
  checkDatabaseHealth,
  closeDatabase,
  getRawClient,
} = require("./client");
const { makeShim, executeWithRetry } = require("./dbShim");

module.exports = {
  db,
  initDatabase,
  checkDatabaseHealth,
  closeDatabase,
  getRawClient,
  makeShim,
  executeWithRetry,
};
