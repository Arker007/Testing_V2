/**
 * Content Module Unit Tests
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const contentModule = require("./index");

test("Content module exports complete 6-layer architecture", () => {
  assert.ok(contentModule.routes);
  assert.ok(contentModule.controller);
  assert.ok(contentModule.service);
  assert.ok(contentModule.repository);
  assert.ok(contentModule.validator);
  assert.ok(contentModule.mapper);
});

test("Content mapper formats key-value rows to domain map", () => {
  const rows = [
    { section: "hero", key: "hero_title", value: "Custom Wooden Packaging", type: "text" },
    { section: "hero", key: "hero_subtitle", value: "High durability solutions", type: "text" },
  ];

  const contentMap = contentModule.mapper.toDomain(rows);
  assert.equal(contentMap.hero_title.value, "Custom Wooden Packaging");
  assert.equal(contentMap.hero_subtitle.value, "High durability solutions");
});
