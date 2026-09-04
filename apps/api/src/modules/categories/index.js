/**
 * Categories Module
 * Encapsulates routes, controller, service, repository, validator, and mapper.
 */
const categoryRoutes = require("./category.routes");
const categoryController = require("./category.controller");
const categoryService = require("./category.service");
const categoryRepository = require("./category.repository");
const { validateCategory } = require("./category.validator");
const categoryMapper = require("./category.mapper");

module.exports = {
  routes: categoryRoutes,
  controller: categoryController,
  service: categoryService,
  repository: categoryRepository,
  validator: { validateCategory },
  mapper: categoryMapper,
};
