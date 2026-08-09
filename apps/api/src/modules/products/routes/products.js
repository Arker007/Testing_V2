/**
 * Products Routes
 * Handles: /api/products/*
 */
const express = require("express");
const router = express.Router();
const { db } = require("../../../shared/database/database");
const { getCache, setCache, invalidate } = require("../../../shared/utils/cache");
const { ensureSpecifications } = require("../../../shared/utils/specificationSeeder");
const validate = require("../../../shared/middleware/validate");
const { validateProduct } = require("../validators/product");

const PRODUCTS_TTL = 60; // seconds
const PRODUCT_TTL = 120; // seconds per individual product

/**
 * GET /api/products
 * List all products (in-memory cached)
 */
router.get("/", (req, res) => {
  const isAdmin = !!req.headers.authorization;

  // Admin requests always bypass cache to avoid stale published/draft state
  if (!isAdmin) {
    const cached = getCache("products");
    if (cached) {
      res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=300");
      res.setHeader("X-Cache", "HIT");
      return res.json(cached);
    }
  }

  const sql = isAdmin
    ? `SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON c.id = p.category ORDER BY p.created_at DESC`
    : `SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON c.id = p.category WHERE (p.published = 1 OR p.published IS NULL) ORDER BY p.created_at DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const products = rows.map((r) => ({
      ...r,
      specifications: JSON.parse(r.specifications || "{}"),
      features: JSON.parse(r.features || "[]"),
      faqs: JSON.parse(r.faqs || "[]"),
    }));
    const payload = { products };
    // Only cache public (non-admin) responses; admin always gets fresh data
    if (!isAdmin) setCache("products", payload, PRODUCTS_TTL);
    if (isAdmin) {
      res.setHeader("Cache-Control", "no-store");
    } else {
      res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=300");
    }
    res.setHeader("X-Cache", "MISS");
    res.json(payload);
  });
});

/**
 * GET /api/products/:id
 * Get single product (in-memory cached per id)
 */
router.get("/:id", (req, res) => {
  const cacheKey = `product:${req.params.id}`;
  const cached = getCache(cacheKey);
  if (cached) {
    res.setHeader(
      "Cache-Control",
      "public, max-age=30, stale-while-revalidate=300",
    );
    res.setHeader("X-Cache", "HIT");
    return res.json(cached);
  }

  const sql = `
        SELECT p.*, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON c.id = p.category
        WHERE p.id = ?
    `;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Product not found" });
    const product = {
      ...row,
      specifications: JSON.parse(row.specifications || "{}"),
      features: JSON.parse(row.features || "[]"),
      faqs: JSON.parse(row.faqs || "[]"),
    };
    setCache(cacheKey, product, PRODUCT_TTL);
    res.setHeader(
      "Cache-Control",
      "public, max-age=30, stale-while-revalidate=300",
    );
    res.setHeader("X-Cache", "MISS");
    res.json(product);
  });
});

/**
 * POST /api/products
 * Create new product
 */
router.post("/", validate(validateProduct), (req, res) => {
  const p = req.body;
  const seededSpecifications = ensureSpecifications(p, p.specifications);
  const sql = `INSERT INTO products (id, name, category, type, description, image, price, oldPrice, discountRate, moq, capacity, dispatch, customization, technical_blurb, applications, specifications, features, faqs, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    p.id || "prod_" + Date.now(),
    p.name ?? null,
    p.category ?? null,
    p.type ?? null,
    p.description ?? null,
    p.image ?? null,
    p.price ?? null,
    p.oldPrice ?? null,
    p.discountRate ?? null,
    p.moq ?? null,
    p.capacity ?? null,
    p.dispatch ?? null,
    p.customization ?? null,
    p.technical_blurb ?? null,
    p.applications ?? null,
    JSON.stringify(seededSpecifications),
    JSON.stringify(p.features || []),
    JSON.stringify(p.faqs || []),
    p.published !== undefined ? (p.published ? 1 : 0) : 1,
  ];
  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    invalidate("products");
    res.json({ success: true, id: this.lastID });
  });
});

/**
 * PUT /api/products/:id
 * Update product
 */
router.put("/:id", validate(validateProduct), (req, res) => {
  const p = req.body;
  const seededSpecifications = ensureSpecifications(p, p.specifications);
  const sql = `UPDATE products SET name = ?, category = ?, type = ?, description = ?, image = ?, price = ?, oldPrice = ?, discountRate = ?, moq = ?, capacity = ?, dispatch = ?, customization = ?, technical_blurb = ?, applications = ?, specifications = ?, features = ?, faqs = ?, published = ? WHERE id = ?`;
  const params = [
    p.name ?? null,
    p.category ?? null,
    p.type ?? null,
    p.description ?? null,
    p.image ?? null,
    p.price ?? null,
    p.oldPrice ?? null,
    p.discountRate ?? null,
    p.moq ?? null,
    p.capacity ?? null,
    p.dispatch ?? null,
    p.customization ?? null,
    p.technical_blurb ?? null,
    p.applications ?? null,
    JSON.stringify(seededSpecifications),
    JSON.stringify(p.features || []),
    JSON.stringify(p.faqs || []),
    p.published !== undefined ? (p.published ? 1 : 0) : 1,
    req.params.id,
  ];
  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    invalidate("products");
    invalidate(`product:${req.params.id}`);
    res.json({ success: true, changes: this.changes });
  });
});

/**
 * DELETE /api/products/:id
 * Delete product
 */
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM products WHERE id = ?", req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    invalidate("products");
    invalidate(`product:${req.params.id}`);
    res.json({ success: true });
  });
});

module.exports = router;
