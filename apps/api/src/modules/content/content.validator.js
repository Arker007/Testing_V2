/**
 * Content Validator
 * Validation middleware for CMS content endpoints.
 */
const { z } = require("zod");

const contentSchema = z.record(z.any()).refine((data) => {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}, { message: "Body must be a key/value object" });

module.exports = {
  validateContentUpdate: contentSchema,
};
