/**
 * Upload Service
 * Business logic for processing uploaded image files.
 */
const path = require("path");
const uploadRepository = require("./upload.repository");
const uploadMapper = require("./upload.mapper");

class UploadService {
  /**
   * Process array of uploaded image files.
   */
  async processUploadedImages(files = [], body = {}) {
    if (!files || files.length === 0) {
      return { error: "No files uploaded", status: 400 };
    }

    const category = body.category
      ? body.category.toLowerCase().replace(/[^a-z0-9-]/g, "-")
      : null;
    const itemName = body.itemName
      ? body.itemName.toLowerCase().replace(/[^a-z0-9-]/g, "-").substring(0, 50)
      : null;
    const uploadsDir = uploadRepository.getUploadsDir();

    const processedUrls = await Promise.all(
      files.map(async (f, index) => {
        const originalPath = f.path;
        let finalPath = originalPath;
        let filename = f.filename;
        const ext = path.extname(f.originalname);
        const timestamp = Date.now();
        const uniqueId = Math.round(Math.random() * 1e5);

        let baseName;
        if (itemName) {
          baseName = `${itemName}-${timestamp}-${index}`;
        } else if (category) {
          baseName = `${category}-${timestamp}-${uniqueId}`;
        } else {
          baseName = `${timestamp}-${uniqueId}`;
        }

        if (category) {
          const categoryDir = path.join(uploadsDir, category);
          uploadRepository.ensureDir(categoryDir);

          const newFilename = `${baseName}${ext}`;
          const newPath = path.join(categoryDir, newFilename);

          uploadRepository.renameFile(originalPath, newPath);
          finalPath = newPath;
          filename = `${category}/${newFilename}`;
        } else {
          const newFilename = `${baseName}${ext}`;
          const newPath = path.join(uploadsDir, newFilename);
          uploadRepository.renameFile(originalPath, newPath);
          finalPath = newPath;
          filename = newFilename;
        }

        const result = await uploadRepository.optimizeImage(
          finalPath,
          category,
          filename
        );

        return uploadMapper.toDomain(result.finalPath, category);
      })
    );

    return uploadMapper.toUploadResponse(processedUrls);
  }
}

module.exports = new UploadService();
