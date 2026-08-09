import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useSite } from "../../shared/context/SiteContext";
import { STATIC_CATEGORIES } from "../../data/home";
import QuoteButton from "../../shared/components/QuoteButton";
import AnnouncementBar from "./AnnouncementBar";
import MegaMenu from "./MegaMenu";
import MobileNavDrawer from "./MobileNavDrawer";
import NavbarSearch from "./NavbarSearch";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCatHover, setActiveCatHover] = useState(null);
  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const [products, setProducts] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { co, mobileMenuOpen: open, setMobileMenuOpen: setOpen } = useSite();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isProductsActive =
    pathname.startsWith("/products") || pathname.startsWith("/product");

  useEffect(() => {
    const pf = window.__prefetch || {};
    const productsPromise =
      pf.products || fetch("/api/products").then((r) => r.json());
    const categoriesPromise =
      pf.categories || fetch("/api/categories").then((r) => r.json());

    Promise.all([productsPromise, categoriesPromise])
      .then(([pd, cd]) => {
        if (pd?.products && Array.isArray(pd.products)) {
          setProducts(pd.products);
        }
        if (cd?.categories && Array.isArray(cd.categories)) {
          setCategories(cd.categories);
        }
      })
      .catch((err) => console.error("Error loading products/categories:", err));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setScrolled(window.scrollY > 40);
  }, [pathname, setOpen]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const waLink = `https://wa.me/${co("whatsapp", "919898686379").replace(
    /\D/g,
    ""
  )}`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setOpen(false);
    }
  };

  return (
    <>
      <AnnouncementBar />

      <header className={styles.headerContainer}>
        <div className={`${styles.nav} ${scrolled ? styles.navShrink : ""}`}>
          <div className={styles.inner}>
            {/* Logo */}
            <Link to="/" className={styles.logo}>
              {co("logo") && !logoError ? (
                <img
                  src={co("logo")}
                  alt={co("name", "VISHAL ENTERPRISE")}
                  className={styles.logoImg}
                  onError={() => setLogoError(true)}
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

            {/* Navigation Links */}
            <nav className={styles.links} aria-label="Main navigation">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
              >
                Home
              </NavLink>

              <MegaMenu
                categories={categories}
                products={products}
                activeCatHover={activeCatHover}
                setActiveCatHover={setActiveCatHover}
                isProductsActive={isProductsActive}
              />

              <NavLink
                to="/manufacturing"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
              >
                Manufacturing
              </NavLink>

              <NavLink
                to="/sustainability"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
              >
                Sustainability
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Action slots & Hamburger */}
            <div className={styles.actions}>
              <NavbarSearch
                products={products}
                categories={categories}
                onSearchSubmit={() => setOpen(false)}
              />

              <button
                type="button"
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              <div className={styles.headerQuoteBtnWrap}>
                <QuoteButton
                  to="/contact?quote=1"
                  text="Get Quote"
                />
              </div>

              <button
                type="button"
                className={styles.mobileMenuBtn}
                onClick={() => setOpen(!open)}
                aria-label="Toggle navigation menu"
                aria-expanded={open}
              >
                <i className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNavDrawer
        open={open}
        setOpen={setOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isProductsActive={isProductsActive}
        mobileProductsOpen={mobileProductsOpen}
        setMobileProductsOpen={setMobileProductsOpen}
        categories={categories}
        products={products}
      />

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingWa}
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp" />
        <span>WhatsApp</span>
      </a>
    </>
  );
}
