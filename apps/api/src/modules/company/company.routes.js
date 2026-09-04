/**
 * Company Routes
 * Handles: /api/company/*
 */
const express = require("express");
const router = express.Router();
const companyController = require("./company.controller");
const { validateCompanyUpdate } = require("./company.validator");

/**
 * GET /api/company
 * Get company info
 */
router.get("/", (req, res) => companyController.getCompanyInfo(req, res));

/**
 * POST /api/company
 * Update company info (merges with existing)
 */
router.post("/", validateCompanyUpdate, (req, res) =>
  companyController.updateCompanyInfo(req, res)
);

module.exports = router;
