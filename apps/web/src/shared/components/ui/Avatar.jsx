import React from "react";
import { Icon } from "@iconify/react";

/**
 * Unified Avatar Component with fallback initials, online status dots, and shapes.
 *
 * @param {Object} props
 * @param {string} [props.src]
 * @param {string} [props.alt]
 * @param {string} [props.name]
 * @param {'circle' | 'rounded' | 'square'} [props.shape='circle']
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [props.size='md']
 * @param {'online' | 'offline' | 'busy'} [props.status]
 * @param {string} [props.className='']
 */
export default function Avatar({
  src,
  alt = "Avatar",
  name = "",
  shape = "circle",
  size = "md",
  status,
  className = "",
  ...props
}) {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const statusDotSizes = {
    xs: "w-1.5 h-1.5 bottom-0 right-0",
    sm: "w-2 h-2 bottom-0 right-0",
    md: "w-2.5 h-2.5 bottom-0.5 right-0.5",
    lg: "w-3 h-3 bottom-0.5 right-0.5",
    xl: "w-4 h-4 bottom-1 right-1",
  };

  const shapeClasses = {
    circle: "rounded-full",
    rounded: "rounded-[var(--radius-lg,12px)]",
    square: "rounded-none",
  };

  const statusColors = {
    online: "bg-emerald-500",
    offline: "bg-slate-400",
    busy: "bg-rose-500",
  };

  const getInitials = (str) => {
    if (!str) return "";
    const parts = str.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentShape = shapeClasses[shape] || shapeClasses.circle;
  const currentStatusDot = statusDotSizes[size] || statusDotSizes.md;

  const showImage = src && !imageError;
  const initials = getInitials(name || alt);

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`.trim()} {...props}>
      <div
        className={`${currentSize} ${currentShape} overflow-hidden bg-[var(--brand-soft)] border border-[var(--brand-border)] text-[#1E622A] dark:text-[#6BBF54] font-bold flex items-center justify-center select-none shadow-xs`}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <Icon icon="solar:user-bold" className="w-1/2 h-1/2 opacity-70" />
        )}
      </div>

      {status && (
        <span
          className={`absolute rounded-full ring-2 ring-[var(--bg-surface)] ${
            statusColors[status] || statusColors.online
          } ${currentStatusDot}`}
        />
      )}
    </div>
  );
}

export function AvatarGroup({ max = 4, className = "", children }) {
  const childrenArray = React.Children.toArray(children);
  const visibleAvatars = childrenArray.slice(0, max);
  const remainingCount = childrenArray.length - max;

  return (
    <div className={`inline-flex items-center -space-x-2.5 overflow-hidden ${className}`.trim()}>
      {visibleAvatars.map((child, index) => (
        <div key={index} className="ring-2 ring-[var(--bg-surface)] rounded-full">
          {child}
        </div>
      ))}

      {remainingCount > 0 && (
        <div className="w-8 h-8 rounded-full bg-[var(--bg-surface-secondary)] border border-[var(--border-default)] ring-2 ring-[var(--bg-surface)] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)]">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
