const { inquirySchema, inquiryStatusUpdateSchema } = require("./inquiry.schema");
const { productFilterSchema, productPayloadSchema } = require("./product.schema");

module.exports = {
  inquirySchema,
  inquiryStatusUpdateSchema,
  productFilterSchema,
  productPayloadSchema,
};
