import re

with open('apps/web/src/features/navigation/MobileNavDrawer.jsx', 'r') as f:
    text = f.read()

# Replace button with div for the accordion toggle to avoid user-agent stylesheet quirks
text = text.replace('<button\n              type="button"\n              className={`${styles.mCardLink} ${styles.mCardAccordionBtn}', 
'<div\n              role="button"\n              tabIndex={0}\n              className={`${styles.mCardLink} ${styles.mCardAccordionBtn}')

text = text.replace('</button>\n            {mobileProductsOpen', '</div>\n            {mobileProductsOpen')

with open('apps/web/src/features/navigation/MobileNavDrawer.jsx', 'w') as f:
    f.write(text)

with open('apps/web/src/features/navigation/Navbar.module.css', 'r') as f:
    css = f.read()

old_css = """.mCardAccordionBtn {
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid var(--border-subtle);
  cursor: pointer;
  text-align: left;
  padding: 0.85rem 0;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}"""

new_css = """.mCardAccordionBtn {
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid var(--border-subtle);
  cursor: pointer;
  text-align: left;
  /* Font styling inherits perfectly from .mCardLink */
}"""

css = css.replace(old_css, new_css)

with open('apps/web/src/features/navigation/Navbar.module.css', 'w') as f:
    f.write(css)

