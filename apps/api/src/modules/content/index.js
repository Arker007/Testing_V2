/**
 * Content Module
 * Encapsulates routes, controller, service, repository, validator, and mapper.
 */
const contentRoutes = require("./content.routes");
const contentController = require("./content.controller");
const contentService = require("./content.service");
const contentRepository = require("./content.repository");
const { validateContentUpdate } = require("./content.validator");
const contentMapper = require("./content.mapper");

module.exports = {
  routes: contentRoutes,
  controller: contentController,
  service: contentService,
  repository: contentRepository,
  validator: { validateContentUpdate },
  mapper: contentMapper,
};
