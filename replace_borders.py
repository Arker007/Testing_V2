import os
import re

replacements = {
    r'#D9E0DC': '#D8DEDA',
    r'#d9e0dc': '#D8DEDA',
    r'rgba\(\s*115\s*,\s*203\s*,\s*129\s*,\s*0\.35\s*\)': 'rgba(95, 191, 80, 0.55)'
}

compiled_replacements = {re.compile(k, re.IGNORECASE): v for k, v in replacements.items()}

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for pattern, replacement in compiled_replacements.items():
        new_content = pattern.sub(replacement, new_content)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('apps/web/src'):
    for file in files:
        if file.endswith(('.css', '.jsx', '.tsx', '.js', '.ts')):
            replace_in_file(os.path.join(root, file))

