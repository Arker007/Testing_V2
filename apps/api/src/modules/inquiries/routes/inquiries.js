/**
 * Inquiries & Contact Routes
 * Handles: /api/inquiries/*, /api/contact/*
 */
const express = require("express");
const router = express.Router();
const { db } = require("../../../shared/database/database");
const validate = require("../../../shared/middleware/validate");
const { validateInquiry } = require("../validators/inquiry");

function normalizeInquiryData(input = {}) {
  const rawMessage = String(input.message || "");
  const lines = rawMessage
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let phone = input.phone || "";
  let company = input.company || "";
  const cleanLines = [];

  for (const line of lines) {
    const phoneMatch = line.match(/^phone\s*:\s*(.+)$/i);
    if (phoneMatch && !phone) {
      phone = phoneMatch[1].trim();
      continue;
    }

    const companyMatch = line.match(/^company\s*:\s*(.+)$/i);
    if (companyMatch && !company) {
      company = companyMatch[1].trim();
      continue;
    }

    cleanLines.push(line);
  }

  return {
    ...input,
    phone: phone || null,
    company: company || null,
    message: cleanLines.join("\n").trim(),
  };
}

/**
 * POST /api/contact
 * Submit contact form
 */
router.post("/contact", validate(validateInquiry), (req, res) => {
  const normalized = normalizeInquiryData(req.body || {});
  const {
    name,
    email,
    subject,
    inquiryType,
    message,
    phone,
    productId,
  } = normalized;

  // Normalise: frontend sends inquiryType; fallback to subject for legacy callers
  const resolvedSubject = (inquiryType || subject) ?? null;

  // If it has a productId, it's actually a product inquiry
  if (productId) {
    const sql = `INSERT INTO inquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)`;
    const msg = `[${resolvedSubject ?? "Inquiry"}] ${message ?? ""}`.trim();
    db.run(
      sql,
      [productId ?? null, name ?? null, email ?? null, phone ?? null, msg],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID, type: "inquiry" });
      },
    );
  } else {
    const sql = `INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)`;
    db.run(
      sql,
      [name ?? null, email ?? null, resolvedSubject, message ?? null],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID, type: "message" });
      },
    );
  }
});

/**
 * GET /api/contact
 * Get all contact messages (admin)
 */
router.get("/contact", (req, res) => {
  db.all(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ messages: rows.map((row) => normalizeInquiryData(row)) });
    },
  );
});

/**
 * POST /api/inquiries
 * Submit product inquiry
 */
router.post("/inquiries", validate(validateInquiry), (req, res) => {
  const normalized = normalizeInquiryData(req.body || {});
  const { productId, name, email, phone, message } = normalized;
  const sql = `INSERT INTO inquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)`;
  db.run(
    sql,
    [productId ?? null, name ?? null, email ?? null, phone ?? null, message ?? null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    },
  );
});

/**
 * GET /api/inquiries
 * Get all inquiries with product info (admin)
 */
router.get("/inquiries", (req, res) => {
  db.all(
    `
        SELECT i.*, p.name as product_name, 'product_inquiry' as source
        FROM inquiries i
        LEFT JOIN products p ON i.product_id = p.id
    `,
    [],
    (err, inqRows) => {
      if (err) return res.status(500).json({ error: err.message });

      db.all(
        `SELECT id, name, email, subject as product_name, message, created_at, 'contact_form' as source FROM contact_messages`,
        [],
        (err, msgRows) => {
          if (err) return res.status(500).json({ error: err.message });

          // Combine arrays and sort by newest first
          const combined = [...inqRows, ...msgRows]
            .map((row) => normalizeInquiryData(row))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

          res.json({ inquiries: combined });
        },
      );
    },
  );
});

/**
 * DELETE /api/inquiries/:type/:id
 * Delete an inquiry or contact message
 */
router.delete("/inquiries/:type/:id", (req, res) => {
  const { type, id } = req.params;
  let sql = "";

  if (type === "contact_form") {
    sql = "DELETE FROM contact_messages WHERE id = ?";
  } else if (type === "product_inquiry") {
    sql = "DELETE FROM inquiries WHERE id = ?";
  } else {
    return res.status(400).json({ error: "Invalid inquiry type" });
  }

  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

module.exports = router;
