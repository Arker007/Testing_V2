import React from "react";

/**
 * Reusable Tabs navigation component.
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
    pills:
      "bg-[var(--brand-primary)] text-[var(--brand-btn-text)] shadow-md border border-[var(--brand-primary)]",
    underline:
      "border-b-2 border-[var(--brand-primary)] text-[var(--brand-primary)] font-black",
    solid:
      "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs",
  };

  const inactiveClasses = {
    pills:
      "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10",
    underline:
      "border-b-2 border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
    solid:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 ${
        variant === "pills"
          ? "bg-slate-50/50 dark:bg-slate-900/40 rounded-xl border border-slate-200/60 dark:border-slate-800"
          : ""
      } ${className}`.trim()}
    >
      {tabs.map((tab) => {
        const key = typeof tab === "string" ? tab : tab.id || tab.key;
        const label = typeof tab === "string" ? tab : tab.label || tab.name;
        const icon = typeof tab === "object" ? tab.icon : null;
        const isActive = activeTab === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-2 rounded-lg transition-all duration-200 cursor-pointer ${
              sizeClasses[size] || sizeClasses.md
            } ${isActive ? activeClasses[variant] : inactiveClasses[variant]}`}
          >
            {icon}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
