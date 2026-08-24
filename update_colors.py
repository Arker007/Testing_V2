import os
import re

color_map = {
    # Brand
    re.compile(r'#73cb81', re.IGNORECASE): '#5FBF50',
    re.compile(r'#70cc62', re.IGNORECASE): '#70CC62', # brand-hover
    re.compile(r'#4ead41', re.IGNORECASE): '#4EAD41', # brand-active
    re.compile(r'#428c3f', re.IGNORECASE): '#428C3F', # brand-dark

    # Navy
    re.compile(r'#041a32', re.IGNORECASE): '#011A38', # Old navy-ish
    re.compile(r'#0a192f', re.IGNORECASE): '#011A38', 
    re.compile(r'#0f172a', re.IGNORECASE): '#011526', 
    re.compile(r'#0d2238', re.IGNORECASE): '#062342', 
    re.compile(r'#1e293b', re.IGNORECASE): '#0A2C50', 

    # Text / Grays
    re.compile(r'#334155', re.IGNORECASE): '#385064',
    re.compile(r'#475569', re.IGNORECASE): '#385064',
    re.compile(r'#64748b', re.IGNORECASE): '#667785',
    re.compile(r'#94a3b8', re.IGNORECASE): '#9EAFBE',

    # Borders
    re.compile(r'#e2e8f0', re.IGNORECASE): '#D8DEDA',
    re.compile(r'#cbd5e1', re.IGNORECASE): '#D8DEDA',

    # Light BGs
    re.compile(r'#f1f5f9', re.IGNORECASE): '#E7EBE8',
    re.compile(r'#f8fafc', re.IGNORECASE): '#F2F2F2',
    re.compile(r'#f8f9fa', re.IGNORECASE): '#F2F2F2',
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
        print(f"Error processing {filepath}: {e}")
    return False

updated_files = 0
for root, dirs, files in os.walk('apps/web/src'):
    for file in files:
        if file.endswith(('.css', '.jsx', '.tsx', '.js', '.ts')):
            filepath = os.path.join(root, file)
            if replace_in_file(filepath):
                updated_files += 1

print(f"Updated {updated_files} files.")
