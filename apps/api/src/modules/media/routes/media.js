/**
 * Media Routes
 * Handles: /api/media/*, /api/certifications
 */
const express = require('express');
const router = express.Router();
const { db } = require('../../../shared/database/database');

/**
 * GET /api/media
 * List all media files
 */
router.get('/media', (req, res) => {
    db.all('SELECT * FROM media ORDER BY created_at DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ media: rows });
    });
});

/**
 * POST /api/media
 * Add media record
 */
router.post('/media', (req, res) => {
    const { filename, url } = req.body;
    const sql = `INSERT INTO media (filename, url) VALUES (?, ?)`;
    db.run(sql, [filename, url], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

/**
 * GET /api/certifications
 * List all certifications
 */
router.get('/certifications', (req, res) => {
    db.all('SELECT * FROM certifications', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ certifications: rows });
    });
});

module.exports = router;
