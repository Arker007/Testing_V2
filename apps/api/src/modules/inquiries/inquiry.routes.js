/**
 * Inquiries & Contact Routes
 * Handles: /api/inquiries/*, /api/contact/*
 */
const express = require("express");
const router = express.Router();
const inquiryController = require("./inquiry.controller");
const validate = require("../../middleware/validate");
const { validateInquiry } = require("./inquiry.validator");

/**
 * POST /api/contact
 * Submit contact form
 */
router.post("/contact", validate(validateInquiry), (req, res) =>
  inquiryController.submitContactForm(req, res)
);

/**
 * GET /api/contact
 * Get all contact messages (admin)
 */
router.get("/contact", (req, res) =>
  inquiryController.getAllContactMessages(req, res)
);

/**
 * POST /api/inquiries
 * Submit product inquiry
 */
router.post("/inquiries", validate(validateInquiry), (req, res) =>
  inquiryController.submitProductInquiry(req, res)
);

/**
 * GET /api/inquiries
 * Get all inquiries with product info (admin)
 */
router.get("/inquiries", (req, res) =>
  inquiryController.getAllInquiries(req, res)
);

/**
 * DELETE /api/inquiries/:type/:id
 * Delete an inquiry or contact message
 */
router.delete("/inquiries/:type/:id", (req, res) =>
  inquiryController.deleteInquiry(req, res)
);

module.exports = router;
