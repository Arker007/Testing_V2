const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
require("./setup");

const { app } = require("../../apps/api/index");
const { initDatabase } = require("../../apps/api/src/database/database");
const { inquirySchema } = require("../../packages/contracts");

test("E2E Inquiry Journey: Customer RFQ Submission & Validation Lifecycle", async (t) => {
  await initDatabase();

  await t.test("1. Valid quote inquiry submission conforms to @vishal/contracts schema", async () => {
    const payload = {
      name: "Rohit Sharma",
      email: "rohit@logistics-partner.in",
      phone: "+91 9876543210",
      company: "Apex Logistics Ltd",
      message: "Requesting quotation for 500 units of Heavy-Duty Rackable Pallets.",
      inquiry_type: "quote",
      quantity: 500,
    };

    // Client-side schema parse validation
    const parsed = inquirySchema.safeParse(payload);
    assert.equal(parsed.success, true);

    // API submission
    const res = await request(app)
      .post("/api/inquiries")
      .send(payload);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.id);
  });

  await t.test("2. Reject malformed submission missing mandatory message", async () => {
    const invalidPayload = {
      name: "Incomplete User",
      email: "incomplete@example.com",
      // missing message
    };

    const res = await request(app)
      .post("/api/inquiries")
      .send(invalidPayload);

    assert.equal(res.status, 400);
    assert.equal(res.body.error, "Validation failed");
  });

  await t.test("3. Reject submission with invalid email format", async () => {
    const badEmailPayload = {
      name: "Bad Email",
      email: "invalid-email-address",
      message: "Interested in catalog pricing",
    };

    const res = await request(app)
      .post("/api/inquiries")
      .send(badEmailPayload);

    assert.equal(res.status, 400);
    assert.equal(res.body.error, "Validation failed");
  });
});
