/**
 * Upload Repository
 * Delegates physical filesystem and image operations to storage infrastructure.
 */
const storage = require("../../infrastructure/storage");

class UploadRepository {
  /**
   * Resolves the base uploads directory lazily.
   */
  getUploadsDir() {
    return storage.getUploadsDir("products");
  }

  /**
   * Ensure directory exists.
   */
  ensureDir(dirPath) {
    return storage.ensureDir(dirPath);
  }

  /**
   * Rename/move file.
   */
  renameFile(oldPath, newPath) {
    return storage.renameFile(oldPath, newPath);
  }

  /**
   * Safely delete file.
   */
  deleteFile(filePath) {
    return storage.deleteFile(filePath);
  }

  /**
   * Optimize image file to WebP and generate thumbnail/medium sizes.
   */
  async optimizeImage(finalPath, category, filename) {
    return storage.optimizeImage(finalPath, category, filename);
  }
}

module.exports = new UploadRepository();
