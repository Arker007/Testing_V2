/**
 * Product Repository
 * Handles database operations for products.
 */
const { db } = require("../../database/database");

class ProductRepository {
  /**
   * Find all products (filtered by published state for non-admins).
   */
  async findAll(isAdmin, limit = 50, offset = 0) {
    const whereClause = isAdmin ? "" : "WHERE (p.published = 1 OR p.published IS NULL)";
    const countSql = `SELECT COUNT(*) as total FROM products p ${whereClause}`;
    const sql = `
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON c.id = p.category 
      ${whereClause} 
      ORDER BY p.created_at DESC 
      LIMIT ? OFFSET ?
    `;

    return new Promise((resolve, reject) => {
      db.get(countSql, [], (countErr, countRow) => {
        if (countErr) return reject(countErr);
        const total = countRow ? countRow.total : 0;

        db.all(sql, [limit, offset], (err, rows) => {
          if (err) return reject(err);
          resolve({ rows: rows || [], total });
        });
      });
    });
  }

  /**
   * Find a single product by ID.
   */
  async findById(id) {
    const sql = `
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON c.id = p.category
      WHERE p.id = ?
    `;

    return new Promise((resolve, reject) => {
      db.get(sql, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      });
    });
  }

  /**
   * Insert a new product into the database.
   */
  async create(persistenceData) {
    const sql = `INSERT INTO products (id, name, category, type, description, image, price, oldPrice, discountRate, moq, capacity, dispatch, customization, technical_blurb, applications, specifications, features, faqs, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      persistenceData.id,
      persistenceData.name,
      persistenceData.category,
      persistenceData.type,
      persistenceData.description,
      persistenceData.image,
      persistenceData.price,
      persistenceData.oldPrice,
      persistenceData.discountRate,
      persistenceData.moq,
      persistenceData.capacity,
      persistenceData.dispatch,
      persistenceData.customization,
      persistenceData.technical_blurb,
      persistenceData.applications,
      persistenceData.specifications,
      persistenceData.features,
      persistenceData.faqs,
      persistenceData.published,
    ];

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve({ lastID: this.lastID, id: persistenceData.id });
      });
    });
  }

  /**
   * Update an existing product by ID.
   */
  async update(id, persistenceData) {
    const sql = `UPDATE products SET name = ?, category = ?, type = ?, description = ?, image = ?, price = ?, oldPrice = ?, discountRate = ?, moq = ?, capacity = ?, dispatch = ?, customization = ?, technical_blurb = ?, applications = ?, specifications = ?, features = ?, faqs = ?, published = ? WHERE id = ?`;
    const params = [
      persistenceData.name,
      persistenceData.category,
      persistenceData.type,
      persistenceData.description,
      persistenceData.image,
      persistenceData.price,
      persistenceData.oldPrice,
      persistenceData.discountRate,
      persistenceData.moq,
      persistenceData.capacity,
      persistenceData.dispatch,
      persistenceData.customization,
      persistenceData.technical_blurb,
      persistenceData.applications,
      persistenceData.specifications,
      persistenceData.features,
      persistenceData.faqs,
      persistenceData.published,
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
   * Delete a product by ID.
   */
  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM products WHERE id = ?", [id], (err) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = new ProductRepository();
