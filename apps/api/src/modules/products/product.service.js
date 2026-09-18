/**
 * Product Service
 * Business logic for products, including caching and specification auto-seeding.
 */
const productRepository = require("./product.repository");
const productMapper = require("./product.mapper");
const { getCache, setCache, invalidate } = require("../../infrastructure/cache/cache");
const { ensureSpecifications } = require("./specification/specificationSeeder");

const PRODUCTS_TTL = 60; // seconds
const PRODUCT_TTL = 120; // seconds

class ProductService {
  /**
   * Get list of all products.
   */
  async getAllProducts(isAdmin, limit = 50, offset = 0) {
    const cacheKey = `products_${limit}_${offset}`;
    if (!isAdmin) {
      const cached = getCache(cacheKey);
      if (cached) {
        return { fromCache: true, data: cached };
      }
    }

    const { rows, total } = await productRepository.findAll(isAdmin, limit, offset);
    const products = rows.map(productMapper.toDomain);
    const payload = { products, total, limit, offset };

    if (!isAdmin) {
      setCache(cacheKey, payload, PRODUCTS_TTL);
    }

    return { fromCache: false, data: payload };
  }

  /**
   * Get a single product by ID.
   */
  async getProductById(id) {
    const cacheKey = `product:${id}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return { fromCache: true, data: cached };
    }

    const row = await productRepository.findById(id);
    if (!row) return null;

    const product = productMapper.toDomain(row);
    setCache(cacheKey, product, PRODUCT_TTL);

    return { fromCache: false, data: product };
  }

  /**
   * Create a new product.
   */
  async createProduct(productData) {
    const seededSpecifications = ensureSpecifications(productData, productData.specifications);
    const persistenceData = productMapper.toPersistence(productData, seededSpecifications);
    const result = await productRepository.create(persistenceData);

    invalidate("products");
    return { success: true, id: result.lastID };
  }

  /**
   * Update an existing product.
   */
  async updateProduct(id, productData) {
    const seededSpecifications = ensureSpecifications(productData, productData.specifications);
    const persistenceData = productMapper.toPersistence(productData, seededSpecifications);
    const result = await productRepository.update(id, persistenceData);

    invalidate("products");
    invalidate(`product:${id}`);
    return { success: true, changes: result.changes };
  }

  /**
   * Delete a product by ID.
   */
  async deleteProduct(id) {
    await productRepository.delete(id);
    invalidate("products");
    invalidate(`product:${id}`);
    return { success: true };
  }
}

module.exports = new ProductService();
