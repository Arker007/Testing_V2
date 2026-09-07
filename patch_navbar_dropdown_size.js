const fs = require('fs');
const file = 'apps/web/src/features/navigation/styles/navbar.module.css';
let content = fs.readFileSync(file, 'utf8');

// The standard .link uses padding: 0.45rem 0.75rem;
// Let's make sure .dropdownBtn also uses the exact same padding and radius as .link
const dropdownBtnRegex = /\.dropdownBtn\s*\{[\s\S]*?\}/;
content = content.replace(dropdownBtnRegex, `.dropdownBtn {
  background: transparent;
  border: 1px solid transparent;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.45rem 0.75rem;
  border-radius: var(--radius-btn, 8px) !important;
  transition: all var(--motion-fast) var(--ease-standard);
}`);

fs.writeFileSync(file, content);
console.log("Updated navbar.module.css with dropdown size fix");
