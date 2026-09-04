/**
 * Centralized API Fetch Client
 */
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

function getHeaders(headers = {}) {
  const token = localStorage.getItem("admin_token");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
  return {
    ...authHeaders,
    ...headers
  };
}

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const headers = getHeaders(options.headers);
  
  let body = options.body;
  // If body is object and not FormData, stringify it and set JSON Content-Type
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMsg = (typeof data === 'object' && data.error) || data || response.statusText;
    throw new Error(errorMsg);
  }

  return data;
}

const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' })
};

export default api;
