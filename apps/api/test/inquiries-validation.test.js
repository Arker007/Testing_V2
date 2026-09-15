const test = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const request = require("supertest");
require("./setup");

const validate = require("../src/middleware/validate");
const errorHandler = require("../src/middleware/errorHandler");
const { inquirySchema } = require("../src/validation/inquiry.schema");

test("inquirySchema rejects missing required fields with 400 and field details", async () => {
  const app = express();
  app.use(express.json());
  app.post("/test-inquiry", validate(inquirySchema), (req, res) => {
    res.json({ success: true, data: req.validated });
  });
  app.use(errorHandler);

  const res = await request(app)
    .post("/test-inquiry")
    .send({ name: "", email: "not-an-email", message: "" });

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.equal(res.body.error, "Validation failed");
  assert.ok(res.body.details);
  assert.ok(res.body.details.name);
  assert.ok(res.body.details.email);
  assert.ok(res.body.details.message);
});

test("inquirySchema accepts valid payload and attaches validated fields", async () => {
  const app = express();
  app.use(express.json());
  app.post("/test-inquiry", validate(inquirySchema), (req, res) => {
    res.json({ success: true, data: req.validated });
  });
  app.use(errorHandler);

  const validData = {
    name: "John Doe",
    email: "john@example.com",
    message: "Interested in recycling services.",
    phone: "123-456-7890",
  };

  const res = await request(app).post("/test-inquiry").send(validData);

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.name, "John Doe");
  assert.equal(res.body.data.email, "john@example.com");
  assert.equal(res.body.data.message, "Interested in recycling services.");
});
