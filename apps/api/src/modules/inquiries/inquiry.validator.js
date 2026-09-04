/**
 * Inquiry Validators
 */
function validateInquiry(data) {
  const errors = {};
  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.name = "Name is required";
  }
  if (!data.email || typeof data.email !== 'string' || !data.email.trim()) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email format";
    }
  }
  if (!data.message || typeof data.message !== 'string' || !data.message.trim()) {
    errors.message = "Message is required";
  }
  return errors;
}

module.exports = {
  validateInquiry
};
