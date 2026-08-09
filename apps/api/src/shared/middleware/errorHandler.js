/**
 * Global Error Handler Middleware
 */
const IS_PROD = process.env.NODE_ENV === 'production';

function errorHandler(err, req, res, next) {
  // Specifically handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("⚠️  Bad JSON request detected:", err.message);
    return res.status(400).json({
      success: false,
      error: "Malformed JSON payload",
      details: IS_PROD ? undefined : err.message,
    });
  }

  // Log all other errors
  console.error("❌ Server Error:", err.stack || err);

  // Ensure we don't try to send headers twice
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    success: false,
    error: IS_PROD ? "Internal Server Error" : (err.message || "Internal Server Error"),
  });
}

module.exports = errorHandler;
