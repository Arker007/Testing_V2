/**
 * Content Validator
 * Validation middleware for CMS content endpoints.
 */

function validateContentUpdate(req, res, next) {
  const updates = req.body;
  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    return res.status(400).json({ error: "Body must be a key/value object" });
  }
  next();
}

module.exports = {
  validateContentUpdate,
};
