/**
 * Vercel Serverless Entry Point
 * Wraps the Express API as a Vercel serverless function.
 */
'use strict';

const path = require('path');
const fs   = require('fs');

const tursoUrl = process.env.TURSO_URL;
const IS_VERCEL = !!process.env.VERCEL;

if (IS_VERCEL) {
    if (!tursoUrl) {
        const primarySrcDb = path.join(__dirname, '../storage/database/vishal_enterprise.db');
        const fallbackSrcDb = path.join(__dirname, '../data/vishal_enterprise.db');
        const srcDb = fs.existsSync(primarySrcDb) ? primarySrcDb : fallbackSrcDb;
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

    const tmpUploads = '/tmp/uploads';
    if (!fs.existsSync(tmpUploads)) {
        fs.mkdirSync(tmpUploads, { recursive: true });
    }
    process.env.UPLOADS_DIR = tmpUploads;
}

const { createApp } = require('../apps/api/src/app');
const { initDatabase } = require('../apps/api/src/database');
const { errorHandler } = require('../apps/api/src/middleware');

const app = createApp();
app.use(errorHandler);

let initialised = false;
let initPromise  = null;

function ensureInitialised() {
    if (initialised && initPromise) return initPromise;
    if (!initPromise) {
        initPromise = (async () => {
            await initDatabase();
            initialised = true;
            console.log('✅ Serverless app initialised');
        })();
    }
    return initPromise;
}

const handler = async (req, res) => {
    try {
        await ensureInitialised();
        return app(req, res);
    } catch (err) {
        console.error('🔥 Serverless initialization error:', err);
        if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                success: false,
                error: 'Serverless function initialization failed',
                code: 'INITIALIZATION_ERROR'
            }));
        }
    }
};

handler.app = app;
handler.ensureInitialised = ensureInitialised;

module.exports = handler;
