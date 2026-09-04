/**
 * Content Controller
 * HTTP request/response handling for CMS content.
 */
const contentService = require("./content.service");

class ContentController {
  /**
   * GET /api/content
   */
  async getAllContent(req, res) {
    try {
      const content = await contentService.getAllContent();
      res.setHeader(
        "Cache-Control",
        "public, max-age=300, stale-while-revalidate=3600"
      );
      res.json(content);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /api/content
   */
  async updateContent(req, res) {
    try {
      const result = await contentService.updateContent(req.body);

      if (result.error) {
        return res.status(result.status || 400).json({ error: result.error });
      }

      res.json(result);
    } catch (err) {
      console.error("Content save error:", err);
      res.status(500).json({ error: "Failed to update content" });
    }
  }
}

module.exports = new ContentController();
