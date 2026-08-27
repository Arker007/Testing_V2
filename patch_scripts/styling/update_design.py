import re

with open('design.md', 'r') as f:
    content = f.read()

# Update the radius section
radius_pattern = r"(--radius-sm: 4px;\n\s*--radius-md: 8px;\n\s*--radius-card: 12px;\n\s*--radius-pill: 9999px;)"
new_radius = "--radius-xs: 2px;\n  --radius-sm: 4px;\n  --radius-md: 8px;\n  --radius-lg: 8px;\n  --radius-card: 8px;\n  --radius-btn: 8px;\n  --radius-pill: 8px;\n  --radius-full: 8px;"
content = re.sub(radius_pattern, new_radius, content)

radius_table_pattern = r"(\| Small icon button \| `--radius-md`   \|.*?\| Filter chips      \| `--radius-pill` \|)"
new_radius_table = """| Small icon button | `--radius-sm`   |
| Inputs            | `--radius-md`   |
| Small controls    | `--radius-md`   |
| Product card      | `--radius-card` (8px) |
| Section card      | `--radius-card` (8px) |
| Image container   | `--radius-card` (8px) |
| Modal             | `--radius-card` (8px) |
| Primary button    | `--radius-btn` (8px) |
| Secondary button  | `--radius-btn` (8px) |
| Badge             | `--radius-badge` (8px) |
| Filter chips      | `--radius-pill` (8px) |"""
content = re.sub(radius_table_pattern, new_radius_table, content, flags=re.DOTALL)

# Update the dark mode blueprint
dark_mode_pattern = r"(html\[data-theme=\"dark\"\],\nhtml\.dark \{\n\s*--bg-page: #000000;\n\s*--surface: #0B0B0B;.*?--shadow-lg:\n\s*0 16px 48px rgba\(0, 0, 0, 0\.42\);\n\})"
new_dark_mode = """html[data-theme="dark"],
html.dark {
  --bg-page: #0f141a;
  --surface: #161c24;
  --surface-secondary: #1e2530;
  --surface-tertiary: #2a3441;
  --surface-elevated: #1e2530;

  --brand: #77D986;
  --brand-hover: #8ef79d;
  --brand-active: #5cb86b;
  --brand-soft: rgba(119, 217, 134, 0.15);
  --brand-text: #77D986;

  --text-primary: #FFFFFF;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  --text-disabled: #64748B;
  --text-inverse: #000000;

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-default: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.18);

  --shadow-sm:
    0 2px 8px rgba(0, 0, 0, 0.24);

  --shadow-md:
    0 8px 24px rgba(0, 0, 0, 0.32);

  --shadow-lg:
    0 16px 48px rgba(0, 0, 0, 0.42);
}"""
content = re.sub(dark_mode_pattern, new_dark_mode, content, flags=re.DOTALL)

# Update the text regarding existing radius system must remain unchanged
content = content.replace("The existing border-radius system remains unchanged and is the canonical radius system for the entire application.", "The border-radius system has been unified to 8px across the application for a more modern, cohesive, and structured technological aesthetic.")
content = content.replace("/* Existing Radius System — MUST remain unchanged */", "/* Unified Radius System (8px standard) */")
content = content.replace("**The existing radius system must be retained.**", "**The radius system has been unified around 8px for consistency.**")
content = content.replace("No global radius redesign is permitted.", "The global radius has been updated to a consistent 8px to enforce a modern structural feel.")

with open('design.md', 'w') as f:
    f.write(content)

print("Updated design.md")
