import re

with open('apps/web/src/shared/styles/core/dark-theme.css', 'r') as f:
    content = f.read()

# Pattern for the main input block
pattern1 = r':root\[data-theme="dark"\] \.customInput,[\s\S]*?\{[\s\S]*?background: var\(--surface-secondary\) !important;[\s\S]*?\}'
content = re.sub(pattern1, '', content)

# Pattern for select option
pattern2 = r':root\[data-theme="dark"\] select option,[\s\S]*?\{[\s\S]*?\}'
content = re.sub(pattern2, '', content)

# Pattern for placeholder
pattern3 = r':root\[data-theme="dark"\] \.customInput::placeholder,[\s\S]*?\{[\s\S]*?\}'
content = re.sub(pattern3, '', content)

# Pattern for focus
pattern4 = r':root\[data-theme="dark"\] \.customInput:focus,[\s\S]*?\{[\s\S]*?\}'
content = re.sub(pattern4, '', content)

with open('apps/web/src/shared/styles/core/dark-theme.css', 'w') as f:
    f.write(content)
