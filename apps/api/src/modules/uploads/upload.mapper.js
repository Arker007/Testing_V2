/**
 * Upload Mapper
 * Formats uploaded image metadata and relative URLs into domain structures.
 */

/**
 * Maps relative webp or original image paths to public access URLs.
 */
function toDomain(finalPath, category = null) {
  const basename = require("path").basename(finalPath);
  return category
    ? `/uploads/products/${category}/${basename}`
    : `/uploads/products/${basename}`;
}

/**
 * Formats uploaded files process response payload.
 */
function toUploadResponse(urls = []) {
  return {
    success: true,
    images: urls,
  };
}

module.exports = {
  toDomain,
  toUploadResponse,
};
