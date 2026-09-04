import React from "react";

/**
 * Unified Divider / Separator Component with orientations, dashed lines, and centered labels.
 *
 * @param {Object} props
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal']
 * @param {'solid' | 'dashed' | 'faded'} [props.variant='solid']
 * @param {string | React.ReactNode} [props.label]
 * @param {'sm' | 'md' | 'lg'} [props.spacing='md']
 * @param {string} [props.className='']
 */
export default function Divider({
  orientation = "horizontal",
  variant = "solid",
  label,
  spacing = "md",
  className = "",
  ...props
}) {
  const isVertical = orientation === "vertical";

  const spacingClasses = {
    horizontal: {
      sm: "my-2",
      md: "my-4",
      lg: "my-6",
    },
    vertical: {
      sm: "mx-2 h-4",
      md: "mx-4 h-6",
      lg: "mx-6 h-8",
    },
  };

  const lineStyles = {
    solid: "border-solid",
    dashed: "border-dashed",
    faded: "border-solid opacity-40",
  };

  const currentSpacing = spacingClasses[orientation]?.[spacing] || spacingClasses.horizontal.md;
  const currentLineStyle = lineStyles[variant] || lineStyles.solid;

  if (isVertical) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`inline-block w-[1px] border-l border-[var(--border-subtle)] ${currentLineStyle} ${currentSpacing} align-middle ${className}`.trim()}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={`flex items-center w-full ${currentSpacing} ${className}`.trim()}
        {...props}
      >
        <div className={`flex-1 border-t border-[var(--border-subtle)] ${currentLineStyle}`} />
        <span className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] select-none">
          {label}
        </span>
        <div className={`flex-1 border-t border-[var(--border-subtle)] ${currentLineStyle}`} />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={`w-full border-0 border-t border-[var(--border-subtle)] ${currentLineStyle} ${currentSpacing} ${className}`.trim()}
      {...props}
    />
  );
}
