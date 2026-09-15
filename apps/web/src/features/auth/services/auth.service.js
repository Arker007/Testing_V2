import api from "../../../shared/utils/api";

export const AuthService = {
  async login(username, password) {
    return api.post("/auth/login", { username, password });
  },
  
  async me(token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return api.get("/auth/me", { headers });
  }
};

export default AuthService;
