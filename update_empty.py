import re

with open('design.md', 'r') as f:
    content = f.read()

empty_pattern = r"(Empty-state components must not occupy excessive vertical space\.)"
new_empty = r"\1\n\n**Visual Styling:**\nEmpty states should use `var(--surface)` as the background with a dashed `var(--border-default)` border to subtly separate them from the main page background without feeling heavy. In dark mode, they must adapt to elevated surfaces rather than remaining high-contrast white."

content = re.sub(empty_pattern, new_empty, content)

with open('design.md', 'w') as f:
    f.write(content)

print("Updated empty states")
