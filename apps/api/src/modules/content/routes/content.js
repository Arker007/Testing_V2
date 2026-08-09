/**
 * Content Routes (CMS)
 * Handles: /api/content/*
 */
const express = require("express");
const router = express.Router();
const { db } = require("../../../shared/database/database");

/**
 * GET /api/content
 * Get all CMS content
 */
router.get("/", (req, res) => {
  db.all(
    "SELECT section, key, value, type FROM site_content",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const content = {};
      rows.forEach((row) => {
        content[row.key] = {
          value: row.value,
          type: row.type,
          section: row.section,
        };
      });
      res.setHeader(
        "Cache-Control",
        "public, max-age=300, stale-while-revalidate=3600",
      );
      res.json(content);
    },
  );
});

/**
 * POST /api/content
 * Update or create CMS content (bulk)
 */
router.post("/", async (req, res) => {
  const updates = req.body;
  if (!updates || typeof updates !== "object") {
    return res.status(400).json({ error: "Body must be a key/value object" });
  }

  // Build batch statements for all fields — executed atomically
  const stmts = Object.entries(updates).map(([key, value]) => {
    const section = key.split("_")[0] || "global";
    const type = key.includes("image") ? "image" : "text";
    return {
      sql: `INSERT OR REPLACE INTO site_content (key, value, section, type) VALUES (?, ?, ?, ?)`,
      args: [key, String(value ?? ""), section, type],
    };
  });

  try {
    await db.batch(stmts);
    res.json({ success: true });
  } catch (err) {
    console.error("Content save error:", err);
    res.status(500).json({ error: "Failed to update content" });
  }
});

module.exports = router;
