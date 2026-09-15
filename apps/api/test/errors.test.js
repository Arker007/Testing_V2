const test = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const request = require("supertest");
require("./setup");

const {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
} = require("../src/errors");
const errorHandler = require("../src/middleware/errorHandler");

test("Error classes instantiate with proper status codes and properties", () => {
  const notFound = new NotFoundError("Product missing");
  assert.equal(notFound.statusCode, 404);
  assert.equal(notFound.status, 404);
  assert.equal(notFound.message, "Product missing");
  assert.equal(notFound.isOperational, true);

  const validation = new ValidationError("Invalid SKU", { field: "sku" });
  assert.equal(validation.statusCode, 400);
  assert.deepEqual(validation.details, { field: "sku" });

  const unauthorized = new UnauthorizedError();
  assert.equal(unauthorized.statusCode, 401);

  const forbidden = new ForbiddenError();
  assert.equal(forbidden.statusCode, 403);

  const conflict = new ConflictError();
  assert.equal(conflict.statusCode, 409);
});

test("errorHandler middleware formats AppErrors with appropriate status and payload", async () => {
  const testApp = express();
  testApp.use(express.json());

  testApp.get("/test-not-found", (req, res, next) => {
    next(new NotFoundError("Custom item not found", { id: 42 }));
  });

  testApp.get("/test-validation", (req, res, next) => {
    next(new ValidationError("Field required", ["name"]));
  });

  testApp.use(errorHandler);

  const resNotFound = await request(testApp).get("/test-not-found");
  assert.equal(resNotFound.status, 404);
  assert.equal(resNotFound.body.success, false);
  assert.equal(resNotFound.body.error, "Custom item not found");
  assert.deepEqual(resNotFound.body.details, { id: 42 });

  const resValidation = await request(testApp).get("/test-validation");
  assert.equal(resValidation.status, 400);
  assert.equal(resValidation.body.success, false);
  assert.equal(resValidation.body.error, "Field required");
  assert.deepEqual(resValidation.body.details, ["name"]);
});
