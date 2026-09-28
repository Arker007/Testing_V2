/**
 * Shared Formatting Utilities
 */

/**
 * Format date string to relative time (e.g. "3 mins ago", "yesterday", "2 days ago")
 */
export function formatRelativeTime(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format currency to Indian Rupees (INR) with standardized 2 decimal precision
 */
export function formatCurrency(amount, decimals = 2) {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numericAmount);
}

/**
 * Format comparable numerical values with standardized decimal precision for Gestalt visual alignment
 */
export function formatNumber(val, decimals = 2) {
  const numeric = Number(val);
  if (isNaN(numeric)) return val;
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numeric);
}

export default {
  formatRelativeTime,
  formatCurrency,
  formatNumber,
};
