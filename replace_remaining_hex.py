import os
import re

replacements = {
    r'#fff\b': 'var(--white)',
    r'#fbbf24\b': 'var(--color-warning)',
    r'#f0fdf4\b': 'var(--success-bg)',
    r'#166534\b': 'var(--success-text)',
    r'#e0f2fe\b': 'var(--info-bg)',
    r'#0369a1\b': 'var(--info-text)',
    r'#38bdf8\b': 'var(--color-info)',
    r'#0f221c\b': 'var(--bg-surface-elevated)',
    r'#F4F7F2\b': 'var(--bg-surface-secondary)',
    r'#F87171\b': 'var(--color-error)',
    r'#0F1720\b': 'var(--text-inverse)',
    r'#0B192C\b': 'var(--text-inverse)',
    r'#43a047\b': 'var(--brand-600)',
    r'#F0FDF4\b': 'var(--success-bg)',
    r'#0A2C50\b': 'var(--text-inverse)',
    r'#4EA840\b': 'var(--brand-600)',
    r'#5FBF50\b': 'var(--brand-500)',
    r'#3b9b4a\b': 'var(--brand-600)',
    r'#2e8b42\b': 'var(--brand-700)',
    r'#ECFDF5\b': 'var(--success-bg)',
    r'#065F46\b': 'var(--success-text)',
    r'#D1FAE5\b': 'var(--success-bg)',
    r'#6EE7B7\b': 'var(--success-border)',
    r'#DC2626\b': 'var(--color-error)',
    r'#dc2626\b': 'var(--color-error)',
    r'#54b862\b': 'var(--brand-500)',
    r'#8E9AA5\b': 'var(--text-muted)',
    r'#fee2e2\b': 'var(--danger-bg)',
    r'#5B6873\b': 'var(--text-secondary)',
    r'#113c7a\b': 'var(--bg-surface-elevated)',
    r'#f7faf0\b': 'var(--brand-50)',
    r'#f0f9ff\b': 'var(--info-bg)',
    r'#0284c7\b': 'var(--info-text)',
    r'#4B5563\b': 'var(--text-secondary)',
    r'#f9fafb\b': 'var(--bg-surface-secondary)',
    r'#6B7280\b': 'var(--text-muted)',
    r'#EAF4E2\b': 'var(--brand-100)',
    r'#FAFAFA\b': 'var(--bg-surface)',
    r'#20ba5a\b': 'var(--color-success)',
    r'#d1d5db\b': 'var(--border-default)',
    r'#475569\b': 'var(--text-secondary)',
}

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for pattern, replacement in replacements.items():
        new_content = re.sub(pattern, replacement, new_content, flags=re.IGNORECASE)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('apps/web/src'):
    for file in files:
        if file.endswith('.css'):
            process_file(os.path.join(root, file))
