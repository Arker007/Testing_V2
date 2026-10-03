import React from "react";
import { ProductCard } from "@/shared/ui";

function ProductGridCard(props) {
  return <ProductCard variant="grid" {...props} />;
}

export default React.memo(ProductGridCard);
