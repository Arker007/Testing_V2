/**
 * Product Validator
 */
const { z } = require("zod");

const productSchema = z.object({
  name: z.string({ required_error: "Product name is required" }).trim().min(1, "Product name is required"),
  category: z.string({ required_error: "Category is required" }).trim().min(1, "Category is required"),
  type: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  image: z.string().trim().optional().nullable(),
  price: z.union([z.string(), z.number()]).optional().nullable(),
  moq: z.string().trim().optional().nullable(),
  capacity: z.string().trim().optional().nullable(),
  dispatch: z.string().trim().optional().nullable(),
  customization: z.string().trim().optional().nullable(),
  technical_blurb: z.string().trim().optional().nullable(),
  applications: z.union([z.string(), z.array(z.string())]).optional().nullable(),
  specifications: z.union([z.string(), z.record(z.any())]).optional().nullable(),
  features: z.union([z.string(), z.array(z.string())]).optional().nullable(),
  published: z.union([z.number(), z.boolean()]).optional().nullable(),
}).passthrough();

module.exports = {
  validateProduct: productSchema
};
