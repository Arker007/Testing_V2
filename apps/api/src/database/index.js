/**
 * Database Layer Public Barrel Facade
 */
const client = require("./client");
const schema = require("./schema");
const seeds = require("./seeds");
const migrations = require("./migrations");

module.exports = {
  db: client.db,
  initDatabase: client.initDatabase,
  checkDatabaseHealth: client.checkDatabaseHealth,
  closeDatabase: client.closeDatabase,
  getRawClient: client.getRawClient,
  ...client,
  ...schema,
  ...seeds,
  ...migrations,
};
