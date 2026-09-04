const _productCache = new Map();

export async function fetchProductById(id, { useCache = true } = {}) {
  if (!id) throw new Error("Product ID is required");
  const cacheKey = String(id);

  if (useCache && _productCache.has(cacheKey)) {
    return _productCache.get(cacheKey);
  }

  const promise = fetch(`/api/products/${encodeURIComponent(id)}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch product ${id}: ${res.statusText}`);
      }
      return res.json();
    })
    .catch((err) => {
      _productCache.delete(cacheKey);
      throw err;
    });

  if (useCache) {
    _productCache.set(cacheKey, promise);
  }

  return promise;
}

export async function fetchProductCategories() {
  try {
    const res = await fetch("/api/categories");
    if (!res.ok) return [];
    const data = await res.json();
    return data?.categories || [];
  } catch {
    return [];
  }
}

export async function fetchRelatedProducts(currentProductId, categoryId, limit = 4) {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) return [];
    const data = await res.json();
    const all = Array.isArray(data?.products) ? data.products : [];

    const others = all.filter((p) => String(p.id) !== String(currentProductId));
    if (!categoryId) return others.slice(0, limit);

    const sameCategory = others.filter((p) => String(p.category) === String(categoryId));
    return (sameCategory.length >= limit ? sameCategory : others).slice(0, limit);
  } catch {
    return [];
  }
}

export function clearProductDetailCache(id) {
  if (id) {
    _productCache.delete(String(id));
  } else {
    _productCache.clear();
  }
}
