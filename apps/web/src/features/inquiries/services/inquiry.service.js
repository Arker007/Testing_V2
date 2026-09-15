import api from "../../../shared/utils/api";

export const InquiryService = {
  async getAll(token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.get("/inquiries", { headers });
  },

  async getById(id, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.get(`/inquiries/${id}`, { headers });
  },

  async submit(payload) {
    return api.post("/inquiries", payload);
  },

  async updateStatus(id, status, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.put(`/inquiries/${id}/status`, { status }, { headers });
  },

  async delete(id, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.delete(`/inquiries/${id}`, { headers });
  }
};

export default InquiryService;
