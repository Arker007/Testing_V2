import api from "../../../shared/utils/api";

export const ProductService = {
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/products?${query}` : "/products";
    return api.get(endpoint);
  },

  async getProductById(id) {
    return api.get(`/products/${id}`);
  },

  async getCategories() {
    return api.get("/categories");
  },

  async getCategoryById(id) {
    return api.get(`/categories/${id}`);
  },

  async getFeaturedProducts() {
    const res = await api.get("/products");
    const products = res.products || [];
    return products.filter((p) => p.is_featured);
  },

  async createProduct(payload, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.post("/products", payload, { headers });
  },

  async updateProduct(id, payload, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.put(`/products/${id}`, payload, { headers });
  },

  async deleteProduct(id, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.delete(`/products/${id}`, { headers });
  },

  async createCategory(payload, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.post("/categories", payload, { headers });
  },

  async updateCategory(id, payload, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.put(`/categories/${id}`, payload, { headers });
  },

  async deleteCategory(id, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.delete(`/categories/${id}`, { headers });
  },
};

export default ProductService;
