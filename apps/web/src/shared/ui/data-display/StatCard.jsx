import React from "react";
import Card from "./Card";
import IconBox from "./IconBox";

/**
 * Reusable StatCard / MetricCard for key metrics, figures, and statistical counters.
 *
 * @param {Object} props
 * @param {string | React.ReactNode} props.value - Metric value (e.g., "15+", "99.8%", "5,000 MT")
 * @param {string} props.label - Metric label
 * @param {string} [props.subtext] - Context description
 * @param {string | React.ReactNode} [props.icon] - Optional icon
 * @param {string} [props.trend] - Optional trend pill text (e.g., "+12%")
 * @param {'brand' | 'success' | 'sky' | 'neutral' | 'dark'} [props.iconVariant='brand'] - Icon variant
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function StatCard({
  value,
  label,
  subtext,
  icon,
  trend,
  iconVariant = "brand",
  className = "",
  ...props
}) {
  return (
    <Card
      variant="elevated"
      className={`p-6 relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-[var(--surface,#161c24)] border border-slate-200/90 dark:border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-[var(--radius-card,8px)] transition-all hover:border-[var(--brand-primary)]/40 ${className}`.trim()}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted,slate-500)]">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
              {value}
            </span>
            {trend && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                {trend}
              </span>
            )}
          </div>
          {subtext && (
            <p className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed mt-1">
              {subtext}
            </p>
          )}
        </div>
        {icon && (
          <IconBox icon={icon} variant={iconVariant} size="lg" />
        )}
      </div>
    </Card>
  );
}
