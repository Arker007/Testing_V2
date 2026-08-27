import os

filepath = 'apps/web/src/pages/chunks/home_part14.css'
with open(filepath, 'a') as f:
    f.write('''
@media (max-width: 576px) {
  .catCardWide {
    padding: 1.5rem;
    gap: 1.25rem;
  }
  .catCardWideTitle {
    font-size: 1.25rem;
  }
  .catCardWideDesc {
    font-size: 0.8rem;
  }
}
''')

filepath_part1 = 'apps/web/src/pages/chunks/home_part1.css'
with open(filepath_part1, 'a') as f:
    f.write('''
@media (max-width: 576px) {
  .featurePanel {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  .featureColumn:nth-child(n) {
    border-right: none;
    border-bottom: 1px solid var(--border-dark);
    padding-bottom: 1rem;
  }
  .featureColumn:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .heroTitle {
    font-size: 1.85rem;
  }
}
''')

print("Updated mobile layouts")
