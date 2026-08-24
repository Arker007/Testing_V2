import re

with open('apps/web/src/pages/chunks/home_part1.css', 'r') as f:
    content = f.read()

# The script modified the first occurrence. Let's modify the media query occurrence manually to ensure it's fine.

content = re.sub(
    r'(\.badgeIconWrapper\s*\{[\s\S]*?padding:\s*)0\.15rem\s+0\.4rem\s+0\.15rem\s+0\.2rem(;\s*\})', 
    r'\1 0; padding-right: 0.5rem\2', 
    content
)

with open('apps/web/src/pages/chunks/home_part1.css', 'w') as f:
    f.write(content)
print("Updated badge styles media query")
