/**
 * Upload Repository
 * Handles physical filesystem operations and image manipulation via Sharp.
 */
const path = require("path");
const fs = require("fs");

let sharp = null;
try {
  sharp = require("sharp");
  console.log("✅ Sharp image optimization enabled");
} catch (err) {
  console.error("⚠️  Sharp module failed to load:", err.message);
}

class UploadRepository {
  /**
   * Resolves the base uploads directory lazily.
   */
  getUploadsDir() {
    const base = process.env.UPLOADS_DIR
      ? path.join(process.env.UPLOADS_DIR, "products")
      : path.join(__dirname, "../../../../../../uploads/products");
    if (!fs.existsSync(base)) fs.mkdirSync(base, { recursive: true });
    return base;
  }

  /**
   * Ensure directory exists.
   */
  ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * Rename/move file.
   */
  renameFile(oldPath, newPath) {
    fs.renameSync(oldPath, newPath);
  }

  /**
   * Safely delete file.
   */
  deleteFile(filePath) {
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {}
    }
  }

  /**
   * Optimize image file to WebP and generate thumbnail/medium sizes.
   */
  async optimizeImage(finalPath, category, filename) {
    if (!sharp) {
      return { finalPath, optimized: false };
    }

    let webpPath = finalPath;
    const extIndex = finalPath.lastIndexOf(".");
    if (extIndex !== -1) {
      webpPath = finalPath.substring(0, extIndex) + ".webp";
    } else {
      webpPath = finalPath + ".webp";
    }

    try {
      const metadata = await sharp(finalPath).metadata();
      let pipeline = sharp(finalPath);

      if (metadata.width > 1920) {
        pipeline = pipeline.resize(1920);
      }

      const tempWebpPath = webpPath + ".tmp";
      await pipeline.clone().webp({ quality: 80 }).toFile(tempWebpPath);

      if (fs.existsSync(webpPath)) {
        try {
          fs.unlinkSync(webpPath);
        } catch (e) {}
      }
      fs.renameSync(tempWebpPath, webpPath);

      // Generate thumbnail and medium sizes
      await pipeline
        .clone()
        .resize({ width: 400, withoutEnlargement: true })
        .webp({ quality: 70 })
        .toFile(webpPath.replace(".webp", "_thumb.webp"));

      await pipeline
        .clone()
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(webpPath.replace(".webp", "_medium.webp"));

      if (finalPath !== webpPath && fs.existsSync(finalPath)) {
        try {
          fs.unlinkSync(finalPath);
        } catch (e) {}
      }

      return { finalPath: webpPath, optimized: true };
    } catch (err) {
      console.error("Optimization failed for " + filename, err);
      return { finalPath, optimized: false };
    }
  }
}

module.exports = new UploadRepository();
