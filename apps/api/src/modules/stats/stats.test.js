/**
 * Stats Module Unit Tests
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const statsModule = require("./index");

test("Stats module exports complete 6-layer architecture", () => {
  assert.ok(statsModule.routes);
  assert.ok(statsModule.controller);
  assert.ok(statsModule.service);
  assert.ok(statsModule.repository);
  assert.ok(statsModule.validator);
  assert.ok(statsModule.mapper);
});

test("Stats mapper sanitizes numbers correctly", () => {
  const raw = {
    products: "25",
    categories: 4,
    media: "12",
    inquiries: null,
  };

  const dto = statsModule.mapper.toDashboardStatsDTO(raw);
  assert.equal(dto.products, 25);
  assert.equal(dto.categories, 4);
  assert.equal(dto.media, 12);
  assert.equal(dto.inquiries, 0);
  assert.equal(dto.recycledTons, 5000);
  assert.equal(dto.clients, 200);
});
