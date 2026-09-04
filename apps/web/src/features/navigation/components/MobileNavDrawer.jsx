/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useSite } from "../../../shared/context/SiteContext";
import styles from "../styles/navbar.module.css";

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

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
          />
          <motion.div
            id="mobile-drawer"
            className={styles.mobileCardDrawer}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
            aria-label="Search products"
          />
        </form>

        {/* Navigation Items Stack */}
        <motion.div
          className={styles.mobileNavStack}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.04,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}>
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
          </motion.div>

          {/* Products Mobile Accordion */}
          <motion.div
            className={styles.dAccordion}
            variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
          >
            <div
              role="button"
              tabIndex={0}
              aria-expanded={mobileProductsOpen}
              aria-label="Toggle Products Submenu"
              className={`${styles.mCardLink} ${styles.mCardAccordionBtn} ${
                isProductsActive ? styles.mCardLinkActive : ""
              }`}
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setMobileProductsOpen(!mobileProductsOpen);
                }
              }}
            >
              <span>Products</span>
              <Icon
                icon="solar:alt-arrow-down-linear"
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileProductsOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            <AnimatePresence>
              {mobileProductsOpen && (
                <motion.div
                  className={styles.dAccordionContent}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  {categories.map((cat) => {
                    const catSlug = cat.slug || cat.id;
                    const catProducts = products.filter(
                      (p) =>
                        p &&
                        (p.category === cat.id ||
                          p.category === catSlug ||
                          p.category_id === cat.id ||
                          p.category_slug === catSlug ||
                          (p.category_name &&
                            p.category_name.toLowerCase() ===
                              (cat.name || "").toLowerCase()))
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}>
            <NavLink
              to="/manufacturing"
              className={({ isActive }) =>
                isActive ? `${styles.mCardLink} ${styles.mCardLinkActive}` : styles.mCardLink
              }
              onClick={() => setOpen(false)}
            >
              Manufacturing
            </NavLink>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}>
            <NavLink
              to="/sustainability"
              className={({ isActive }) =>
                isActive ? `${styles.mCardLink} ${styles.mCardLinkActive}` : styles.mCardLink
              }
              onClick={() => setOpen(false)}
            >
              Sustainability
            </NavLink>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${styles.mCardLink} ${styles.mCardLinkActive}` : styles.mCardLink
              }
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? `${styles.mCardLink} ${styles.mCardLinkActive}` : styles.mCardLink
              }
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>
          </motion.div>
        </motion.div>

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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
