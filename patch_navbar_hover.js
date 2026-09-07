const fs = require('fs');
const file = 'apps/web/src/features/navigation/styles/navbar.module.css';
let content = fs.readFileSync(file, 'utf8');

const linkActiveHoverRules = `
.linkActive:hover {
  color: var(--text-brand);
  background: rgba(107, 191, 84, 0.22);
  border-color: rgba(107, 191, 84, 0.65);
}

:root[data-theme="dark"] .linkActive:hover,
:root.dark .linkActive:hover,
html.dark .linkActive:hover {
  color: var(--brand-300);
  background: rgba(107, 191, 84, 0.22);
  border-color: rgba(107, 191, 84, 0.45);
}
`;

// Insert after html.dark .linkActive rule
const insertionPoint = '  border-color: rgba(107, 191, 84, 0.35);\n}';
content = content.replace(insertionPoint, insertionPoint + '\n' + linkActiveHoverRules);

fs.writeFileSync(file, content);
console.log("Updated navbar.module.css with active hover state");
