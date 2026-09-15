/**
 * Centralized API Fetch Client
 * Handles token attachment, JSON parsing, URL query formatting, and error normalization.
 */
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusCode = status;
    this.details = details;
  }
}

function getHeaders(headers = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
  return {
    ...authHeaders,
    ...headers,
  };
}

function buildUrl(path, params) {
  let url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }
  return url;
}

function extractErrorMessage(data, response) {
  if (typeof data === "object" && data !== null) {
    if (typeof data.error === "string") return data.error;
    if (typeof data.message === "string") return data.message;
    if (data.error && typeof data.error === "object" && typeof data.error.message === "string") {
      return data.error.message;
    }
  }
  if (typeof data === "string" && data.trim()) {
    return data;
  }
  return response.statusText || `HTTP Error ${response.status}`;
}

async function request(path, options = {}) {
  const url = buildUrl(path, options.params);
  const headers = getHeaders(options.headers);

  let body = options.body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : await response.text();

  if (!response.ok) {
    const errorMsg = extractErrorMessage(data, response);
    const details = typeof data === "object" && data !== null ? data.details || data.errors || null : null;
    throw new ApiError(errorMsg, response.status, details);
  }

  return data;
}

const api = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  put: (path, body, options) => request(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) => request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
  request,
};

export default api;
