/**
 * Media Controller
 * HTTP request/response handling for media and certifications endpoints.
 */
const mediaService = require("./media.service");

class MediaController {
  /**
   * GET /api/media
   */
  async getAllMedia(req, res) {
    try {
      const result = await mediaService.getAllMedia();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /api/media
   */
  async createMedia(req, res) {
    try {
      const result = await mediaService.createMedia(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /api/certifications
   */
  async getAllCertifications(req, res) {
    try {
      const result = await mediaService.getAllCertifications();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new MediaController();
