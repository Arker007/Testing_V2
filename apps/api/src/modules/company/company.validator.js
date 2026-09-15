/**
 * Company Validator
 */
const { z } = require("zod");

const companyUpdateSchema = z.object({}).passthrough();

module.exports = {
  validateCompanyUpdate: companyUpdateSchema,
};
