const test = require("node:test");
const assert = require("node:assert/strict");
require("./setup");

const { env, parseEnv } = require("../src/config/env");

test("env exports valid active configuration", () => {
  assert.ok(env);
  assert.equal(typeof env.PORT, "number");
  assert.equal(typeof env.NODE_ENV, "string");
  assert.equal(typeof env.IS_PROD, "boolean");
  assert.equal(typeof env.JWT_SECRET, "string");
});

test("parseEnv provides robust defaults for empty object", () => {
  const parsed = parseEnv({});
  assert.equal(parsed.NODE_ENV, "development");
  assert.equal(parsed.PORT, 3000);
  assert.equal(parsed.IS_PROD, false);
  assert.equal(parsed.IS_DEV, true);
  assert.equal(parsed.IS_TEST, false);
  assert.equal(parsed.JWT_SECRET, "dev-secret-key-change-in-production");
});

test("parseEnv parses production environment and converts string port to number", () => {
  const parsed = parseEnv({
    NODE_ENV: "production",
    PORT: "8080",
    JWT_SECRET: "prod-secret",
    TURSO_URL: "libsql://example.turso.io",
    TURSO_TOKEN: "sample-token",
  });
  assert.equal(parsed.NODE_ENV, "production");
  assert.equal(parsed.PORT, 8080);
  assert.equal(parsed.IS_PROD, true);
  assert.equal(parsed.IS_DEV, false);
  assert.equal(parsed.TURSO_URL, "libsql://example.turso.io");
});

test("parseEnv throws on invalid NODE_ENV value", () => {
  assert.throws(() => {
    parseEnv({ NODE_ENV: "invalid_env_mode" });
  }, /Invalid environment configuration/);
});
