/**
 * Category Repository
 * Database operations for categories.
 */
const { db } = require("../../database/database");

class CategoryRepository {
  /**
   * Find all categories in database.
   */
  async findAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM categories", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows || []);
      });
    });
  }

  /**
   * Find a category by ID.
   */
  async findById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM categories WHERE id = ?", [id], (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      });
    });
  }

  /**
   * Insert a new category into database.
   */
  async create(persistenceData) {
    const sql = `INSERT INTO categories (id, name, slug, description, image, fields) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
      persistenceData.id,
      persistenceData.name,
      persistenceData.slug,
      persistenceData.description,
      persistenceData.image,
      persistenceData.fields,
    ];

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve({ lastID: this.lastID, id: persistenceData.id });
      });
    });
  }

  /**
   * Update a category by ID.
   */
  async update(id, persistenceData) {
    const sql = `UPDATE categories SET name = ?, slug = ?, description = ?, image = ?, fields = ? WHERE id = ?`;
    const params = [
      persistenceData.name,
      persistenceData.slug,
      persistenceData.description,
      persistenceData.image,
      persistenceData.fields,
      id,
    ];

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }

  /**
   * Delete a category by ID.
   */
  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM categories WHERE id = ?", [id], (err) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = new CategoryRepository();
