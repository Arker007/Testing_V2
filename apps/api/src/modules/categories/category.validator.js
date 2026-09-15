/**
 * Category Validator
 */
const { z } = require("zod");

const categorySchema = z.object({
  name: z.string({ required_error: "Category name is required" }).trim().min(1, "Category name is required"),
  slug: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  image: z.string().trim().optional().nullable(),
  fields: z.union([z.string(), z.array(z.any())]).optional().nullable(),
}).passthrough();

module.exports = {
  validateCategory: categorySchema
};
