/**
 * Media Module Unit Tests
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const mediaModule = require("./index");

test("Media module exports complete 6-layer architecture", () => {
  assert.ok(mediaModule.routes);
  assert.ok(mediaModule.controller);
  assert.ok(mediaModule.service);
  assert.ok(mediaModule.repository);
  assert.ok(mediaModule.validator);
  assert.ok(mediaModule.mapper);
});

test("Media mapper formats media entity correctly", () => {
  const mediaRow = {
    id: 10,
    filename: "pallet-spec.webp",
    url: "/uploads/products/pallet-spec.webp",
    created_at: "2026-09-11 12:00:00",
  };

  const domain = mediaModule.mapper.toMediaDomain(mediaRow);
  assert.equal(domain.id, 10);
  assert.equal(domain.filename, "pallet-spec.webp");
  assert.equal(domain.url, "/uploads/products/pallet-spec.webp");
});
