/**
 * Media Repository
 * Database operations for media and certifications tables.
 */
const { db } = require("../../database/database");

class MediaRepository {
  /**
   * Find all media records ordered by created_at DESC.
   */
  async findAllMedia() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM media ORDER BY created_at DESC", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows || []);
      });
    });
  }

  /**
   * Insert new media record.
   */
  async createMedia({ filename, url }) {
    const sql = `INSERT INTO media (filename, url) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
      db.run(sql, [filename, url], function (err) {
        if (err) return reject(err);
        resolve({ lastID: this.lastID });
      });
    });
  }

  /**
   * Find all certifications.
   */
  async findAllCertifications() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM certifications", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows || []);
      });
    });
  }
}

module.exports = new MediaRepository();
