/**
 * Main Server Entry Point
 * Uses createApp() factory with Vite dev / production frontend integration.
 */
const path = require("path");
const express = require("express");
const { env } = require("./src/config/env");
const { logger } = require("./src/infrastructure/logger");
const { initDatabase } = require("./src/database");
const { createApp } = require("./src/app");
const { errorHandler } = require("./src/middleware");

// Root process error handlers
process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "🔥 CRITICAL: Uncaught Exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.fatal({ reason, promise }, "🔥 CRITICAL: Unhandled Rejection");
});

const app = createApp();
const PORT = env.PORT;
const IS_PROD = env.IS_PROD;

async function setupFrontend(expressApp) {
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
      expressApp.use(vite.middlewares);
      console.log("⚡ Vite dev middleware initialized");
      return;
    } catch (err) {
      console.warn("⚠️ Vite middleware init failed, using static fallback:", err.message);
    }
  }

  const distPath = path.join(__dirname, "../web/dist");
  const distIndexHtml = path.join(distPath, "index.html");
  const cacheOptions = {
    maxAge: IS_PROD ? "1y" : 0,
    etag: true,
    lastModified: true,
    immutable: IS_PROD,
  };

  expressApp.use(express.static(distPath, cacheOptions));
  expressApp.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(distIndexHtml, (err) => {
      if (err) {
        res.sendFile(path.join(__dirname, "../web/index.html"));
      }
    });
  });
}

// Attach frontend & error handler
let serverPromise = null;

async function start() {
  if (serverPromise) return serverPromise;

  try {
    console.log("🚀 Starting server...");
    console.log("⏳ Initializing database...");
    await initDatabase();
    console.log("✅ Database initialized");

    // Setup frontend (Vite dev server middleware or dist static)
    await setupFrontend(app);

    // Global error handler - after all routes
    app.use(errorHandler);

    console.log("⏳ Starting HTTP server...");
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
      console.log("⏳ Server is ready for connections");
    });

    const shutdown = () => {
      console.log("🛑 Shutting down server...");
      server.close(() => {
        console.log("👋 Server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);

    serverPromise = server;
    return server;
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
}

// Attach error handler for test harnesses that use app directly without calling start()
app.use(errorHandler);

if (require.main === module) {
  start();
}

module.exports = { app, start };
