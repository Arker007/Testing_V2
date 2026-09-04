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
  async getAllContactMessages() {
    const rows = await inquiryRepository.findAllContactMessages();
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
  async getAllInquiries() {
    const [inqRows, msgRows] = await Promise.all([
      inquiryRepository.findAllInquiries(),
      inquiryRepository.findAllContactMessagesAsInquiries(),
    ]);

    const combined = [...inqRows, ...msgRows]
      .map((row) => inquiryMapper.normalizeInquiryData(row))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return { inquiries: combined };
  }

  /**
   * Delete inquiry by type and id.
   */
  async deleteInquiry(type, id) {
    if (type === "contact_form") {
      const result = await inquiryRepository.deleteContactMessage(id);
      return { success: true, changes: result.changes };
    } else if (type === "product_inquiry") {
      const result = await inquiryRepository.deleteInquiry(id);
      return { success: true, changes: result.changes };
    } else {
      return { error: "Invalid inquiry type", status: 400 };
    }
  }
}

module.exports = new InquiryService();
