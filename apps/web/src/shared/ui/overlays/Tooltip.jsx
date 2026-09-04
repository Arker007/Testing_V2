import React, { useState, useRef, useEffect } from "react";

/**
 * Unified Tooltip Component with placement and theme styling variants.
 *
 * @param {Object} props
 * @param {React.ReactNode | string} props.content - Tooltip text/content
 * @param {'top' | 'bottom' | 'left' | 'right'} [props.placement='top']
 * @param {'dark' | 'light' | 'brand'} [props.variant='dark']
 * @param {number} [props.delay=150] - Hover delay in ms
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export default function Tooltip({
  content,
  placement = "top",
  variant = "dark",
  delay = 150,
  className = "",
  children,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!content) return <>{children}</>;

  const placementClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const variantClasses = {
    dark: "bg-[var(--neutral-950)] text-white border border-white/10 shadow-lg",
    light: "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-default)] shadow-md",
    brand: "bg-[var(--brand-primary)] text-slate-950 border border-[var(--brand-primary)] font-bold shadow-md",
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1 text-xs rounded-[var(--radius-sm,4px)] whitespace-nowrap pointer-events-none transition-all duration-150 animate-fadeIn ${
            placementClasses[placement] || placementClasses.top
          } ${variantClasses[variant] || variantClasses.dark} ${className}`.trim()}
        >
          {content}
        </div>
      )}
    </div>
  );
}
