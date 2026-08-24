import re

filepath = 'apps/web/src/shared/styles/core/dark-theme.css'

with open(filepath, 'r') as f:
    content = f.read()

# Base Surfaces & Backgrounds
content = re.sub(r'--bg-base: #151c24;', '--bg-base: #011526;', content)
content = re.sub(r'--bg-surface: #1b232e;', '--bg-surface: #011A38;', content)
content = re.sub(r'--bg-surface-elevated: #222b37;', '--bg-surface-elevated: #062342;', content)
content = re.sub(r'--bg-hero: linear-gradient\(135deg, #151c24 0%, #1e2a39 100%\);', '--bg-hero: linear-gradient(135deg, #011526 0%, #011A38 100%);', content)

# Borders & Dividers
content = re.sub(r'--border-subtle: #2a3442;', '--border-subtle: rgba(255, 255, 255, 0.12);', content)
content = re.sub(r'--border-medium: #3c4858;', '--border-medium: rgba(255, 255, 255, 0.20);', content)
content = re.sub(r'--border-accent: rgba\(95, 191, 80, 0\.3\);', '--border-accent: rgba(95, 191, 80, 0.55);', content)

# Ensure text inverse colors are properly mapped
content = re.sub(r'--text-inverse-secondary: rgba\(15, 20, 26, 0\.85\);', '--text-inverse-secondary: #385064;', content)
content = re.sub(r'--text-inverse-muted: rgba\(15, 20, 26, 0\.65\);', '--text-inverse-muted: #667785;', content)

# Force inputs in dark mode
content = re.sub(
    r'html\.dark \.customInput,[\s\S]*?:root\[data-theme="dark"\] \.customTextarea \{[\s\S]*?\}',
    r'''html.dark .customInput,
html.dark .customSelect,
html.dark .customTextarea,
html.dark [class*="customInput"],
html.dark [class*="customSelect"],
html.dark [class*="customTextarea"],
html.dark input,
html.dark select,
html.dark textarea,
:root[data-theme="dark"] .customInput,
:root[data-theme="dark"] .customSelect,
:root[data-theme="dark"] .customTextarea {
  background-color: #062342 !important;
  color: #FFFFFF !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
}''',
    content
)

content = re.sub(
    r'html\.dark \.phonePrefixSelect,[\s\S]*?:root\[data-theme="dark"\] \.phonePrefixSelect \{[\s\S]*?\}',
    r'''html.dark .phonePrefixSelect,
:root[data-theme="dark"] .phonePrefixSelect {
  background-color: #0A2C50 !important;
  color: #FFFFFF !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
}''',
    content
)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated dark-theme.css manually")
