/**
 * Upload Routes
 * Handles: /api/upload/*
 */
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const uploadController = require("./upload.controller");
const uploadRepository = require("./upload.repository");
const { validateUpload } = require("./upload.validator");

// Multer configuration – evaluate dir lazily per request
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, uploadRepository.getUploadsDir()),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mime = allowed.test(file.mimetype);
    cb(null, ext && mime);
  },
});

/**
 * POST /api/upload/images
 * Upload and optimize images
 */
router.post(
  "/images",
  upload.array("images", 10),
  validateUpload,
  (req, res) => uploadController.uploadImages(req, res)
);

module.exports = router;
