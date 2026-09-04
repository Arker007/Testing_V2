/**
 * Company Validator
 * Middleware for validating company endpoint inputs.
 */

function validateCompanyUpdate(req, res, next) {
  if (req.body && typeof req.body !== "object") {
    return res.status(400).json({ error: "Request body must be an object" });
  }
  next();
}

module.exports = {
  validateCompanyUpdate,
};
