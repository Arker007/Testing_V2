const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createApp } = require("../src/app");
const { initDatabase } = require("../src/database/database");
const errorHandler = require("../src/middleware/errorHandler");
const { env } = require("../src/config/env");

test("Phase 15 Verification: Malformed POST to /api/inquiries returns 400", async () => {
  await initDatabase();
  const app = createApp();
  
  const response = await request(app)
    .post("/api/inquiries")
    .send({ name: "" }) // invalid empty name, missing email/message
    .set("Accept", "application/json");
    
  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.equal(response.body.error, "Validation failed");
  assert.ok(response.body.details.name);
  assert.ok(response.body.details.email);
});

test("Phase 16 Verification: errorHandler handles MulterError", () => {
  let status, jsonResp;
  const res = {
    headersSent: false,
    status: (code) => { status = code; return res; },
    json: (payload) => { jsonResp = payload; return res; }
  };
  const next = () => {};
  
  const err = new Error("File too large");
  err.name = "MulterError";
  err.code = "LIMIT_FILE_SIZE";
  
  errorHandler(err, { method: "POST", originalUrl: "/api/upload" }, res, next);
  
  assert.equal(status, 400);
  assert.equal(jsonResp.error, "File too large");
  assert.equal(jsonResp.code, "LIMIT_FILE_SIZE");
});

test("Phase 16 Verification: errorHandler handles SQLite constraints", () => {
  let status, jsonResp;
  const res = {
    headersSent: false,
    status: (code) => { status = code; return res; },
    json: (payload) => { jsonResp = payload; return res; }
  };
  const next = () => {};
  
  const err = new Error("UNIQUE constraint failed: users.email");
  err.code = "SQLITE_CONSTRAINT";
  
  errorHandler(err, { method: "POST", originalUrl: "/api/users" }, res, next);
  
  assert.equal(status, 409);
  assert.equal(jsonResp.error, "A record with this identifier or unique property already exists");
  assert.equal(jsonResp.code, "CONFLICT");
});
