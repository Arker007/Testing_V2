const fs = require('fs');

// 1. Update JSX
const jsxFile = 'apps/web/src/features/products/components/cards/ProductGridCard.jsx';
let jsx = fs.readFileSync(jsxFile, 'utf8');

jsx = jsx.replace(/<div className={styles\.gridCardThumbWrap}>[\s\S]*?<div className={styles\.gridCardDetails}>/, `<div className={styles.gridCardThumbWrap}>
        <div className={styles.gridCardThumb}>
          <OptimizedImage
            src={img}
            alt={title}
            className={styles.gridCardImg}
          />
        </div>
        <span className={styles.catTag}>{categoryName}</span>
      </div>

      <div className={styles.gridCardDetails}>`);

fs.writeFileSync(jsxFile, jsx);

// 2. Update CSS
const cssFile = 'apps/web/src/features/products/styles/products.css';
let css = fs.readFileSync(cssFile, 'utf8');

// The outer card needs padding and white background
css = css.replace(/\.gridCard\s*\{[\s\S]*?\}/, `.gridCard {
  background: var(--bg-surface, #ffffff);
  border-radius: 16px;
  border: 1px solid var(--border-subtle, #e5e7eb);
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color var(--motion-fast) ease, box-shadow var(--motion-fast) ease, transform var(--motion-fast) ease;
  height: 100%;
  padding: 1rem;
}`);

// The image wrapper needs the grey background and rounded corners
css = css.replace(/\.gridCardThumbWrap\s*\{[\s\S]*?\}/, `.gridCardThumbWrap {
  position: relative;
  width: 100%;
  height: 240px;
  background: #f4f5f7;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}`);

// The details container doesn't need top padding since the card has padding now, but let's just adjust it
css = css.replace(/\.gridCardDetails\s*\{[\s\S]*?\}/, `.gridCardDetails {
  background: transparent;
  padding: 1.25rem 0 0 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}`);

fs.writeFileSync(cssFile, css);
console.log("Card layout fully updated.");
