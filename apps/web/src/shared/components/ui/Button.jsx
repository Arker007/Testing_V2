import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Icon } from "@iconify/react";

/**
 * Unified Button Primitive
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'swipe' | 'explore'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {'button' | 'link' | 'a'} [props.as='button']
 * @param {string} [props.to]
 * @param {string} [props.href]
 * @param {React.ReactNode} [props.icon]
 * @param {boolean} [props.showArrow=false]
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style={}]
 * @param {React.ReactNode} props.children
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  to,
  href,
  icon,
  showArrow = false,
  className = "",
  style = {},
  onClick,
  type = "button",
  ...props
}) {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs rounded-[var(--radius-btn,8px)] gap-1.5 font-semibold",
    md: "px-5 py-2.5 text-sm rounded-[var(--radius-btn,8px)] gap-2 font-semibold",
    lg: "px-6 py-3 text-base rounded-[var(--radius-btn,8px)] gap-2.5 font-semibold",
  };

  const baseClasses =
    "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 cursor-pointer select-none relative overflow-hidden isolate";

  const variantClasses = {
    primary:
      "bg-[var(--brand)] text-[var(--text-primary)] hover:bg-[var(--brand-hover)] active:bg-[var(--brand-dark)] shadow-sm border-0",
    secondary:
      "bg-[var(--navy)] text-white hover:bg-[var(--navy-dark)] active:bg-[var(--navy-darker)] shadow-sm border-0",
    outline:
      "bg-transparent border border-[var(--border-card)] text-[var(--text-primary)] hover:border-[var(--brand)] hover:text-[var(--brand-text)] active:scale-98",
    ghost:
      "bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--brand-text)] border-0",
    swipe:
      "bg-[var(--brand)] text-[var(--text-primary)] hover:bg-[var(--brand-hover)] shadow-sm",
    explore:
      "bg-[var(--navy)] text-white hover:bg-[var(--navy-dark)] shadow-sm",
  };

  const selectedSizeClass = sizeClasses[size] || sizeClasses.md;
  const selectedVariantClass = variantClasses[variant] || variantClasses.primary;

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
          {variant === "outline" || variant === "ghost" ? (
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
          ) : (
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
          )}
        </span>
      )}
    </>
  );

  const combinedClasses = `${baseClasses} ${selectedSizeClass} ${selectedVariantClass} ${className}`.trim();

  if (as === "link" || to) {
    return (
      <Motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
        <Link
          to={to || "/"}
          onClick={onClick}
          className={combinedClasses}
          style={style}
          {...props}
        >
          {content}
        </Link>
      </Motion.div>
    );
  }

  if (as === "a" || href) {
    return (
      <Motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
        <a
          href={href || to}
          onClick={onClick}
          className={combinedClasses}
          style={style}
          {...props}
        >
          {content}
        </a>
      </Motion.div>
    );
  }

  return (
    <Motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={combinedClasses}
      style={style}
      {...props}
    >
      {content}
    </Motion.button>
  );
}
