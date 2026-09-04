/**
 * Central API Router
 * Combines all feature modules
 */
const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");

function getClientIp(req) {
  const forwarded = req.headers["forwarded"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    const firstHop = forwarded.split(",")[0] || "";
    const match = firstHop.match(/for=(?:"?\[?)([^\]\";]+)(?:\]?"?)/i);
    if (match && match[1]) return match[1].trim();
  }

  const xForwardedFor = req.headers["x-forwarded-for"];
  if (typeof xForwardedFor === "string" && xForwardedFor.length > 0) {
    return xForwardedFor.split(",")[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || "unknown";
}

// Rate limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  keyGenerator: (req) => getClientIp(req),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  keyGenerator: (req) => getClientIp(req),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many contact submissions. Please try again in an hour.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  keyGenerator: (req) => getClientIp(req),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many login attempts. Please try again in 15 minutes.",
  },
});

// Apply general rate limit to all API routes
router.use(generalLimiter);

// Guard mutating endpoints by default.
router.use((req, res, next) => {
  const isWriteMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);
  if (!isWriteMethod) return next();

  const publicWritePaths = ["/auth/login", "/contact", "/inquiries"];
  if (publicWritePaths.includes(req.path)) return next();

  return requireAuth(req, res, next);
});

// Apply contact limiter only to public POST submissions.
router.use((req, res, next) => {
  const isPublicSubmission =
    req.method === "POST" &&
    (req.path === "/contact" || req.path === "/inquiries");

  if (!isPublicSubmission) return next();
  return contactLimiter(req, res, next);
});

// Import route modules from feature folders
const productsRouter = require("../modules/products/product.routes");
const categoriesRouter = require("../modules/categories/category.routes");
const authRouter = require("../modules/auth/auth.routes");
const contentRouter = require("../modules/content/content.routes");
const companyRouter = require("../modules/company/company.routes");
const inquiriesRouter = require("../modules/inquiries/inquiry.routes");
const uploadRouter = require("../modules/uploads/upload.routes");
const mediaRouter = require("../modules/media/media.routes");
const statsRouter = require("../modules/stats/stats.routes");

// Mount routes
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/auth/login", authLimiter);
router.use("/auth", authRouter);
router.use("/content", contentRouter);
router.use("/company", companyRouter);
router.use("/", inquiriesRouter); // /api/inquiries, /api/contact
router.use("/upload", uploadRouter);
router.use("/", mediaRouter); // /api/media, /api/certifications
router.use("/", statsRouter); // /api/stats

module.exports = router;
