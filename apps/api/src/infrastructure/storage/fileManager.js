/**
 * Storage File Manager
 * Handles directory creation, resolution, file moves, and deletions.
 */
const path = require("path");
const fs = require("fs");

class FileManager {
  /**
   * Resolves the base uploads directory lazily.
   */
  getUploadsDir(subfolder = "products") {
    let base;
    if (process.env.UPLOADS_DIR) {
      base = path.join(process.env.UPLOADS_DIR, subfolder);
    } else {
      const storageBase = path.resolve(__dirname, `../../../../../storage/uploads/${subfolder}`);
      const legacyBase = path.resolve(__dirname, `../../../../../../uploads/${subfolder}`);
      base = fs.existsSync(path.dirname(storageBase)) ? storageBase : legacyBase;
    }
    if (!fs.existsSync(base)) {
      fs.mkdirSync(base, { recursive: true });
    }
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
   * Safely delete file if exists.
   */
  deleteFile(filePath) {
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        /* ignore delete failure */
      }
    }
  }

  /**
   * Check if file exists.
   */
  exists(filePath) {
    return Boolean(filePath && fs.existsSync(filePath));
  }
}

module.exports = new FileManager();
