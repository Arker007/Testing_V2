const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
require("./setup");
const { app } = require("../index");

test("Health check endpoint returns 200 OK", async () => {
  const response = await request(app).get("/health");
  assert.equal(response.status, 200);
  assert.equal(response.text, "OK");
});

test("CORS headers are present when Origin header is sent", async () => {
  const response = await request(app)
    .get("/health")
    .set("Origin", "http://example.com");
  assert.equal(response.status, 200);
  assert.equal(response.headers["access-control-allow-origin"], "http://example.com");
});
