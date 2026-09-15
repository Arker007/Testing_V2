/**
 * Rate Limiting Middleware
 * Protects auth and inquiry endpoints from brute force and spam attacks.
 */
const rateLimit = require("express-rate-limit");
const { env } = require("../config/env");

const isTest = env.IS_TEST;

/**
 * Rate limiter for authentication endpoints (login, password change)
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isTest ? 5 : 20, // 20 requests per 15 min (5 in test)
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many authentication requests, please try again later.",
  },
});

/**
 * Rate limiter for public inquiries and contact form submissions
 */
const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isTest ? 10 : 30, // 30 requests per hour (10 in test)
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many submissions received, please try again later.",
  },
});

module.exports = {
  authLimiter,
  inquiryLimiter,
};
