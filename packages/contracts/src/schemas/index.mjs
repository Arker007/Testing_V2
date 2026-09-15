import { z } from "zod";
import { INQUIRY_STATUS } from "../enums/index.mjs";

export const inquirySchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(1, "Name is required"),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Invalid email format"),
    message: z
      .string({ required_error: "Message is required" })
      .trim()
      .min(1, "Message is required"),
    phone: z.string().optional().nullable(),
    subject: z.string().optional().nullable(),
    inquiry_type: z.string().optional().nullable(),
    inquiryType: z.string().optional().nullable(),
    product_id: z.union([z.string(), z.number()]).optional().nullable(),
    productId: z.union([z.string(), z.number()]).optional().nullable(),
    company: z.string().optional().nullable(),
    quantity: z.union([z.string(), z.number()]).optional().nullable(),
  })
  .passthrough();

export const inquiryStatusUpdateSchema = z.object({
  status: z.enum(Object.values(INQUIRY_STATUS)),
});

export const productFilterSchema = z
  .object({
    category: z.string().optional(),
    search: z.string().optional(),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(20),
    sort: z.enum(["name", "created_at", "display_order"]).optional().default("display_order"),
    order: z.enum(["asc", "desc"]).optional().default("asc"),
  })
  .passthrough();

export const productPayloadSchema = z
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
