/**
 * Auth Validators
 */
const { z } = require("zod");

const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }).trim().min(1, "Username is required"),
  password: z.string({ required_error: "Password is required" }).trim().min(1, "Password is required"),
});

const changePasswordSchema = z.object({
  currentPassword: z.string({ required_error: "Current password is required" }).trim().min(1, "Current password is required"),
  newPassword: z.string({ required_error: "New password is required" }).trim().min(6, "New password must be at least 6 characters long"),
});

module.exports = {
  validateLogin: loginSchema,
  validateChangePassword: changePasswordSchema
};
