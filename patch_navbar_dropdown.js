const fs = require('fs');
const file = 'apps/web/src/features/navigation/styles/navbar.module.css';
let content = fs.readFileSync(file, 'utf8');

// Replace dropdownOpen .dropdownBtn
const dropdownOpenRegex = /\.dropdownOpen\s*\.dropdownBtn\s*\{[\s\S]*?\}/;
content = content.replace(dropdownOpenRegex, `.dropdownOpen .dropdownBtn {
  color: var(--text-brand);
  font-weight: 700;
  background: var(--brand-soft);
  border: 1px solid var(--border-brand);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}`);

const darkDropdownOpenRegex = /(:root\[data-theme="dark"\]\s*\.dropdownOpen\s*\.dropdownBtn,\s*:root\.dark\s*\.dropdownOpen\s*\.dropdownBtn,\s*html\.dark\s*\.dropdownOpen\s*\.dropdownBtn\s*)\{[\s\S]*?\}/;
content = content.replace(darkDropdownOpenRegex, `$1{
  color: var(--brand-400);
  background: rgba(107, 191, 84, 0.15);
  border-color: rgba(107, 191, 84, 0.35);
}`);

// Replace dropdownBtnActive
const dropdownBtnActiveRegex = /\.dropdownBtnActive\s*\{[\s\S]*?\}/;
content = content.replace(dropdownBtnActiveRegex, `.dropdownBtnActive {
  color: var(--text-brand);
  font-weight: 700;
  background: var(--brand-soft);
  border: 1px solid var(--border-brand);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}`);

const darkDropdownBtnActiveRegex = /(:root\[data-theme="dark"\]\s*\.dropdownBtnActive,\s*:root\.dark\s*\.dropdownBtnActive,\s*html\.dark\s*\.dropdownBtnActive\s*)\{[\s\S]*?\}/;
content = content.replace(darkDropdownBtnActiveRegex, `$1{
  color: var(--brand-400);
  background: rgba(107, 191, 84, 0.15);
  border-color: rgba(107, 191, 84, 0.35);
}`);

// Add hover states for active/open dropdown
const dropdownHoverRules = `
.dropdownBtnActive:hover,
.dropdownOpen .dropdownBtn:hover {
  color: var(--text-brand);
  background: rgba(107, 191, 84, 0.22);
  border-color: rgba(107, 191, 84, 0.65);
}

:root[data-theme="dark"] .dropdownBtnActive:hover,
:root.dark .dropdownBtnActive:hover,
html.dark .dropdownBtnActive:hover,
:root[data-theme="dark"] .dropdownOpen .dropdownBtn:hover,
:root.dark .dropdownOpen .dropdownBtn:hover,
html.dark .dropdownOpen .dropdownBtn:hover {
  color: var(--brand-300);
  background: rgba(107, 191, 84, 0.22);
  border-color: rgba(107, 191, 84, 0.45);
}
`;

const insertionPoint = '  border-color: rgba(107, 191, 84, 0.35);\n}';
// Find the last instance of insertionPoint (which will be in dropdownBtnActive dark rule)
const lastInsertionIndex = content.lastIndexOf(insertionPoint);
if (lastInsertionIndex !== -1) {
    content = content.slice(0, lastInsertionIndex + insertionPoint.length) + '\n' + dropdownHoverRules + content.slice(lastInsertionIndex + insertionPoint.length);
}

fs.writeFileSync(file, content);
console.log("Updated navbar.module.css with dropdown active/open states");
