import api from '../utils/api';

export const ContentService = {
  async getContent() {
    return api.get('/content');
  },

  async updateContentKey(key, value) {
    return api.post('/content', { key, value });
  }
};
