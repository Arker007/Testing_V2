import re
filepath = 'apps/web/src/shared/styles/core/dark-theme.css'

with open(filepath, 'r') as f:
    content = f.read()

content = re.sub(r'--text-primary: #F4F7F5;', '--text-primary: #FFFFFF;', content)
content = re.sub(r'--text-important: #D8DEE3;', '--text-important: #FFFFFF;', content)
content = re.sub(r'--text-secondary: #C2CBD2;', '--text-secondary: #D7E0E8;', content)
content = re.sub(r'--text-muted: #8996A3;', '--text-muted: #9EAFBE;', content)

# There are some hardcoded colors in comments and properties, let's also fix those if they appear as defaults
content = re.sub(r'var\(--text-primary, #F4F7F5\)', 'var(--text-primary, #FFFFFF)', content)
content = re.sub(r'var\(--text-important, #D8DEE3\)', 'var(--text-important, #FFFFFF)', content)
content = re.sub(r'var\(--text-secondary, #C2CBD2\)', 'var(--text-secondary, #D7E0E8)', content)
content = re.sub(r'var\(--text-muted, #8996A3\)', 'var(--text-muted, #9EAFBE)', content)
content = re.sub(r'var\(--text-disabled, #64717D\)', 'var(--text-disabled, #667785)', content)
content = re.sub(r'--primary-hover: #8ef79d;', '--primary-hover: #70CC62;', content)

with open(filepath, 'w') as f:
    f.write(content)

print("Text colors fixed in dark-theme.css")
