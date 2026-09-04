/**
 * Products Routes
 * Handles: /api/products/*
 */
const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const validate = require("../../middleware/validate");
const { validateProduct } = require("./product.validator");

/**
 * GET /api/products
 * List all products
 */
router.get("/", (req, res) => productController.getAllProducts(req, res));

/**
 * GET /api/products/:id
 * Get single product
 */
router.get("/:id", (req, res) => productController.getProductById(req, res));

/**
 * POST /api/products
 * Create new product
 */
router.post("/", validate(validateProduct), (req, res) =>
  productController.createProduct(req, res)
);

/**
 * PUT /api/products/:id
 * Update product
 */
router.put("/:id", validate(validateProduct), (req, res) =>
  productController.updateProduct(req, res)
);

/**
 * DELETE /api/products/:id
 * Delete product
 */
router.delete("/:id", (req, res) => productController.deleteProduct(req, res));

module.exports = router;
