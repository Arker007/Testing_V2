/**
 * Inquiries Module
 * Encapsulates routes, controller, service, repository, validator, and mapper.
 */
const inquiryRoutes = require("./inquiry.routes");
const inquiryController = require("./inquiry.controller");
const inquiryService = require("./inquiry.service");
const inquiryRepository = require("./inquiry.repository");
const { validateInquiry } = require("./inquiry.validator");
const inquiryMapper = require("./inquiry.mapper");

module.exports = {
  routes: inquiryRoutes,
  controller: inquiryController,
  service: inquiryService,
  repository: inquiryRepository,
  validator: { validateInquiry },
  mapper: inquiryMapper,
};
