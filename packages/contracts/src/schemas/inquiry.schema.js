const { z } = require("zod");
const { INQUIRY_STATUS, INQUIRY_TYPE } = require("../enums/inquiry.enums");

const inquirySchema = z
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

const inquiryStatusUpdateSchema = z.object({
  status: z.enum(Object.values(INQUIRY_STATUS)),
});

module.exports = {
  inquirySchema,
  inquiryStatusUpdateSchema,
};
