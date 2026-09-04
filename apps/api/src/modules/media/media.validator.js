/**
 * Media Validator
 * Middleware for validating media requests.
 */

function validateCreateMedia(req, res, next) {
  const { filename, url } = req.body || {};
  if (!filename && !url) {
    return res
      .status(400)
      .json({ error: "Filename or URL is required for media record" });
  }
  next();
}

module.exports = {
  validateCreateMedia,
};
