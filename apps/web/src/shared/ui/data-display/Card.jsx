import React from "react";

/**
 * Sub-component for Card Header section.
 */
export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`p-6 pb-2 space-y-1.5 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

/**
 * Sub-component for Card Title.
 */
export function CardTitle({ children, className = "", tag = "h3", ...props }) {
  const Component = tag;
  return (
    <Component
      className={`text-xl font-bold tracking-tight text-[var(--text-primary)] ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Sub-component for Card Description text.
 */
export function CardDescription({ children, className = "", ...props }) {
  return (
    <p
      className={`text-sm text-[var(--text-secondary)] leading-relaxed ${className}`.trim()}
      {...props}
    >
      {children}
    </p>
  );
}

/**
 * Sub-component for Card Content body.
 */
export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-6 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

/**
 * Sub-component for Card Footer section.
 */
export function CardFooter({ children, className = "", ...props }) {
  return (
    <div className={`p-6 pt-0 flex items-center justify-between gap-4 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

/**
 * Reusable Card component supporting all design system variants and surface tokens.
 *
 * @param {Object} props
 * @param {'default' | 'feature' | 'elevated' | 'interactive' | 'glass' | 'dark' | 'brand' | 'outlined' | 'subtle' | 'cta'} [props.variant='default']
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style={}]
 * @param {React.ReactNode} props.children
 */
export default function Card({
  children,
  className = "",
  variant = "default",
  style = {},
  ...props
}) {
  const baseClasses = "transition-all duration-200";

  const variantClassMap = {
    default:
      "bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--surface,#161c24)] border border-[var(--border-subtle,rgba(242,242,242,0.12))] text-[var(--text-primary)] rounded-[var(--radius-card,8px)] shadow-[var(--shadow-sm)]",
    feature:
      "bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--surface,#161c24)] border border-[var(--border-subtle,rgba(242,242,242,0.12))] text-[var(--text-primary)] rounded-[var(--radius-card,8px)] shadow-[var(--shadow-md)]",
    elevated:
      "bg-white dark:bg-[var(--surface,#161c24)] border border-slate-200/90 dark:border-[var(--border-subtle,rgba(242,242,242,0.12))] text-[var(--text-primary)] rounded-[var(--radius-card,8px)] shadow-xl",
    interactive:
      "bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--surface,#161c24)] border border-[var(--border-subtle,rgba(242,242,242,0.12))] text-[var(--text-primary)] rounded-[var(--radius-card,8px)] shadow-[var(--shadow-sm)] hover:-translate-y-1 hover:shadow-xl hover:border-[var(--brand-primary,#6BBF54)]/50 transition-all duration-300 cursor-pointer",
    glass:
      "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 text-[var(--text-primary)] rounded-[var(--radius-card,8px)] shadow-lg",
    dark:
      "bg-slate-900 dark:bg-[#161c24] text-white border border-slate-800 rounded-[var(--radius-card,8px)] shadow-xl",
    brand:
      "bg-gradient-to-br from-white to-slate-50 dark:from-[#161c24] dark:to-[#1a232e] border border-[var(--brand-primary,#6BBF54)]/30 text-[var(--text-primary)] rounded-[var(--radius-card,8px)] shadow-lg",
    outlined:
      "bg-transparent border border-slate-200/90 dark:border-slate-800 text-[var(--text-primary)] rounded-[var(--radius-card,8px)]",
    subtle:
      "bg-slate-50/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-[var(--text-primary)] rounded-[var(--radius-card,8px)]",
    cta:
      "p-8 sm:p-12 text-[var(--text-primary)] shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-[var(--surface,#161c24)] border border-slate-200/90 dark:border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-[var(--radius-card,8px)]",
  };

  const selectedVariantClass = variantClassMap[variant] || variantClassMap.default;

  return (
    <div
      className={`${baseClasses} ${selectedVariantClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
