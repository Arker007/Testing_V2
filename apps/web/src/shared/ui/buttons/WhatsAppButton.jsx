import React from "react";
import { Icon } from "@iconify/react";
import { getWhatsAppUrl } from "../../utils/whatsapp";

/**
 * Reusable WhatsAppButton component for direct WhatsApp chat links and CTAs.
 *
 * @param {Object} props
 * @param {string} [props.phone='919898686379'] - Phone number with country code
 * @param {string} [props.text=''] - Pre-filled message for WhatsApp
 * @param {string} [props.label='Chat on WhatsApp'] - Button label text
 * @param {'solid' | 'outline' | 'subtle' | 'dark' | 'pill'} [props.variant='solid'] - Style variant
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Button size
 * @param {boolean} [props.showIcon=true] - Whether to show WhatsApp logo icon
 * @param {string} [props.className=''] - Additional custom CSS classes
 */
export default function WhatsAppButton({
  phone = "919898686379",
  text = "",
  label = "Chat on WhatsApp",
  variant = "solid",
  size = "md",
  showIcon = true,
  className = "",
  ...props
}) {
  const waUrl = getWhatsAppUrl(phone, text);

  const sizeClasses = {
    sm: "min-h-[var(--btn-h-sm,34px)] px-[var(--btn-px-sm,0.875rem)] py-[var(--btn-py-sm,0.375rem)] text-xs gap-1.5 rounded-[var(--radius-btn,8px)]",
    md: "min-h-[var(--btn-h-md,42px)] px-[var(--btn-px-md,1.375rem)] py-[var(--btn-py-md,0.625rem)] text-xs sm:text-sm gap-2 rounded-[var(--radius-btn,8px)]",
    lg: "min-h-[var(--btn-h-lg,48px)] px-[var(--btn-px-lg,1.75rem)] py-[var(--btn-py-lg,0.75rem)] text-sm sm:text-base gap-2.5 rounded-[var(--radius-btn,8px)] font-bold",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const variantClasses = {
    solid:
      "bg-[var(--color-whatsapp)] hover:brightness-95 text-[var(--white)] font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]",
    outline:
      "bg-transparent border border-[var(--color-whatsapp)] text-[var(--color-whatsapp)] font-bold hover:bg-[var(--color-whatsapp)]/10 active:scale-[0.98] transition-all",
    subtle:
      "bg-[var(--color-whatsapp)]/15 text-[var(--color-whatsapp)] font-bold hover:bg-[var(--color-whatsapp)]/25 active:scale-[0.98] transition-all",
    dark: "bg-[var(--navy-900)] hover:bg-[var(--navy-800)] text-[var(--white)] border border-[var(--border-dark)] font-bold shadow-xs active:scale-[0.98] transition-all",
    pill: "bg-[var(--color-whatsapp)] hover:brightness-95 text-[var(--white)] font-bold rounded-[var(--radius-btn,8px)] shadow-md transition-all hover:scale-105 active:scale-[0.98]",
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;
  const selectedVariant = variantClasses[variant] || variantClasses.solid;
  const selectedIconSize = iconSizes[size] || iconSizes.md;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label || "Chat on WhatsApp"}
      className={`inline-flex items-center justify-center font-sans no-underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-whatsapp)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] ${selectedSize} ${selectedVariant} ${className}`.trim()}
      {...props}
    >
      {showIcon && (
        <Icon icon="logos:whatsapp-icon" className={`${selectedIconSize} shrink-0`} />
      )}
      {label && <span>{label}</span>}
    </a>
  );
}
