import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function MegaMenu({
  categories = [],
  products = [],
  activeCatHover,
  setActiveCatHover,
  isProductsActive,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const containerRef = React.useRef(null);
  const leaveTimeoutRef = React.useRef(null);

  const updatePosition = React.useCallback(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const menuWidth = 860; // Standard design width for megamenu
      const viewportWidth = window.innerWidth;
      const margin = 16; // 1rem padding from screen edges

      // Center of the products button
      const buttonCenter = rect.left + rect.width / 2;

      // Ideal left and right positions
      const menuLeft = buttonCenter - menuWidth / 2;
      const menuRight = buttonCenter + menuWidth / 2;

      let leftValue = "50%";

      if (viewportWidth < menuWidth + margin * 2) {
        // If the viewport is smaller than the menu plus margins, center it on the screen
        const offset = (viewportWidth / 2) - rect.left;
        leftValue = `${offset}px`;
      } else if (menuLeft < margin) {
        // Shift right if overflowing left edge
        const offset = (margin + menuWidth / 2) - rect.left;
        leftValue = `${offset}px`;
      } else if (menuRight > viewportWidth - margin) {
        // Shift left if overflowing right edge
        const offset = (viewportWidth - margin - menuWidth / 2) - rect.left;
        leftValue = `${offset}px`;
      }

      setMenuStyle({
        left: leftValue,
        width: `${menuWidth}px`,
        maxWidth: `calc(100vw - ${margin * 2}px)`
      });
    } else {
      setMenuStyle({});
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      if (setActiveCatHover) setActiveCatHover(null);
    }, 150); // Smooth 150ms delay prevents accidental mouse out closures
  };

  React.useEffect(() => {
    updatePosition();
    if (isOpen) {
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition);
      };
    }
  }, [isOpen, updatePosition]);

  React.useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  // Match products to category flexibly (handling string vs number IDs)
  const isProductInCat = (p, cat) => {
    if (!p || !cat) return false;
    const catIdStr = String(cat.id);
    const pCatStr = p.category !== undefined && p.category !== null ? String(p.category) : "";
    const pCatIdStr = p.category_id !== undefined && p.category_id !== null ? String(p.category_id) : "";
    const catNameLower = cat.name ? cat.name.toLowerCase() : "";
    const pCatNameLower = p.category_name ? p.category_name.toLowerCase() : "";

    return (
      (pCatStr && pCatStr === catIdStr) ||
      (pCatIdStr && pCatIdStr === catIdStr) ||
      (pCatNameLower && pCatNameLower === catNameLower)
    );
  };

  const categoriesWithProducts = categories.filter((cat) =>
    products.some((p) => isProductInCat(p, cat))
  );

  const displayCategories =
    categoriesWithProducts.length > 0 ? categoriesWithProducts : categories;

  const currentHoverId =
    activeCatHover ||
    (displayCategories.length > 0 ? displayCategories[0].id : null);

  const currentHoverCat =
    displayCategories.find((c) => String(c.id) === String(currentHoverId)) ||
    displayCategories[0];

  const currentHoverProducts = currentHoverCat
    ? products.filter((p) => isProductInCat(p, currentHoverCat))
    : [];

  const handleLinkClick = () => {
    setIsOpen(false);
    if (setActiveCatHover) setActiveCatHover(null);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to="/products"
        onClick={handleLinkClick}
        className={`${styles.dropdownBtn} ${
          isProductsActive ? styles.dropdownBtnActive : ""
        }`}
      >
        <span>Products</span>
        <i className="fa-solid fa-chevron-down" style={{ fontSize: "0.75rem", marginLeft: "0.1rem" }} />
      </Link>

      <div className={styles.dropdownMenu} style={menuStyle}>
        <div className={styles.dropdownMenuInner}>
          <div className={styles.megaMenuContainer}>
            {/* Sidebar: Category List */}
            <div className={styles.megaMenuSidebar}>
              <div className={styles.megaMenuSidebarHeader}>Categories</div>
              {displayCategories.map((cat) => {
                const isActive = String(currentHoverCat?.id) === String(cat.id);
                return (
                  <div
                    key={cat.id}
                    className={`${styles.megaMenuSidebarItem} ${
                      isActive ? styles.megaMenuSidebarItemActive : ""
                    }`}
                    onMouseEnter={() =>
                      setActiveCatHover ? setActiveCatHover(cat.id) : null
                    }
                  >
                    <Link
                      to={`/products?cat=${cat.id}`}
                      onClick={handleLinkClick}
                      className={styles.megaMenuSidebarLink}
                    >
                      <span>{cat.name}</span>
                      <i
                        className="fa-solid fa-chevron-right"
                        style={{ fontSize: "0.7rem", opacity: isActive ? 1 : 0.4 }}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Content Area: Products in Active Category */}
            <div className={styles.megaMenuContent}>
              {currentHoverCat && (
                <div className={styles.megaMenuContentHeader}>
                  <div>
                    <h4>{currentHoverCat.name}</h4>
                    {currentHoverCat.description && (
                      <p className={styles.megaMenuCatDesc}>
                        {currentHoverCat.description}
                      </p>
                    )}
                  </div>
                  <Link
                    to={`/products?cat=${currentHoverCat.id}`}
                    onClick={handleLinkClick}
                    className={styles.viewCategoryLink}
                  >
                    <span>Explore All</span>
                    <i className="fa-solid fa-arrow-right" style={{ fontSize: "0.75rem" }} />
                  </Link>
                </div>
              )}

              <ul className={styles.megaMenuContentList}>
                {currentHoverProducts.length > 0 ? (
                  currentHoverProducts.slice(0, 6).map((prod) => {
                    const imgUrl =
                      prod.image ||
                      (Array.isArray(prod.images) && prod.images[0]) ||
                      "/uploads/products/pallets/pallets-1770374237161-67758.webp";
                    return (
                      <li key={prod.id}>
                        <Link
                          to={`/products/${prod.id}`}
                          onClick={handleLinkClick}
                          className={styles.megaMenuContentLink}
                        >
                          <img
                            src={imgUrl}
                            alt={prod.name}
                            className={styles.megaMenuProductThumb}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "/uploads/products/pallets/pallets-1770374237161-67758.webp";
                            }}
                          />
                          <div className={styles.megaMenuProductInfo}>
                            <span className={styles.megaMenuContentLinkText}>
                              {prod.name}
                            </span>
                            {prod.type && (
                              <span className={styles.megaMenuProductType}>
                                {prod.type}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <div className={styles.noProductsInCat}>
                    <span>Discover our range in {currentHoverCat?.name}</span>
                    <Link
                      to={`/products?cat=${currentHoverCat?.id}`}
                      onClick={handleLinkClick}
                      className={styles.exploreCatBtn}
                    >
                      View Category Items
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>

          <div className={styles.megaMenuFooter}>
            <Link
              to="/products"
              onClick={handleLinkClick}
              className={styles.viewAllMainLink}
            >
              <span>Browse Full Industrial Catalog &amp; Specifications</span>
              <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
