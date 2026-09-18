/**
 * Inquiries Module Unit Tests
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const inquiryModule = require("./index");

test("Inquiries module exports complete 6-layer architecture", () => {
  assert.ok(inquiryModule.routes);
  assert.ok(inquiryModule.controller);
  assert.ok(inquiryModule.service);
  assert.ok(inquiryModule.repository);
  assert.ok(inquiryModule.validator);
  assert.ok(inquiryModule.mapper);
});

test("Inquiry mapper normalizes phone and company from message correctly", () => {
  const payload = {
    name: "John Doe",
    email: "john@example.com",
    message: "Phone: +919876543210\nCompany: ABC Corp\nNeed 500 units quote",
  };

  const normalized = inquiryModule.mapper.normalizeInquiryData(payload);
  assert.equal(normalized.phone, "+919876543210");
  assert.equal(normalized.company, "ABC Corp");
  assert.equal(normalized.message, "Need 500 units quote");
});

test("Inquiry service rejects invalid inquiry types", async () => {
  const res = await inquiryModule.service.deleteInquiry("unknown_type_xyz", "123");
  assert.equal(res.status, 400);
  assert.ok(res.error);
});
