import { useEffect, useState, useMemo } from "react";

const DEFAULT_FALLBACK = "/uploads/products/pallets/pallets-1770374237161-67758.webp";

export default function OptimizedImage({
  src,
  alt,
  className,
  style,
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

  // Check if initialUrl is a local upload and no error has occurred yet
  const isLocalUpload = !hasError && typeof initialUrl === "string" && initialUrl.includes("/uploads/");

  if (isLocalUpload) {
    const cleanPath = initialUrl.replace(/(_thumb|_medium|_large)?\.(png|jpe?g|gif|webp)$/i, "");
    const baseSrc = cleanPath + ".webp";
    const thumbSrc = cleanPath + "_thumb.webp";
    const mediumSrc = cleanPath + "_medium.webp";

    return (
      <img
        src={finalSrc}
        srcSet={`${thumbSrc} 400w, ${mediumSrc} 800w, ${baseSrc} 1920w`}
        sizes={sizes}
        alt={alt || "Product"}
        className={className}
        style={style}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        referrerPolicy="no-referrer"
        onError={handleError}
        {...props}
      />
    );
  }

  return (
    <img
      src={finalSrc}
      alt={alt || "Product"}
      className={className}
      style={style}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
}




