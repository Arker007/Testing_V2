/* eslint-disable no-unused-vars */
import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";

/**
 * Single Accordion Item element.
 *
 * @param {Object} props
 * @param {string} props.title - Title or Question text
 * @param {React.ReactNode} props.children - Accordion expanded body content
 * @param {boolean} [props.isOpen=false] - Whether this panel is open
 * @param {() => void} [props.onToggle] - Toggle callback
 * @param {string} [props.icon] - Optional Iconify icon name
 * @param {string} [props.badge] - Optional badge tag
 * @param {string} [props.id] - Optional unique ID for ARIA controls
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
  icon,
  badge,
  id,
  className = "",
}) {
  const generatedId = useId();
  const itemId = id || generatedId;
  const headerId = `accordion-header-${itemId}`;
  const panelId = `accordion-panel-${itemId}`;

  return (
    <div
      className={`group rounded-[var(--radius-card,8px)] overflow-hidden border transition-all duration-200 bg-[var(--bg-surface)] ${
        isOpen
          ? "border-[var(--brand-primary)]/50 shadow-xs"
          : "border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:shadow-2xs"
      } ${className}`.trim()}
    >
      <h3>
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full text-left min-h-[52px] px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] cursor-pointer"
        >
          <span className="flex items-center gap-3.5 min-w-0 pr-2">
            {icon && (
              <span className="shrink-0 w-8 h-8 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center">
                <Icon icon={icon} className="w-5 h-5" />
              </span>
            )}
            <span className="truncate sm:whitespace-normal">{title}</span>
            {badge && (
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] shrink-0">
                {badge}
              </span>
            )}
          </span>

          <span
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isOpen
                ? "bg-[var(--brand-primary)] text-slate-950 shadow-xs"
                : "bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:bg-[var(--bg-surface-tertiary)]"
            }`}
            aria-hidden="true"
          >
            <Icon
              icon="solar:alt-arrow-down-linear"
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.2, delay: 0.05 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 sm:px-6 sm:pb-6 sm:pt-2 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]/60 mt-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Reusable Accordion container component.
 *
 * @param {Object} props
 * @param {Array<{id?: string, title?: string, q?: string, question?: string, content?: React.ReactNode, a?: React.ReactNode, answer?: React.ReactNode, icon?: string, badge?: string}>} props.items - Accordion item objects
 * @param {boolean} [props.allowMultiple=false] - Allow opening multiple panels at once
 * @param {number|number[]} [props.defaultOpenIndex=0] - Initial open index or array of indices
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpenIndex = 0,
  className = "",
}) {
  const initialOpen = Array.isArray(defaultOpenIndex)
    ? defaultOpenIndex
    : defaultOpenIndex !== null && defaultOpenIndex !== undefined && defaultOpenIndex >= 0
    ? [defaultOpenIndex]
    : [];

  const [openIndexes, setOpenIndexes] = useState(initialOpen);

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={`space-y-3.5 ${className}`.trim()}>
      {items.map((item, idx) => {
        const titleText = item.title || item.q || item.question || "";
        const bodyContent = item.content || item.a || item.answer || null;

        return (
          <AccordionItem
            key={item.id || idx}
            id={item.id || `faq-item-${idx}`}
            title={titleText}
            icon={item.icon}
            badge={item.badge}
            isOpen={openIndexes.includes(idx)}
            onToggle={() => handleToggle(idx)}
          >
            {bodyContent}
          </AccordionItem>
        );
      })}
    </div>
  );
}
