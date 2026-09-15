/**
 * Auth Middleware
 * Basic authentication check for admin routes
 */
const { createAuthToken, verifyAuthToken } = require("../infrastructure/security");

/**
 * Verify admin session
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Authentication required" });
  }

  const token = authHeader.slice(7);
  try {
    const user = verifyAuthToken(token);
    if (user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Admin access required" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
}

/**
 * Rate limiting for login attempts
 */
const loginAttempts = new Map();

setInterval(() => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  for (const [ip, attempts] of loginAttempts.entries()) {
    if (now - attempts.firstAttempt > windowMs) {
      loginAttempts.delete(ip);
    }
  }
}, 15 * 60 * 1000).unref();

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection?.remoteAddress || "127.0.0.1";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const attempts = loginAttempts.get(ip) || { count: 0, firstAttempt: now };

  if (now - attempts.firstAttempt > windowMs) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return next();
  }

  if (attempts.count >= maxAttempts) {
    return res.status(429).json({ error: "Too many login attempts. Try again later." });
  }

  attempts.count++;
  loginAttempts.set(ip, attempts);
  next();
}

module.exports = {
  requireAuth,
  rateLimit,
  createAuthToken,
  verifyAuthToken,
};
