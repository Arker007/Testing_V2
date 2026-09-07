const fs = require('fs');
const file = 'apps/web/src/features/navigation/styles/navbar.module.css';
let content = fs.readFileSync(file, 'utf8');

const linkActiveRegex = /\.linkActive\s*\{[\s\S]*?\}/;
const replacement = `.linkActive {
  color: var(--text-brand);
  font-weight: 700;
  background: var(--brand-soft);
  border: 1px solid var(--border-brand);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}`;

content = content.replace(linkActiveRegex, replacement);

const darkLinkActiveRegex = /(:root\[data-theme="dark"\]\s*\.linkActive,\s*:root\.dark\s*\.linkActive,\s*html\.dark\s*\.linkActive\s*)\{[\s\S]*?\}/;
const darkReplacement = `$1{
  color: var(--brand-400);
  background: rgba(107, 191, 84, 0.15);
  border-color: rgba(107, 191, 84, 0.35);
}`;

content = content.replace(darkLinkActiveRegex, darkReplacement);

fs.writeFileSync(file, content);
console.log("Updated navbar.module.css");
