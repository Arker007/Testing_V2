import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
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
  const { co } = useSite();

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
        className={styles.mobileCardDrawer}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Top Header inside Drawer: Logo & Close Button */}
        <div className={styles.mobileCardHeader}>
          <Link to="/" onClick={() => setOpen(false)} className={styles.logo}>
            {co("logo") ? (
              <img
                src={co("logo")}
                alt={co("name", "VISHAL ENTERPRISE")}
                className={styles.logoImg}
              />
            ) : (
              <div className={styles.logoIcon}>
                {co("name", "VISHAL ENTERPRISE").charAt(0).toUpperCase()}
              </div>
            )}
            <div className={styles.logoTextGroup}>
              <span className={styles.logoNameLine1}>
                {co("name", "VISHAL ENTERPRISE").trim().split(/\s+/)[0] || "VISHAL"}
              </span>
              <span className={styles.logoNameLine2}>
                {co("name", "VISHAL ENTERPRISE").trim().split(/\s+/).slice(1).join(" ") || "ENTERPRISE"}
                <span className={styles.logoDot}>.</span>
              </span>
            </div>
          </Link>

          <button
            type="button"
            className={styles.mobileCloseBtn}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <Icon icon="solar:close-circle-bold" className="w-6 h-6 text-slate-700 dark:text-slate-200" />
          </button>
        </div>

        {/* Optional Search Bar */}
        <form onSubmit={handleSearch} className={styles.dSearch}>
          <Icon icon="solar:magnifer-linear" className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Navigation Items Stack */}
        <div className={styles.mobileNavStack}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.mCardLink} ${styles.mCardLinkActive}` : styles.mCardLink
            }
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>

          {/* Products Mobile Accordion */}
          <div className={styles.dAccordion}>
            <div
              role="button"
              tabIndex={0}
              className={`${styles.mCardLink} ${styles.mCardAccordionBtn} ${
                isProductsActive ? styles.mCardLinkActive : ""
              }`}
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            >
              <span>Products</span>
              <Icon
                icon="solar:alt-arrow-down-linear"
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileProductsOpen ? "rotate-180" : ""
                }`}
              />
            </div>
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
                        {cat.name}
                        <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 ml-auto text-slate-400" />
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
              isActive ? `${styles.mCardLink} ${styles.mCardLinkActive}` : styles.mCardLink
            }
            onClick={() => setOpen(false)}
          >
            Manufacturing
          </NavLink>

          <NavLink
            to="/sustainability"
            className={({ isActive }) =>
              isActive ? `${styles.mCardLink} ${styles.mCardLinkActive}` : styles.mCardLink
            }
            onClick={() => setOpen(false)}
          >
            Sustainability
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${styles.mCardLink} ${styles.mCardLinkActive}` : styles.mCardLink
            }
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${styles.mCardLink} ${styles.mCardLinkActive}` : styles.mCardLink
            }
            onClick={() => setOpen(false)}
          >
            Contact
          </NavLink>
        </div>

        {/* Full-width CTA Button at Bottom */}
        <div className="pt-4 mt-auto">
          <Link
            to="/contact?quote=1"
            className={styles.mobileCardCtaBtn}
            onClick={() => setOpen(false)}
          >
            <span>Get Quote</span>
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
