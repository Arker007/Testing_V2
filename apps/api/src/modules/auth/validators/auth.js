/**
 * Auth Validators
 */
function validateLogin(data) {
  const errors = {};
  if (!data.username || typeof data.username !== 'string' || !data.username.trim()) {
    errors.username = "Username is required";
  }
  if (!data.password || typeof data.password !== 'string' || !data.password.trim()) {
    errors.password = "Password is required";
  }
  return errors;
}

function validateChangePassword(data) {
  const errors = {};
  if (!data.currentPassword || typeof data.currentPassword !== 'string' || !data.currentPassword.trim()) {
    errors.currentPassword = "Current password is required";
  }
  if (!data.newPassword || typeof data.newPassword !== 'string' || data.newPassword.length < 6) {
    errors.newPassword = "New password must be at least 6 characters long";
  }
  return errors;
}

module.exports = {
  validateLogin,
  validateChangePassword
};
