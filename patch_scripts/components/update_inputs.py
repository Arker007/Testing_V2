import re

with open('design.md', 'r') as f:
    content = f.read()

input_geom_pattern = r"(### Default\n\n```css\nbackground: var\(--surface\);\nborder: 1px solid var\(--border-default\);\n```)"
new_input = r"\1\n\n**Note:** In dark mode, inputs must force light or explicitly themed dark backgrounds to ensure high contrast and readability against dark surfaces. Raw input fields should inherit the elevated dark surface `var(--surface-secondary, #1e2530)` with `var(--border-default)` borders, rather than relying on browser defaults."

content = re.sub(input_geom_pattern, new_input, content)

with open('design.md', 'w') as f:
    f.write(content)

print("Updated inputs")
