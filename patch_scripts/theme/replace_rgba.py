import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    # Replace the old RGB with new RGB
    new_content = re.sub(r'115,\s*203,\s*129', '95, 191, 80', new_content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('apps/web/src'):
    for file in files:
        if file.endswith(('.css', '.jsx', '.tsx', '.js', '.ts')):
            replace_in_file(os.path.join(root, file))
