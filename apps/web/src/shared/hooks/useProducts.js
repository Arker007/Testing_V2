import { useState, useEffect } from 'react';
import { ProductsService } from '../services/products.service';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      ProductsService.getProducts().catch(() => ({ products: [] })),
      ProductsService.getCategories().catch(() => ({ categories: [] }))
    ])
      .then(([productsRes, categoriesRes]) => {
        if (!isMounted) return;
        setProducts(productsRes.products || []);
        setCategories(categoriesRes.categories || []);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Failed to load products');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, categories, loading, error };
}
