import { useState, useEffect, useCallback } from "react";
import { getProductImage } from "../utils/catalog.utils";
import { buildSpreads } from "../components/catalogSpreads";

export function useAdminCatalog() {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState({});
  const [cms, setCms] = useState({});
  const [loading, setLoading] = useState(true);

  // Customization Options
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [catalogYear, setCatalogYear] = useState("2024 | 25");
  const [catalogTitle, setCatalogTitle] = useState("Stores Solution & Packaging");

  // Navigation & View Options
  const [splitView, setSplitView] = useState(true);
  const [activeSpreadIdx, setActiveSpreadIdx] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const h = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    Promise.all([
      fetch("/api/products", { headers: h }).then((r) => r.json()).catch(() => ({ products: [] })),
      fetch("/api/categories", { headers: h }).then((r) => r.json()).catch(() => ({ categories: [] })),
      fetch("/api/company", { headers: h }).then((r) => r.json()).catch(() => ({})),
      fetch("/api/content", { headers: h }).then((r) => r.json()).catch(() => ({})),
    ])
      .then(([p, _c, co, cm]) => {
        const prodList = p.products || [];
        setProducts(prodList);
        setSelectedProductIds(prodList.map((item) => item.id));
        setCompany(co || {});

        const flat = {};
        Object.entries(cm || {}).forEach(([k, v]) => {
          flat[k] = typeof v === "object" ? v.value : v;
        });
        setCms(flat);
      })
      .finally(() => setLoading(false));
  }, []);

  const catalogProducts = products.filter((p) => selectedProductIds.includes(p.id));
  const emailVal = company.email || "info@vishalenterprise.com";
  const webVal = "www.vishalenterprise.com";

  const coverImages = {
    coverImg1: catalogProducts[0] ? getProductImage(catalogProducts[0]) : "/uploads/products/pallets/pallets-1770374237161-67758.webp",
    coverImg2: catalogProducts[1] ? getProductImage(catalogProducts[1]) : "/uploads/products/lumber/plastic-lumber-pallet-1770447286569-0.webp",
    coverImg5: catalogProducts[2] ? getProductImage(catalogProducts[2]) : "/uploads/products/categories/categories-1770374476904-61107.webp",
    coverImg7: catalogProducts[3] ? getProductImage(catalogProducts[3]) : "/uploads/products/plastic-table/plastic-table-1770447279363-0.webp",
  };

  const aboutImages = {
    aboutImg1: catalogProducts[4] ? getProductImage(catalogProducts[4]) : "/uploads/products/categories/plastic-lumber-1770446410430-0.webp",
    aboutImg2: catalogProducts[5] ? getProductImage(catalogProducts[5]) : "/uploads/products/categories/garden-bench-1770446422580-0.webp",
  };

  const productsByCategory = {};
  catalogProducts.forEach((prod) => {
    const catName = prod.categoryName || "Other Products";
    if (!productsByCategory[catName]) {
      productsByCategory[catName] = [];
    }
    productsByCategory[catName].push(prod);
  });

  const catNames = Object.keys(productsByCategory);
  const midIndex = Math.ceil(catNames.length / 2);
  const leftCats = catNames.slice(0, midIndex);
  const rightCats = catNames.slice(midIndex);

  const spreads = buildSpreads({
    company,
    cms,
    catalogProducts,
    products,
    catalogYear,
    catalogTitle,
    emailVal,
    webVal,
    productsByCategory,
    leftCats,
    rightCats,
    coverImages,
    aboutImages,
  });

  const handleProductToggle = useCallback((productId) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedProductIds((prev) =>
      prev.length === products.length ? [] : products.map((p) => p.id)
    );
  }, [products]);

  return {
    products,
    company,
    cms,
    loading,
    selectedProductIds,
    catalogYear, setCatalogYear,
    catalogTitle, setCatalogTitle,
    splitView, setSplitView,
    activeSpreadIdx, setActiveSpreadIdx,
    spreads,
    handleProductToggle,
    handleSelectAll,
  };
}
