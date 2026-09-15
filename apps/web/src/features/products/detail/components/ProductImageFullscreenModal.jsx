import React from "react";
import { MediaLightboxModal } from "@/shared/ui";

export default function ProductImageFullscreenModal({
  images = [],
  currentImgIdx = 0,
  setImg,
  productName,
  isOpen,
  onClose,
}) {
  return (
    <MediaLightboxModal
      isOpen={isOpen}
      onClose={onClose}
      images={images}
      currentIndex={currentImgIdx}
      onIndexChange={setImg}
      title={productName}
      badge="Inspection View"
    />
  );
}

