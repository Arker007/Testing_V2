/**
 * Auth Routes
 * Handles: /api/auth/*
 */
const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const validate = require("../../middleware/validate");
const { validateLogin, validateChangePassword } = require("./auth.validator");

/**
 * POST /api/auth/login
 * Authenticate user
 */
router.post("/login", validate(validateLogin), (req, res) =>
  authController.login(req, res)
);

/**
 * PUT /api/auth/password
 * Change admin password
 */
router.put("/password", validate(validateChangePassword), (req, res) =>
  authController.changePassword(req, res)
);

/**
 * GET /api/auth/me
 * Verify token
 */
router.get("/me", (req, res) => authController.getMe(req, res));

module.exports = router;
