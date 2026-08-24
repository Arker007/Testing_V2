with open('apps/web/src/features/navigation/Navbar.module.css', 'r') as f:
    text = f.read()

text = text.replace("border: none;\n  border-bottom: 1px solid var(--border-subtle);", "border: none;")

with open('apps/web/src/features/navigation/Navbar.module.css', 'w') as f:
    f.write(text)
