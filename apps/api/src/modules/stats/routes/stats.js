/**
 * Stats Routes
 * Handles: /api/stats
 */
const express = require('express');
const router = express.Router();
const { db } = require('../../../shared/database/database');

/**
 * GET /api/stats
 * Dashboard statistics
 */
router.get('/stats', (req, res) => {
    const countProducts = () => new Promise(resolve => db.get('SELECT COUNT(*) as count FROM products', (e, r) => resolve(r?.count || 0)));
    const countCategories = () => new Promise(resolve => db.get('SELECT COUNT(*) as count FROM categories', (e, r) => resolve(r?.count || 0)));
    const countMedia = () => new Promise(resolve => db.get('SELECT COUNT(*) as count FROM media', (e, r) => resolve(r?.count || 0)));

    Promise.all([countProducts(), countCategories(), countMedia()]).then(([pCount, cCount, mCount]) => {
        res.json({
            products: pCount,
            categories: cCount,
            media: mCount,
            recycledTons: 5000,
            clients: 200
        });
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

module.exports = router;
