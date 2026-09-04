/**
 * Upload Validator
 * Validation middleware for file upload requests.
 */

function validateUpload(req, res, next) {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  next();
}

module.exports = {
  validateUpload,
};
