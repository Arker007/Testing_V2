/**
 * Main Server Entry Point
 * Professional modular structure
 */
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const fs = require("fs");

// Database
const { initDatabase } = require("./src/shared/database/database");

const app = express();
const PORT = 3000;
const IS_PROD = process.env.NODE_ENV === "production";

// Root process error handlers
process.on("uncaughtException", (err) => {
  console.error("🔥 CRITICAL: Uncaught Exception:", err.stack || err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "🔥 CRITICAL: Unhandled Rejection at:",
    promise,
    "reason:",
    reason,
  );
});

// Enable gzip compression
app.use(
  compression({
    level: 6,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) return false;
      return compression.filter(req, res);
    },
  }),
);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow any origin dynamically to support AI Studio preview/iframe environments
      callback(null, true);
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" })); // Use built-in express.json()

// Request logging — only in development (exclude internal Vite asset requests)
if (!IS_PROD) {
  app.use((req, res, next) => {
    if (!req.path.startsWith("/src/") && !req.path.startsWith("/frontend/") && !req.path.startsWith("/@") && !req.path.startsWith("/node_modules/")) {
      console.log(`📨 ${req.method} ${req.path}`);
    }
    next();
  });
}

// Health Check
app.get("/health", (req, res) => res.status(200).send("OK"));

// Static Files with aggressive caching
const cacheOptions = {
  maxAge: IS_PROD ? "1y" : 0,
  etag: true,
  lastModified: true,
  immutable: IS_PROD,
};

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../../uploads"), cacheOptions),
);

// Security and Performance Headers
app.use((req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  // Permissions policy
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  // Enable strict HTTPS only in production
  if (IS_PROD) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }
  // Cache control for HTML files
  if (req.path.endsWith(".html")) {
    res.setHeader("Cache-Control", "public, max-age=3600");
  }
  next();
});

async function setupFrontend(app) {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    try {
      const { createServer: createViteServer } = require("vite");
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          host: "0.0.0.0",
        },
        appType: "spa",
        root: path.join(__dirname, "../web"),
      });
      app.use(vite.middlewares);
      console.log("⚡ Vite dev middleware initialized");
      return;
    } catch (err) {
      console.warn("⚠️ Vite middleware init failed, using static fallback:", err.message);
    }
  }

  const distPath = path.join(__dirname, "../web/dist");
  const distIndexHtml = path.join(distPath, "index.html");
  app.use(express.static(distPath, cacheOptions));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(distIndexHtml, (err) => {
      if (err) {
        res.sendFile(path.join(__dirname, "../web/index.html"));
      }
    });
  });
}

// Global error handler - MUST be defined after all other middleware and routes
const errorHandler = require("./src/shared/middleware/errorHandler");

// Start Server
async function start() {
  try {
    console.log("🚀 Starting server...");
    console.log("⏳ Initializing database...");
    await initDatabase();
    console.log("✅ Database initialized");

    // Load API routes AFTER database is initialized
    const apiRouter = require("./src/routes");
    app.use("/api", apiRouter);

    // Setup frontend (Vite dev server middleware or dist static)
    await setupFrontend(app);

    // Attach global error handler after API & frontend middleware
    app.use(errorHandler);

    console.log("⏳ Starting HTTP server...");

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
      console.log("⏳ Server is ready for connections");
    });

    // Graceful Shutdown
    const shutdown = () => {
      console.log("🛑 Shutting down server...");
      server.close(() => {
        console.log("👋 Server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
}

// Only start the HTTP server when this file is run directly.
// When required by the Vercel serverless handler (api/index.js) we
// export the app instead — the handler calls initDatabase() itself.
if (require.main === module) {
  start();
}

module.exports = { app };
