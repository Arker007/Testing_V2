import { useEffect, useState, useMemo, useRef } from "react";

const DEFAULT_FALLBACK = "/uploads/products/pallets/pallets-1770374237161-67758.webp";

/**
 * Enterprise OptimizedImage component with synchronized loading state,
 * shimmer skeleton placeholder, progressive WebP srcset, and smooth fade-in.
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  style,
  width,
  height,
  sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  onError: customOnError,
  onLoad: customOnLoad,
  fallbackSrc,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  wrapperClassName = "",
  showSkeleton = true,
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  // Compute a primitive key/URL for src
  const initialUrl = useMemo(() => {
    if (typeof src === "object" && src !== null) {
      return src.local || src.url || null;
    }
    if (typeof src === "string" && src.trim()) {
      return src.trim();
    }
    return null;
  }, [src]);

  // Reset tracking when source URL changes
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [initialUrl]);

  // Check if image is already cached/complete in browser
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [initialUrl]);

  const activeFallback = fallbackSrc || DEFAULT_FALLBACK;

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (typeof customOnLoad === "function") {
      customOnLoad(e);
    }
  };

  const handleError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.srcset = "";
    if (e.currentTarget.src !== activeFallback) {
      e.currentTarget.src = activeFallback;
    }
    setHasError(true);
    setIsLoaded(true);
    if (typeof customOnError === "function") {
      customOnError(e);
    }
  };

  const finalSrc = hasError || !initialUrl ? activeFallback : initialUrl;

  const computedSrcSet = useMemo(() => {
    if (props.srcSet) return props.srcSet;
    if (
      !hasError &&
      typeof finalSrc === "string" &&
      finalSrc.startsWith("/uploads/") &&
      finalSrc.endsWith(".webp") &&
      !finalSrc.includes("_thumb") &&
      !finalSrc.includes("_medium")
    ) {
      const base = finalSrc.slice(0, -5);
      return `${base}_thumb.webp 400w, ${base}_medium.webp 800w, ${finalSrc} 1600w`;
    }
    return undefined;
  }, [finalSrc, hasError, props.srcSet]);

  const hasExplicitSize = Boolean(width && height);

  return (
    <div
      className={`relative overflow-hidden ${
        wrapperClassName || (hasExplicitSize ? "inline-block" : "w-full h-full")
      }`}
      style={hasExplicitSize ? { width: `${width}px`, height: `${height}px` } : undefined}
    >
      {/* Synchronized Shimmer Skeleton Placeholder */}
      {showSkeleton && !isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-slate-200/80 dark:bg-white/10 animate-pulse z-0 pointer-events-none"
        />
      )}

      {/* Optimized Image with smooth fade-in */}
      <img
        ref={imgRef}
        src={finalSrc}
        srcSet={computedSrcSet}
        alt={alt || "Industrial Plastic Product"}
        className={`${className} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 ease-out relative z-0`.trim()}
        style={style}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}




