import re

with open('apps/web/src/pages/chunks/home_part1.css', 'r') as f:
    content = f.read()

content = re.sub(
    r'(\.featureIconRing\s*\{[\s\S]*?)background:\s*var\(--brand-glow-subtle\);([\s\S]*?\})',
    r'\1background: transparent;\2',
    content
)

with open('apps/web/src/pages/chunks/home_part1.css', 'w') as f:
    f.write(content)

print("Updated .featureIconRing background")
