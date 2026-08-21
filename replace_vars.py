import re

with open('apps/web/src/shared/styles/core/dark-theme.css', 'r') as f:
    content = f.read()

new_vars = """
  color-scheme: dark;

  /* === NEW DARK THEME TOKENS === */
  /* Base Surfaces & Backgrounds */
  --bg-base: #0f141a;
  --bg-surface: #161c24;
  --bg-surface-elevated: #1e2530;
  --bg-hero: linear-gradient(135deg, #0f141a 0%, #162232 100%);
  --bg-grid-overlay: rgba(255, 255, 255, 0.04);

  /* Brand & Accent Colors */
  --primary: #70e000;
  --primary-hover: #80ed99;
  --primary-muted: rgba(112, 224, 0, 0.15);
  --primary-text: #70e000;

  /* Typography Colors */
  --text-primary: #f4f6f8;
  --text-secondary: #919eab;
  --text-muted: #637381;
  --text-inverse: #0f141a;

  /* Borders & Dividers */
  --border-subtle: #212b36;
  --border-medium: #333f48;
  --border-accent: rgba(112, 224, 0, 0.3);

  /* === MAPPED LEGACY TOKENS === */
  --lvl1-bg: var(--bg-base);
  --lvl2-bg: var(--bg-surface);
  --lvl3-bg: var(--bg-surface-elevated);
  --lvl3-border: var(--border-subtle);
  --lvl3-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  --lvl4-navy: #103B7A;
  --lvl4-brand: var(--primary);
  --lvl4-brand-text: var(--primary-text);
  --lvl4-text-primary: var(--text-primary);
  --lvl4-text-secondary: var(--text-secondary);

  --dark-page: var(--bg-base);
  --dark-section: var(--bg-surface);
  --dark-card: var(--bg-surface-elevated);
  --dark-elevated: var(--bg-surface-elevated);
  --dark-hover: var(--bg-surface-elevated);

  --bg-page: var(--bg-base);
  --hero-gradient: var(--bg-hero);
  --bg-section: var(--bg-surface);
  --bg-surface: var(--bg-surface);
  --bg-surface-elevated: var(--bg-surface-elevated);
  --bg-card: var(--bg-surface-elevated);
  --bg-card-hover: var(--bg-surface-elevated);
  --bg-card-alt: var(--bg-surface);
  --bg-interactive: var(--bg-surface-elevated);
  --bg-interactive-hover: var(--bg-surface-elevated);
  --bg-interactive-active: var(--bg-surface-elevated);
  --bg-muted: var(--bg-surface-elevated);
  --bg-light: var(--bg-surface);

  --surface: var(--bg-surface);
  --background: var(--bg-base);
  --surface-page: var(--bg-base);
  --surface-secondary: var(--bg-surface);
  --surface-tertiary: var(--bg-surface-elevated);
  --surface-elevated: var(--bg-surface-elevated);
  --surface-card: var(--bg-surface-elevated);
  --surface-subtle: var(--bg-surface);
  --surface-hover: var(--bg-surface-elevated);
  --surface-selected: var(--primary-muted);
  --surface-nav: rgba(22, 28, 36, 0.90);

  /* Navy mapped to bg surfaces for coherence */
  --navy: var(--bg-surface-elevated);
  --navy-dark: var(--bg-surface);
  --navy-darker: var(--bg-base);
  --navy-hover: var(--bg-surface-elevated);
  --navy-active: var(--bg-surface-elevated);
  --navy-soft: var(--bg-surface-elevated);
  --navy-surface: var(--bg-surface);
  --navy-card: var(--bg-surface-elevated);
  --navy-glow: rgba(0, 0, 0, 0.30);
  --navy-subtle: rgba(255, 255, 255, 0.04);
  --navy-badge-bg: var(--bg-surface-elevated);
  --dark: var(--bg-base);
  --dark-navy: var(--bg-surface-elevated);
  --dark2: var(--bg-surface);
  --dark3: var(--bg-surface-elevated);

  /* Brand mapped to primary */
  --brand: var(--primary);
  --brand-rgb: 112, 224, 0;
  --brand-dark: var(--primary);
  --brand-hover: var(--primary-hover);
  --brand-active: var(--primary);
  --brand-soft: var(--primary-muted);
  --brand-light: var(--primary-muted);
  --brand-light-2: var(--primary-muted);
  --brand-text: var(--primary-text);
  --brand-border: var(--border-accent);
  --brand-glow: var(--primary-muted);
  --brand-glow-subtle: var(--primary-muted);
  --brand-badge-bg: var(--primary-muted);
  --accent: var(--primary);
  --accent-dark: var(--primary);

  /* Typography mapped */
  --heading: var(--text-primary);
  --text-disabled: #64748B;
  --text-inverse-secondary: rgba(15, 20, 26, 0.85);
  --text-inverse-muted: rgba(15, 20, 26, 0.65);
  --body-text: var(--text-secondary);
  --light-text: var(--text-muted);
  --white-text: var(--text-primary);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);

  /* Borders mapped */
  --border-default: var(--border-medium);
  --border-strong: var(--border-medium);
  --border-card: var(--border-subtle);
  --border: var(--border-medium);
  --border-interactive: var(--primary);
  --border-dark: var(--border-subtle);
  --border-dark-strong: var(--border-medium);
  --divider: var(--border-subtle);

  /* Shadows */
  --shadow-none: none;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.24);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.32);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.42);
  --shadow-xl: 0 20px 56px rgba(0, 0, 0, 0.52);
  --shadow-depth-1: var(--shadow-sm);
  --shadow-depth-card: var(--shadow-sm);
  --shadow-depth-hover: var(--shadow-md);
  --shadow-card: var(--shadow-sm);

  /* Status Colors */
  --color-success: var(--primary);
  --success: var(--primary);
  --success-bg: var(--primary-muted);
  --success-border: var(--border-accent);
  --success-text: var(--primary);
  --color-warning: #FBBF24;
  --warning: #FBBF24;
  --warning-bg: rgba(251, 191, 36, 0.12);
  --warning-border: rgba(251, 191, 36, 0.30);
  --warning-text: #FBBF24;
  --color-danger: #F87171;
  --color-error: #F87171;
  --danger: #F87171;
  --danger-bg: rgba(248, 113, 113, 0.12);
  --danger-border: rgba(248, 113, 113, 0.30);
  --danger-text: #F87171;
  --color-info: #60A5FA;
  --info: #60A5FA;
  --info-bg: rgba(96, 165, 250, 0.12);
  --info-border: rgba(96, 165, 250, 0.30);
  --info-text: #60A5FA;

  --bg-glass: rgba(22, 28, 36, 0.90);
  --bg-glass-card: rgba(30, 37, 48, 0.95);
  --bg-glass-dark: rgba(15, 20, 26, 0.90);
  --bg-dark-overlay: rgba(15, 20, 26, 0.75);
  --bg-modal-backdrop: rgba(15, 20, 26, 0.70);
"""

pattern = r":root\[data-theme=\"dark\"\],html\.dark,html\[data-theme=\"dark\"\] \{(.*?)\}(?=\n/\* ─── Universal)"
result = re.sub(pattern, f":root[data-theme=\"dark\"],html.dark,html[data-theme=\"dark\"] {{{new_vars}}}", content, flags=re.DOTALL)

with open('apps/web/src/shared/styles/core/dark-theme.css', 'w') as f:
    f.write(result)
