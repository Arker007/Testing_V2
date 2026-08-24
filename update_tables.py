import re

with open('design.md', 'r') as f:
    content = f.read()

brand_table_pattern = r"(\| Brand Green        \| `#80CF23` \|) `#88E31B`              (\| `--brand`        \| Primary accent                     \|.*?\| Brand Text         \| `#2E6005` \|) `#88E31B`              (\| `--brand-text`   \| Green-on-light text                \|)"
new_brand_table = r"\1 `#77D986`              \2 `#8ef79d`              | `--brand-hover`  | Hover                              |\n| Brand Green Active | `#68AD17` | `#5cb86b`              | `--brand-active` | Active                             |\n| Brand Green Soft   | `#F2FBE8` | `rgba(119,217,134,.15)`| `--brand-soft`   | Background / badge                 |\n| Brand Text         | `#2E6005` | `#77D986`              \3"

# Have to do a manual replace for the whole table block to be safe.
old_table = """| Brand Green        | `#80CF23` | `#88E31B`              | `--brand`        | Primary accent                     |
| Brand Green Hover  | `#73BE1D` | `#9BE835`              | `--brand-hover`  | Hover                              |
| Brand Green Active | `#68AD17` | `#78BE16`              | `--brand-active` | Active                             |
| Brand Green Soft   | `#F2FBE8` | `rgba(136,227,27,.12)` | `--brand-soft`   | Background / badge                 |
| Brand Text         | `#2E6005` | `#88E31B`              | `--brand-text`   | Green-on-light text                |"""

new_table = """| Brand Green        | `#80CF23` | `#77D986`              | `--brand`        | Primary accent                     |
| Brand Green Hover  | `#73BE1D` | `#8ef79d`              | `--brand-hover`  | Hover                              |
| Brand Green Active | `#68AD17` | `#5cb86b`              | `--brand-active` | Active                             |
| Brand Green Soft   | `#F2FBE8` | `rgba(119,217,134,.15)` | `--brand-soft`   | Background / badge                 |
| Brand Text         | `#2E6005` | `#77D986`              | `--brand-text`   | Green-on-light text                |"""

content = content.replace(old_table, new_table)

old_surface = """| Page              | `#FFFFFF` | `#000000` | Main page           |
| Surface           | `#FFFFFF` | `#0B0B0B` | Main content        |
| Surface Secondary | `#F7F8F6` | `#111111` | Section backgrounds |
| Surface Tertiary  | `#EEF1EC` | `#171717` | Secondary blocks    |
| Elevated          | `#FFFFFF` | `#141414` | Elevated cards      |"""

new_surface = """| Page              | `#FFFFFF` | `#0f141a` | Main page           |
| Surface           | `#FFFFFF` | `#161c24` | Main content        |
| Surface Secondary | `#F7F8F6` | `#1e2530` | Section backgrounds |
| Surface Tertiary  | `#EEF1EC` | `#2a3441` | Secondary blocks    |
| Elevated          | `#FFFFFF` | `#1e2530` | Elevated cards      |"""

content = content.replace(old_surface, new_surface)

with open('design.md', 'w') as f:
    f.write(content)

print("Updated tables")
