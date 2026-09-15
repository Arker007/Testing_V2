/**
 * @file api.constants.js
 * @description Centralized API configuration constants, HTTP status codes, and endpoint URIs.
 */

export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
});

export const API_ENDPOINTS = Object.freeze({
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  INQUIRIES: "/inquiries",
  CONTENT: "/content",
  MEDIA: "/media",
  STATS: "/stats",
  AUTH: {
    LOGIN: "/auth/login",
    VERIFY: "/auth/verify",
    LOGOUT: "/auth/logout",
  },
});

export const API_CONFIG = Object.freeze({
  DEFAULT_TIMEOUT_MS: 15000,
  CACHE_TTL_MS: 60 * 1000, // 1 minute
  DEFAULT_PAGE_SIZE: 12,
});

export default {
  HTTP_STATUS,
  API_ENDPOINTS,
  API_CONFIG,
};
