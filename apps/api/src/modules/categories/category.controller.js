/**
 * Category Controller
 * HTTP request/response handling for category endpoints.
 */
const categoryService = require("./category.service");

class CategoryController {
  /**
   * GET /api/categories
   */
  async getAllCategories(req, res) {
    try {
      const result = await categoryService.getAllCategories();
      res.setHeader(
        "Cache-Control",
        "public, max-age=60, stale-while-revalidate=600",
      );
      if (result.fromCache) {
        res.setHeader("X-Cache", "HIT");
      } else {
        res.setHeader("X-Cache", "MISS");
      }
      res.json(result.data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /api/categories/:id
   */
  async getCategoryById(req, res) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /api/categories
   */
  async createCategory(req, res) {
    try {
      const result = await categoryService.createCategory(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * PUT /api/categories/:id
   */
  async updateCategory(req, res) {
    try {
      const result = await categoryService.updateCategory(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * DELETE /api/categories/:id
   */
  async deleteCategory(req, res) {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new CategoryController();
