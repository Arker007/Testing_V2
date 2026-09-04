/**
 * Category Service
 * Business logic and caching operations for categories.
 */
const categoryRepository = require("./category.repository");
const categoryMapper = require("./category.mapper");
const { getCache, setCache, invalidate } = require("../../infrastructure/cache/cache");

const CATEGORIES_TTL = 120; // seconds — categories change rarely

class CategoryService {
  /**
   * Get all categories (with caching).
   */
  async getAllCategories() {
    const cached = getCache("categories");
    if (cached) {
      return { fromCache: true, data: cached };
    }

    const rows = await categoryRepository.findAll();
    const categoriesWithFields = rows.map(categoryMapper.toDomain);
    const payload = { categories: categoriesWithFields };

    setCache("categories", payload, CATEGORIES_TTL);
    return { fromCache: false, data: payload };
  }

  /**
   * Get category by ID.
   */
  async getCategoryById(id) {
    const row = await categoryRepository.findById(id);
    if (!row) return null;

    return categoryMapper.toDomain(row);
  }

  /**
   * Create category.
   */
  async createCategory(categoryData) {
    const persistenceData = categoryMapper.toPersistence(categoryData);
    const result = await categoryRepository.create(persistenceData);

    invalidate("categories");
    return { success: true, id: result.lastID };
  }

  /**
   * Update category.
   */
  async updateCategory(id, categoryData) {
    const persistenceData = categoryMapper.toPersistence(categoryData);
    const result = await categoryRepository.update(id, persistenceData);

    invalidate("categories");
    return { success: true, changes: result.changes };
  }

  /**
   * Delete category.
   */
  async deleteCategory(id) {
    await categoryRepository.delete(id);
    invalidate("categories");
    return { success: true };
  }
}

module.exports = new CategoryService();
