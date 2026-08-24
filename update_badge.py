import re

with open('apps/web/src/pages/chunks/home_part1.css', 'r') as f:
    content = f.read()

badge_pattern = r'(\.badge\s*\{[\s\S]*?\})'
wrapper_pattern = r'(\.badgeIconWrapper\s*\{[\s\S]*?\})'
icon_pattern = r'(\.badgeIcon\s*\{[\s\S]*?\})'
text_pattern = r'(\.badgeText\s*\{[\s\S]*?\})'

badge_new = """.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #041A32;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.5rem 1.25rem 0.5rem 0.75rem;
  border-radius: 8px;
  margin-top: 0.25rem;
  margin-bottom: 1.25rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px var(--shadow-md);
  transition: all 0.3s ease;
}"""

wrapper_new = """.badgeIconWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--brand);
  padding: 0;
  padding-right: 0.75rem;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0;
}"""

icon_new = """.badgeIcon {
  width: 1.5rem;
  height: 1.5rem;
}"""

text_new = """.badgeText {
  color: var(--white);
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}"""

content = re.sub(badge_pattern, badge_new, content, count=1)
content = re.sub(wrapper_pattern, wrapper_new, content, count=1)
content = re.sub(icon_pattern, icon_new, content, count=1)
content = re.sub(text_pattern, text_new, content, count=1)

with open('apps/web/src/pages/chunks/home_part1.css', 'w') as f:
    f.write(content)
print("Updated badge styles")
