/**
 * Zod Schema for Inquiries and Contact Submissions
 * Delegated to shared canonical @vishal/contracts package
 */
const path = require("path");

let contracts;
try {
  contracts = require("@vishal/contracts");
} catch {
  contracts = require(path.resolve(__dirname, "../../../../packages/contracts"));
}

module.exports = {
  inquirySchema: contracts.inquirySchema,
  inquiryStatusUpdateSchema: contracts.inquiryStatusUpdateSchema,
};
