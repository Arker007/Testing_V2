/**
 * Content Service
 * Business logic for CMS site content.
 */
const contentRepository = require("./content.repository");
const contentMapper = require("./content.mapper");
const { getCache, setCache, invalidate } = require("../../infrastructure/cache/cache");

const CONTENT_TTL = 300; // 5 minutes

class ContentService {
  /**
   * Get all CMS content.
   */
  async getAllContent() {
    const cached = getCache("site_content");
    if (cached) {
      return cached;
    }

    const rows = await contentRepository.findAll();
    const result = contentMapper.toDomain(rows);
    setCache("site_content", result, CONTENT_TTL);
    return result;
  }

  /**
   * Bulk update CMS content.
   */
  async updateContent(updates) {
    if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
      return { error: "Body must be a key/value object", status: 400 };
    }

    const statements = contentMapper.toPersistence(updates);
    await contentRepository.batchUpsert(statements);
    invalidate("site_content");

    return { success: true };
  }
}

module.exports = new ContentService();

