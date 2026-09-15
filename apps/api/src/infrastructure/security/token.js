/**
 * Security Token Infrastructure
 * Manages signed authentication tokens and crypto utilities.
 */
const crypto = require("crypto");
const { env } = require("../../config/env");

const TOKEN_SECRET =
  process.env.AUTH_TOKEN_SECRET ||
  process.env.JWT_SECRET ||
  "change-this-in-production";
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function base64UrlEncode(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(input) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4;
  const withPadding = pad ? normalized + "=".repeat(4 - pad) : normalized;
  return Buffer.from(withPadding, "base64").toString("utf8");
}

function createAuthToken(username, role = "admin") {
  const payload = {
    u: username,
    r: role,
    iat: Date.now(),
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(encodedPayload)
    .digest("hex");

  return `ve1.${encodedPayload}.${signature}`;
}

function verifyAuthToken(token) {
  if (!token || typeof token !== "string") {
    throw new Error("Invalid token");
  }

  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "ve1") {
    throw new Error("Invalid token format");
  }

  const encodedPayload = parts[1];
  const sig = parts[2];
  const expectedSig = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(encodedPayload)
    .digest("hex");

  if (sig !== expectedSig) {
    throw new Error("Invalid token signature");
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload));
  if (!payload?.u || !payload?.r || !payload?.exp) {
    throw new Error("Invalid token payload");
  }
  if (Date.now() > Number(payload.exp)) {
    throw new Error("Token expired");
  }

  return { username: payload.u, role: payload.r };
}

module.exports = {
  createAuthToken,
  verifyAuthToken,
  base64UrlEncode,
  base64UrlDecode,
};
