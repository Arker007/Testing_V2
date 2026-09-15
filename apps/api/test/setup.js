/**
 * Backend Test Harness Setup
 * Configures test environment variables and isolation
 */
process.env.NODE_ENV = "test";
process.env.PORT = "3001";
process.env.JWT_SECRET = "test-jwt-secret-key";

// Disable verbose logs during test runs
console.log = () => {};
console.info = () => {};
