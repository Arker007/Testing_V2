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

  async delete(id, sourceOrToken, maybeToken) {
    let source = null;
    let token = null;
    if (typeof sourceOrToken === "string" && (sourceOrToken === "contact_form" || sourceOrToken === "product_inquiry")) {
      source = sourceOrToken;
      token = maybeToken;
    } else if (typeof sourceOrToken === "object" && sourceOrToken?.source) {
      source = sourceOrToken.source;
      token = maybeToken;
    } else {
      token = sourceOrToken;
    }

    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = source ? `/inquiries/${source}/${id}` : `/inquiries/${id}`;
    return api.delete(url, { headers });
  }
};

export default InquiryService;
