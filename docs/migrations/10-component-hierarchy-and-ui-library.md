---
domain: architecture-refactoring
scope: component-hierarchy
status: approved-blueprint
created_at: 2026-09-10
version: 1.0.0
---

# 10. Component Hierarchy & Shared UI Library

## 1. Design System Taxonomy (`apps/web/src/shared/ui/`)

The shared UI library provides atomic and molecular components categorized by strict interface function:

```text
shared/ui/
├── buttons/
│   ├── Button.jsx                  # Polymorphic primary/secondary/ghost button
│   ├── QuoteButton.jsx             # Direct quote trigger button with inquiry modal
│   ├── WhatsAppButton.jsx          # Instant WhatsApp messaging button
│   └── InteractiveHoverButton.jsx  # Animated pulse hover button (migrated from registry)
│
├── forms/
│   ├── Input.jsx                   # Styled text, number, and email input
│   ├── Textarea.jsx                # Multi-line autosizing textarea
│   ├── Checkbox.jsx                # Accessible styled checkbox
│   ├── Radio.jsx                   # Accessible radio input group
│   ├── Switch.jsx                  # Toggle switch with smooth slide transition
│   ├── CustomSelect.jsx            # Keyboard-navigable accessible dropdown
│   ├── SearchInput.jsx             # Search bar with debouncing & clear button
│   ├── FormField.jsx               # Label, hint, and error message wrapper
│   └── FileUpload.jsx              # Drag-and-drop file upload zone
│
├── data-display/
│   ├── Card.jsx                    # Neutral/raised container surface
│   ├── CtaCard.jsx                 # High-contrast action banner card
│   ├── StatCard.jsx                # Key performance indicator card with icon
│   ├── Badge.jsx                   # Status badge (success, warning, error, info)
│   ├── Tag.jsx                     # Filter chip and category pill
│   ├── StatusDot.jsx               # Online/active indicator beacon
│   ├── Avatar.jsx                  # User or testimonial portrait
│   ├── IconBox.jsx                 # Rounded tinted background container for icons
│   ├── Progress.jsx                # Horizontal progress meter
│   ├── SpecRow.jsx                 # Two-column key-value product technical specification
│   ├── Table.jsx                   # Responsive striped data table
│   ├── Accordion.jsx               # Expandable/collapsible accordion (relocated from root)
│   └── Kbd.jsx                     # Keyboard shortcut key badge (relocated from root)
│
├── feedback/
│   ├── Alert.jsx                   # Inline banner message (info, success, warning, error)
│   ├── EmptyState.jsx              # Zero-data display with illustration and CTA
│   ├── ErrorBoundary.jsx           # React class error boundary preventing white-screens
│   ├── Skeleton.jsx                # Content loading pulse skeleton
│   ├── Spinner.jsx                 # SVG loading spinner with size variants
│   ├── Toast.jsx                   # Floating toast notification primitive
│   └── ScrollProgressBar.jsx       # Viewport top read progress bar
│
├── layout/
│   ├── Divider.jsx                 # Subtle horizontal or vertical rule
│   ├── PageHeader.jsx              # Title, description, and action button row
│   ├── SectionHeader.jsx           # Eyebrow, section heading, and subtitle
│   └── PageHero/                   # Reusable page banner with background image
│
├── navigation/
│   ├── BackHeader.jsx              # Back button with breadcrumb navigation
│   ├── BackToTop.jsx               # Floating scroll-to-top button
│   ├── Breadcrumbs.jsx             # Hierarchical navigation breadcrumb trail
│   ├── Pagination.jsx              # Numbered page navigator
│   └── Tabs.jsx                    # Tab bar with sliding active indicator
│
├── overlays/
│   ├── Modal.jsx                   # Centered accessible dialog modal
│   ├── Drawer.jsx                  # Slide-over sidebar panel
│   ├── Tooltip.jsx                 # Hover tooltip popup
│   ├── ConfirmDialog.jsx           # Confirmation prompt with destructive variant
│   ├── InquiryModal.jsx            # Lead capture form dialog
│   └── TimedInquiryModal.jsx       # Engagement-triggered inquiry popup
│
└── media/
    └── OptimizedImage.jsx          # Picture element with WebP fallback & lazy loading
```

---

## 2. Component Contract & Accessibility Standards

Every component in `shared/ui/` must satisfy:
1. **Forward Ref Support**: Components rendering native DOM elements must wrap in `React.forwardRef` to support focus management and animation libraries.
2. **Keyboard Accessibility**: Custom controls (`CustomSelect`, `Accordion`, `Tabs`) must support `Enter`, `Space`, `ArrowUp`, and `ArrowDown` keys with proper `aria-expanded`, `aria-selected`, and `role` attributes.
3. **Unique HTML ID Attributes**: Meaningful interactive elements, buttons, and form inputs must generate or accept explicit `id` attributes.
4. **Prop Types Validation**: Use clean default parameters and explicit destructuring for predictable interfaces.
