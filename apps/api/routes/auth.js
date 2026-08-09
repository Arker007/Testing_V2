/**
 * Auth Routes
 * Handles: /api/auth/*
 */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { db } = require("../config/database");
const { createAuthToken, verifyAuthToken } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { validateLogin, validateChangePassword } = require("../validators/auth");

/**
 * POST /api/auth/login
 * Authenticate user
 */
router.post("/login", validate(validateLogin), (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      bcrypt.compare(password, user.password, (compareErr, isMatch) => {
        if (compareErr) return res.status(500).json({ error: compareErr.message });
        if (isMatch) {
          const token = createAuthToken(user.username, user.role || "admin");
          res.json({
            success: true,
            token,
            user: { username: user.username, role: user.role },
          });
        } else {
          res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
        }
      });
    },
  );
});

/**
 * PUT /api/auth/password
 * Change admin password
 */
router.put("/password", validate(validateChangePassword), (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorised" });
  }
  let username;
  try {
    const user = verifyAuthToken(auth.slice(7));
    username = user.username;
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }

  const { currentPassword, newPassword } = req.body;

  // Verify current password
  db.get(
    "SELECT password FROM users WHERE username = ?",
    [username],
    (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(401).json({ error: "User not found" });

      bcrypt.compare(currentPassword, user.password, (compareErr, isMatch) => {
        if (compareErr) return res.status(500).json({ error: compareErr.message });
        if (!isMatch) {
          return res.status(401).json({ error: "Current password is incorrect" });
        }

        bcrypt.hash(newPassword, 10, (hashErr, hashedPassword) => {
          if (hashErr) return res.status(500).json({ error: hashErr.message });

          db.run(
            "UPDATE users SET password = ? WHERE username = ?",
            [hashedPassword, username],
            function (err) {
              if (err) return res.status(500).json({ error: err.message });
              res.json({ success: true });
            },
          );
        });
      });
    },
  );
});

/**
 * GET /api/auth/me
 * Verify token (simple check)
 */
router.get("/me", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorised" });
  }
  try {
    const { username, role } = verifyAuthToken(auth.slice(7));
    res.json({ username, role });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
