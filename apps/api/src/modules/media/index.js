/**
 * Media Module
 * Encapsulates routes, controller, service, repository, validator, and mapper.
 */
const mediaRoutes = require("./media.routes");
const mediaController = require("./media.controller");
const mediaService = require("./media.service");
const mediaRepository = require("./media.repository");
const { validateCreateMedia } = require("./media.validator");
const mediaMapper = require("./media.mapper");

module.exports = {
  routes: mediaRoutes,
  controller: mediaController,
  service: mediaService,
  repository: mediaRepository,
  validator: { validateCreateMedia },
  mapper: mediaMapper,
};
