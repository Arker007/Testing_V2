/**
 * Auth Repository
 * Database operations for users table.
 */
const { db } = require("../../database/database");

class AuthRepository {
  /**
   * Find a user by username.
   */
  async findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) return reject(err);
        resolve(user || null);
      });
    });
  }

  /**
   * Update user password by username.
   */
  async updatePassword(username, hashedPassword) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE users SET password = ? WHERE username = ?",
        [hashedPassword, username],
        function (err) {
          if (err) return reject(err);
          resolve({ changes: this.changes });
        }
      );
    });
  }
}

module.exports = new AuthRepository();
