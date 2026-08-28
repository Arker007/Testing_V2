import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "../navbar.module.css";
import profilesImg from "../../../assets/images/recycled_plastic_profiles_1785866736886.jpg";

export default function MegaMenu({
  isProductsActive,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const leaveTimeoutRef = useRef(null);

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
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div
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
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={`w-3.5 h-3.5 ml-1 inline transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[var(--brand)]" : ""
          }`}
        />
      </Link>

      <div className={styles.dropdownMenu}>
        <div className={`${styles.dropdownMenuPanel} p-5 lg:p-6 transition-all`}>
          {/* Main 6-Column Category Grid */}
          <div className={styles.megaMenuGrid}>
            {/* Left Featured Promo Card */}
            <div className="bg-[var(--mega-menu-promo-bg)] border border-[var(--mega-menu-promo-border)] rounded-[var(--mega-menu-radius,8px)] p-4 lg:p-5 flex flex-col justify-between shadow-xs h-full">
              <div>
                <h3 className="text-[15px] lg:text-[16px] font-bold text-[var(--heading)] tracking-tight leading-[1.3]">
                  Premium Recycled<br className="hidden lg:inline" /> Plastic Solutions
                </h3>
                <div className="h-[2px] w-8 bg-[var(--brand)] my-2.5 rounded-full" />
                <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed mb-3">
                  Explore our wide range of durable, eco-friendly products built for every industry.
                </p>
                <div className="rounded-[var(--radius-md,6px)] overflow-hidden my-2 flex items-center justify-center bg-white/40 dark:bg-white/[0.02]">
                  <img
                    src={profilesImg}
                    alt="Recycled Plastic Solutions"
                    loading="lazy"
                    className="w-full h-24 object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <Link
                to="/products"
                onClick={handleLinkClick}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-bold text-[12px] rounded-[var(--navbar-radius,8px)] shadow-xs transition-colors duration-200"
              >
                <span>View All Products</span>
                <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Column 1: Furniture */}
            <div className={`${styles.megaMenuCol} ${styles.megaMenuColDivided}`}>
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-1">
                  <Icon icon="solar:chair-2-bold" className="w-4 h-4 text-[var(--brand)] shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--heading)]">Furniture</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {[
                    { name: "Cafeteria Collection", term: "Cafeteria" },
                    { name: "Comfort Collection", term: "Comfort" },
                    { name: "Horeca Collection", term: "Horeca" },
                    { name: "Infiniti Collection", term: "Infiniti" },
                    { name: "Kids Collection", term: "Kids" },
                    { name: "Lifestyle Collection", term: "Lifestyle" },
                    { name: "Rattan Collection", term: "Rattan" },
                    { name: "Storage Collection", term: "Storage" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={`/products?search=${encodeURIComponent(item.term)}`}
                      onClick={handleLinkClick}
                      className="group flex items-center justify-between py-1 text-[13px] text-[var(--text-secondary)] hover:text-[var(--heading)] transition-colors duration-150 whitespace-nowrap"
                    >
                      <span className="transition-transform duration-150 group-hover:translate-x-0.5">{item.name}</span>
                      <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/products?cat=outdoor-furniture"
                onClick={handleLinkClick}
                className="mt-auto pt-3.5 inline-flex items-center gap-1 text-[12px] font-bold text-[var(--brand-text)] hover:text-[var(--brand-hover)] transition-colors whitespace-nowrap"
              >
                <span>View All Furniture</span>
                <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Column 2: Coolers */}
            <div className={`${styles.megaMenuCol} ${styles.megaMenuColDivided}`}>
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-1">
                  <Icon icon="solar:snowflake-bold" className="w-4 h-4 text-[var(--brand)] shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--heading)]">Coolers</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {[
                    { name: "Commercial Coolers", term: "Commercial Cooler" },
                    { name: "Desert Coolers", term: "Desert Cooler" },
                    { name: "Mini Desert Coolers", term: "Mini Desert" },
                    { name: "Personal Cooler", term: "Personal Cooler" },
                    { name: "Window Coolers", term: "Window Cooler" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={`/products?search=${encodeURIComponent(item.term)}`}
                      onClick={handleLinkClick}
                      className="group flex items-center justify-between py-1 text-[13px] text-[var(--text-secondary)] hover:text-[var(--heading)] transition-colors duration-150 whitespace-nowrap"
                    >
                      <span className="transition-transform duration-150 group-hover:translate-x-0.5">{item.name}</span>
                      <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/products?search=Cooler"
                onClick={handleLinkClick}
                className="mt-auto pt-3.5 inline-flex items-center gap-1 text-[12px] font-bold text-[var(--brand-text)] hover:text-[var(--brand-hover)] transition-colors whitespace-nowrap"
              >
                <span>View All Coolers</span>
                <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Column 3: Building Solutions */}
            <div className={`${styles.megaMenuCol} ${styles.megaMenuColDivided}`}>
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-1">
                  <Icon icon="solar:shield-check-bold" className="w-4 h-4 text-[var(--brand)] shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--heading)]">Building Solutions</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {[
                    { name: "Bubble Guard", term: "Bubble Guard" },
                    { name: "Door Panel / Partition", term: "Door Panel" },
                    { name: "False Ceiling", term: "False Ceiling" },
                    { name: "Floor Protector", term: "Floor Protector" },
                    { name: "Packaging", term: "Packaging" },
                    { name: "Printing", term: "Printing" },
                    { name: "Wall Panel", term: "Wall Panel" },
                    { name: "Wood Protector", term: "Wood Protector" },
                    { name: "Wall Facing Board", term: "Facing Board" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={`/products?search=${encodeURIComponent(item.term)}`}
                      onClick={handleLinkClick}
                      className="group flex items-center justify-between py-1 text-[13px] text-[var(--text-secondary)] hover:text-[var(--heading)] transition-colors duration-150 whitespace-nowrap"
                    >
                      <span className="transition-transform duration-150 group-hover:translate-x-0.5">{item.name}</span>
                      <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/products?search=Bubble+Guard"
                onClick={handleLinkClick}
                className="mt-auto pt-3.5 inline-flex items-center gap-1 text-[12px] font-bold text-[var(--brand-text)] hover:text-[var(--brand-hover)] transition-colors whitespace-nowrap"
              >
                <span>View All Solutions</span>
                <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Column 4: Pallets */}
            <div className={`${styles.megaMenuCol} ${styles.megaMenuColDivided}`}>
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-1">
                  <Icon icon="solar:widget-bold" className="w-4 h-4 text-[var(--brand)] shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--heading)]">Pallets</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {[
                    { name: "Heavy Duty Racking Pallets", term: "Racking Pallet" },
                    { name: "Medium Duty Pallets", term: "Medium Duty Pallet" },
                    { name: "Light Weight / Export Pallets", term: "Export Pallet" },
                    { name: "2-Way Pallets", term: "2-Way Pallet" },
                    { name: "4-Way Entry Pallets", term: "4-Way Pallet" },
                    { name: "Reversible Pallets", term: "Reversible Pallet" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={`/products?search=${encodeURIComponent(item.term)}`}
                      onClick={handleLinkClick}
                      className="group flex items-center justify-between py-1 text-[13px] text-[var(--text-secondary)] hover:text-[var(--heading)] transition-colors duration-150 whitespace-nowrap"
                    >
                      <span className="transition-transform duration-150 group-hover:translate-x-0.5">{item.name}</span>
                      <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/products?search=Pallet"
                onClick={handleLinkClick}
                className="mt-auto pt-3.5 inline-flex items-center gap-1 text-[12px] font-bold text-[var(--brand-text)] hover:text-[var(--brand-hover)] transition-colors whitespace-nowrap"
              >
                <span>View All Pallets</span>
                <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Column 5: Utility Products */}
            <div className={styles.megaMenuCol}>
              <div>
                <div className="flex items-center gap-2 pb-2.5 mb-1">
                  <Icon icon="solar:cube-bold" className="w-4 h-4 text-[var(--brand)] shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--heading)]">Utility Products</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {[
                    { name: "Multipurpose Crates", term: "Crates" },
                    { name: "Waste Management Bins", term: "Bins" },
                    { name: "Custom Industrial Trays", term: "Trays" },
                    { name: "HDPE Granules", term: "Granules" },
                    { name: "Garden Fencing Systems", term: "Fence" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={`/products?search=${encodeURIComponent(item.term)}`}
                      onClick={handleLinkClick}
                      className="group flex items-center justify-between py-1 text-[13px] text-[var(--text-secondary)] hover:text-[var(--heading)] transition-colors duration-150 whitespace-nowrap"
                    >
                      <span className="transition-transform duration-150 group-hover:translate-x-0.5">{item.name}</span>
                      <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/products?search=Utility"
                onClick={handleLinkClick}
                className="mt-auto pt-3.5 inline-flex items-center gap-1 text-[12px] font-bold text-[var(--brand-text)] hover:text-[var(--brand-hover)] transition-colors whitespace-nowrap"
              >
                <span>View All Utility Products</span>
                <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Info Feature Banner (Warranty, Custom Solutions, Need Help?) */}
          <div className={`${styles.megaMenuBanner} grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)]`}>
            {/* 1. Warranty Information */}
            <Link
              to="/products?search=Warranty"
              onClick={handleLinkClick}
              className="group p-2 sm:px-3 flex items-center justify-between hover:bg-[var(--mega-menu-banner-hover)] transition-all duration-200 rounded-[var(--mega-menu-radius,8px)] md:rounded-none first:rounded-l-[var(--mega-menu-radius,8px)] last:rounded-r-[var(--mega-menu-radius,8px)]"
            >
              <div className="flex items-center gap-3">
                <Icon icon="solar:shield-check-bold" className="w-7 h-7 text-[var(--brand)] shrink-0 group-hover:scale-105 transition-transform duration-200" />
                <div>
                  <h4 className="text-[13px] font-bold text-[var(--heading)] group-hover:text-[var(--brand-text)] transition-colors leading-tight">
                    Warranty Information
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-tight">
                    View warranty details for our products
                  </p>
                </div>
              </div>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>

            {/* 2. Custom Solutions */}
            <Link
              to="/contact?quote=1"
              onClick={handleLinkClick}
              className="group p-2 sm:px-3 flex items-center justify-between hover:bg-[var(--mega-menu-banner-hover)] transition-all duration-200 rounded-[var(--mega-menu-radius,8px)] md:rounded-none"
            >
              <div className="flex items-center gap-3">
                <Icon icon="solar:ruler-angular-bold" className="w-7 h-7 text-[var(--brand)] shrink-0 group-hover:scale-105 transition-transform duration-200" />
                <div>
                  <h4 className="text-[13px] font-bold text-[var(--heading)] group-hover:text-[var(--brand-text)] transition-colors leading-tight">
                    Custom Solutions
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-tight">
                    Need custom sizes or bulk orders?
                  </p>
                </div>
              </div>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>

            {/* 3. Need Help? */}
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="group p-2 sm:px-3 flex items-center justify-between hover:bg-[var(--mega-menu-banner-hover)] transition-all duration-200 rounded-[var(--mega-menu-radius,8px)] md:rounded-none first:rounded-l-[var(--mega-menu-radius,8px)] last:rounded-r-[var(--mega-menu-radius,8px)]"
            >
              <div className="flex items-center gap-3">
                <Icon icon="solar:headphones-round-bold" className="w-7 h-7 text-[var(--brand)] shrink-0 group-hover:scale-105 transition-transform duration-200" />
                <div>
                  <h4 className="text-[13px] font-bold text-[var(--heading)] group-hover:text-[var(--brand-text)] transition-colors leading-tight">
                    Need Help?
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-tight">
                    Talk to our product specialists
                  </p>
                </div>
              </div>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>
          </div>

          {/* Bottom Footer Strip */}
          <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Icon icon="solar:leaf-linear" className="w-4 h-4 text-[var(--brand)] shrink-0" />
              <span className="font-bold text-[var(--heading)] text-[12.5px]">Sustainable. Durable. Reliable.</span>
              <span className="text-[var(--text-muted)] text-[12.5px] hidden sm:inline ml-1">High-quality recycled plastic products for a better tomorrow.</span>
            </div>

            <Link
              to="/contact?quote=1"
              onClick={handleLinkClick}
              className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[var(--brand-text)] hover:text-[var(--brand-hover)] transition-colors duration-150"
            >
              <span>Request Fast Quote</span>
              <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


