import api from '../utils/api';

export const InquiryService = {
  async submitInquiry(inquiryData) {
    return api.post('/inquiries', inquiryData);
  },

  async getInquiries() {
    return api.get('/inquiries');
  }
};
