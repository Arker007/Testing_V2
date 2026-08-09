/**
 * Validation Middleware
 * Checks the request body using a validator function and returns 400 Bad Request if validation fails.
 */
function validate(validatorFn) {
  return (req, res, next) => {
    const errors = validatorFn(req.body || {});
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors
      });
    }
    next();
  };
}

module.exports = validate;
