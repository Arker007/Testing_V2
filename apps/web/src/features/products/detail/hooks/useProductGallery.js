import { useState, useEffect, useCallback } from "react";

export function useProductGallery(images = [], { autoRotate = true, intervalMs = 4000, paused = false } = {}) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // Clamp index if images change
  useEffect(() => {
    if (images.length > 0 && currentImgIdx >= images.length) {
      setCurrentImgIdx(0);
    }
  }, [images.length, currentImgIdx]);

  const handlePrevImage = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentImgIdx((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentImgIdx((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!autoRotate || images.length < 2 || paused) return;

    const timer = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoRotate, images.length, paused, intervalMs]);

  return {
    currentImgIdx,
    setImgIdx: setCurrentImgIdx,
    handlePrevImage,
    handleNextImage,
  };
}

export default useProductGallery;
