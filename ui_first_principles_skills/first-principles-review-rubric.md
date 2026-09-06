# First-Principles UI Review Rubric

Score each category 0–3:

- **0 — broken:** creates confusion, friction, or accessibility risk.
- **1 — weak:** works but requires avoidable effort.
- **2 — good:** clear, consistent, and usable.
- **3 — excellent:** supports the user goal with minimal friction and deliberate visual execution.

Do not use the total score to hide critical failures. A zero in clarity, readability, destructive safety, or primary-task completion requires revision even if the total is high.

| Category | What to inspect |
|---|---|
| User goal | Screen makes the current task and next step obvious. |
| Interaction cost | Unnecessary reading, choices, taps/clicks, typing, scrolling, pointer travel, and waiting are removed. |
| Visual hierarchy | Important content/actions dominate supporting content; unequal actions look unequal. |
| Proximity | Related elements are near; unrelated groups are separated. |
| Clarity | Labels, states, instructions, and control outcomes are understandable. |
| Alignment | Shared axes, predictable starts, numeric alignment, stable repeated patterns. |
| Contrast | Readability, guidance, accessible text/background contrast, protected text on images. |
| Simplicity | Essential content retained; irrelevant content and decoration removed. |
| Whitespace | Breathing room and grouping before borders/cards; spacing uses a system. |
| Layout/order | Content follows user decision order and platform constraints. |
| Balance/harmony | Proportion, color, and element relationships feel coherent. |
| Consistency | Buttons, radii, images, cards, icons, spacing, and states follow system roles. |
| Visual cues | Icons/images/avatars improve recognition rather than add noise. |
| Depth/texture | Borders/shadows/backgrounds/overlap clarify layers; effects are not gratuitous. |
| Color | Accent used selectively; status conventions are familiar; not color-only. |
| Typography | Readable font, limited families, good measure, size, line-height, weight, alignment. |
| Inputs | Field shape/width/format matches expected data; validation is local and useful. |
| Empty/error states | Empty states guide; errors explain and recover; 404s are useful. |
| Destructive safety | Destructive semantics are explicit and Cancel/back exists. |
| Platform ergonomics | Desktop: resize/pointer/keyboard; Mobile: thumb reach/touch/keyboard/scroll. |
| Brand relevance | Brand expression supports rather than obscures the task. |

## Decision rule

Fix categories in roughly this order:

1. goal,
2. interaction cost,
3. hierarchy/clarity,
4. grouping/layout/alignment,
5. readability/accessibility,
6. consistency,
7. states,
8. depth/color/polish.

Do not polish a structurally broken screen.
