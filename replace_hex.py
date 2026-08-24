import os
import re

hex_replacements = {
    '#153553': '#011A38',
    '#102D49': '#011526',
    '#0D243B': '#011526',
    '#73CB81': '#5FBF50',
    '#5EC66E': '#70CC62',
    '#4AB65B': '#4EAD41',
    '#183B5A': '#062342',
    '#68cb77': '#70CC62'
}

hex_replacements_regex = {re.compile(k, re.IGNORECASE): v for k, v in hex_replacements.items()}

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for pattern, replacement in hex_replacements_regex.items():
        new_content = pattern.sub(replacement, new_content)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('apps/web/src'):
    for file in files:
        if file.endswith(('.css', '.jsx', '.tsx', '.js', '.ts')):
            replace_in_file(os.path.join(root, file))

