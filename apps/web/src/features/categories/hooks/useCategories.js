import { useState, useEffect, useCallback } from "react";
import CategoryService from "../services/category.service";

/**
 * Hook for fetching and managing category list state.
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CategoryService.getAll();
      setCategories(data?.categories || data || []);
    } catch (err) {
      setError(err?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

export default useCategories;
