import React, { useState } from "react";
import { Icon } from "@iconify/react";

/**
 * Single Accordion Item element.
 */
export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
  icon,
  className = "",
}) {
  return (
    <div
      className={`border border-slate-200/90 dark:border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-xl overflow-hidden transition-all bg-white dark:bg-[var(--surface,#161c24)] ${className}`.trim()}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[var(--text-primary)] hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors focus:outline-none"
      >
        <span className="flex items-center gap-3">
          {icon && (
            <Icon icon={icon} className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
          )}
          <span>{title}</span>
        </span>
        <span
          className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 ${
            isOpen ? "rotate-180 bg-[var(--brand-primary)] text-[var(--brand-btn-text)]" : ""
          }`}
        >
          <Icon icon="solar:alt-arrow-down-linear" className="w-4 h-4" />
        </span>
      </button>
      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Reusable Accordion container component.
 *
 * @param {Object} props
 * @param {Array<{title?: string, q?: string, content?: React.ReactNode, a?: React.ReactNode, icon?: string}>} props.items - Accordion item objects
 * @param {boolean} [props.allowMultiple=false] - Allow opening multiple panels at once
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function Accordion({ items = [], allowMultiple = false, className = "" }) {
  const [openIndexes, setOpenIndexes] = useState([0]);

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title || item.q}
          icon={item.icon}
          isOpen={openIndexes.includes(idx)}
          onToggle={() => handleToggle(idx)}
        >
          {item.content || item.a}
        </AccordionItem>
      ))}
    </div>
  );
}
