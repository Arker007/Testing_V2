import { useState, useEffect } from "react";
import { ProductService } from "../services/product.service";

// In-memory client cache with TTL
const CACHE_TTL_MS = 60 * 1000; // 1 minute
let cachedData = {
  products: null,
  categories: null,
  timestamp: 0,
};

export function useProducts() {
  const isCacheValid =
    cachedData.products &&
    cachedData.categories &&
    Date.now() - cachedData.timestamp < CACHE_TTL_MS;

  const [products, setProducts] = useState(cachedData.products || []);
  const [categories, setCategories] = useState(cachedData.categories || []);
  const [loading, setLoading] = useState(!isCacheValid);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // If cache is fresh, do not show loading state and return immediately
    if (isCacheValid) {
      setLoading(false);
      return;
    }

    setLoading(true);

    Promise.all([
      ProductService.getProducts().catch(() => ({ products: [] })),
      ProductService.getCategories().catch(() => ({ categories: [] })),
    ])
      .then(([productsRes, categoriesRes]) => {
        if (!isMounted) return;
        const pList = productsRes.products || [];
        const cList = categoriesRes.categories || [];

        cachedData = {
          products: pList,
          categories: cList,
          timestamp: Date.now(),
        };

        setProducts(pList);
        setCategories(cList);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Failed to load products");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isCacheValid]);

  return { products, categories, loading, error };
}

export default useProducts;
