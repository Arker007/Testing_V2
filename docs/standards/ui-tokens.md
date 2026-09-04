# UI Design Tokens & Icon Standards

## 🎨 Theme CSS Variables (`apps/web/src/shared/styles/core/tokens.css`)
- **Primary Accent**: `var(--color-primary, #1e3a8a)`
- **Surfaces**: `var(--surface-primary)`, `var(--surface-secondary)`, `var(--surface-card)`
- **Text Neutrals**: `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`
- **Borders**: `var(--border-subtle)`, `var(--border-medium)`

## 🌟 Icon Standard
- **Package**: `@iconify/react`
- **Icon Set**: `solar:*` (e.g. `solar:box-minimalistic-linear`, `solar:check-circle-linear`, `solar:pen-2-linear`)
- **Rule**: Do not add or import secondary icon packages (e.g. `lucide-react`, `font-awesome`).
