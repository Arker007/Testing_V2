import re

with open('apps/web/src/pages/chunks/home_part1.css', 'r') as f:
    content = f.read()

content = re.sub(
    r'(\.badgeIcon\s*\{\s*width:\s*)16px(;\s*height:\s*)16px(;\s*\})',
    r'\1 20px\2 20px\3',
    content
)

with open('apps/web/src/pages/chunks/home_part1.css', 'w') as f:
    f.write(content)
print("Updated badgeIcon mobile size")
