/**
 * Stats Routes
 * Handles: /api/stats
 */
const express = require("express");
const router = express.Router();
const statsController = require("./stats.controller");

router.get("/stats", (req, res, next) => statsController.getStats(req, res, next));

module.exports = router;
