import api from "../../../shared/utils/api";
import { ProductService } from "../../products/services/product.service";
import { CategoryService } from "../../products/services/category.service";

export const StatsService = {
  async getSummary(token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    try {
      const res = await api.get("/stats", { headers });
      return res;
    } catch {
      return null;
    }
  }
};

export default StatsService;
