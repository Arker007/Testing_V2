import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./Navbar.module.css";

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

  // Filter matching products (only when user starts typing)
  const matchingProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => {
        const name = (p.name || p.title || "").toLowerCase();
        const cat = (p.category_name || p.category || "").toLowerCase();
        const sku = (p.sku || "").toLowerCase();
        return name.includes(q) || cat.includes(q) || sku.includes(q);
      })
      .slice(0, 5);
  }, [products, query]);

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
      <form
        onSubmit={handleSubmit}
        className={`${styles.search} ${
          isExpanded ? styles.searchExpanded : styles.searchCollapsed
        }`}
      >
        <button
          type={isExpanded ? "submit" : "button"}
          onClick={handleIconClick}
          className={styles.searchSubmitBtn}
          aria-label={isExpanded ? "Submit search" : "Open search bar"}
        >
          <Icon icon="solar:magnifer-linear" className="w-5 h-5 shrink-0 text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white" width="20" height="20" />
        </button>

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
          className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 shadow-none text-sm font-medium text-slate-900 placeholder:text-slate-500"
        />

        {isExpanded && (
          <button
            type="button"
            onClick={clearSearch}
            className={styles.searchClearBtn}
            title="Close"
            aria-label="Close search"
          >
            <Icon icon="ix:cancel" className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Professional Live Suggestions Dropdown */}
      {showDropdown && (
        <div className={styles.suggestions}>
          {matchingProducts.length > 0 ? (
            <>
              <div className={styles.suggestionsHeader}>
                <span className={styles.suggestionsHeaderTitle}>Products</span>
                <span className={styles.suggestionsHeaderCount}>
                  {matchingProducts.length} {matchingProducts.length === 1 ? "match" : "matches"}
                </span>
              </div>

              <div className={styles.suggestionsList}>
                {matchingProducts.map((p) => {
                  const imgUrl =
                    p.images?.[0] ||
                    p.image ||
                    p.primary_image ||
                    "/uploads/products/pallets/pallets-1770374237161-67758.webp";
                  const catName = p.category_name || p.category || "";

                  return (
                    <button
                      key={p.id}
                      type="button"
                      className={styles.suggestionItem}
                      onClick={() => handleSelectProduct(p.id)}
                    >
                      <div className={styles.suggestionThumbWrap}>
                        <img
                          src={imgUrl}
                          alt={p.name}
                          className={styles.suggestionThumbImg}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "/uploads/products/pallets/pallets-1770374237161-67758.webp";
                          }}
                        />
                      </div>
                      <div className={styles.suggestionMeta}>
                        <span className={styles.suggestionName}>
                          {p.name || p.title}
                        </span>
                        <div className={styles.suggestionSubRow}>
                          {catName && (
                            <span className={styles.suggestionCategoryBadge}>
                              {catName}
                            </span>
                          )}
                          {p.sku && (
                            <span className={styles.suggestionSku}>
                              SKU: {p.sku}
                            </span>
                          )}
                        </div>
                      </div>
                      <Icon
                        icon="solar:alt-arrow-right-linear"
                        className={styles.suggestionItemArrow}
                      />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className={styles.suggestionAllBtn}
                onClick={handleSubmit}
              >
                <div className={styles.suggestionAllLeft}>
                  <Icon icon="solar:magnifer-linear" className={styles.suggestionAllIcon} />
                  <span>View all results for <strong>&ldquo;{query.trim()}&rdquo;</strong></span>
                </div>
                <Icon icon="solar:arrow-right-linear" className={styles.suggestionAllArrow} />
              </button>
            </>
          ) : (
            <div className={styles.noSuggestion}>
              <Icon icon="solar:minimalistic-magnifer-linear" className={styles.noSuggestionIcon} />
              <p className={styles.noSuggestionText}>
                No products found for <strong>&ldquo;{query.trim()}&rdquo;</strong>
              </p>
              <span className={styles.noSuggestionTip}>Try searching for pallets, lumber, benches, or dustbins</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
