import React from "react";
import { motion as Motion } from "motion/react";
import { transitionBase } from "../../constants/motion.constants";

/**
 * Reusable Tabs navigation component with smooth layout transitions.
 *
 * @param {Object} props
 * @param {Array<string | {id: string, label: string, icon?: React.ReactNode}>} props.tabs - Array of tab strings or objects
 * @param {string} props.activeTab - Currently active tab key/ID
 * @param {(tabId: string) => void} props.onChange - Tab change callback handler
 * @param {'pills' | 'underline' | 'solid'} [props.variant='pills'] - Tab visual style
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Tab control size
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  variant = "pills",
  size = "md",
  className = "",
}) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs font-bold",
    md: "px-4 py-2.5 text-xs sm:text-sm font-bold",
    lg: "px-6 py-3 text-sm font-bold",
  };

  const activeClasses = {
    pills: "text-[var(--brand-btn-text)] font-extrabold relative z-10",
    underline: "text-[var(--brand-primary)] font-black relative z-10",
    solid: "text-[var(--text-inverse)] font-black relative z-10",
  };

  const inactiveClasses = {
    pills: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative z-10",
    underline: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative z-10",
    solid: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative z-10",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 ${
        variant === "pills"
          ? "bg-[var(--bg-surface-secondary)] rounded-xl border border-[var(--border-subtle)]"
          : ""
      } ${className}`.trim()}
    >
      {tabs.map((tab) => {
        const key = typeof tab === "string" ? tab : tab.id || tab.key;
        const label = typeof tab === "string" ? tab : tab.label || tab.name;
        const icon = typeof tab === "object" ? tab.icon : null;
        const isActive = activeTab === key;

        return (
          <Motion.button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            whileTap={{ scale: 0.97 }}
            className={`relative inline-flex items-center justify-center gap-2 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] ${
              sizeClasses[size] || sizeClasses.md
            } ${isActive ? activeClasses[variant] : inactiveClasses[variant]}`}
          >
            {isActive && variant === "pills" && (
              <Motion.div
                layoutId="activeTabBadge"
                transition={transitionBase}
                className="absolute inset-0 bg-[var(--brand-primary)] rounded-lg shadow-sm border border-[var(--brand-primary)] z-0"
              />
            )}
            {isActive && variant === "underline" && (
              <Motion.div
                layoutId="activeTabUnderline"
                transition={transitionBase}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-primary)] z-0"
              />
            )}
            {isActive && variant === "solid" && (
              <Motion.div
                layoutId="activeTabSolid"
                transition={transitionBase}
                className="absolute inset-0 bg-[var(--text-primary)] rounded-lg shadow-xs z-0"
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {icon}
              <span>{label}</span>
            </span>
          </Motion.button>
        );
      })}
    </div>
  );
}

