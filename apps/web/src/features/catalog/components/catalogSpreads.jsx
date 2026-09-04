import { getCoverAboutSpread } from "./spreads/CoverAboutSpread";
import { getContentsSpread } from "./spreads/ContentsSpread";
import { getOverviewSpreads } from "./spreads/OverviewSpread";
import { getProductSpread } from "./spreads/ProductSpread";
import { getBackCoverSpread } from "./spreads/BackCoverSpread";

export function buildSpreads({
  company,
  cms,
  catalogProducts,
  products,
  catalogYear,
  catalogTitle,
  emailVal,
  webVal,
  productsByCategory,
  leftCats,
  rightCats,
  coverImages,
  aboutImages,
}) {
  const spreads = [];

  // Spread 1: Cover and About
  spreads.push(
    getCoverAboutSpread({
      catalogYear,
      company,
      coverImages,
      catalogTitle,
      webVal,
      aboutImages,
      emailVal,
    })
  );

  // Spread 2: Contents Index
  spreads.push(
    getContentsSpread({
      leftCats,
      rightCats,
      productsByCategory,
      catalogProducts,
      emailVal,
      webVal,
    })
  );

  // Spreads 3, 4, 5: Corporate Overview, Materials, Quality
  spreads.push(...getOverviewSpreads({ cms, emailVal, webVal }));

  // Spreads 6+: Dynamic Product Pages
  catalogProducts.forEach((prod, idx) => {
    spreads.push(
      getProductSpread({
        prod,
        idx,
        products,
        emailVal,
        webVal,
      })
    );
  });

  // Spread Final: Back Cover
  spreads.push(
    getBackCoverSpread({
      catalogProducts,
      emailVal,
      webVal,
      company,
    })
  );

  return spreads;
}
