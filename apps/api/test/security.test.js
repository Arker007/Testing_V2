const test = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const request = require("supertest");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("./setup");

test("helmet sets expected security headers", async () => {
  const app = express();
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      frameguard: false,
    })
  );
  app.get("/test-helmet", (req, res) => res.send("OK"));

  const res = await request(app).get("/test-helmet");
  assert.equal(res.status, 200);
  assert.equal(res.headers["x-content-type-options"], "nosniff");
  assert.equal(res.headers["x-download-options"], "noopen");
});

test("rate limiting triggers HTTP 429 after exceeding request threshold", async () => {
  const app = express();
  const testLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: "Too many requests" },
  });

  app.post("/test-rate-limit", testLimiter, (req, res) => {
    res.json({ success: true });
  });

  const res1 = await request(app).post("/test-rate-limit");
  assert.equal(res1.status, 200);

  const res2 = await request(app).post("/test-rate-limit");
  assert.equal(res2.status, 200);

  const res3 = await request(app).post("/test-rate-limit");
  assert.equal(res3.status, 429);
  assert.equal(res3.body.success, false);
  assert.equal(res3.body.error, "Too many requests");
});
