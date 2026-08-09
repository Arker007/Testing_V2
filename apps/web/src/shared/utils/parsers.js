/**
 * Shared Parsing Utilities
 */

/**
 * Strips HTML tags and entities, and truncates the string to a preview.
 */
export function toPlainPreview(htmlStr = "", limit = 70) {
  if (!htmlStr) return "";
  const plainText = htmlStr
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  if (plainText.length <= limit) return plainText;
  return plainText.substring(0, limit) + "...";
}

/**
 * Normalizes inquiries and parses inline text parameters from body (e.g. Phone, Company).
 */
export function normalizeInquiry(inq = {}) {
  const rawMessage = String(inq.message || "");
  const lines = rawMessage
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let phone = inq.phone || "";
  let company = inq.company || "";
  const cleanLines = [];

  for (const line of lines) {
    const phoneMatch = line.match(/^phone\s*:\s*(.+)$/i);
    if (phoneMatch && !phone) {
      phone = phoneMatch[1].trim();
      continue;
    }

    const companyMatch = line.match(/^company\s*:\s*(.+)$/i);
    if (companyMatch && !company) {
      company = companyMatch[1].trim();
      continue;
    }

    cleanLines.push(line);
  }

  return {
    ...inq,
    phone: phone || null,
    company: company || null,
    message: cleanLines.join("\n").trim(),
  };
}

/**
 * Safely parses image arrays from products/categories database entries.
 * Always returns an array of strings.
 */
export function parseImages(imageField) {
  if (!imageField) return [];
  try {
    const parsed = JSON.parse(imageField);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
    return [parsed].filter(Boolean);
  } catch {
    return [imageField].filter(Boolean);
  }
}
export default {
  toPlainPreview,
  normalizeInquiry,
  parseImages
};
