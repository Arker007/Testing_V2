const { test, describe, it } = require("node:test");
const assert = require("node:assert/strict");
const infrastructure = require("../src/infrastructure");
const { logger, httpLogger } = require("../src/infrastructure/logger");
const storage = require("../src/infrastructure/storage");
const security = require("../src/infrastructure/security");
const cache = require("../src/infrastructure/cache");

test("Infrastructure barrel exports all subsystems", () => {
  assert.ok(infrastructure.logger);
  assert.ok(infrastructure.httpLogger);
  assert.ok(infrastructure.storage);
  assert.ok(infrastructure.security);
  assert.ok(infrastructure.cache);
});

test("Security subsystem creates and verifies valid auth tokens", () => {
  const token = security.createAuthToken("testadmin", "admin");
  assert.ok(token);
  assert.ok(token.startsWith("ve1."));

  const user = security.verifyAuthToken(token);
  assert.equal(user.username, "testadmin");
  assert.equal(user.role, "admin");
});

test("Security subsystem rejects tampered auth tokens", () => {
  const token = security.createAuthToken("testadmin", "admin");
  const tamperedToken = token.slice(0, -4) + "abcd";
  assert.throws(() => security.verifyAuthToken(tamperedToken), /Invalid token/);
});

test("Storage subsystem manages directory paths and existence", () => {
  const uploadsDir = storage.getUploadsDir("products");
  assert.ok(uploadsDir);
  assert.ok(typeof uploadsDir === "string");
  assert.ok(uploadsDir.includes("products"));
});

test("Cache subsystem stores, retrieves, and invalidates entries", () => {
  cache.setCache("test-key", { hello: "world" }, 10);
  const val = cache.getCache("test-key");
  assert.deepEqual(val, { hello: "world" });

  cache.invalidate("test-key");
  const afterInvalidate = cache.getCache("test-key");
  assert.equal(afterInvalidate, null);
});
