import api from "@/shared/utils/api";

const CACHE_TTL_MS = 60 * 1000; // 60 seconds
let categoriesCache = { data: null, timestamp: 0, promise: null };

/**
 * Service for category data retrieval, taxonomy management, and CRUD operations.
 */
export const CategoryService = {
  /**
   * Invalidate cached categories
   */
  invalidateCache() {
    categoriesCache = { data: null, timestamp: 0, promise: null };
  },

  /**
   * Fetch all categories (with in-memory cache and promise deduplication)
   * @param {boolean} [forceRefresh=false]
   * @returns {Promise<{ categories: Array<Object> } | Array<Object>>}
   */
  async getAll(forceRefresh = false) {
    const now = Date.now();
    if (!forceRefresh && categoriesCache.data && now - categoriesCache.timestamp < CACHE_TTL_MS) {
      return categoriesCache.data;
    }
    if (!forceRefresh && categoriesCache.promise) {
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
    const res = await api.post("/categories", payload, { headers });
    this.invalidateCache();
    return res;
  },

  /**
   * Update an existing category
   * @param {string|number} id
   * @param {Object} payload
   * @param {string} [token]
   */
  async update(id, payload, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await api.put(`/categories/${id}`, payload, { headers });
    this.invalidateCache();
    return res;
  },

  /**
   * Delete a category
   * @param {string|number} id
   * @param {string} [token]
   */
  async delete(id, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await api.delete(`/categories/${id}`, { headers });
    this.invalidateCache();
    return res;
  }
};

export default CategoryService;
