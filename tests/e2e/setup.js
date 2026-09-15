/**
 * E2E Test Setup & Isolation Harness
 */
process.env.NODE_ENV = "test";
process.env.PORT = "3002";
process.env.JWT_SECRET = "e2e-test-jwt-secret";

// Keep test output clean
console.log = () => {};
console.info = () => {};
