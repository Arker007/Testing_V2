import api from '../utils/api';

export const ProductsService = {
  async getProducts() {
    return api.get('/products');
  },

  async getProductById(id) {
    return api.get(`/products/${id}`);
  },

  async getCategories() {
    return api.get('/categories');
  },

  async getFeaturedProducts() {
    const res = await api.get('/products');
    const products = res.products || [];
    return products.filter((p) => p.is_featured);
  }
};
