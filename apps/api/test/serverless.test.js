const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
require("./setup");

const serverlessHandler = require("../../../api/index");

test("Serverless entrypoint exports handler function with app instance", () => {
  assert.equal(typeof serverlessHandler, "function");
  assert.ok(serverlessHandler.app);
  assert.equal(typeof serverlessHandler.ensureInitialised, "function");
});

test("Serverless entrypoint executes lazy database initialization and handles /health", async () => {
  const res = await request(serverlessHandler).get("/health");
  assert.equal(res.status, 200);
  assert.equal(res.text, "OK");
});

test("Serverless entrypoint handles /api/health with database status", async () => {
  const res = await request(serverlessHandler).get("/api/health");
  assert.equal(res.status, 200);
  assert.equal(res.body.status, "ok");
  assert.equal(res.body.database.healthy, true);
});

test("Serverless entrypoint serves /api/products correctly", async () => {
  const res = await request(serverlessHandler).get("/api/products");
  assert.equal(res.status, 200);
  assert.ok(res.body.products);
  assert.ok(Array.isArray(res.body.products));
});

test("Serverless entrypoint caches initialization across invocations", async () => {
  const initPromise1 = serverlessHandler.ensureInitialised();
  const initPromise2 = serverlessHandler.ensureInitialised();
  assert.strictEqual(initPromise1, initPromise2);
  await initPromise1;
});
