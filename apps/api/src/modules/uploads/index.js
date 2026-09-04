/**
 * Upload Module
 * Encapsulates routes, controller, service, repository, validator, and mapper.
 */
const uploadRoutes = require("./upload.routes");
const uploadController = require("./upload.controller");
const uploadService = require("./upload.service");
const uploadRepository = require("./upload.repository");
const { validateUpload } = require("./upload.validator");
const uploadMapper = require("./upload.mapper");

module.exports = {
  routes: uploadRoutes,
  controller: uploadController,
  service: uploadService,
  repository: uploadRepository,
  validator: { validateUpload },
  mapper: uploadMapper,
};
