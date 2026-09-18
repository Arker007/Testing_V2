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
      const limit = parseInt(req.query.limit, 10) || 1000;
      const offset = parseInt(req.query.offset, 10) || 0;
      const result = await inquiryService.getAllContactMessages(limit, offset);
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
      const limit = parseInt(req.query.limit, 10) || 1000;
      const offset = parseInt(req.query.offset, 10) || 0;
      const result = await inquiryService.getAllInquiries(limit, offset);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * DELETE /api/inquiries/:type/:id or DELETE /api/inquiries/:id
   */
  async deleteInquiry(req, res) {
    try {
      let { type, id } = req.params;
      if (!id && type) {
        id = type;
        type = req.query.type || req.query.source || req.body?.source || req.body?.type;
      }
      const result = await inquiryService.deleteInquiry(type, id);

      if (result.error) {
        return res.status(result.status || 400).json({ error: result.error });
      }

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * DELETE /api/contact/:id
   */
  async deleteContactMessage(req, res) {
    try {
      const { id } = req.params;
      const result = await inquiryService.deleteInquiry("contact_form", id);

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
