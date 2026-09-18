/**
 * Inquiry Service
 * Business logic for processing contact submissions and product inquiries.
 */
const inquiryRepository = require("./inquiry.repository");
const inquiryMapper = require("./inquiry.mapper");

class InquiryService {
  /**
   * Process contact form submission.
   */
  async submitContactForm(data) {
    const normalized = inquiryMapper.normalizeInquiryData(data || {});
    const {
      name,
      email,
      subject,
      inquiryType,
      message,
      phone,
      productId,
    } = normalized;

    const resolvedSubject = (inquiryType || subject) ?? null;

    if (productId) {
      const formattedMessage = `[${resolvedSubject ?? "Inquiry"}] ${message ?? ""}`.trim();
      const result = await inquiryRepository.createInquiry({
        productId,
        name,
        email,
        phone,
        message: formattedMessage,
      });
      return { success: true, id: result.lastID, type: "inquiry" };
    } else {
      const result = await inquiryRepository.createContactMessage({
        name,
        email,
        subject: resolvedSubject,
        message,
      });
      return { success: true, id: result.lastID, type: "message" };
    }
  }

  /**
   * Get all contact form messages.
   */
  async getAllContactMessages(limit = 100, offset = 0) {
    const rows = await inquiryRepository.findAllContactMessages(limit, offset);
    const messages = rows.map((row) => inquiryMapper.normalizeInquiryData(row));
    return { messages };
  }

  /**
   * Process product inquiry submission.
   */
  async submitProductInquiry(data) {
    const normalized = inquiryMapper.normalizeInquiryData(data || {});
    const { productId, name, email, phone, message } = normalized;

    const result = await inquiryRepository.createInquiry({
      productId,
      name,
      email,
      phone,
      message,
    });

    return { success: true, id: result.lastID };
  }

  /**
   * Get all inquiries (both product inquiries & contact messages combined).
   */
  async getAllInquiries(limit = 100, offset = 0) {
    const [inqRows, msgRows] = await Promise.all([
      inquiryRepository.findAllInquiries(limit, offset),
      inquiryRepository.findAllContactMessagesAsInquiries(limit, offset),
    ]);

    const combined = [...inqRows, ...msgRows]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit)
      .map((row) => inquiryMapper.normalizeInquiryData(row));

    return { inquiries: combined, limit, offset };
  }

  /**
   * Delete inquiry by type and id.
   */
  async deleteInquiry(type, id) {
    const normType = String(type || "").toLowerCase().trim();

    if (normType === "contact_form" || normType === "contact" || normType === "message") {
      const result = await inquiryRepository.deleteContactMessage(id);
      return { success: true, changes: result.changes, type: "contact_form" };
    } else if (normType === "product_inquiry" || normType === "inquiry" || normType === "product") {
      const result = await inquiryRepository.deleteInquiry(id);
      return { success: true, changes: result.changes, type: "product_inquiry" };
    } else if (!normType) {
      // Fallback if type not specified: try product inquiry first, then contact message
      const inqRes = await inquiryRepository.deleteInquiry(id);
      if (inqRes && inqRes.changes > 0) {
        return { success: true, changes: inqRes.changes, type: "product_inquiry" };
      }
      const msgRes = await inquiryRepository.deleteContactMessage(id);
      return { success: true, changes: msgRes.changes, type: "contact_form" };
    } else {
      return { error: "Invalid inquiry type", status: 400 };
    }
  }
}

module.exports = new InquiryService();
