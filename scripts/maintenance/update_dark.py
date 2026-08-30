with open('apps/web/src/shared/styles/core/dark-theme.css', 'r') as f:
    content = f.read()

prefix = content.split(':root[data-theme="dark"]')[0]
suffix = "/* ─── Global Theme Switch Transitions ──────────────────────────────────── */" + content.split('/* ─── Global Theme Switch Transitions ──────────────────────────────────── */')[1]

new_vars = """
:root[data-theme="dark"],
.dark,
[data-theme="dark"],
html.dark,
html[data-theme="dark"] {
  color-scheme: dark;

  /* === NEW DARK THEME TOKENS === */
  /* Base Surfaces & Backgrounds */
  --bg-base: #0f141a;
  --bg-surface: #161c24;
  --bg-surface-elevated: #1e2530;
  --bg-hero: linear-gradient(135deg, #0f141a 0%, #162232 100%);
  --bg-grid-overlay: rgba(255, 255, 255, 0.04);
  --bg-nav: rgba(22, 28, 36, 0.90);
  --bg-canvas: var(--bg-base);

  /* Brand & Accent Colors */
  --primary: #6BBF54;
  --primary-hover: #5FBF50;
  --primary-muted: rgba(107, 191, 84, 0.15);
  --primary-text: #6BBF54;

  /* Typography Colors */
  --text-primary: #f4f6f8;
  --text-secondary: #919eab;
  --text-muted: #637381;
  --text-inverse: #0f141a;
  --text-disabled: #64748B;

  /* Borders & Dividers */
  --border-subtle: #212b36;
  --border-default: #333f48;
  --border-medium: #333f48;
  --border-strong: #45525d;
  --border-accent: rgba(107, 191, 84, 0.3);

  /* Shadows */
  --shadow-none: none;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.24);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.32);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.42);
  --shadow-xl: 0 20px 56px rgba(0, 0, 0, 0.52);
  --shadow-card: var(--shadow-sm);

  /* 🟢 Status Feedback */
  --color-success: var(--primary);
  --color-warning: #FBBF24;
  --color-danger: #F87171;
  --color-error: #F87171;
  --color-info: #60A5FA;

  --success-bg: rgba(107, 191, 84, 0.15);
  --success-border: rgba(107, 191, 84, 0.35);
  --success-text: var(--primary);

  --warning-bg: rgba(251, 191, 36, 0.12);
  --warning-border: rgba(251, 191, 36, 0.30);
  --warning-text: #FBBF24;

  --danger-bg: rgba(248, 113, 113, 0.12);
  --danger-border: rgba(248, 113, 113, 0.30);
  --danger-text: #F87171;

  --info-bg: rgba(96, 165, 250, 0.12);
  --info-border: rgba(96, 165, 250, 0.30);
  --info-text: #60A5FA;

  /* Overlays & Special */
  --hero-gradient: linear-gradient(135deg, var(--bg-base) 0%, var(--bg-surface) 100%);
  --bg-glass: rgba(22, 28, 36, 0.90);
  --bg-glass-card: rgba(30, 37, 48, 0.95);
  --bg-dark-overlay: rgba(15, 20, 26, 0.70);
  --bg-modal-backdrop: rgba(15, 20, 26, 0.65);
  --bg-shimmer: rgba(255, 255, 255, 0.08);

  /* === COMPATIBILITY BRIDGES === */
  --brand: var(--primary);
  --brand-primary: var(--primary);
  --brand-btn-text: var(--text-inverse);
  --brand-dark: var(--primary);
  --brand-hover: var(--primary-hover);
  --brand-active: var(--primary);
  --brand-soft: var(--primary-muted);
  --brand-light: var(--primary-muted);
  --brand-text: var(--primary-text);
  --brand-border: var(--border-accent);
  --brand-glow: rgba(107, 191, 84, 0.25);
  --brand-glow-subtle: rgba(107, 191, 84, 0.10);
  
  --accent: var(--primary);
  --accent-dark: var(--primary);

  --navy: var(--bg-surface-elevated);
  --navy-dark: var(--bg-surface);
  --navy-darker: var(--bg-base);
  --navy-hover: var(--bg-surface-elevated);
  --navy-active: var(--bg-surface-elevated);
  --navy-soft: var(--bg-surface-elevated);
  --navy-light: var(--bg-surface-elevated);
  --navy-surface: var(--bg-surface);
  --navy-card: var(--bg-surface-elevated);

  --bg-page: var(--bg-base);
  --bg-section: var(--bg-surface);
  --bg-card: var(--bg-surface-elevated);
  --bg-card-hover: var(--bg-surface-elevated);
  --bg-elevated: var(--bg-surface-elevated);
  
  --surface-page: var(--bg-base);
  --surface-secondary: var(--bg-surface-secondary);
  --surface-tertiary: var(--bg-surface-tertiary);
  --surface-elevated: var(--bg-surface-elevated);
  --surface-card: var(--bg-surface-elevated);
  --surface-nav: var(--bg-nav);
  --surface: var(--bg-surface);

  --text-main: var(--text-primary);
  --heading: var(--text-primary);
  --body-text: var(--text-secondary);
  --light-text: var(--text-muted);
  --white-text: var(--text-primary);
  --color-text-main: var(--text-primary);

  --border: var(--border-default);
  --border-card: var(--border-subtle);

  --badge-bg: var(--brand-soft);
  --badge-border: var(--border-brand);
  --badge-text: var(--brand-text);

  --icon-primary: var(--text-primary);
  --icon-accent: var(--primary);
  --icon-inactive: var(--text-disabled);
}

"""

with open('apps/web/src/shared/styles/core/dark-theme.css', 'w') as f:
    f.write(prefix + new_vars + suffix)
print("Updated dark-theme.css with charcoal dark theme")
