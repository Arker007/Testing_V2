/**
 * Company Routes
 * Handles: /api/company/*
 */
const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

/**
 * GET /api/company
 * Get company info
 */
router.get('/', (req, res) => {
    db.get('SELECT data FROM company_info WHERE id = 1', [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');
        res.json(JSON.parse(row ? row.data : '{}'));
    });
});

/**
 * POST /api/company
 * Update company info (merges with existing)
 */
router.post('/', (req, res) => {
    db.get('SELECT data FROM company_info WHERE id = 1', [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        let existingData = {};
        try {
            existingData = row ? JSON.parse(row.data) : {};
        } catch (e) { /* ignore */ }

        const newData = { ...existingData, ...req.body };

        db.run('INSERT OR REPLACE INTO company_info (id, data) VALUES (1, ?)', [JSON.stringify(newData)], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, company: newData });
        });
    });
});

module.exports = router;
