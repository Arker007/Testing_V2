/**
 * @file api.types.js
 * @description Standard API contract type definitions for frontend HTTP services.
 */

/**
 * Standard API envelope returned by the backend.
 * @template T
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Operation success indicator
 * @property {T} data - Payload data
 * @property {string} [message] - Optional status message
 * @property {Object} [meta] - Optional pagination or metadata
 */

/**
 * Standard Paginated Response metadata.
 * @typedef {Object} PaginationMeta
 * @property {number} page - Current 1-indexed page
 * @property {number} limit - Items per page
 * @property {number} total - Total records count
 * @property {number} totalPages - Total pages available
 */

/**
 * Standard API error model.
 * @typedef {Object} ApiErrorDetail
 * @property {string} message - Human-readable error message
 * @property {number} status - HTTP status code
 * @property {string} [code] - Machine-readable error code
 * @property {Array<Object>} [details] - Validation or field error list
 */

/**
 * Request options for API client wrappers.
 * @typedef {Object} RequestOptions
 * @property {Record<string, string>} [headers] - Additional request headers
 * @property {Record<string, string|number|boolean>} [params] - Query parameters
 * @property {AbortSignal} [signal] - Cancellation signal
 * @property {number} [timeout] - Request timeout in milliseconds
 */

export {};
