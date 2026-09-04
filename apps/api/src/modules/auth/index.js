/**
 * Auth Module
 * Encapsulates routes, controller, service, repository, validator, and mapper.
 */
const authRoutes = require("./auth.routes");
const authController = require("./auth.controller");
const authService = require("./auth.service");
const authRepository = require("./auth.repository");
const { validateLogin, validateChangePassword } = require("./auth.validator");
const authMapper = require("./auth.mapper");

module.exports = {
  routes: authRoutes,
  controller: authController,
  service: authService,
  repository: authRepository,
  validator: { validateLogin, validateChangePassword },
  mapper: authMapper,
};
