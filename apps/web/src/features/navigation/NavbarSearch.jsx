import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function NavbarSearch({ products = [], onSearchSubmit }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown and collapse search on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
        if (!query.trim()) {
          setIsExpanded(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

  // Collapse on Escape key if empty
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsFocused(false);
        if (!query.trim()) {
          setIsExpanded(false);
        }
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [query]);

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
      if (onSearchSubmit) onSearchSubmit();
    }
  };

  const handleIconClick = (e) => {
    if (!isExpanded) {
      e.preventDefault();
      setIsExpanded(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  const handleSelectProduct = (id) => {
    navigate(`/product/${id}`);
    setIsFocused(false);
    setQuery("");
    setIsExpanded(false);
    if (onSearchSubmit) onSearchSubmit();
  };

  const clearSearch = () => {
    setQuery("");
    setIsExpanded(false);
    setIsFocused(false);
  };

  const showDropdown = isFocused && query.trim().length > 0;

  return (
    <div className={styles.searchWrapper} ref={containerRef}>
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
          <i className="fa-solid fa-magnifying-glass" />
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
            setIsExpanded(true);
          }}
          aria-label="Search products"
          autoComplete="off"
          className="focus:outline-none focus:ring-0 border-none bg-transparent shadow-none"
        />

        {isExpanded && (
          <button
            type="button"
            onClick={clearSearch}
            className={styles.searchClearBtn}
            title="Close"
            aria-label="Close search"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        )}
      </form>

      {/* Simple Live Suggestions Dropdown */}
      {showDropdown && (
        <div className={styles.suggestions}>
          {matchingProducts.length > 0 ? (
            <>
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
                    <div className={styles.suggestionMeta}>
                      <span className={styles.suggestionName}>
                        {p.name || p.title}
                      </span>
                      {catName && (
                        <span className={styles.suggestionSub}>{catName}</span>
                      )}
                    </div>
                  </button>
                );
              })}

              <button
                type="button"
                className={styles.suggestionAllBtn}
                onClick={handleSubmit}
              >
                <span>View all results for &ldquo;{query.trim()}&rdquo;</span>
                <i className="fa-solid fa-arrow-right" />
              </button>
            </>
          ) : (
            <div className={styles.noSuggestion}>
              <span>No products found for &ldquo;{query.trim()}&rdquo;</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
