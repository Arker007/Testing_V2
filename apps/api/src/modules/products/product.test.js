/**
 * Products Module Unit Tests
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const productsModule = require("./index");

test("Products module exports complete 6-layer architecture", () => {
  assert.ok(productsModule.routes);
  assert.ok(productsModule.controller);
  assert.ok(productsModule.service);
  assert.ok(productsModule.repository);
  assert.ok(productsModule.validator);
  assert.ok(productsModule.mapper);
});

test("Products mapper transforms DB rows correctly to domain DTOs", () => {
  const raw = {
    id: "prod-1",
    name: "Heavy Duty Pallet",
    category: "wooden-pallets",
    price: "450",
    specifications: JSON.stringify({ Dimensions: "1200x1000", Capacity: "1500kg" }),
    features: JSON.stringify(["Heat Treated", "4-Way Entry"]),
    published: 1,
  };

  const domain = productsModule.mapper.toDomain(raw);
  assert.equal(domain.id, "prod-1");
  assert.equal(domain.name, "Heavy Duty Pallet");
  assert.deepEqual(domain.specifications, { Dimensions: "1200x1000", Capacity: "1500kg" });
  assert.deepEqual(domain.features, ["Heat Treated", "4-Way Entry"]);
  assert.equal(domain.published, 1);
});
