import api from "../../../shared/utils/api";

export const ContentService = {
  async getAll() {
    return api.get("/content");
  },

  async update(key, value, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.put(`/content/${key}`, { value }, { headers });
  }
};

export default ContentService;
