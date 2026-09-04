/**
 * Vercel Serverless Entry Point
 * Wraps the Express API as a Vercel serverless function.
 *
 * Route rewrites in vercel.json send:
 *   /api/*     → here
 *   /uploads/* → here
 *   /health    → here
 */
'use strict';

const path = require('path');
const fs   = require('fs');

const tursoUrl = process.env.TURSO_URL;

/* ─── Vercel environment bootstrap ─────────────────────────────────────────
 * Vercel's filesystem is read-only except /tmp.
 * If Turso is configured, skip local DB bootstrap entirely.
 * Otherwise copy bundled SQLite database to /tmp on cold-start so it can be read
 * (writes still won't persist across invocations).
 * Set env-vars BEFORE any other module is required so they pick them up.
 * ────────────────────────────────────────────────────────────────────────── */
const IS_VERCEL = !!process.env.VERCEL;

if (IS_VERCEL) {
    // Database fallback only when Turso is not configured
    if (!tursoUrl) {
        const srcDb  = path.join(__dirname, '../data/vishal_enterprise.db');
        const tmpDb  = '/tmp/vishal_enterprise.db';
        if (!fs.existsSync(tmpDb) && fs.existsSync(srcDb)) {
            try {
                fs.copyFileSync(srcDb, tmpDb);
                console.log('✅ DB copied to /tmp');
            } catch (e) {
                console.warn('⚠️  Could not copy DB to /tmp:', e.message);
            }
        }
        process.env.DB_PATH = tmpDb;
    }

    // Uploads
    const tmpUploads = '/tmp/uploads';
    if (!fs.existsSync(tmpUploads)) {
        fs.mkdirSync(tmpUploads, { recursive: true });
    }
    process.env.UPLOADS_DIR = tmpUploads;
}

/* ─── Express app ─────────────────────────────────────────────────────────── */
const express     = require('express');
const cors        = require('cors');
const compression = require('compression');
const { initDatabase } = require('../apps/api/src/database/database');

const IS_PROD = process.env.NODE_ENV === 'production';
const app = express();

// Vercel runs behind a trusted reverse proxy.
app.set('trust proxy', 1);

// Compression
app.use(compression({
    level: 6,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) return false;
        return compression.filter(req, res);
    }
}));

// CORS – allow same-origin + any configured FRONTEND_URL
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = (
            process.env.ALLOWED_ORIGINS ||
            process.env.FRONTEND_URL ||
            'http://localhost:5173,http://localhost:3000'
        ).split(',').map((v) => v.trim()).filter(Boolean);

        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (IS_PROD) {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
});

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// Serve uploaded files.
// On Vercel, first try runtime uploads in /tmp, then fall back to bundled uploads.
const staticOptions = {
    maxAge: IS_PROD ? '1y' : 0,
    etag: true,
    immutable: IS_PROD,
};

if (IS_VERCEL) {
    app.use('/uploads', express.static('/tmp/uploads', staticOptions));
    app.use('/uploads', express.static(path.join(__dirname, '../uploads'), staticOptions));
} else {
    app.use('/uploads', express.static(path.join(__dirname, '../uploads'), staticOptions));
}

/* ─── Lazy initialisation (once per cold-start) ──────────────────────────── */
let initialised = false;
let initPromise  = null;

async function ensureInitialised() {
    if (initialised) return;
    if (!initPromise) {
        initPromise = (async () => {
            await initDatabase();
            const apiRouter = require('../apps/api/src/routes');
            app.use('/api', apiRouter);
            initialised = true;
            console.log('✅ Serverless app initialised');
        })();
    }
    return initPromise;
}

// Global error handler (must be last)
const errorHandler = require('../apps/api/src/middleware/errorHandler');
app.use(errorHandler);

/* ─── Vercel handler export ──────────────────────────────────────────────── */
module.exports = async (req, res) => {
    await ensureInitialised();
    return app(req, res);
};
