---
name: mobile-ui-first-principles
description: Design, redesign, audit, or specify mobile application interfaces using first-principles reasoning and the complete UI/UX Playbook principles. Use for iOS/Android-style apps, mobile web apps, onboarding, commerce, productivity, dashboards, forms, navigation, detail screens, and one-handed task flows.
---

# Mobile UI First-Principles Designer

## Mission

Create mobile interfaces that reduce cognitive load, minimize touch effort, preserve clarity on small screens, and remain visually coherent. Start from the user's goal, thumb reach, information priority, and interaction cost — not from trendy visual treatments.

This skill is grounded in the complete uploaded *UI/UX Playbook*. Before designing or auditing a substantial interface, read:

- `references/playbook-complete-rules.md`

That reference is the source of truth for visual hierarchy, proximity, clarity, alignment, contrast, simplicity, whitespace, layout, balance and harmony, consistency, visual cues, depth and texture, color, typography, interaction cost, field design, password patterns, destructive dialogs, task focus, empty/error states, thumb-zone design, and navigation patterns.

## Source boundary

- Rules marked **PLAYBOOK** in the reference are direct book-derived principles.
- Mobile-specific behavior in this skill is **derived from those principles** for small touch screens, one-handed use, scrolling, software keyboards, and limited simultaneous information.
- Do not present a derived mobile convention as though the playbook explicitly states it.

---

# 1. Non-negotiable reasoning order

Never begin with a bottom sheet, card stack, gradient, blur, or illustration.

Use this order:

1. Define the user's immediate mobile goal.
2. Identify the single most important next action.
3. Identify the minimum information needed now.
4. Remove or postpone secondary information.
5. Reduce the number of taps, typing, scrolling, and memory requirements.
6. Place frequent actions in comfortable reach.
7. Group related information by proximity.
8. Establish vertical reading and action order.
9. Establish hierarchy using size, weight, contrast, and position.
10. Establish spacing and touch-safe component sizing.
11. Establish readable mobile typography and line length.
12. Establish color roles and state semantics.
13. Establish consistent components, radii, icon style, and image treatment.
14. Use visual cues where they improve recognition.
15. Add depth only when it communicates layers.
16. Design keyboard, empty, error, success, offline, and destructive states.
17. Test one-handed reach and long-content behavior.
18. Add brand expression without competing with the task.
19. Remove anything that consumes attention without helping the user.

---

# 2. Mobile first-principles screen brief

Before designing a screen, define:

- **User:** who is holding the device.
- **Context:** walking, seated, checkout, quick lookup, focused editing, etc. when relevant.
- **Immediate goal:** one sentence.
- **Primary object:** what the screen is about.
- **Primary action:** what the user is most likely to do next.
- **Critical information:** what must be visible before that action.
- **Secondary information:** what can appear later or below.
- **Frequent actions:** high-reach priority.
- **Rare actions:** overflow/secondary placement.
- **Typing burden:** what information must be entered.
- **One-hand expectation:** high / medium / low.
- **System states:** loading, empty, error, success, offline, permission, etc.

If the screen has three “primary” actions, the hierarchy is unresolved.

---

# 3. Small-screen information architecture

Mobile space is scarce. The solution is not to shrink desktop UI.

## Rules

- Show the most important information first.
- Stack related content in a clear vertical order unless another structure demonstrably improves the task.
- Move secondary details below the fold, into expandable sections, tabs, sheets, or secondary screens when appropriate.
- Keep critical content and the primary action visible without forcing users to decode decorative elements.
- Avoid horizontal crowding caused by desktop-style multi-column layouts.
- Preserve enough whitespace to distinguish groups even when screen real estate is tight.
- Do not hide immediately useful content behind a promotional banner or “discover more” gate.

**Decision rule:** on mobile, every simultaneously visible element should help the current decision, orientation, or action.

---

# 4. Thumb-zone design

The playbook explicitly identifies thumb reach as a mobile design concern.

## Core rules

- Put frequent/primary actions where one-handed users can reach them comfortably.
- Avoid repeatedly placing high-frequency controls in difficult top corners.
- Keep destructive or rare actions away from the easiest accidental-tap zones unless confirmation protects them.
- Consider both left- and right-handed use when placement can support both.
- Favor lower-screen placement for primary controls when the flow benefits from one-hand use.

## Reach priority model

Use three conceptual zones:

- **Easy:** frequent and primary actions.
- **Stretch:** secondary but still useful controls.
- **Hard:** rare, low-frequency, or navigation actions that do not need repeated access.

This is a functional allocation model, not a decorative heatmap requirement.

---

