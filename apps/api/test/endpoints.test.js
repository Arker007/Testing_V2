const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
require("./setup");

const { app } = require("../index");
const { initDatabase } = require("../src/database/database");

test("GET /api/products returns products list successfully", async () => {
  await initDatabase();
  const res = await request(app).get("/api/products");
  assert.equal(res.status, 200);
  assert.ok(res.body.products);
  assert.ok(Array.isArray(res.body.products));
});

test("GET /api/categories returns categories list successfully", async () => {
  await initDatabase();
  const res = await request(app).get("/api/categories");
  assert.equal(res.status, 200);
  assert.ok(res.body.categories);
  assert.ok(Array.isArray(res.body.categories));
});

test("GET /api/products/categories resolves backward-compatibility alias successfully", async () => {
  await initDatabase();
  const res = await request(app).get("/api/products/categories");
  assert.equal(res.status, 200);
  assert.ok(res.body.categories);
  assert.ok(Array.isArray(res.body.categories));
});

test("GET /api/company returns company profile successfully", async () => {
  await initDatabase();
  const res = await request(app).get("/api/company");
  assert.equal(res.status, 200);
});
