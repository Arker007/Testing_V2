/**
 * Validation Middleware
 * Checks the request body using a Zod schema or legacy validator function.
 * Forwards a ValidationError to the global error handler if validation fails.
 */
const { ValidationError } = require("../errors");

function validate(schemaOrFn) {
  return (req, res, next) => {
    // If it's a Zod schema (has safeParse)
    if (schemaOrFn && typeof schemaOrFn.safeParse === "function") {
      const result = schemaOrFn.safeParse(req.body || {});
      if (!result.success) {
        const rawErrors = result.error.flatten().fieldErrors;
        const details = {};
        for (const [key, msgs] of Object.entries(rawErrors)) {
          details[key] = msgs?.[0] || "Invalid value";
        }
        return next(new ValidationError("Validation failed", details));
      }
      req.validated = result.data;
      return next();
    }

    // If it's a legacy validator function
    if (typeof schemaOrFn === "function") {
      const errors = schemaOrFn(req.body || {});
      if (errors && Object.keys(errors).length > 0) {
        return next(new ValidationError("Validation failed", errors));
      }
      return next();
    }

    next();
  };
}

module.exports = validate;
