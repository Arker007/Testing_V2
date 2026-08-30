import os
import re

replacements = {
    r'#FFFFFF\b': 'var(--white)',
    r'#ffffff\b': 'var(--white)',
    r'#000000\b': 'var(--black)',
    r'#F2F2F2\b': 'var(--neutral-100)',
    r'#E7EBE8\b': 'var(--neutral-200)',
    r'#D8DEDA\b': 'var(--neutral-300)',
    r'#9EAFBE\b': 'var(--neutral-400)',
    r'#667785\b': 'var(--neutral-500)',
    r'#4F5965\b': 'var(--neutral-600)',
    r'#385064\b': 'var(--neutral-700)',
    r'#042F56\b': 'var(--neutral-800)',
    r'#022340\b': 'var(--neutral-900)',
    r'#021826\b': 'var(--neutral-950)',
    r'#011526\b': 'var(--neutral-950)',
    r'#011A38\b': 'var(--neutral-950)', 
    r'#6BBF54\b': 'var(--brand-500)',
    r'#7acc63\b': 'var(--brand-400)',
    r'#5DA849\b': 'var(--brand-600)',
    r'#468235\b': 'var(--brand-700)',
    r'#1E6B2C\b': 'var(--brand-800)',
    r'#25d366\b': 'var(--color-whatsapp, #25D366)',
    r'#25D366\b': 'var(--color-whatsapp, #25D366)',
    r'#10B981\b': 'var(--color-success-dark)',
    r'#059669\b': 'var(--color-success-light)',
    r'#1eb855\b': 'var(--color-success-light)',
    r'#ef4444\b': 'var(--color-danger-dark)',
    r'#fef2f2\b': 'var(--danger-bg)',
    r'#ced4da\b': 'var(--border-default)',
    r'#5C6975\b': 'var(--neutral-500)',
    r'#9CA3AF\b': 'var(--neutral-400)',
    r'#1a1d26\b': 'var(--neutral-900)',
    r'#0b2211\b': 'var(--neutral-950)',
    r'#090D16\b': 'var(--neutral-950)',
    r'#98d12a\b': 'var(--brand-400)',
    r'#7db018\b': 'var(--brand-600)',
    r'#f1fbe3\b': 'var(--brand-50)',
    r'#0b2f63\b': 'var(--neutral-800)',
    r'#4FC36D\b': 'var(--brand-400)',
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
