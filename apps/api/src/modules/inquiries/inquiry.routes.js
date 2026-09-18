/**
 * Inquiries & Contact Routes
 * Handles: /api/inquiries/*, /api/contact/*
 */
const express = require("express");
const router = express.Router();
const inquiryController = require("./inquiry.controller");
const validate = require("../../middleware/validate");
const { inquiryLimiter } = require("../../middleware/rateLimiter");
const { inquirySchema } = require("../../validation/inquiry.schema");

/**
 * POST /api/contact
 * Submit contact form
 */
router.post("/contact", inquiryLimiter, validate(inquirySchema), (req, res) =>
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
router.post("/inquiries", inquiryLimiter, validate(inquirySchema), (req, res) =>
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
 * Delete an inquiry or contact message by type and id
 */
router.delete("/inquiries/:type/:id", (req, res) =>
  inquiryController.deleteInquiry(req, res)
);

/**
 * DELETE /api/inquiries/:id
 * Delete an inquiry or contact message by id (with optional source/type query)
 */
router.delete("/inquiries/:id", (req, res) =>
  inquiryController.deleteInquiry(req, res)
);

/**
 * DELETE /api/contact/:id
 * Delete a contact message by id
 */
router.delete("/contact/:id", (req, res) =>
  inquiryController.deleteContactMessage(req, res)
);

module.exports = router;
