import React from "react";

/**
 * Unified Progress Indicator Component with linear and circular variants.
 *
 * @param {Object} props
 * @param {number} [props.value=0] - Current progress percentage (0 - 100)
 * @param {number} [props.max=100] - Max progress value
 * @param {'linear' | 'striped' | 'circular'} [props.variant='linear']
 * @param {'xs' | 'sm' | 'md' | 'lg'} [props.size='md']
 * @param {'brand' | 'success' | 'warning' | 'danger' | 'info'} [props.color='brand']
 * @param {boolean} [props.showLabel=false]
 * @param {boolean} [props.indeterminate=false]
 * @param {string} [props.className='']
 */
export default function Progress({
  value = 0,
  max = 100,
  variant = "linear",
  size = "md",
  color = "brand",
  showLabel = false,
  indeterminate = false,
  className = "",
  ...props
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const linearHeights = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const colorClasses = {
    brand: "bg-[var(--brand-primary)]",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-[var(--danger-500)]",
    info: "bg-[var(--info-500)]",
  };

  const trackColor = "bg-[var(--border-subtle)] dark:bg-[var(--bg-surface-tertiary)]";
  const currentHeight = linearHeights[size] || linearHeights.md;
  const currentColor = colorClasses[color] || colorClasses.brand;

  if (variant === "circular") {
    const circularSizes = {
      xs: { size: 24, stroke: 3, font: "text-[9px]" },
      sm: { size: 36, stroke: 3.5, font: "text-[11px]" },
      md: { size: 48, stroke: 4, font: "text-xs font-bold" },
      lg: { size: 64, stroke: 5, font: "text-sm font-bold" },
    };

    const config = circularSizes[size] || circularSizes.md;
    const radius = (config.size - config.stroke) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const strokeColors = {
      brand: "var(--brand-primary)",
      success: "#10b981",
      warning: "#f59e0b",
      danger: "var(--danger-500)",
      info: "var(--info-500)",
    };

    return (
      <div className={`relative inline-flex items-center justify-center ${className}`.trim()}>
        <svg width={config.size} height={config.size} className="transform -rotate-90">
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={config.stroke}
            fill="transparent"
            className="text-[var(--border-subtle)] dark:text-[var(--bg-surface-tertiary)]"
          />
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            stroke={strokeColors[color] || strokeColors.brand}
            strokeWidth={config.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        {showLabel && (
          <span className={`absolute inset-0 flex items-center justify-center ${config.font} text-[var(--text-primary)]`}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`.trim()} {...props}>
      <div
        className={`w-full overflow-hidden rounded-full ${trackColor} ${currentHeight} relative`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${currentColor} ${
            variant === "striped"
              ? "bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-move-stripes"
              : ""
          } ${indeterminate ? "w-1/3 animate-indeterminate-progress" : ""}`}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>

      {showLabel && (
        <div className="flex justify-between items-center text-xs text-[var(--text-muted)] font-medium">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
}
