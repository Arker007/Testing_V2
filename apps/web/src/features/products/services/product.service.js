import api from "../../../shared/utils/api";

const CACHE_TTL_MS = 60 * 1000; // 60 seconds
let productsCache = { data: null, timestamp: 0, promise: null };
let categoriesCache = { data: null, timestamp: 0, promise: null };

export const ProductService = {
  async getProducts(params = {}) {
    const hasParams = Object.keys(params).length > 0;
    const now = Date.now();

    // Return cached list if request has no custom filters and is fresh
    if (!hasParams && productsCache.data && now - productsCache.timestamp < CACHE_TTL_MS) {
      return productsCache.data;
    }

    // Reuse in-flight promise if available
    if (!hasParams && productsCache.promise) {
      return productsCache.promise;
    }

    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/products?${query}` : "/products";
    const requestPromise = api.get(endpoint).then((res) => {
      if (!hasParams) {
        productsCache = { data: res, timestamp: Date.now(), promise: null };
      }
      return res;
    }).catch((err) => {
      if (!hasParams) productsCache.promise = null;
      throw err;
    });

    if (!hasParams) {
      productsCache.promise = requestPromise;
    }

    return requestPromise;
  },

  async getProductById(id) {
    return api.get(`/products/${id}`);
  },

  async getCategories() {
    const now = Date.now();
    if (categoriesCache.data && now - categoriesCache.timestamp < CACHE_TTL_MS) {
      return categoriesCache.data;
    }
    if (categoriesCache.promise) {
      return categoriesCache.promise;
    }

    const requestPromise = api.get("/categories").then((res) => {
      categoriesCache = { data: res, timestamp: Date.now(), promise: null };
      return res;
    }).catch((err) => {
      categoriesCache.promise = null;
      throw err;
    });

    categoriesCache.promise = requestPromise;
    return requestPromise;
  },

  clearCache() {
    productsCache = { data: null, timestamp: 0, promise: null };
    categoriesCache = { data: null, timestamp: 0, promise: null };
  },

  async getCategoryById(id) {
    return api.get(`/categories/${id}`);
  },

  async getFeaturedProducts() {
    const res = await this.getProducts();
    const products = res.products || [];
    return products.filter((p) => p.is_featured);
  },

  async createProduct(payload, token) {
    this.clearCache();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.post("/products", payload, { headers });
  },

  async updateProduct(id, payload, token) {
    this.clearCache();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.put(`/products/${id}`, payload, { headers });
  },

  async deleteProduct(id, token) {
    this.clearCache();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.delete(`/products/${id}`, { headers });
  },

  async createCategory(payload, token) {
    this.clearCache();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.post("/categories", payload, { headers });
  },

  async updateCategory(id, payload, token) {
    this.clearCache();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.put(`/categories/${id}`, payload, { headers });
  },

  async deleteCategory(id, token) {
    this.clearCache();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.delete(`/categories/${id}`, { headers });
  },
};

export default ProductService;

