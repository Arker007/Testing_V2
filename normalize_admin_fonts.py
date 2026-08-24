import os
import re

files_to_check = [
    'apps/web/src/features/admin/components/AdminTable.module.css',
    'apps/web/src/features/admin/components/AdminTableExtra.css'
]

replacements = {
    '0.65rem': '0.6875rem', # 11px
    '0.72rem': '0.75rem',   # 12px
    '0.725rem': '0.75rem',  # 12px
    '0.775rem': '0.75rem',  # 12px
    '0.85rem': '0.875rem',  # 14px
    '0.95rem': '0.9375rem', # 15px
    '1.05rem': '1rem',      # 16px
    '1.15rem': '1.25rem',   # 20px
    '1.35rem': '1.375rem',  # 22px
    '2.2rem': '2.25rem'     # 36px
}

for file_path in files_to_check:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()
        
        for old_val, new_val in replacements.items():
            content = content.replace(f'font-size: {old_val};', f'font-size: {new_val};')
            
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Normalized {file_path}")

