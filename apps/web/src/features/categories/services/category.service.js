import api from "@/shared/utils/api";

/**
 * Service for category data retrieval, taxonomy management, and CRUD operations.
 */
export const CategoryService = {
  /**
   * Fetch all categories
   * @returns {Promise<{ categories: Array<Object> } | Array<Object>>}
   */
  async getAll() {
    return api.get("/categories");
  },

  /**
   * Fetch single category by ID or slug
   * @param {string|number} id
   */
  async getById(id) {
    return api.get(`/categories/${id}`);
  },

  /**
   * Create a new category
   * @param {Object} payload
   * @param {string} [token]
   */
  async create(payload, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.post("/categories", payload, { headers });
  },

  /**
   * Update an existing category
   * @param {string|number} id
   * @param {Object} payload
   * @param {string} [token]
   */
  async update(id, payload, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.put(`/categories/${id}`, payload, { headers });
  },

  /**
   * Delete a category
   * @param {string|number} id
   * @param {string} [token]
   */
  async delete(id, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.delete(`/categories/${id}`, { headers });
  }
};

export default CategoryService;
