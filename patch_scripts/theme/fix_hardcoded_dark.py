import re
import os

color_map = {
    re.compile(r'#151c24', re.IGNORECASE): '#011526',
    re.compile(r'#1b232e', re.IGNORECASE): '#0A2C50',
    re.compile(r'#222b37', re.IGNORECASE): '#062342',
    re.compile(r'#1e2a39', re.IGNORECASE): '#011A38',
}

def replace_in_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            
        new_content = content
        for pattern, replacement in color_map.items():
            new_content = pattern.sub(replacement, new_content)
            
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            return True
    except Exception as e:
        pass
    return False

for root, dirs, files in os.walk('apps/web/src'):
    for file in files:
        if file.endswith(('.jsx', '.tsx', '.css')):
            filepath = os.path.join(root, file)
            if replace_in_file(filepath):
                print(f"Updated {filepath}")
