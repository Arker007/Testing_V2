import React from "react";
import Card from "./Card";
import Badge from "./Badge";

/**
 * Reusable CTA Card component for unified CTA banners across all pages.
 *
 * @param {Object} props
 * @param {string | React.ReactNode} [props.badge] - Badge text or element
 * @param {string} [props.badgeVariant="brand"] - Variant for Badge
 * @param {string | React.ReactNode} [props.badgeIcon] - Optional icon for Badge
 * @param {string | React.ReactNode} props.title - Main CTA headline
 * @param {string | React.ReactNode} [props.subtitle] - Subtitle/description paragraph
 * @param {React.ReactNode} props.children - Action buttons / controls
 * @param {string} [props.className=""] - Additional custom wrapper class
 * @param {'elevated' | 'glass' | 'bordered' | 'brand'} [props.variant="elevated"] - Card variant
 */
export default function CtaCard({
  badge,
  badgeVariant = "brand",
  badgeIcon,
  title,
  subtitle,
  children,
  className = "",
  variant = "elevated",
  ...props
}) {
  return (
    <Card
      variant={variant}
      className={`p-8 sm:p-12 text-[var(--text-primary)] shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-[var(--surface,#161c24)] border border-slate-200/90 dark:border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-lg ${className}`.trim()}
      {...props}
    >
      {/* Ambient radial glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-primary)]/10 dark:bg-[var(--brand-primary)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand-primary)]/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 md:gap-8">
        <div className="space-y-2.5">
          {badge && (
            <div className="mb-2">
              {typeof badge === "string" ? (
                <Badge variant={badgeVariant} icon={badgeIcon} size="md">
                  {badge}
                </Badge>
              ) : (
                badge
              )}
            </div>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-2 max-w-xl font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {children && (
          <div className="shrink-0 self-start sm:self-auto flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
}
