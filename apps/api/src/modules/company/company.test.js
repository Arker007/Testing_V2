/**
 * Company Module Unit Tests
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const companyModule = require("./index");

test("Company module exports complete 6-layer architecture", () => {
  assert.ok(companyModule.routes);
  assert.ok(companyModule.controller);
  assert.ok(companyModule.service);
  assert.ok(companyModule.repository);
  assert.ok(companyModule.validator);
  assert.ok(companyModule.mapper);
});

test("Company mapper serializes and parses data JSON correctly", () => {
  const companyData = {
    name: "Vishal Enterprise",
    email: "contact@vishalenterprise.com",
    address: "Gujarat, India",
  };

  const row = { data: JSON.stringify(companyData) };
  const dto = companyModule.mapper.toDomain(row);
  assert.equal(dto.name, "Vishal Enterprise");
  assert.equal(dto.email, "contact@vishalenterprise.com");
});
