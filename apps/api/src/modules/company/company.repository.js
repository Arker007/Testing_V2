/**
 * Company Repository
 * Database operations for company_info table.
 */
const { db } = require("../../database/database");

class CompanyRepository {
  /**
   * Find company info record (id = 1).
   */
  async find() {
    return new Promise((resolve, reject) => {
      db.get("SELECT data FROM company_info WHERE id = 1", [], (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      });
    });
  }

  /**
   * Upsert company info record.
   */
  async upsert(dataString) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT OR REPLACE INTO company_info (id, data) VALUES (1, ?)",
        [dataString],
        function (err) {
          if (err) return reject(err);
          resolve({ changes: this.changes });
        }
      );
    });
  }
}

module.exports = new CompanyRepository();