# 5. Mobile hierarchy model

A useful mobile hierarchy is:

1. **Level A — orientation/task anchor:** screen title/current object/status.
2. **Level B — critical content:** key value, product, message, result, input, or selected state.
3. **Level C — primary action:** visually obvious and physically reachable.
4. **Level D — supporting information/actions:** secondary details, filters, share, edit, etc.
5. **Level E — decorative/brand support:** imagery, illustration, texture.

The order can vary by task, but decorative content must not displace task-critical content.

### Checks

- Can the user tell what screen they are on immediately?
- Is the next action obvious?
- Does the main content appear before banners or promotion?
- Is the primary CTA reachable and visually distinct?
- Do secondary actions remain available without looking equally important?

---

# 6. Proximity on small screens

Tight space makes spacing errors more damaging.

Rules:

- Keep labels close to fields.
- Keep validation immediately adjacent to the relevant input.
- Keep prices/statuses close to the object they describe.
- Keep action controls close to the item they modify.
- Use larger gaps between groups than within groups.
- Use whitespace before adding many separators.
- Keep repeated list-row structure consistent so the eye can scan quickly.

If two elements are visually adjacent, users will infer a relationship. Do not accidentally group unrelated actions.

---

# 7. Mobile alignment and reading flow

## Default reading direction

- Left-align most body copy and list content in left-to-right languages.
- Keep a predictable vertical starting edge.
- Center short empty states, onboarding headlines, or isolated messages only when it improves composition.
- Avoid centered paragraphs and long center-aligned descriptions.

## Numeric/content alignment

- Align repeated prices, quantities, or values consistently.
- Do not force tabular desktop alignment into a tiny screen if it produces horizontal scrolling or unreadable columns; restructure the information.

## Scroll order

**[DERIVED]** Mobile layouts should have a deliberate vertical story:

1. orientation,
2. critical content,
3. immediate controls,
4. supporting details,
5. secondary information,
6. low-frequency actions.

Do not let CMS/database order determine the user's scroll order.

---

# 8. Mobile spacing and sizing system

Use a consistent spacing system based on the playbook's multiples-and-relationships principle.

Define semantic spacing roles:

- icon/text internal gap,
- control internal padding,
- label-to-field gap,
- row/item gap,
- group gap,
- section gap,
- screen-edge padding.

Rules:

- Related gaps must be visibly smaller than section gaps.
- Repeated components must reuse the same spacing roles.
- Avoid random values.
- Do not compress the UI until tap accuracy or text readability suffers.
- Start with enough breathing room, then optimize density carefully.

**[DERIVED]** Touch interfaces generally need more forgiving control areas than pointer interfaces. Do not make a control visually tiny merely to fit more items above the fold.

---

# 9. Mobile typography

Apply all playbook typography principles with mobile-specific measure.

## 9.1 Body text

- Use a comfortably readable main text size; the playbook presents 16px as a common baseline.
- Avoid body text below roughly 12px.
- Avoid extra-light body weights.
- Use generous body line-height, around the playbook's 1.5–1.6× starting range when paragraph-like.

## 9.2 Mobile line length

The playbook recommends roughly **30–40 characters per line** as a useful mobile target.

Do not force long desktop-style measures into edge-to-edge mobile text.

## 9.3 Headings

- Use stronger size/weight/contrast than body text.
- Keep heading line-height tighter than body text; the playbook illustrates roughly 1.2–1.3×.
- Do not use giant display typography that consumes most of a task screen unless the content itself justifies it.

## 9.4 Paragraphs and subheadings

- Break long text into short paragraphs.
- Add descriptive subheadings.
- Prefer scannable feature blocks to monolithic product descriptions.

## 9.5 Font choice

- Prefer one versatile family; at most two families in most product UIs.
- Avoid decorative body fonts.
- Ensure license suitability.

## 9.6 Text color

- Near-black/near-white systems can feel more refined than pure extremes, but accessibility contrast is mandatory.

---

# 10. Mobile color and state semantics

Define roles rather than assigning colors locally.

Required roles:

- page background,
- surface,
- elevated surface,
- primary text,
- secondary text,
- muted text,
- divider/border,
- primary action,
- selected/active state,
- success,
- warning,
- error/destructive,
- information,
- disabled.

Rules:

- Use brand color selectively.
- Keep neutral backgrounds when content needs maximum focus.
- Dark mode must maintain hierarchy and readable contrast.
- Do not rely on color alone for states.
- Use familiar error/destructive and success conventions.
- Pair status colors with icon, label, or explanatory text.

---

# 11. Mobile navigation

