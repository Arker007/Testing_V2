/**
 * Categories Routes
 * Handles: /api/categories/*
 */
const express = require("express");
const router = express.Router();
const categoryController = require("./category.controller");
const validate = require("../../middleware/validate");
const { validateCategory } = require("./category.validator");

/**
 * GET /api/categories
 * List all categories with fields
 */
router.get("/", (req, res) => categoryController.getAllCategories(req, res));

/**
 * GET /api/categories/:id
 * Get single category
 */
router.get("/:id", (req, res) => categoryController.getCategoryById(req, res));

/**
 * POST /api/categories
 * Create new category
 */
router.post("/", validate(validateCategory), (req, res) =>
  categoryController.createCategory(req, res)
);

/**
 * PUT /api/categories/:id
 * Update category
 */
router.put("/:id", validate(validateCategory), (req, res) =>
  categoryController.updateCategory(req, res)
);

/**
 * DELETE /api/categories/:id
 * Delete category
 */
router.delete("/:id", (req, res) => categoryController.deleteCategory(req, res));

module.exports = router;
