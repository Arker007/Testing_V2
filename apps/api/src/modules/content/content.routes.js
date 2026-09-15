/**
 * Content Routes (CMS)
 * Handles: /api/content/*
 */
const express = require("express");
const router = express.Router();
const contentController = require("./content.controller");
const validate = require("../../middleware/validate");
const { validateContentUpdate } = require("./content.validator");

/**
 * GET /api/content
 * Get all CMS content
 */
router.get("/", (req, res) => contentController.getAllContent(req, res));

/**
 * POST /api/content
 * Update or create CMS content (bulk)
 */
router.post("/", validate(validateContentUpdate), (req, res) =>
  contentController.updateContent(req, res)
);

module.exports = router;
