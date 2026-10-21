# Implementation Plan: Remove Unnecessary Icon Hover Animations

Eliminate distracting hover animations (scaling, jumping, shifting) on decorative icon boxes and card badges across the application, keeping them completely static in alignment with professional B2B industrial design standards.

## User Decisions
- **Scope**: All decorative icon animations across cards and sections.
- **Hover Behavior**: Completely static with no movement, scaling, or position shifting on hover.

---

## Proposed Changes

### 1. Process Section (`apps/web/src/features/home/components/Process/ProcessSection.jsx`)
- Remove `group-hover:scale-105` and `transition-transform duration-300` from the 4 process step icon badge containers.
- Ensure the icon containers remain solid, stable, and visually anchored when the parent card is hovered.

### 2. About - Who We Are Section (`apps/web/src/features/about/components/WhoWeAreSection.jsx`)
- Remove `group-hover:scale-105` and `transition-transform duration-300` from the 3 pillar icon badge containers (`Recycled Polymer Pellets`, `Zero Additive Compounds`, `Closed Loop Infrastructure`).

### 3. About - Why Choose Us Section (`apps/web/src/features/about/components/WhyChooseUsSection.jsx`)
- Remove `group-hover:scale-105` and `transition-transform duration-300` from the 4 feature card icon containers (`50+ Years Experience`, `ASTM Certified Strength`, `Cost-Efficiency`, `Pan-India Logistics`).

### 4. Shared IconBox Primitive (`apps/web/src/shared/ui/data-display/IconBox.jsx`)
- Remove the default `transition-transform` class from the `IconBox` container to ensure all child and feature icons remain completely static across all pages and views.

### 5. Dialog & Footer Utility Icons
- **TimedInquiryModal (`apps/web/src/shared/ui/overlays/TimedInquiryModal.module.css`)**: Remove `transform: scale(1.05)` from `.closeBtn:hover` and `.closeBtn:active`.
- **InquiryModal (`apps/web/src/shared/ui/overlays/InquiryModal.module.css`)**: Remove `transform: scale(1.15)` from `.copyRefBtn:hover`.
- **Footer (`apps/web/src/features/navigation/styles/footer.module.css`)**: Remove `transform: scale(1.12)` from `.socialLink:hover` so social icons do not zoom on hover.

---

## Verification Plan

### Automated Checks
- Run `npm run lint` (`lint_applet`) to ensure no syntax or formatting regressions.
- Run `npm run build` (`compile_applet`) to verify the full bundle compiles cleanly.

### Manual & Interactive Verification
- Inspect the Process cards on the Home page to verify icons do not scale or twitch when hovering.
- Inspect the Who We Are and Why Choose Us sections on the About page.
- Test modal close buttons and footer social icons to confirm clean, static hover states without transforms.
