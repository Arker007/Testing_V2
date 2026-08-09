/**
 * WhatsApp Helper
 */

export function getWhatsAppUrl(phone, text) {
  if (!phone) return "";
  // Clean phone number (leave only digits)
  const cleanPhone = String(phone).replace(/\D/g, "");
  // If phone doesn't start with country code, add country code '91' for India by default
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  
  const encodedText = text ? encodeURIComponent(text) : "";
  return `https://wa.me/${formattedPhone}${encodedText ? `?text=${encodedText}` : ""}`;
}

export default {
  getWhatsAppUrl
};
