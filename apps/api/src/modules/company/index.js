/**
 * Company Module
 * Encapsulates routes, controller, service, repository, validator, and mapper.
 */
const companyRoutes = require("./company.routes");
const companyController = require("./company.controller");
const companyService = require("./company.service");
const companyRepository = require("./company.repository");
const { validateCompanyUpdate } = require("./company.validator");
const companyMapper = require("./company.mapper");

module.exports = {
  routes: companyRoutes,
  controller: companyController,
  service: companyService,
  repository: companyRepository,
  validator: { validateCompanyUpdate },
  mapper: companyMapper,
};
