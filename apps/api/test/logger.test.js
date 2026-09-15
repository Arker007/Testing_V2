const test = require("node:test");
const assert = require("node:assert/strict");
require("./setup");

const { logger } = require("../src/config/logger");

test("logger exports standard Pino logging interface", () => {
  assert.ok(logger);
  assert.equal(typeof logger.info, "function");
  assert.equal(typeof logger.error, "function");
  assert.equal(typeof logger.warn, "function");
  assert.equal(typeof logger.debug, "function");
  assert.equal(typeof logger.fatal, "function");
});

test("logger defaults to silent mode under test environment", () => {
  assert.equal(logger.level, "silent");
});
