import re

with open('apps/web/src/pages/chunks/home_part1.css', 'r') as f:
    content = f.read()

# Replace .badge background
content = re.sub(
    r'(\.badge\s*\{[^}]*?background:\s*)var\(--bg-glass-dark\)(;)', 
    r'\1#041A32\2', 
    content
)

# Replace .badge border to none maybe? Or keep it? The user didn't mention border.
# Let's keep the border or change to #041A32? "apply this bg colour on the silected componnet"
content = re.sub(
    r'(\.badge\s*\{[^}]*?border:\s*)1\.5px solid var\(--brand-glow\)(;)', 
    r'\1 1px solid #041A32\2', 
    content
)

# For .badgeIconWrapper, make its background green and color #041A32
wrapper_old = """.badgeIconWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--brand);
  padding: 0.25rem 0.6rem 0.25rem 0.35rem;
  border-right: 1.5px solid var(--brand-glow);
}"""

wrapper_new = """.badgeIconWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--brand);
  color: #041A32;
  padding: 0.25rem;
  margin-right: 0.35rem;
  border-radius: 4px;
}"""

if wrapper_old in content:
    content = content.replace(wrapper_old, wrapper_new)
else:
    print("Could not find wrapper block exactly. Using regex.")

with open('apps/web/src/pages/chunks/home_part1.css', 'w') as f:
    f.write(content)
print("Updated badge styles.")
