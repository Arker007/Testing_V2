/**
 * Upload Routes
 * Handles: /api/upload/*
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

let sharp = null;
try {
    sharp = require('sharp');
    console.log('✅ Sharp image optimization enabled');
} catch (err) {
    console.error('⚠️  Sharp module failed to load:', err.message);
}

// Resolve uploads directory at request time so UPLOADS_DIR env-var
// (set by Vercel bootstrap in api/index.js) is always respected.
function getUploadsDir() {
    const base = process.env.UPLOADS_DIR
        ? path.join(process.env.UPLOADS_DIR, 'products')
        : path.join(__dirname, '../../../uploads/products');
    if (!fs.existsSync(base)) fs.mkdirSync(base, { recursive: true });
    return base;
}

// Multer configuration – evaluate dir lazily per request
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, getUploadsDir()),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif|webp/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);
        cb(null, ext && mime);
    }
});

/**
 * POST /api/upload/images
 * Upload and optimize images
 */
router.post('/images', upload.array('images', 10), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    try {
        const category = req.body.category ? req.body.category.toLowerCase().replace(/[^a-z0-9-]/g, '-') : null;
        const itemName = req.body.itemName ? req.body.itemName.toLowerCase().replace(/[^a-z0-9-]/g, '-').substring(0, 50) : null;
        const uploadsDir = getUploadsDir();

        const processedUrls = await Promise.all(req.files.map(async (f, index) => {
            const originalPath = f.path;
            let finalPath = originalPath;
            let filename = f.filename;
            const ext = path.extname(f.originalname);
            const timestamp = Date.now();
            const uniqueId = Math.round(Math.random() * 1E5);

            // Generate filename based on itemName or category or random
            let baseName;
            if (itemName) {
                baseName = `${itemName}-${timestamp}-${index}`;
            } else if (category) {
                baseName = `${category}-${timestamp}-${uniqueId}`;
            } else {
                baseName = `${timestamp}-${uniqueId}`;
            }

            // Move to category subdirectory if provided
            if (category) {
                const categoryDir = path.join(uploadsDir, category);
                if (!fs.existsSync(categoryDir)) {
                    fs.mkdirSync(categoryDir, { recursive: true });
                }

                const newFilename = `${baseName}${ext}`;
                const newPath = path.join(categoryDir, newFilename);

                fs.renameSync(originalPath, newPath);
                finalPath = newPath;
                filename = `${category}/${newFilename}`;
            } else {
                // Rename in root uploads folder
                const newFilename = `${baseName}${ext}`;
                const newPath = path.join(uploadsDir, newFilename);
                fs.renameSync(originalPath, newPath);
                finalPath = newPath;
                filename = newFilename;
            }

            // Optimize to WebP (only if sharp is available)
            if (sharp) {
                let webpPath = finalPath;
                const extIndex = finalPath.lastIndexOf('.');
                if (extIndex !== -1) {
                    webpPath = finalPath.substring(0, extIndex) + '.webp';
                } else {
                    webpPath = finalPath + '.webp';
                }

                try {
                    const metadata = await sharp(finalPath).metadata();
                    let pipeline = sharp(finalPath);

                    if (metadata.width > 1920) {
                        pipeline = pipeline.resize(1920);
                    }

                    // Always compress to webp with quality 80 to ensure optimal size
                    const tempWebpPath = webpPath + '.tmp';
                    await pipeline.clone().webp({ quality: 80 }).toFile(tempWebpPath);

                    // If finalPath matches webpPath (or we're overwriting), handle safe swap
                    if (fs.existsSync(webpPath)) {
                        try { fs.unlinkSync(webpPath); } catch (e) { }
                    }
                    fs.renameSync(tempWebpPath, webpPath);

                    // Generate thumbnail and medium sizes
                    await pipeline.clone().resize({ width: 400, withoutEnlargement: true }).webp({ quality: 70 }).toFile(webpPath.replace('.webp', '_thumb.webp'));
                    await pipeline.clone().resize({ width: 800, withoutEnlargement: true }).webp({ quality: 75 }).toFile(webpPath.replace('.webp', '_medium.webp'));

                    // Cleanup original if converted and is a different file
                    if (finalPath !== webpPath && fs.existsSync(finalPath)) {
                        try { fs.unlinkSync(finalPath); } catch (e) { }
                    }

                    return category ? `/uploads/products/${category}/${path.basename(webpPath)}` : `/uploads/products/${path.basename(webpPath)}`;

                } catch (err) {
                    console.error('Optimization failed for ' + filename, err);
                    return category ? `/uploads/products/${category}/${path.basename(finalPath)}` : `/uploads/products/${path.basename(finalPath)}`;
                }
            }

            return category ? `/uploads/products/${category}/${path.basename(finalPath)}` : `/uploads/products/${path.basename(finalPath)}`;
        }));

        res.json({ success: true, images: processedUrls });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ error: 'Image processing failed' });
    }
});

module.exports = router;
