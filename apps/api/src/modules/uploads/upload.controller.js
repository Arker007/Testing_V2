/**
 * Upload Controller
 * HTTP request/response handling for file upload endpoints.
 */
const uploadService = require("./upload.service");

class UploadController {
  /**
   * POST /api/upload/images
   */
  async uploadImages(req, res) {
    try {
      const result = await uploadService.processUploadedImages(
        req.files,
        req.body
      );

      if (result.error) {
        return res.status(result.status || 400).json({ error: result.error });
      }

      res.json(result);
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ error: "Image processing failed" });
    }
  }
}

module.exports = new UploadController();
