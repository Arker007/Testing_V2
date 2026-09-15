/**
 * Image Optimizer Infrastructure
 * Handles image compression, WebP transcoding, and multi-resolution generation via Sharp.
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

class ImageOptimizer {
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

      return {
        finalPath: webpPath,
        optimized: true,
        thumbnailPath: webpPath.replace(".webp", "_thumb.webp"),
        mediumPath: webpPath.replace(".webp", "_medium.webp"),
      };
    } catch (err) {
      console.error("⚠️ Image optimization failed:", err.message);
      return { finalPath, optimized: false, error: err.message };
    }
  }

  isAvailable() {
    return Boolean(sharp);
  }
}

module.exports = new ImageOptimizer();
