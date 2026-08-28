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
    sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
    md: "px-4 py-2.5 text-xs sm:text-sm gap-2 rounded-xl",
    lg: "px-5 py-3 text-sm sm:text-base gap-2.5 rounded-xl font-bold",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const variantClasses = {
    solid:
      "bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]",
    outline:
      "bg-transparent border border-[#25D366] text-[#25D366] dark:text-[#20bd5a] font-bold hover:bg-[#25D366]/10 transition-all",
    subtle:
      "bg-[#25D366]/15 text-[#1a8e44] dark:text-[#25D366] font-bold hover:bg-[#25D366]/25 transition-all",
    dark: "bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold shadow-xs transition-all",
    pill: "bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full shadow-md transition-all hover:scale-105",
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
      className={`inline-flex items-center justify-center font-sans no-underline cursor-pointer ${selectedSize} ${selectedVariant} ${className}`.trim()}
      {...props}
    >
      {showIcon && (
        <Icon icon="logos:whatsapp-icon" className={`${selectedIconSize} shrink-0`} />
      )}
      {label && <span>{label}</span>}
    </a>
  );
}
