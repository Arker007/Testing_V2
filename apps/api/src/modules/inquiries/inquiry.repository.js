/**
 * Inquiry Repository
 * Database operations for inquiries and contact messages.
 */
const { db } = require("../../database/database");

class InquiryRepository {
  /**
   * Insert product inquiry.
   */
  async createInquiry({ productId, name, email, phone, message }) {
    const sql = `INSERT INTO inquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.run(
        sql,
        [productId ?? null, name ?? null, email ?? null, phone ?? null, message ?? null],
        function (err) {
          if (err) return reject(err);
          resolve({ lastID: this.lastID });
        }
      );
    });
  }

  /**
   * Insert contact message.
   */
  async createContactMessage({ name, email, subject, message }) {
    const sql = `INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.run(
        sql,
        [name ?? null, email ?? null, subject ?? null, message ?? null],
        function (err) {
          if (err) return reject(err);
          resolve({ lastID: this.lastID });
        }
      );
    });
  }

  /**
   * Get all contact messages.
   */
  async findAllContactMessages() {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM contact_messages ORDER BY created_at DESC",
        [],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows || []);
        }
      );
    });
  }

  /**
   * Get all product inquiries with product name.
   */
  async findAllInquiries() {
    return new Promise((resolve, reject) => {
      db.all(
        `
        SELECT i.*, p.name as product_name, 'product_inquiry' as source
        FROM inquiries i
        LEFT JOIN products p ON i.product_id = p.id
        `,
        [],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows || []);
        }
      );
    });
  }

  /**
   * Get all contact messages formatted as inquiry source.
   */
  async findAllContactMessagesAsInquiries() {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT id, name, email, subject as product_name, message, created_at, 'contact_form' as source FROM contact_messages`,
        [],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows || []);
        }
      );
    });
  }

  /**
   * Delete contact message by ID.
   */
  async deleteContactMessage(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM contact_messages WHERE id = ?", [id], function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }

  /**
   * Delete inquiry by ID.
   */
  async deleteInquiry(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM inquiries WHERE id = ?", [id], function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = new InquiryRepository();