Navigation should reduce interaction cost and memory burden.

## Rules

- Keep frequent destinations easy to reach.
- Make the current location obvious.
- Use recognizable icons plus labels when icons alone may be ambiguous.
- Group secondary destinations logically.
- Do not put every possible destination on the primary navigation layer.
- Avoid hidden navigation when it makes frequent tasks harder to discover.

## Bottom navigation / lower-screen navigation

**[DERIVED from thumb-zone + recognition principles]** Lower-screen navigation can be effective for frequent top-level destinations because it improves reach and keeps options visible. Use it only when the information architecture actually has a small set of stable primary destinations.

## Menus and dropdown-like surfaces

On mobile, a sheet, menu, or secondary screen may replace a desktop dropdown. Keep the same playbook principles:

- logical grouping,
- visual cues that improve recognition,
- selective imagery,
- no clutter for its own sake.

---

# 12. Mobile buttons and CTAs

## Primary CTA

- Make it clearly distinguishable from secondary actions.
- Place it in comfortable reach when repeatedly used.
- Keep its wording action-specific.
- Avoid multiple equal-looking primary buttons.

## Secondary and tertiary actions

- Visually reduce emphasis.
- Keep them available without competing.
- Use overflow for genuinely rare actions, not frequently needed ones.

## Destructive actions

- Use destructive semantics/color.
- Name the action explicitly.
- Provide cancel/back.
- Do not use green/safe styling for delete/remove.

## Sticky/fixed CTAs

**[DERIVED]** A sticky lower CTA can reduce touch and scroll cost for long mobile screens, but only use it when:

- the action remains relevant throughout the screen,
- it does not hide important content,
- it does not create duplicate competing CTAs,
- keyboard/safe-area behavior is handled.

---

# 13. Mobile forms and input design

The playbook's input-type guidance is especially important on mobile because typing is expensive.

## 13.1 Match field design to data

- Verification code → segmented digits when useful.
- Card number → long enough for expected content.
- CVC → compact.
- Expiry date → compact and formatted.
- Postal code → sized/structured appropriately.
- Quantity → direct selector when faster than typing.

## 13.2 Reduce typing

**[DERIVED from interaction cost]**

- Use appropriate input modes/keyboards.
- Use autofill where available.
- Prefill known information.
- Use sensible defaults.
- Avoid asking for the same information twice.

## 13.3 Passwords

Use the playbook's recommendation:

- avoid confirm-password by default,
- provide show/hide control,
- show inline validation/strength/rules.

## 13.4 Validation

- Keep errors inline and close to the field.
- Explain what to fix, not merely that the value is invalid.
- Preserve entered data.

## 13.5 Keyboard behavior

**[DERIVED]** When the software keyboard appears:

- keep the active field visible,
- keep the primary next/submit action reachable,
- do not allow fixed elements to cover the field,
- preserve scroll context.

---

# 14. Mobile lists, cards, and feeds

## Lists

Use lists for repetitive, scan-heavy content.

- Keep row structure consistent.
- Use avatars/logos/icons when they speed recognition.
- Keep title, metadata, status, and action positions predictable.
- Avoid excessive per-row borders if whitespace/dividers suffice.

## Cards

Use cards only for distinct objects or grouped content.

- Keep image framing and radii consistent.
- Avoid card-on-card nesting.
- Align repeated CTA placement.
- Do not let image size overwhelm name/price/action.
- Do not use multiple decorative card styles in one feed unless there is a semantic reason.

## Feeds/discovery

Expose useful content directly. Do not make users tap a promotional banner to reach the content the banner represents.

---

# 15. Mobile commerce/product details

Apply the playbook's examples:

- Show product image, name, price/status, options, and purchase action in a clear hierarchy.
- Keep imagery large enough to understand but not so dominant that it displaces decision data.
- Make variants directly visible when hiding them in dropdowns creates unnecessary taps.
- Use a direct quantity control when useful.
- Keep add-to-cart/buy actions close to options.
- A one-click purchase path can reduce friction when intent and safety support it.
- Break long feature text into scannable sections.

---

# 16. Mobile content density

Small screen does not mean tiny UI.

When content feels crowded, resolve it in this order:

1. remove irrelevant information,
2. demote secondary information,
3. shorten copy,
4. group related elements,
5. collapse rare details,
6. split a complex task into meaningful steps only if that lowers cognitive load,
7. use more efficient components,
8. only then tighten spacing slightly.

Do not solve density by shrinking everything.

---

# 17. Interaction-cost optimization for mobile

Mobile interaction cost is amplified by touch, typing, reach, and interruptions.

## Cognitive effort

