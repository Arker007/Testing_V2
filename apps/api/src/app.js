/**
 * Express Application Factory
 * Configures middleware, security headers, routing, and error handling.
 */
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");
const { env } = require("./config/env");
const { httpLogger } = require("./infrastructure/logger");
const { checkDatabaseHealth } = require("./database");
const { errorHandler } = require("./middleware");

function createApp() {
  const app = express();
  const IS_PROD = env.IS_PROD;

  app.set("trust proxy", 1);

  // Security Headers (Helmet)
  app.use(
    helmet({
      contentSecurityPolicy: IS_PROD
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
              styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
              fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
              imgSrc: ["'self'", "data:", "blob:", "https:", "http:"],
              connectSrc: ["'self'", "*"],
              frameAncestors: ["*"],
            },
          }
        : false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
      frameguard: false,
    })
  );

  // Response Compression
  app.use(
    compression({
      level: 6,
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) return false;
        return compression.filter(req, res);
      },
    })
  );

  // CORS
  app.use(
    cors({
      origin: (origin, callback) => {
        // Dynamic origin support for dev, preview & iframe environments
        callback(null, true);
      },
      credentials: true,
    })
  );

  // Request Body Parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // HTTP Request Logging
  if (!env.IS_TEST) {
    app.use(httpLogger);
  }

  // Health Checks
  app.get("/health", async (req, res) => {
    let dbHealth = { healthy: false };
    try {
      dbHealth = await checkDatabaseHealth();
    } catch (err) {
      dbHealth = { healthy: false, error: err.message };
    }

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        database: dbHealth,
      });
    }
    return res.status(200).send("OK");
  });

  app.get("/api/health", async (req, res) => {
    const dbHealth = await checkDatabaseHealth();
    const statusCode = dbHealth.healthy ? 200 : 503;
    res.status(statusCode).json({
      status: dbHealth.healthy ? "ok" : "degraded",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: dbHealth,
    });
  });

  // Static Uploads
  const cacheOptions = {
    maxAge: IS_PROD ? "1y" : 0,
    etag: true,
    lastModified: true,
    immutable: IS_PROD,
  };

  const uploadPaths = [
    process.env.UPLOADS_DIR,
    path.join(process.cwd(), "storage/uploads"),
    path.join(__dirname, "../../../storage/uploads"),
    path.join(process.cwd(), "uploads"),
    path.join(__dirname, "../../../uploads"),
    path.join(__dirname, "../../uploads"),
  ].filter(Boolean);

  for (const p of uploadPaths) {
    app.use("/uploads", express.static(p, cacheOptions));
  }

  // Additional Security & Performance Headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    if (IS_PROD) {
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
    if (req.path.endsWith(".html")) {
      res.setHeader("Cache-Control", "public, max-age=3600");
    }
    next();
  });

  // Mount API Feature Routes
  const apiRouter = require("./routes");
  app.use("/api", apiRouter);

  // Handle undefined API routes
  app.use("/api/*", (req, res, next) => {
    const { NotFoundError } = require("./errors");
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
