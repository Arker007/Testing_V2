/**
 * API Configuration Constants
 * Synchronized with backend routes and shared endpoints
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  CATEGORIES: `${API_BASE_URL}/categories`,
  INQUIRIES: `${API_BASE_URL}/inquiries`,
  CONTACT: `${API_BASE_URL}/contact`,
  CONTENT: `${API_BASE_URL}/content`,
  COMPANY: `${API_BASE_URL}/company`,
  MEDIA: `${API_BASE_URL}/media`,
  CERTIFICATIONS: `${API_BASE_URL}/certifications`,
  STATS: `${API_BASE_URL}/stats`,
  UPLOADS: `${API_BASE_URL}/upload/images`,
};

export default API_ENDPOINTS;
