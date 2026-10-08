/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { Badge, OptimizedImage } from "@/shared/ui";
import styles from "../styles/navbar.module.css";

export default function NavbarSearch({
  products = [],
  onSearchSubmit,
  isExpanded: controlledExpanded,
  onExpandChange,
}) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded =
    controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const setExpandedState = useCallback(
    (val) => {
      setInternalExpanded(val);
      if (onExpandChange) onExpandChange(val);
    },
    [onExpandChange]
  );

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown and collapse search on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
        if (!query.trim()) {
          setExpandedState(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query, setExpandedState]);

  // Collapse on Escape key if empty
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsFocused(false);
        if (!query.trim()) {
          setExpandedState(false);
        }
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [query, setExpandedState]);

  // Pre-index lowercase search strings once per products update
  const indexedProducts = useMemo(() => {
    if (!products?.length) return [];
    return products.map((p) => ({
      raw: p,
      searchIndex: `${p.name || p.title || ""} ${p.category_name || p.category || ""} ${p.sku || ""}`.toLowerCase(),
    }));
  }, [products]);

  // Fast filter matching products with early exit at 5 results
  const matchingProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const results = [];
    for (let i = 0; i < indexedProducts.length && results.length < 5; i++) {
      if (indexedProducts[i].searchIndex.includes(q)) {
        results.push(indexedProducts[i].raw);
      }
    }
    return results;
  }, [indexedProducts, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
      setExpandedState(false);
      if (onSearchSubmit) onSearchSubmit();
    }
  };

  const handleIconClick = (e) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpandedState(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  const handleSelectProduct = (id) => {
    navigate(`/product/${id}`);
    setIsFocused(false);
    setQuery("");
    setExpandedState(false);
    if (onSearchSubmit) onSearchSubmit();
  };

  const clearSearch = () => {
    setQuery("");
    setExpandedState(false);
    setIsFocused(false);
  };

  const showDropdown = isFocused && query.trim().length > 0;

  return (
    <div
      className={`${styles.searchWrapper} ${
        isExpanded ? styles.searchWrapperExpanded : ""
      }`}
      ref={containerRef}
    >
      <motion.form
        onSubmit={handleSubmit}
        className={`${styles.search} ${
          isExpanded ? styles.searchExpanded : styles.searchCollapsed
        }`}
        whileHover={!isExpanded ? { scale: 1.1 } : undefined}
        whileTap={!isExpanded ? { scale: 0.9 } : undefined}
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        <motion.button
          type={isExpanded ? "submit" : "button"}
          onClick={handleIconClick}
          className={styles.searchSubmitBtn}
          whileHover={{ scale: isExpanded ? 1.15 : 1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isExpanded ? "Submit search" : "Open search bar"}
        >
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
          >
            <Icon icon="carbon:search" className="w-5 h-5 shrink-0" />
          </motion.div>
        </motion.button>

        <input
          id="navbar-search-input"
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setExpandedState(true);
          }}
          aria-label="Search products"
          autoComplete="off"
          style={{
            outline: "none",
            border: "none",
            boxShadow: "none",
            backgroundColor: "transparent",
            WebkitAppearance: "none",
          }}
          className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 shadow-none text-sm font-medium"
        />

        {isExpanded && (
          <button
            type="button"
            onClick={clearSearch}
            className={styles.searchClearBtn}
            title="Close"
            aria-label="Close search"
          >
            <svg className="w-4 h-4" viewBox="0 0 32 32" fill="currentColor">
              <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16z" />
            </svg>
          </button>
        )}
      </motion.form>

      {/* Professional Live Suggestions Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className={styles.suggestions}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {matchingProducts.length > 0 ? (
              <>
                <motion.div
                  className={styles.suggestionsHeader}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                >
                  <span className={styles.suggestionsHeaderTitle}>Products</span>
                  <span className={styles.suggestionsHeaderCount}>
                    {matchingProducts.length} {matchingProducts.length === 1 ? "match" : "matches"}
                  </span>
                </motion.div>

                <motion.div
                  className={styles.suggestionsList}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {matchingProducts.map((p) => {
                    const imgUrl =
                      p.images?.[0] ||
                      p.image ||
                      p.primary_image ||
                      "/uploads/products/pallets/pallets-1770374237161-67758.webp";
                    const catName = p.category_name || p.category || "";

                    return (
                      <motion.button
                        key={p.id}
                        type="button"
                        className={styles.suggestionItem}
                        onClick={() => handleSelectProduct(p.id)}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <div className={styles.suggestionThumbWrap}>
                          <OptimizedImage
                            src={imgUrl}
                            alt={p.name}
                            fallbackSrc="/uploads/products/pallets/pallets-1770374237161-67758.webp"
                            className={styles.suggestionThumbImg}
                          />
                        </div>
                        <div className={styles.suggestionMeta}>
                          <span className={styles.suggestionName}>
                            {p.name || p.title}
                          </span>
                          <div className={styles.suggestionSubRow}>
                            {catName && (
                              <Badge variant="brand" size="xs">
                                {catName}
                              </Badge>
                            )}
                            {p.sku && (
                              <span className={styles.suggestionSku}>
                                SKU: {p.sku}
                              </span>
                            )}
                          </div>
                        </div>
                        <Icon
                          icon="carbon:chevron-right"
                          className={styles.suggestionItemArrow}
                        />
                      </motion.button>
                    );
                  })}
                </motion.div>

                <motion.button
                  type="button"
                  className={styles.suggestionAllBtn}
                  onClick={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={styles.suggestionAllLeft}>
                    <Icon icon="carbon:search" className={styles.suggestionAllIcon} />
                    <span>View all results for <strong>&ldquo;{query.trim()}&rdquo;</strong></span>
                  </div>
                  <Icon icon="carbon:arrow-right" className={styles.suggestionAllArrow} />
                </motion.button>
              </>
            ) : (
              <motion.div
                className={styles.noSuggestion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Icon icon="carbon:search" className={styles.noSuggestionIcon} />
                <p className={styles.noSuggestionText}>
                  No products found for <strong>&ldquo;{query.trim()}&rdquo;</strong>
                </p>
                <span className={styles.noSuggestionTip}>Try searching for pallets, lumber, benches, or dustbins</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
