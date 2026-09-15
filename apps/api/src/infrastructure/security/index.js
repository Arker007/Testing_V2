/**
 * Security Infrastructure Facade
 */
const {
  createAuthToken,
  verifyAuthToken,
  base64UrlEncode,
  base64UrlDecode,
} = require("./token");

module.exports = {
  createAuthToken,
  verifyAuthToken,
  base64UrlEncode,
  base64UrlDecode,
};
