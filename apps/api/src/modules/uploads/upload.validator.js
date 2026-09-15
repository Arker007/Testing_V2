/**
 * Upload Validator
 * Validation middleware for file upload requests.
 */
const { ValidationError } = require("../../errors");

function validateUpload(req, res, next) {
  if (!req.files || req.files.length === 0) {
    return next(new ValidationError("No files uploaded"));
  }
  next();
}

module.exports = {
  validateUpload,
};
