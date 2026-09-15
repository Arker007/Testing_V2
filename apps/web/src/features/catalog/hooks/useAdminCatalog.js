import { useState, useEffect, useCallback } from "react";
import { getProductImage } from "../utils/catalog.utils";
import { buildSpreads } from "../components/catalogSpreads";
import { ProductService } from "../../products/services/product.service";
import { CategoryService } from "../../categories";

import MediaConfig from "../../../config/media.config";

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
      ProductService.getProducts().catch(() => ({ products: [] })),
      CategoryService.getAll().catch(() => ({ categories: [] })),
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
  const emailVal = company.email || "Info@vishalenterpriseank.com";
  const webVal = "www.vishalenterprise.com";

  const coverImages = {
    coverImg1: catalogProducts[0] ? getProductImage(catalogProducts[0]) : MediaConfig.defaultProduct,
    coverImg2: catalogProducts[1] ? getProductImage(catalogProducts[1]) : MediaConfig.defaultProduct,
    coverImg5: catalogProducts[2] ? getProductImage(catalogProducts[2]) : MediaConfig.defaultCategory,
    coverImg7: catalogProducts[3] ? getProductImage(catalogProducts[3]) : MediaConfig.defaultProduct,
  };

  const aboutImages = {
    aboutImg1: catalogProducts[4] ? getProductImage(catalogProducts[4]) : MediaConfig.defaultProduct,
    aboutImg2: catalogProducts[5] ? getProductImage(catalogProducts[5]) : MediaConfig.defaultCategory,
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
