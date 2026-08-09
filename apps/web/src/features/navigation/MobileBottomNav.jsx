import { NavLink, useLocation } from "react-router-dom";
import { useSite } from "../../shared/context/SiteContext";
import styles from "./MobileBottomNav.module.css";

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
        <i className="fa-solid fa-house" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
      >
        <i className="fa-solid fa-boxes-stacked" />
        <span>Catalog</span>
      </NavLink>

      <button
        type="button"
        className={`${styles.navItem} ${mobileMenuOpen ? styles.active : ""}`}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} />
        <span>Menu</span>
      </button>

      <a
        href={`https://wa.me/${waClean}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.navItem} ${styles.waItem}`}
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp" />
        <span>WhatsApp</span>
      </a>

      <NavLink
        to="/contact?quote=1"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active} ${styles.quoteItem}` : `${styles.navItem} ${styles.quoteItem}`
        }
      >
        <i className="fa-solid fa-file-signature" />
        <span>Quote</span>
      </NavLink>
    </nav>
  );
}