Reduce with:

- clear hierarchy,
- recognition over recall,
- familiar icons/labels,
- visible selected states,
- recently used content,
- meaningful chunking,
- focused screens.

## Physical effort

Reduce with:

- thumb-zone placement,
- fewer taps,
- nearby actions,
- direct option controls,
- autofill,
- reduced typing,
- stable control positions,
- avoiding repeated trips to top corners.

## Time effort

Reduce with:

- direct access to useful content,
- fewer unnecessary screens,
- preserved data,
- efficient defaults,
- continuation/resume patterns,
- clear error recovery.

### Mobile interaction-cost test

For every tap, scroll, field, and transition, ask:

- Does this step change the outcome?
- Is this information already known?
- Can the user choose by recognition rather than memory?
- Can the action be moved closer?
- Can multiple repetitive actions be combined?

---

# 18. Task-focus protection

The playbook explicitly warns against distracting content during task completion.

For sign-up, checkout, payment, password setup, booking, or other focused flows:

- remove unrelated promotions,
- avoid attention-grabbing side content,
- keep supporting imagery relevant and subordinate,
- keep the primary task region visually dominant,
- avoid unnecessary banners/popups.

A graphic can still be used when it supports the product context and does not compete with the task.

---

# 19. Mobile depth, surfaces, and visual polish

Use the lightest mechanism that communicates structure:

1. whitespace,
2. alignment,
3. typography,
4. subtle background difference,
5. thin/light divider,
6. soft shadow,
7. medium overlay shadow,
8. overlap/glass only when justified.

## Shadows

- Soft for cards/small surfaces.
- Medium for floating sheets/popovers/dialogs.
- Strong only for exceptional elevated layers.
- Match shadow hue to the background where useful.
- Avoid harsh, dark floating rectangles.

## Borders

- Do not box every section.
- Use thin/light separators when needed.
- Prefer whitespace and surface changes when they communicate grouping.

## Glass

- Use only when the background and text remain legible.
- Reject it when transparency lowers accessibility.

## Overlap

- Can create depth and sophistication.
- Add separation such as an outline/background ring when overlap causes clashing.
- Do not let an overlapping visual obscure important text or controls.

---

# 20. Mobile empty, error, and recovery states

## Empty states

Do not stop at “No items.”

Include when useful:

- what this area is for,
- why it is empty,
- one or two short tips,
- a direct CTA such as Create/Add/Import/Invite.

Keep the action physically reachable.

## Error states

A good error state must:

1. say what went wrong,
2. tell the user what they can do next,
3. remain visually consistent with the app.

Avoid generic “Something went wrong” when a specific recovery path is available.

## 404/not-found mobile web

Brand personality can appear through illustration or copy, but useful navigation back to valid content remains mandatory.

---

# 21. Destructive confirmations on mobile

Apply the playbook's semantics:

- destructive action uses a destructive visual role,
- explicit action label,
- cancel/back available,
- do not use green/success styling for destructive confirmation.

For LTR interfaces, the playbook demonstrates Cancel left and Delete right in confirmation layouts. Adapt direction thoughtfully for RTL interfaces.

**[DERIVED]** On a mobile action sheet or bottom sheet, preserve the same semantic hierarchy even if platform layout conventions differ.

---

# 22. Mobile visual cues

Use visual cues to reduce reading and recall.

Examples:

- sender avatar/logo in messages,
- icon + label for actions,
- status icon + text,
- thumbnail for content recognition,
- illustration for onboarding/empty state,
- recognizable product images.

Guardrail:

- A cue must speed recognition or comprehension.
- If it only decorates repeated items and reduces density/clarity, remove it.

---

# 23. Mobile consistency system

Define and reuse:

- radius family,
- card/list geometry,
- image aspect ratios,
- button roles,
- input styles,
- icon family,
- selected/unselected icon behavior,
- navigation states,
- spacing roles,
- typography scale,
- surface hierarchy,
- shadow roles,
- semantic colors.

Consistency reduces learning cost on small screens where users see fewer controls at once and rely heavily on repeated patterns.

### Exception rule

Break consistency only when the difference communicates:

- state,
- hierarchy,
- interaction type,
- category with user value,
- a deliberate branded moment.

Never break it just to make every screen “look unique.”

---

# 24. Mobile redesign procedure

When given an existing screenshot/codebase, audit under:

- user goal,
- interaction cost,
- thumb reach,
- hierarchy,
- proximity,
- clarity,
- alignment,
- contrast,
- simplicity,
- whitespace,
- layout/scroll order,
- balance/harmony,
- consistency,
- visual cues,
- depth/texture,
- color,
- typography,
- input burden,
- empty/error/destructive states.

