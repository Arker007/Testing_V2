/**
 * Database Schema Domain Module
 */
const { getTableSchemas } = require("./dbSchema");
const { syncCategoryFields } = require("./dbSync");

module.exports = {
  getTableSchemas,
  syncCategoryFields,
};
