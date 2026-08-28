import React from "react";

/**
 * Reusable Skeleton loader component for loading placeholders.
 *
 * @param {Object} props
 * @param {'text' | 'rectangular' | 'circular' | 'avatar' | 'card'} [props.variant='rectangular'] - Skeleton shape
 * @param {string} [props.width] - Optional width CSS string or Tailwind class
 * @param {string} [props.height] - Optional height CSS string or Tailwind class
 * @param {number} [props.lines=1] - Number of text line skeletons to render (if variant='text')
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function Skeleton({
  variant = "rectangular",
  width,
  height,
  lines = 1,
  className = "",
  style,
  ...props
}) {
  const baseClasses =
    "bg-slate-200 dark:bg-white/10 animate-pulse shrink-0";

  const variantClasses = {
    text: "h-4 rounded w-full",
    rectangular: "rounded-xl w-full h-12",
    circular: "rounded-full w-10 h-10",
    avatar: "rounded-full w-12 h-12",
    card: "rounded-2xl w-full h-48",
  };

  const inlineStyles = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...style,
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className="flex flex-col gap-2.5 w-full">
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className={`${baseClasses} ${variantClasses.text} ${idx === lines - 1 ? "w-3/4" : "w-full"} ${className}`.trim()}
            style={inlineStyles}
            {...props}
          />
        ))}
      </div>
    );
  }

  const selectedVariantClass = variantClasses[variant] || variantClasses.rectangular;

  return (
    <div
      className={`${baseClasses} ${selectedVariantClass} ${className}`.trim()}
      style={inlineStyles}
      {...props}
    />
  );
}
