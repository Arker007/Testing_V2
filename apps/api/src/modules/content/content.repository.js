/**
 * Content Repository
 * Database operations for site_content table.
 */
const { db } = require("../../database/database");

class ContentRepository {
  /**
   * Find all site_content rows.
   */
  async findAll() {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT section, key, value, type FROM site_content",
        [],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows || []);
        }
      );
    });
  }

  /**
   * Execute batch statements for atomic upsert.
   */
  async batchUpsert(statements) {
    return db.batch(statements);
  }
}

module.exports = new ContentRepository();
