import React from "react";
import { Link, NavLink } from "react-router-dom";
import QuoteButton from "../../shared/components/QuoteButton";
import styles from "./Navbar.module.css";

export default function MobileNavDrawer({
  open,
  setOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isProductsActive,
  mobileProductsOpen,
  setMobileProductsOpen,
  categories,
  products,
}) {
  if (!open) return null;

  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-drawer"
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <form onSubmit={handleSearch} className={styles.dSearch}>
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${styles.dLink} ${styles.dLinkActive}` : styles.dLink
          }
          onClick={() => setOpen(false)}
        >
          Home
        </NavLink>

        {/* Products Mobile Accordion */}
        <div className={styles.dAccordion}>
          <button
            type="button"
            className={`${styles.dAccordionBtn} ${
              isProductsActive ? styles.dLinkActive : ""
            }`}
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
          >
            <span>Products</span>
            <i
              className={`fa-solid fa-chevron-down ${
                mobileProductsOpen ? styles.rotateIcon : ""
              }`}
            />
          </button>
          {mobileProductsOpen && (
            <div className={styles.dAccordionContent}>
              {categories.map((cat) => {
                const catProducts = products.filter(
                  (p) =>
                    p &&
                    (p.category === cat.id ||
                      (p.category_name &&
                        p.category_name.toLowerCase() ===
                          cat.name.toLowerCase()))
                );

                return (
                  <div key={cat.id} className={styles.dAccordionGroup}>
                    <Link
                      to={`/products?cat=${cat.id}`}
                      className={styles.dCategoryHeader}
                      onClick={() => setOpen(false)}
                    >
                      {cat.name}{" "}
                      <i
                        className="fa-solid fa-angle-right"
                        style={{ fontSize: "0.65rem", marginLeft: "auto" }}
                      />
                    </Link>
                    <div className={styles.dCategoryProducts}>
                      {catProducts.slice(0, 3).map((prod) => (
                        <Link
                          key={prod.id}
                          to={`/products/${prod.id}`}
                          className={styles.dLinkSubProduct}
                          onClick={() => setOpen(false)}
                        >
                          • {prod.name}
                        </Link>
                      ))}
                      {catProducts.length === 0 && (
                        <span className={styles.dLinkSubEmpty}>
                          No products yet
                        </span>
                      )}
                      {catProducts.length > 3 && (
                        <Link
                          to={`/products?cat=${cat.id}`}
                          className={styles.dLinkSubMore}
                          onClick={() => setOpen(false)}
                        >
                          View all (+{catProducts.length - 3})
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <NavLink
          to="/manufacturing"
          className={({ isActive }) =>
            isActive ? `${styles.dLink} ${styles.dLinkActive}` : styles.dLink
          }
          onClick={() => setOpen(false)}
        >
          Manufacturing
        </NavLink>

        <NavLink
          to="/sustainability"
          className={({ isActive }) =>
            isActive ? `${styles.dLink} ${styles.dLinkActive}` : styles.dLink
          }
          onClick={() => setOpen(false)}
        >
          Sustainability
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${styles.dLink} ${styles.dLinkActive}` : styles.dLink
          }
          onClick={() => setOpen(false)}
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? `${styles.dLink} ${styles.dLinkActive}` : styles.dLink
          }
          onClick={() => setOpen(false)}
        >
          Contact
        </NavLink>

        <QuoteButton
          to="/contact?quote=1"
          text="Get Free Quote"
          style={{ width: "100%", marginTop: "1rem" }}
          onClick={() => setOpen(false)}
        />
      </div>
    </>
  );
}