For each issue provide:

- problem,
- why it harms mobile use,
- violated principle,
- specific fix,
- priority.

Then redesign structure before styling.

---

# 25. Mobile design output contract

When asked to create a mobile UI specification, output in this order unless the user asks otherwise:

1. **Design objective**
2. **Primary user/task**
3. **One-handed/usage context assumptions**
4. **Information priority**
5. **Tap/typing/scroll interaction-cost decisions**
6. **Screen structure and scroll order**
7. **Thumb-zone placement**
8. **Navigation pattern**
9. **Component inventory**
10. **Hierarchy and spacing rules**
11. **Typography/line-length rules**
12. **Color/state system**
13. **Inputs and keyboard behavior**
14. **Depth/surface rules**
15. **Empty/error/destructive states**
16. **Accessibility checks**
17. **What was deliberately removed/de-emphasized**
18. **Final QA checklist**

If generating code, use shared tokens and reusable components; do not scatter one-off values across screens.

---

# 26. Mobile anti-slop guardrails

Do not generate by default:

- oversized hero headings on ordinary app screens,
- a card around every line of information,
- glowing gradients as background filler,
- glassmorphism behind small text,
- giant radii on every component,
- decorative illustration that pushes the task below the fold,
- bottom sheets for actions that could happen directly,
- hidden useful options that require extra taps for no reason,
- tiny desktop-style controls,
- long centered paragraphs,
- icon-only critical actions with ambiguous meaning,
- multiple equally strong CTAs,
- brand color on every component,
- color-only statuses,
- arbitrary spacing,
- repeated banners between users and useful content,
- dead-end empty states,
- generic errors with no recovery action.

A distinctive mobile app should feel specific because of its content, task model, brand, and interaction structure — not because it is overloaded with effects.

---

# 27. Final mobile QA checklist

## Goal and interaction

- [ ] The immediate user goal is obvious.
- [ ] There is one clearly dominant next action where appropriate.
- [ ] Unnecessary taps/screens have been removed.
- [ ] Typing has been minimized.
- [ ] Known data is prefilled when appropriate.
- [ ] Recognition replaces recall where possible.

## Thumb reach

- [ ] Frequent actions are in comfortable reach.
- [ ] Important repetitive actions are not trapped in hard-to-reach corners.
- [ ] Primary CTA placement works for one-handed use when relevant.

## Hierarchy and clarity

- [ ] Critical content appears before decoration/promotion.
- [ ] Unequal actions have unequal emphasis.
- [ ] Labels/instructions match actual behavior.
- [ ] The screen is neither overloaded nor oversimplified.

## Proximity and layout

- [ ] Labels, values, errors, and actions are close to their targets.
- [ ] Groups are separated by stronger spacing.
- [ ] Scroll order matches the user's decision order.
- [ ] Desktop multi-column structures have been rethought rather than shrunk.

## Typography

- [ ] Body text is comfortably readable.
- [ ] Body line length is roughly 30–40 characters where practical.
- [ ] Body text is not overly small or thin.
- [ ] Headings and body have clear hierarchy.
- [ ] Long content uses short paragraphs/subheadings.

## Color and contrast

- [ ] Accent color is selective.
- [ ] Status colors follow familiar semantics.
- [ ] Status is not communicated by color alone.
- [ ] Text contrast is accessible.
- [ ] Text over images is protected.
- [ ] Dark mode, if present, is intentionally designed.

## Consistency

- [ ] Radius/shape language is coherent.
- [ ] Buttons use consistent semantic roles.
- [ ] Images use consistent framing in repeated components.
- [ ] Cards/list rows use stable structure.
- [ ] Icon style is coherent.
- [ ] Spacing uses a system.

## Depth

- [ ] Whitespace/alignment is used before borders/shadows.
- [ ] Borders are subtle unless a deliberate stronger treatment is justified.
- [ ] Shadows indicate elevation.
- [ ] Glass/overlap effects do not reduce legibility.

## Forms

- [ ] Field width/format matches expected data.
- [ ] Appropriate mobile input mode is considered.
- [ ] Errors are inline and actionable.
- [ ] Keyboard does not obscure the active task.
- [ ] Password uses show/hide and inline validation where appropriate.
- [ ] Redundant confirmation fields are avoided.

## States

- [ ] Empty states provide a useful next action.
- [ ] Errors explain problem and recovery.
- [ ] Destructive actions use destructive semantics and offer cancel/back.
- [ ] Loading does not destroy context.

If a critical item fails, revise before cosmetic polish.
