/**
 * Custom API Error Classes
 */
export class ApiError extends Error {
  constructor(message, status = 500, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export function handleApiError(error) {
  console.error('[API Error]:', error);
  return error.message || 'An unexpected error occurred';
}
