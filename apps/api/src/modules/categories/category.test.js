/**
 * Categories Module Unit Tests
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const categoriesModule = require("./index");

test("Categories module exports complete 6-layer architecture", () => {
  assert.ok(categoriesModule.routes);
  assert.ok(categoriesModule.controller);
  assert.ok(categoriesModule.service);
  assert.ok(categoriesModule.repository);
  assert.ok(categoriesModule.validator);
  assert.ok(categoriesModule.mapper);
});

test("Category mapper parses JSON fields safely", () => {
  const raw = {
    id: "wooden-boxes",
    name: "Wooden Boxes",
    slug: "wooden-boxes",
    description: "Industrial wooden boxes",
    fields: JSON.stringify([{ name: "wood_type", label: "Wood Type", type: "text" }]),
  };

  const domain = categoriesModule.mapper.toDomain(raw);
  assert.equal(domain.id, "wooden-boxes");
  assert.equal(domain.name, "Wooden Boxes");
  assert.equal(Array.isArray(domain.fields), true);
  assert.equal(domain.fields[0].name, "wood_type");
});
