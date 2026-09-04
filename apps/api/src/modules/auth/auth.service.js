/**
 * Auth Service
 * Business logic for user authentication and password updates.
 */
const bcrypt = require("bcryptjs");
const authRepository = require("./auth.repository");
const authMapper = require("./auth.mapper");
const { createAuthToken, verifyAuthToken } = require("../../middleware/auth");

class AuthService {
  /**
   * Authenticate user login credentials.
   */
  async login(username, password) {
    const user = await authRepository.findByUsername(username);
    if (!user) {
      return { success: false, status: 401, message: "Invalid credentials" };
    }

    const isMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) return reject(err);
        resolve(match);
      });
    });

    if (!isMatch) {
      return { success: false, status: 401, message: "Invalid credentials" };
    }

    const token = createAuthToken(user.username, user.role || "admin");
    const domainUser = authMapper.toDomain(user);

    return {
      success: true,
      token,
      user: { username: domainUser.username, role: domainUser.role },
    };
  }

  /**
   * Change user password.
   */
  async changePassword(authHeader, currentPassword, newPassword) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "Unauthorised", status: 401 };
    }

    let username;
    try {
      const decoded = verifyAuthToken(authHeader.slice(7));
      username = decoded.username;
    } catch {
      return { error: "Invalid token", status: 401 };
    }

    const user = await authRepository.findByUsername(username);
    if (!user) {
      return { error: "User not found", status: 401 };
    }

    const isMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(currentPassword, user.password, (err, match) => {
        if (err) return reject(err);
        resolve(match);
      });
    });

    if (!isMatch) {
      return { error: "Current password is incorrect", status: 401 };
    }

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });

    await authRepository.updatePassword(username, hashedPassword);
    return { success: true };
  }

  /**
   * Get current authenticated user details from token.
   */
  async getMe(authHeader) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "Unauthorised", status: 401 };
    }

    try {
      const { username, role } = verifyAuthToken(authHeader.slice(7));
      return { data: { username, role } };
    } catch {
      return { error: "Invalid token", status: 401 };
    }
  }
}

module.exports = new AuthService();
