/**
 * Inquiry Mapper
 * Normalization and transformation logic for inquiries and contact messages.
 */

function normalizeInquiryData(input = {}) {
  const rawMessage = String(input.message || "");
  const lines = rawMessage
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let phone = input.phone || "";
  let company = input.company || "";
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
    ...input,
    phone: phone || null,
    company: company || null,
    message: cleanLines.join("\n").trim(),
  };
}

module.exports = {
  normalizeInquiryData,
};
