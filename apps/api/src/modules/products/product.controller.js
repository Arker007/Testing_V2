/**
 * Product Controller
 * HTTP request/response handling for products endpoints.
 */
const productService = require("./product.service");

class ProductController {
  /**
   * GET /api/products
   */
  async getAllProducts(req, res) {
    try {
      const isAdmin = !!req.headers.authorization;
      const result = await productService.getAllProducts(isAdmin);

      if (result.fromCache) {
        res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=300");
        res.setHeader("X-Cache", "HIT");
        return res.json(result.data);
      }

      if (isAdmin) {
        res.setHeader("Cache-Control", "no-store");
      } else {
        res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=300");
      }
      res.setHeader("X-Cache", "MISS");
      res.json(result.data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /api/products/:id
   */
  async getProductById(req, res) {
    try {
      const result = await productService.getProductById(req.params.id);

      if (!result) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=300");
      if (result.fromCache) {
        res.setHeader("X-Cache", "HIT");
      } else {
        res.setHeader("X-Cache", "MISS");
      }

      res.json(result.data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /api/products
   */
  async createProduct(req, res) {
    try {
      const result = await productService.createProduct(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * PUT /api/products/:id
   */
  async updateProduct(req, res) {
    try {
      const result = await productService.updateProduct(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * DELETE /api/products/:id
   */
  async deleteProduct(req, res) {
    try {
      const result = await productService.deleteProduct(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ProductController();
