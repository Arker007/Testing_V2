import { useState, useEffect, useMemo } from "react";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";
import { fetchProductById, fetchProductCategories, fetchRelatedProducts } from "../services";
import { parseProductImages } from "../utils";

export function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    if (!productId) return;

    let isCancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      fetchProductById(productId),
      fetchProductCategories(),
    ])
      .then(([productData, catList]) => {
        if (isCancelled) return;
        setProduct(productData);
        setCategories(catList || []);

        if (productData && !productData.error) {
          const hasSpecsData =
            productData.specifications &&
            typeof productData.specifications === "object" &&
            Object.keys(productData.specifications).length > 0;

          if (hasSpecsData) {
            setActiveTab("specs");
          } else if (
            productData.description ||
            (productData.features && productData.features.length > 0)
          ) {
            setActiveTab("description");
          }

          // Fetch related products
          fetchRelatedProducts(productData.id, productData.category)
            .then((related) => {
              if (!isCancelled) {
                setRelatedProducts(related);
              }
            })
            .catch(() => {});
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err);
          setProduct({ error: true });
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [productId]);

  const categoryObj = useMemo(() => {
    return categories.find((c) => String(c.id) === String(product?.category));
  }, [categories, product?.category]);

  const categoryName = categoryObj ? categoryObj.name : "Products";
  const title = product ? `${product.name} | ${categoryName}` : "Product Details";
  const desc = product
    ? String(product.description || "").slice(0, 150)
    : "Learn more about this sustainable recycled plastic product.";

  useDocumentTitle(title, desc);

  const images = useMemo(() => {
    return parseProductImages(product?.image);
  }, [product?.image]);

  const specs = useMemo(() => {
    return typeof product?.specifications === "object" && product?.specifications !== null
      ? product.specifications
      : {};
  }, [product?.specifications]);

  const features = useMemo(() => {
    return Array.isArray(product?.features) ? product.features.filter(Boolean) : [];
  }, [product?.features]);

  const hasSpecs = Object.keys(specs).length > 0;

  const availableTabs = useMemo(() => {
    return [
      hasSpecs && { key: "specs", label: "Technical Specifications" },
      { key: "description", label: "Material & Engineering" },
      { key: "shipping", label: "Logistics & Freight" },
      { key: "faq", label: "Procurement FAQs" },
    ].filter(Boolean);
  }, [hasSpecs]);

  return {
    product,
    categories,
    categoryObj,
    categoryName,
    relatedProducts,
    loading,
    error,
    activeTab,
    setActiveTab,
    availableTabs,
    images,
    specs,
    features,
    hasSpecs,
  };
}

export default useProductDetail;
