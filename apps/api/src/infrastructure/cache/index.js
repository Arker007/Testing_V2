/**
 * Cache Infrastructure Facade
 */
const { getCache, setCache, invalidate } = require("./cache");

module.exports = {
  getCache,
  setCache,
  invalidate,
};
