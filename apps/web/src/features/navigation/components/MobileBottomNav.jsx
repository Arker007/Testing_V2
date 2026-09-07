import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import styles from "../styles/mobile-bottom-nav.module.css";

export default function MobileBottomNav() {
  const { pathname } = useLocation();
  const { co, mobileMenuOpen, setMobileMenuOpen } = useSite();

  // Do not show bottom nav on admin routes
  if (pathname.startsWith("/admin")) return null;

  const rawWa = co("whatsapp", "919898686379");
  const waClean = rawWa.replace(/\D/g, "");

  return (
    <nav className={styles.mobileNav} aria-label="Mobile Navigation Bar">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
      >
        <Icon icon="carbon:home" className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
      >
        <Icon icon="carbon:cube" className="w-5 h-5 mb-0.5" />
        <span>Catalog</span>
      </NavLink>

      <button
        type="button"
        className={`${styles.navItem} ${mobileMenuOpen ? styles.active : ""}`}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        <Icon
          icon={mobileMenuOpen ? "carbon:close" : "carbon:menu"}
          className="w-5 h-5 mb-0.5"
        />
        <span>Menu</span>
      </button>

      <a
        href={`https://wa.me/${waClean}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.navItem} ${styles.waItem}`}
        aria-label="Chat on WhatsApp"
      >
        <Icon icon="carbon:chat" className="w-5 h-5 mb-0.5 text-[#25D366]" />
        <span>WhatsApp</span>
      </a>

      <NavLink
        to="/contact?quote=1"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active} ${styles.quoteItem}` : `${styles.navItem} ${styles.quoteItem}`
        }
      >
        <Icon icon="carbon:document" className="w-5 h-5 mb-0.5" />
        <span>Quote</span>
      </NavLink>
    </nav>
  );
}
