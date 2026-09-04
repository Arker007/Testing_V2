/**
 * Auth Controller
 * HTTP request/response handling for auth endpoints.
 */
const authService = require("./auth.service");

class AuthController {
  /**
   * POST /api/auth/login
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);

      if (!result.success) {
        return res
          .status(result.status || 401)
          .json({ success: false, message: result.message });
      }

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * PUT /api/auth/password
   */
  async changePassword(req, res) {
    try {
      const authHeader = req.headers.authorization;
      const { currentPassword, newPassword } = req.body;

      const result = await authService.changePassword(
        authHeader,
        currentPassword,
        newPassword
      );

      if (result.error) {
        return res.status(result.status || 401).json({ error: result.error });
      }

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /api/auth/me
   */
  async getMe(req, res) {
    try {
      const authHeader = req.headers.authorization;
      const result = await authService.getMe(authHeader);

      if (result.error) {
        return res.status(result.status || 401).json({ error: result.error });
      }

      res.json(result.data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();
