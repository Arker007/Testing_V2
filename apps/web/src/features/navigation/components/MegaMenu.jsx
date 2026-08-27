import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "../navbar.module.css";

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
        <Icon icon="solar:alt-arrow-down-linear" className="w-3.5 h-3.5 ml-1 inline transition-transform" />
      </Link>

      <div className={styles.dropdownMenu}>
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-2xl rounded-card p-7 w-full transition-all">
          <div className="grid grid-cols-6 gap-7 items-start">
            {/* Column 1: Furniture */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2 mb-3">
                <Icon icon="solar:chair-2-linear" className="w-3.5 h-3.5 text-[var(--text-brand)] shrink-0" />
                <span>Furniture</span>
              </div>
              <div className="flex flex-col gap-1.5">
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
                    className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-all duration-200 hover:translate-x-1 py-0.5 block"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/products?cat=outdoor-furniture"
                  onClick={handleLinkClick}
                  className="mt-3 inline-block text-center text-[10px] font-bold tracking-wider text-slate-950 bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] px-3 py-1.5 rounded-btn transition-colors duration-150 uppercase shadow-xs"
                >
                  View All
                </Link>
              </div>
            </div>

            {/* Column 2: Coolers */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2 mb-3">
                <Icon icon="solar:widget-2-linear" className="w-3.5 h-3.5 text-[var(--text-brand)] shrink-0" />
                <span>Coolers</span>
              </div>
              <div className="flex flex-col gap-1.5">
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
                    className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-all duration-200 hover:translate-x-1 py-0.5 block"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Bubble Guard */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2 mb-3">
                <Icon icon="solar:shield-check-linear" className="w-3.5 h-3.5 text-[var(--text-brand)] shrink-0" />
                <span>Bubble Guard</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { name: "Door Panel/Partition", term: "Door Panel" },
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
                    className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-all duration-200 hover:translate-x-1 py-0.5 block"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4: Kleeno & Warranty */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2 mb-3">
                <Icon icon="solar:sofa-linear" className="w-3.5 h-3.5 text-[var(--text-brand)] shrink-0" />
                <span>Kleeno</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { name: "Commercial", term: "Kleeno Commercial" },
                  { name: "Household", term: "Kleeno Household" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={`/products?search=${encodeURIComponent(item.term)}`}
                    onClick={handleLinkClick}
                    className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-all duration-200 hover:translate-x-1 py-0.5 block"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Sub-section: Warranty Details */}
                <div className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-1.5 mt-5 mb-2">
                  <Icon icon="solar:bill-list-linear" className="w-3.5 h-3.5 text-[var(--text-brand)] shrink-0" />
                  <span>Warranty</span>
                </div>
                {[
                  { name: "Furniture Warranty Details", term: "Furniture Warranty" },
                  { name: "Cooler Warranty Details", term: "Cooler Warranty" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={`/products?search=${encodeURIComponent(item.term)}`}
                    onClick={handleLinkClick}
                    className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-all duration-200 hover:translate-x-1 py-0.5 block"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 5: Pallets */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2 mb-3">
                <Icon icon="solar:box-minimalistic-linear" className="w-3.5 h-3.5 text-[var(--text-brand)] shrink-0" />
                <span>Pallets</span>
              </div>
              <div className="flex flex-col gap-1.5">
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
                    className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-all duration-200 hover:translate-x-1 py-0.5 block"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 6: Utility Products */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-2 mb-3">
                <Icon icon="solar:settings-minimalistic-linear" className="w-3.5 h-3.5 text-[var(--text-brand)] shrink-0" />
                <span>Utility Products</span>
              </div>
              <div className="flex flex-col gap-1.5">
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
                    className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-all duration-200 hover:translate-x-1 py-0.5 block"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA Strip */}
          <div className="mt-7 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[13px]">
            <span className="text-[var(--text-muted)] font-medium">
              Custom dimensions, specialized plastic profiles, or bulk orders?
            </span>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="text-xs font-bold text-slate-950 bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] px-4 py-2 rounded-btn flex items-center gap-2 transition-all shadow-xs"
            >
              <span>Request Fast Quote</span>
              <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
