/**
 * Middleware Layer Test Suite
 * Verifies the middleware barrel and individual middleware behavior.
 */
const { test, describe, it } = require("node:test");
const assert = require("node:assert/strict");
const middleware = require("../src/middleware");
const { ValidationError, UnauthorizedError } = require("../src/errors");

test("Middleware barrel exports all required standard middlewares", () => {
  assert.ok(middleware.errorHandler);
  assert.ok(middleware.authLimiter);
  assert.ok(middleware.inquiryLimiter);
  assert.ok(middleware.requireAuth);
  assert.ok(middleware.rateLimit);
  assert.ok(middleware.createAuthToken);
  assert.ok(middleware.verifyAuthToken);
  assert.ok(middleware.validate);
});

test("validate middleware intercepts invalid schema payloads and forwards ValidationError", (t, done) => {
  const mockSchema = {
    safeParse: (body) => {
      if (!body.name) {
        return {
          success: false,
          error: {
            flatten: () => ({ fieldErrors: { name: ["Name is required"] } }),
          },
        };
      }
      return { success: true, data: body };
    },
  };

  const validatorMw = middleware.validate(mockSchema);
  const req = { body: {} };
  const res = {};
  
  validatorMw(req, res, (err) => {
    assert.ok(err instanceof ValidationError);
    assert.equal(err.statusCode, 400);
    assert.equal(err.details.name, "Name is required");
    done();
  });
});

test("validate middleware passes valid payloads and attaches req.validated", (t, done) => {
  const mockSchema = {
    safeParse: (body) => ({ success: true, data: { ...body, validated: true } }),
  };

  const validatorMw = middleware.validate(mockSchema);
  const req = { body: { name: "Test Product" } };
  const res = {};

  validatorMw(req, res, (err) => {
    assert.equal(err, undefined);
    assert.equal(req.validated.name, "Test Product");
    assert.equal(req.validated.validated, true);
    done();
  });
});

test("requireAuth middleware blocks unauthorized requests without token", (t, done) => {
  const req = { headers: {} };
  let statusSet = 0;
  let jsonResponse = null;

  const res = {
    status: (code) => {
      statusSet = code;
      return {
        json: (data) => {
          jsonResponse = data;
          assert.equal(statusSet, 401);
          assert.equal(jsonResponse.success, false);
          done();
        },
      };
    },
  };

  middleware.requireAuth(req, res, () => {
    assert.fail("Should not reach next()");
  });
});

test("requireAuth middleware passes requests with valid signed admin token", (t, done) => {
  const token = middleware.createAuthToken("adminuser", "admin");
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = {};

  middleware.requireAuth(req, res, () => {
    assert.ok(req.user);
    assert.equal(req.user.username, "adminuser");
    assert.equal(req.user.role, "admin");
    done();
  });
});
