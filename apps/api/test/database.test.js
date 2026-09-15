const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
require("./setup");

const { app } = require("../index");
const { initDatabase, checkDatabaseHealth } = require("../src/database/database");
const { executeWithRetry } = require("../src/database/dbShim");

test("initDatabase establishes connection and checkDatabaseHealth reports healthy", async () => {
  await initDatabase();
  const health = await checkDatabaseHealth();
  assert.equal(health.healthy, true);
  assert.equal(typeof health.latencyMs, "number");
});

test("database migrations tracking table exists and tracks 001_initial_schema", async () => {
  const { getRawClient } = require("../src/database/database");
  const rawClient = getRawClient();
  const res = await rawClient.execute("SELECT name FROM _migrations");
  assert.ok(res.rows.length > 0);
  const names = res.rows.map((r) => r[0] || r.name);
  assert.ok(names.includes("001_initial_schema"));
});

test("executeWithRetry retries transient errors and resolves on eventual success", async () => {
  let callCount = 0;
  const mockOperation = async () => {
    callCount++;
    if (callCount < 2) {
      const err = new Error("SQLITE_BUSY: database is locked");
      err.code = "SQLITE_BUSY";
      throw err;
    }
    return "query-success";
  };

  const result = await executeWithRetry(mockOperation, 3, 10);
  assert.equal(result, "query-success");
  assert.equal(callCount, 2);
});

test("executeWithRetry throws immediately for non-transient errors", async () => {
  const mockFatal = async () => {
    throw new Error("SYNTAX_ERROR: unexpected token");
  };

  await assert.rejects(
    () => executeWithRetry(mockFatal, 3, 10),
    /SYNTAX_ERROR/
  );
});

test("/api/health returns 200 with database health status in JSON", async () => {
  const res = await request(app).get("/api/health");
  assert.equal(res.status, 200);
  assert.equal(res.body.status, "ok");
  assert.ok(res.body.database);
  assert.equal(res.body.database.healthy, true);
});
