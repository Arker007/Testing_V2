import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import styles from "../styles/mobile-bottom-nav.module.css";

export default function MobileBottomNav() {
  const { pathname } = useLocation();
  const { co, cms, mobileMenuOpen, setMobileMenuOpen } = useSite();
  const isPageVisible = (key) => cms?.[key] !== "0";

  // Do not show bottom nav on admin routes
  if (pathname.startsWith("/admin")) return null;

  const rawWa = co("whatsapp", "919898686379");
  const waClean = rawWa.replace(/\D/g, "");

  const isHomeActive = !mobileMenuOpen && pathname === "/";
  const isProductsActive = !mobileMenuOpen && (pathname.startsWith("/products") || pathname.startsWith("/product"));

  const handleNavClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={styles.mobileNav} aria-label="Mobile Navigation Bar">
      {isPageVisible("nav_show_home") && (
        <NavLink
          to="/"
          end
          onClick={handleNavClick}
          className={isHomeActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
        >
          <Icon icon="carbon:home" className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>
      )}

      {isPageVisible("nav_show_products") && (
        <NavLink
          to="/products"
          onClick={handleNavClick}
          className={isProductsActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
        >
          <Icon icon="carbon:cube" className="w-5 h-5 mb-0.5" />
          <span>Catalog</span>
        </NavLink>
      )}

      <button
        type="button"
        className={`${styles.navItem} ${mobileMenuOpen ? styles.active : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMobileMenuOpen((prev) => !prev);
        }}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        <Icon
          icon={mobileMenuOpen ? "carbon:close" : "carbon:menu"}
          className="w-5 h-5 mb-0.5 pointer-events-none"
        />
        <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
      </button>

      <a
        href={`https://wa.me/${waClean}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleNavClick}
        className={`${styles.navItem} ${styles.waItem}`}
        aria-label="Chat on WhatsApp"
      >
        <Icon icon="carbon:chat" className="w-5 h-5 mb-0.5 text-[#25D366]" />
        <span>WhatsApp</span>
      </a>

      {isPageVisible("nav_show_contact") && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick();
            window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
          }}
          className={`${styles.navItem} ${styles.quoteItem}`}
          aria-label="Request a Quote"
        >
          <Icon icon="carbon:document" className="w-5 h-5 mb-0.5" />
          <span>Quote</span>
        </button>
      )}
    </nav>
  );
}
