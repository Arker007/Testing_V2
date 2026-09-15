const { z } = require("zod");

const productFilterSchema = z
  .object({
    category: z.string().optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(20),
    sort: z.enum(["name", "created_at", "display_order"]).optional().default("display_order"),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
  })
  .passthrough();

const productPayloadSchema = z
  .object({
    name: z.string().trim().min(1, "Product name is required"),
    slug: z.string().trim().min(1, "Product slug is required").optional(),
    category_id: z.union([z.string(), z.number()]).optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    short_description: z.string().optional(),
    image: z.string().optional(),
    specifications: z.union([z.record(z.any()), z.string()]).optional(),
    display_order: z.number().int().optional().default(0),
    is_active: z.union([z.boolean(), z.number()]).optional().default(true),
  })
  .passthrough();

module.exports = {
  productFilterSchema,
  productPayloadSchema,
};
