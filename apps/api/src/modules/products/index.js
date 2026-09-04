/**
 * Products Module
 * Encapsulates routes, controller, service, repository, validator, and mapper.
 */
const productRoutes = require("./product.routes");
const productController = require("./product.controller");
const productService = require("./product.service");
const productRepository = require("./product.repository");
const { validateProduct } = require("./product.validator");
const productMapper = require("./product.mapper");

module.exports = {
  routes: productRoutes,
  controller: productController,
  service: productService,
  repository: productRepository,
  validator: { validateProduct },
  mapper: productMapper,
};
