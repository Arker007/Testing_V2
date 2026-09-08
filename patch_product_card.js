const fs = require('fs');
const file = 'apps/web/src/features/products/styles/products.css';
let content = fs.readFileSync(file, 'utf8');

// Replace standard gridCard to match the white design with off-white thumb
content = content.replace(/\.gridCardThumbWrap\s*\{[\s\S]*?\}/, `.gridCardThumbWrap {
  position: relative;
  width: 100%;
  height: 240px;
  background: #f5f5f7;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 12px 12px 0 0;
}`);

content = content.replace(/\.gridCardDetails\s*\{[\s\S]*?\}/, `.gridCardDetails {
  background: #ffffff;
  padding: 1.25rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}`);

content = content.replace(/\.gridCardSkuTitle\s*\{[\s\S]*?\}/, `.gridCardSkuTitle {
  font-family: var(--font-display, inherit);
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.2;
  color: #111827;
  margin: 0;
  letter-spacing: -0.02em;
}`);

const newCss = `
.catTag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #dcfce7;
  color: #166534;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 10;
}

.dimBlock {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.dimIconWrap {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dimContent {
  display: flex;
  flex-direction: column;
}

.dimLabel {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.15rem;
}

.dimValueWrap {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.dimValue {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
}

.dimSuffix {
  font-size: 0.85rem;
  color: #111827;
}

.cardDivider {
  border: 0;
  height: 1px;
  background: #e5e7eb;
  margin: 1rem 0;
}

.bentoGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.bentoItem {
  background: #f9fafb;
  border-radius: 12px;
  padding: 0.85rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.bentoIconWrap {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bentoContent {
  display: flex;
  flex-direction: column;
}

.bentoLabel {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.bentoValue {
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
}

.primaryViewBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #4ade80; /* Using brand green, adjusted slightly */
  background: #49a147;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.primaryViewBtn:hover {
  background: #3c883a;
  transform: translateY(-1px);
}

.datasheetTextLink {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #166534;
  font-size: 0.875rem;
  font-weight: 700;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0;
  transition: color 0.2s ease;
}

.datasheetTextLink:hover {
  color: #14532d;
}

/* Dark mode adjustments */
:global(.dark) .gridCardThumbWrap {
  background: #1f2937;
}
:global(.dark) .gridCardDetails {
  background: #111827 !important;
}
:global(.dark) .gridCardSkuTitle,
:global(.dark) .dimValue,
:global(.dark) .dimSuffix,
:global(.dark) .bentoValue {
  color: #f9fafb !important;
}
:global(.dark) .bentoItem,
:global(.dark) .dimIconWrap,
:global(.dark) .bentoIconWrap {
  background: #374151;
}
:global(.dark) .cardDivider {
  background: #374151;
}
:global(.dark) .datasheetTextLink {
  color: #4ade80;
}
`;

content += '\n' + newCss;

fs.writeFileSync(file, content);
console.log("Updated products.css");
