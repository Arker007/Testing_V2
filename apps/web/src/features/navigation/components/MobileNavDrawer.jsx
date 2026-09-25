/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { Button, QuoteButton } from "@/shared/ui";
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
  const { cms } = useSite();
  const isPageVisible = (key) => cms?.[key] !== "0";
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
            }}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
          />
          <motion.div
            id="mobile-drawer"
            className={styles.mobileCardDrawer}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Optional Search Bar */}
            <form onSubmit={handleSearch} className={styles.dSearch}>
          <Icon icon="carbon:search" className="w-4 h-4 text-slate-400" />
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
          {isPageVisible("nav_show_home") && (
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
          )}

          {/* Products Mobile Accordion */}
          {isPageVisible("nav_show_products") && (
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
                icon="carbon:chevron-down"
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
                  {categories
                    .map((cat) => {
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
                      return { cat, catProducts };
                    })
                    .filter(({ catProducts }) => catProducts.length > 0)
                    .map(({ cat, catProducts }) => {
                      return (
                        <div key={cat.id} className={styles.dAccordionGroup}>
                          <Link
                            to={`/products?cat=${cat.id}`}
                            className={styles.dCategoryHeader}
                            onClick={() => setOpen(false)}
                          >
                            {cat.name}
                            <Icon icon="carbon:chevron-right" className="w-3.5 h-3.5 ml-auto text-slate-400" />
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
          )}

          {isPageVisible("nav_show_manufacturing") && (
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
          )}

          {isPageVisible("nav_show_sustainability") && (
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
          )}

          {isPageVisible("nav_show_about") && (
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
          )}

          {isPageVisible("nav_show_contact") && (
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
          )}
        </motion.div>

        {/* Full-width CTA Button at Bottom */}
        <div className="pt-4 mt-auto">
          <QuoteButton
            to="/contact?quote=1"
            onClick={() => setOpen(false)}
            text="Request a Quote"
            className="w-full !justify-center !py-3"
          />
        </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
