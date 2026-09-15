/**
 * Auth Module Unit Tests
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const authModule = require("./index");

test("Auth module exports complete 6-layer architecture", () => {
  assert.ok(authModule.routes);
  assert.ok(authModule.controller);
  assert.ok(authModule.service);
  assert.ok(authModule.repository);
  assert.ok(authModule.validator);
  assert.ok(authModule.mapper);
});

test("Auth mapper strips password hashes from safe user DTO", () => {
  const userRow = {
    id: 1,
    username: "admin",
    password: "$2a$10$hashedpasswordhere",
    role: "admin",
  };

  const safeDto = authModule.mapper.toDomain(userRow);
  assert.equal(safeDto.id, 1);
  assert.equal(safeDto.username, "admin");
  assert.equal(safeDto.role, "admin");
  assert.equal(safeDto.password, undefined);
});
