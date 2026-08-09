/**
 * Categories Routes
 * Handles: /api/categories/*
 */
const express = require("express");
const router = express.Router();
const { db } = require("../config/database");
const { getCache, setCache, invalidate } = require("../utils/cache");
const validate = require("../middleware/validate");
const { validateCategory } = require("../validators/category");

const CATEGORIES_TTL = 120; // seconds — categories change rarely

// Default fields for categories without custom definitions
const defaultCategoryFields = [
  {
    name: "dimensions",
    label: "Dimensions",
    type: "text",
    placeholder: "e.g., 100 x 50 x 25 cm",
  },
  {
    name: "material",
    label: "Material",
    type: "text",
    placeholder: "e.g., Recycled HDPE",
  },
  { name: "weight", label: "Weight", type: "text", placeholder: "e.g., 5 kg" },
  {
    name: "color",
    label: "Color",
    type: "text",
    placeholder: "e.g., Black, Grey, Brown",
  },
];

/**
 * GET /api/categories
 * List all categories with fields (in-memory cached)
 */
router.get("/", (req, res) => {
  const cached = getCache("categories");
  if (cached) {
    res.setHeader(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=600",
    );
    res.setHeader("X-Cache", "HIT");
    return res.json(cached);
  }

  db.all("SELECT * FROM categories", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const categoriesWithFields = rows.map((cat) => {
      let fields = [];
      if (cat.fields) {
        try {
          fields = JSON.parse(cat.fields);
        } catch (e) {
          console.error("Error parsing DB fields for cat " + cat.id, e);
        }
      }
      if (!fields || fields.length === 0) {
        fields = defaultCategoryFields;
      }
      return { ...cat, fields };
    });
    const payload = { categories: categoriesWithFields };
    setCache("categories", payload, CATEGORIES_TTL);
    res.setHeader(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=600",
    );
    res.setHeader("X-Cache", "MISS");
    res.json(payload);
  });
});

/**
 * GET /api/categories/:id
 * Get single category
 */
router.get("/:id", (req, res) => {
  db.get(
    "SELECT * FROM categories WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Category not found" });
      let fields = [];
      if (row.fields) {
        try {
          fields = JSON.parse(row.fields);
        } catch (e) {}
      }
      res.json({ ...row, fields });
    },
  );
});

/**
 * POST /api/categories
 * Create new category
 */
router.post("/", validate(validateCategory), (req, res) => {
  const c = req.body;
  const sql = `INSERT INTO categories (id, name, slug, description, image, fields) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    c.id || "cat_" + Date.now(),
    c.name ?? null,
    c.slug ?? null,
    c.description ?? null,
    c.image ?? null,
    JSON.stringify(c.fields || []),
  ];
  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    // Bust cache so products page gets fresh categories
    invalidate("categories");
    res.json({ success: true, id: this.lastID });
  });
});

/**
 * PUT /api/categories/:id
 * Update category
 */
router.put("/:id", validate(validateCategory), (req, res) => {
  const c = req.body;
  const sql = `UPDATE categories SET name = ?, slug = ?, description = ?, image = ?, fields = ? WHERE id = ?`;
  const params = [
    c.name ?? null,
    c.slug ?? null,
    c.description ?? null,
    c.image ?? null,
    JSON.stringify(c.fields || []),
    req.params.id,
  ];
  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    invalidate("categories");
    res.json({ success: true, changes: this.changes });
  });
});

/**
 * DELETE /api/categories/:id
 * Delete category
 */
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM categories WHERE id = ?", req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    invalidate("categories");
    res.json({ success: true });
  });
});

module.exports = router;
