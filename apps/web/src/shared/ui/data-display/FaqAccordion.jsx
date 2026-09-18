/* eslint-disable no-unused-vars */
import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";

/**
 * FaqAccordionItem - Single accordion item
 */
export function FaqAccordionItem({
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
  const headerId = `faq-header-${itemId}`;
  const panelId = `faq-panel-${itemId}`;

  return (
    <div
      className={`group rounded-[var(--radius-card,8px)] overflow-hidden transition-all duration-200 bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--bg-surface,#1e2530)] border ${
        isOpen
          ? "border-l-4 border-l-[var(--brand-primary)] border-t-[var(--border-subtle)] border-r-[var(--border-subtle)] border-b-[var(--border-subtle)] shadow-xs"
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
          className="w-full text-left min-h-[52px] px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] cursor-pointer"
        >
          <span className="flex items-center gap-3 min-w-0 pr-2">
            {icon && (
              <span className="shrink-0 w-7 h-7 rounded-md bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center">
                {typeof icon === "string" ? <Icon icon={icon} className="w-4 h-4" /> : icon}
              </span>
            )}
            <span className={`font-bold transition-colors ${isOpen ? "text-[var(--brand-primary)]" : "text-[var(--text-primary)]"}`}>
              {title}
            </span>
            {badge && (
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] shrink-0">
                {badge}
              </span>
            )}
          </span>

          <span
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isOpen
                ? "bg-[var(--brand-primary)] text-[var(--brand-btn-text,#0f141a)] shadow-xs"
                : "bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] group-hover:border-[var(--brand-border)] group-hover:text-[var(--brand-primary)] group-hover:bg-[var(--bg-surface-tertiary)]"
            }`}
            aria-hidden="true"
          >
            <Icon
              icon="carbon:chevron-down"
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
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
                height: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] },
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
            <div className="px-5 pt-3.5 pb-5 sm:px-6 sm:pt-4 sm:pb-6 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * FaqAccordion - Unified accessible accordion container
 *
 * @param {Object} props
 * @param {Array<{id?: string, title?: string, question?: string, q?: string, content?: React.ReactNode, answer?: React.ReactNode, a?: React.ReactNode, icon?: string, badge?: string}>} props.items
 * @param {boolean} [props.allowMultiple=false]
 * @param {number|number[]} [props.defaultOpenIndex=0]
 * @param {string} [props.className='']
 */
export default function FaqAccordion({
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
    <div className={`space-y-3 ${className}`.trim()}>
      {items.map((item, idx) => {
        const titleText = item.title || item.question || item.q || "";
        const bodyContent = item.content || item.answer || item.a || null;

        return (
          <FaqAccordionItem
            key={item.id || idx}
            id={item.id || `faq-item-${idx}`}
            title={titleText}
            icon={item.icon}
            badge={item.badge}
            isOpen={openIndexes.includes(idx)}
            onToggle={() => handleToggle(idx)}
          >
            {bodyContent}
          </FaqAccordionItem>
        );
      })}
    </div>
  );
}
