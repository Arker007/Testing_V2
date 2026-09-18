import { useEffect, useState, useMemo } from "react";

const DEFAULT_FALLBACK = "/uploads/products/pallets/pallets-1770374237161-67758.webp";

export default function OptimizedImage({
  src,
  alt,
  className,
  style,
  width,
  height,
  sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw",
  onError: customOnError,
  fallbackSrc,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  ...props
}) {
  const [hasError, setHasError] = useState(false);

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

  // Reset error tracking only when initialUrl changes
  useEffect(() => {
    setHasError(false);
  }, [initialUrl]);

  const activeFallback = fallbackSrc || DEFAULT_FALLBACK;

  const handleError = (e) => {
    // Prevent recursive error triggers on the DOM element
    e.currentTarget.onerror = null;
    e.currentTarget.srcset = "";
    if (e.currentTarget.src !== activeFallback) {
      e.currentTarget.src = activeFallback;
    }
    if (!hasError) {
      setHasError(true);
    }
    if (typeof customOnError === "function") {
      customOnError(e);
    }
  };

  const finalSrc = hasError || !initialUrl ? activeFallback : initialUrl;

  return (
    <img
      src={finalSrc}
      alt={alt || "Industrial Plastic Product"}
      className={className}
      style={style}
      width={width}
      height={height}
      sizes={sizes}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
}




