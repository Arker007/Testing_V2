/**
 * Inquiry Controller
 * HTTP request/response handling for inquiries and contact routes.
 */
const inquiryService = require("./inquiry.service");

class InquiryController {
  /**
   * POST /api/contact
   */
  async submitContactForm(req, res) {
    try {
      const result = await inquiryService.submitContactForm(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /api/contact
   */
  async getAllContactMessages(req, res) {
    try {
      const result = await inquiryService.getAllContactMessages();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /api/inquiries
   */
  async submitProductInquiry(req, res) {
    try {
      const result = await inquiryService.submitProductInquiry(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /api/inquiries
   */
  async getAllInquiries(req, res) {
    try {
      const result = await inquiryService.getAllInquiries();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * DELETE /api/inquiries/:type/:id
   */
  async deleteInquiry(req, res) {
    try {
      const { type, id } = req.params;
      const result = await inquiryService.deleteInquiry(type, id);

      if (result.error) {
        return res.status(result.status || 400).json({ error: result.error });
      }

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new InquiryController();
