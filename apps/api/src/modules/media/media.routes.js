/**
 * Media Routes
 * Handles: /api/media/*, /api/certifications
 */
const express = require("express");
const router = express.Router();
const mediaController = require("./media.controller");
const { validateCreateMedia } = require("./media.validator");

/**
 * GET /api/media
 * List all media files
 */
router.get("/media", (req, res) => mediaController.getAllMedia(req, res));

/**
 * POST /api/media
 * Add media record
 */
router.post("/media", validateCreateMedia, (req, res) =>
  mediaController.createMedia(req, res)
);

/**
 * GET /api/certifications
 * List all certifications
 */
router.get("/certifications", (req, res) =>
  mediaController.getAllCertifications(req, res)
);

module.exports = router;
