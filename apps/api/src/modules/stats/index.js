/**
 * Stats Module
 * Encapsulates routes, controller, service, repository, validator, and mapper.
 */
const statsRoutes = require("./stats.routes");
const statsController = require("./stats.controller");
const statsService = require("./stats.service");
const statsRepository = require("./stats.repository");
const statsValidator = require("./stats.validator");
const statsMapper = require("./stats.mapper");

module.exports = {
  routes: statsRoutes,
  controller: statsController,
  service: statsService,
  repository: statsRepository,
  validator: statsValidator,
  mapper: statsMapper,
};
