/**
 * Stats Repository
 * Data access layer for system statistics.
 */
const { db } = require("../../database/database");

class StatsRepository {
  async countProducts() {
    return new Promise((resolve, reject) => {
      db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (err) return reject(err);
        resolve(row?.count ?? 0);
      });
    });
  }

  async countCategories() {
    return new Promise((resolve, reject) => {
      db.get("SELECT COUNT(*) as count FROM categories", (err, row) => {
        if (err) return reject(err);
        resolve(row?.count ?? 0);
      });
    });
  }

  async countMedia() {
    return new Promise((resolve, reject) => {
      db.get("SELECT COUNT(*) as count FROM media", (err, row) => {
        if (err) return reject(err);
        resolve(row?.count ?? 0);
      });
    });
  }

  async countInquiries() {
    return new Promise((resolve, reject) => {
      db.get("SELECT COUNT(*) as count FROM inquiries", (err, row) => {
        if (err) return reject(err);
        resolve(row?.count ?? 0);
      });
    });
  }
}

module.exports = new StatsRepository();
