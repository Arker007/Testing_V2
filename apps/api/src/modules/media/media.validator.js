/**
 * Media Validator
 */
const { z } = require("zod");

const createMediaSchema = z.object({
  filename: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
}).passthrough().refine(data => data.filename || data.url, {
  message: "Filename or URL is required for media record",
  path: ["filename"]
});

module.exports = {
  validateCreateMedia: createMediaSchema,
};
