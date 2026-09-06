---
name: desktop-ui-first-principles
description: Design, redesign, audit, or specify desktop web applications and desktop software interfaces using first-principles reasoning and the complete UI/UX Playbook principles. Use for dashboards, admin panels, SaaS products, productivity tools, data-heavy applications, ecommerce/product screens, forms, settings, navigation systems, and responsive desktop states.
---

# Desktop UI First-Principles Designer

## Mission

Create desktop interfaces that are easy to understand, efficient to operate, visually coherent, and deliberately designed. Start from the user's goal and interaction cost, not from visual trends, component libraries, or decorative patterns.

This skill is grounded in the complete uploaded *UI/UX Playbook*. Before designing or auditing a substantial interface, read:

- `references/playbook-complete-rules.md`

That reference is the source of truth for visual hierarchy, proximity, clarity, alignment, contrast, simplicity, whitespace, layout, balance and harmony, consistency, visual cues, depth and texture, color, typography, interaction cost, and all bonus patterns.

## Source boundary

- Rules marked **PLAYBOOK** in the reference are direct book-derived principles.
- Desktop-specific behavior in this skill is **derived from those principles** for mouse, trackpad, keyboard, large screens, variable window sizes, and dense information environments.
- Do not present a derived desktop convention as though the playbook explicitly states it.

---

# 1. Non-negotiable reasoning order

Never begin a design by choosing card styles, gradients, shadows, radius, or component-library widgets.

Use this order:

1. Define the user's primary task.
2. Define success and the primary action.
3. Inventory only required information and actions.
4. Rank information by importance.
5. Remove or demote low-value content.
6. Reduce cognitive, physical, and time interaction cost.
7. Group related items by proximity.
8. Establish content order and layout.
9. Establish alignment and grid.
10. Establish visual hierarchy.
11. Establish spacing and sizing system.
12. Establish typography and readable measure.
13. Establish color roles and state semantics.
14. Establish component consistency.
15. Add visual cues only where they improve recognition.
16. Add depth, shadows, borders, or glass only when they clarify layers.
17. Design empty/error/loading/success/destructive states.
18. Validate keyboard/pointer usability and resizable-window behavior.
19. Add brand expression without damaging clarity.
20. Remove anything that still does not earn its attention cost.

If steps 1–10 are weak, do not try to rescue the screen with cosmetic styling.

---

# 2. First-principles screen brief

Before producing a desktop screen, write a compact internal brief with:

- **User:** who is operating the screen.
- **Immediate goal:** what they came to do now.
- **Primary object:** the record, document, product, dataset, task, or content the screen is about.
- **Primary action:** the most important next action.
- **Secondary actions:** useful but less urgent actions.
- **Critical information:** facts needed for the next decision.
- **Supporting information:** helpful but not required immediately.
- **Destructive actions:** actions needing explicit semantics and recovery/confirmation.
- **Frequent actions:** actions worth keeping visible and nearby.
- **Rare actions:** actions that can be placed in secondary menus.
- **System states:** loading, empty, error, success, no permission, offline if relevant.

Do not proceed until the primary action and information order are clear.

---

# 3. Desktop information architecture

## 3.1 Use the screen width to improve structure, not to stretch content

A large desktop canvas creates opportunities for parallel information, but full-width content is not automatically better.

Use extra width for:

- navigation,
- side-by-side comparison,
- detail/context panes,
- filters beside results,
- supporting summaries,
- activity/history,
- preview beside editor,
- data columns that genuinely help decisions.

Do not use extra width to:

- make forms excessively long,
- produce unreadably long text lines,
- create giant empty cards merely to fill a grid,
- scatter related controls across distant corners.

**Decision rule:** if added width increases pointer travel, scanning distance, or line length without improving simultaneous comprehension, constrain the content.

## 3.2 Choose the structural pattern from the task

Use the simplest structure that matches the job:

- **Single-column focal layout** — forms, onboarding, authentication, focused workflows.
- **Two-column content/detail** — product/detail pages, settings with contextual help, editor + preview.
- **Sidebar + workspace** — dashboards, admin apps, multi-area productivity software.
- **Master-detail split** — inboxes, records, tickets, file explorers, CRM.
- **Table/data grid + inspector** — data-heavy management tasks.
- **Dashboard composition** — only when users need simultaneous monitoring of multiple signals.
- **Canvas/workbench** — design, diagramming, media, code, or spatial tools where direct manipulation is primary.

Do not turn every desktop page into a dashboard or bento grid.

---

# 4. Desktop hierarchy model

Every screen should have visible hierarchy levels. A useful starting model is:

1. **Level A — task anchor:** page title/current object and primary action.
2. **Level B — decision data:** values, status, selected record, core content.
3. **Level C — supporting controls/data:** filters, metadata, secondary actions.
4. **Level D — tertiary utilities:** export, help, overflow, low-frequency options.
5. **Level E — decorative/brand support:** imagery, texture, illustration.

Use size, weight, position, contrast, whitespace, and color to enforce this order.

### Desktop hierarchy checks

- Does the main action stand out without shouting over the content?
- Can the user identify the current object/page immediately?
- Are key values stronger than labels?
- Are secondary actions visually quieter than the primary action?
- Are destructive actions visible when needed but not competing constantly?
- Does the user's eye land on useful information before decorative imagery?

---

# 5. Proximity and desktop grouping

Desktop screens often fail because available space encourages designers to spread things apart.

Apply these rules:

- Keep filter labels close to their controls.
- Keep row actions close to their row/record.
- Keep field errors directly beneath or beside the field they describe.
- Keep totals near the values that produce them.
- Keep action clusters near the selected object, not in an unrelated global toolbar.
- Keep related metrics in one visual group, but do not give every metric equal weight.
- Separate unrelated sections with larger space before adding borders.

**Distance test:** if a user must visually cross unrelated content to connect a label, value, or action to its target, the proximity structure is weak.

---

# 6. Alignment and grid behavior

## 6.1 Use a real grid

Desktop designs must align across repeated vertical and horizontal axes.

Establish:

- outer content bounds,
- navigation width,
- primary content columns,
- gutters,
- shared text baselines,
- common control edges,
- card/table alignments.

Use layout systems/auto-layout/flex/grid rather than manually nudging elements.

## 6.2 Alignment rules

- Left-align most body content and labels.
- Right-align comparable numeric columns when useful.
- Center-align only short, isolated content.
- Do not center long form labels, tables, or dense prose.
- Keep action bars aligned consistently from screen to screen.
- Repeated cards must share image, title, metadata, and CTA axes.

## 6.3 Resize behavior

**[DERIVED]** Desktop windows change size. Define behavior, not only a single mockup.

For every major region, specify whether it:

- remains fixed,
- grows,
- shrinks,
- wraps,
- collapses,
- becomes scrollable,
- moves below another region,
- hides into an overflow control.

Never let a responsive desktop layout become a random reflow.

---

# 7. Desktop spacing system

Use the playbook's system principle: predictable multiples and consistent relationships.

A practical derived scale can use a 4-unit family, but do not mechanically use every step.

Define semantic spacing roles:

- **micro:** icon-to-label, inline indicator, compact metadata.
- **control-internal:** icon/text inside buttons and fields.
- **related:** label-to-field, title-to-subtext, row content.
- **group:** between fields or related blocks.
- **section:** between distinct content groups.
- **region:** between major page zones.

Rules:

- Related spacing < group spacing < section spacing < region spacing.
- Repeated patterns must reuse the same role values.
- Avoid arbitrary one-off values.
- Start spacious, then compress only where information density requires it.
- Dense data interfaces can use tighter values, but preserve hierarchy by keeping relative differences.

---

# 8. Desktop typography

Apply all playbook typography rules.

## 8.1 Body copy

- Start around a readable main-text size; the playbook presents 16px as a common baseline.
- Avoid body text below roughly 12px.
- Use regular or medium weights for sustained reading.
- Use body line-height around the playbook's 1.5–1.6× starting range when content is paragraph-like.

## 8.2 Headings

- Use size and/or weight to distinguish headings from body text.
- Tighter heading line-height is usually appropriate; the playbook illustrates roughly 1.2–1.3×.
- Light-weight headings are acceptable only when hierarchy remains obvious through other signals.

## 8.3 Measure

- Keep long-form body copy near the playbook's desktop target of roughly 45–75 characters per line.
- Do not allow a wide desktop container to create 120-character paragraphs.

## 8.4 Fonts

- Prefer one versatile family.
- Use at most two families unless there is a strong editorial reason.
- Avoid thin body weights and decorative fonts for functional interface text.
- Ensure licensing is appropriate.

## 8.5 Text color

- Use accessible near-black/near-white values where appropriate rather than defaulting blindly to pure black/pure white.
- Never soften text so much that contrast fails.

---

# 9. Desktop color system

Define roles, not ad hoc colors.

Required roles:

- canvas/background,
- surface,
- elevated surface,
- primary text,
- secondary text,
- muted text,
- border/divider,
- primary action,
- primary hover/pressed/focus states,
- secondary action,
- success,
- warning,
- error/destructive,
- information,
- selection/active,
- disabled.

Rules:

- Use primary/brand color sparingly.
- Keep backgrounds neutral unless a colored section serves a clear purpose.
- Do not use brand color to redefine familiar error/success semantics.
- Never rely on color alone for status.
- Dark mode must be designed, not inverted. Re-evaluate text, borders, surfaces, shadows, imagery, and status colors.

---

# 10. Desktop components by first principles

## Buttons

- One clear primary action per local task context whenever possible.
- Secondary buttons must not compete with primary actions.
- Tertiary/icon actions should be quieter.
- Use consistent roles across screens.
- Destructive buttons use destructive semantics and explicit labels.
- Do not create a unique button color for every card or module.

## Inputs

- Match field width and format to expected data.
- Keep labels visually attached to fields.
- Place validation close to the field.
- Use show/hide password; avoid confirm-password when it adds no meaningful safety.
- Use inline password validation.
- Use segmented code entry where it improves verification-code clarity.
- Group address/payment fields based on the structure users expect.

## Tables

**[DERIVED from alignment/hierarchy/interaction cost]**

- Align numeric columns for comparison.
- Keep column labels concise.
- Put frequent row actions near the row.
- Avoid a border around every cell if whitespace/row separation is enough.
- Use status text + icon/badge, not color alone.
- Keep key columns visible before secondary columns.
- Use filtering, sorting, or grouping to reduce choice/search cost when data volume is high.

## Cards

- Do not use cards simply because a component library provides them.
- Use cards when they represent distinct objects or groups.
- Keep image treatment, radius, padding, title position, metadata, and actions consistent.
- Align CTAs on repeated cards when content length varies.
- Avoid nested-card-on-card structures unless layering has semantic meaning.

## Navigation

- Group related destinations.
- Use icons where they improve recognition.
- Use images only for selected featured content, not every menu item.
- Make current location obvious.
- Keep high-frequency destinations easier to reach than rare ones.
- Do not overload top navigation with every available route.

## Dropdowns/popovers

- Use soft/medium elevation to make them distinct from the page.
- Ensure the shadow/background separation is visible on the actual underlying surface.
- Keep options grouped and scannable.
- Use hierarchy within long menus rather than an undifferentiated list.

## Modals/dialogs

- Use only when interruption is justified.
- Keep the message concise and action-specific.
- Destructive confirmations should name the consequence.
- Provide a clear cancel/back path.
- For LTR layouts, the playbook demonstrates Cancel left and Delete right.

---

# 11. Dense desktop applications

Desktop apps often need more information density than marketing websites. Density is acceptable; confusion is not.

## Rules for dense screens

- Preserve a clear primary reading axis.
- Use section labels and whitespace to chunk information.
- Use subtle backgrounds or outlines before heavy cardification.
- Keep repeated control groups consistent.
- Prefer recognizable compact controls to verbose repeated labels when the meaning is already clear.
- Keep high-frequency actions persistently available when that meaningfully reduces interaction cost.
- Avoid hiding frequently changed values inside deep menus.
- Use tooltips as supplementary explanation, not as the only way to understand critical controls.

## Density ladder

When a screen feels crowded, simplify in this order:

1. remove irrelevant content,
2. reduce duplicate labels/actions,
3. group related data,
4. move rare actions to overflow,
5. shorten copy,
6. use more efficient layout,
7. only then reduce spacing/type size slightly.

Never solve clutter first by shrinking text below comfortable readability.

---

# 12. Interaction-cost optimization for desktop

Evaluate every workflow across cognitive, physical, and time effort.

## Cognitive effort

Reduce by:

- recognition over recall,
- clear defaults,
- grouping,
- meaningful labels,
- visible selected states,
- remembered/recent items,
- progressive disclosure,
- contextual help.

## Physical effort

Reduce by:

- placing frequent actions near their targets,
- avoiding unnecessary pointer travel,
- supporting direct manipulation,
- keeping repeated controls stable in position,
- enabling bulk/repeat actions for repetitive work.

## Time effort

Reduce by:

- eliminating redundant steps,
- pre-filling known information,
- reducing page changes when inline editing is clearer,
- exposing useful content directly,
- using search/filtering where scanning would be slower.

## Desktop shortcut extension

**[DERIVED]** For expert or repetitive desktop workflows, keyboard shortcuts can lower interaction cost, but:

- visible UI must still work without memorizing shortcuts,
- shortcuts must not conflict with browser/OS expectations,
- expose discoverability through menus/tooltips/help,
- do not make critical actions keyboard-only.

---

# 13. Desktop visual depth without "AI slop"

A polished UI is not a stack of rounded cards, gradients, glows, and shadows.

Use this hierarchy of separation mechanisms, from lightest to strongest:

1. whitespace,
2. alignment,
3. typography,
4. subtle background change,
5. thin/light divider or outline,
6. soft shadow,
7. stronger elevation,
8. overlap/glass/texture only when purpose justifies it.

Reject decorative depth when:

- every region has a card shadow,
- multiple nested shadows compete,
- colored glows replace real hierarchy,
- glass reduces legibility,
- border + shadow + background tint are all used simultaneously without need.

### Shadow system

Maintain defined roles such as:

- soft card/control elevation,
- medium dropdown/modal elevation,
- strong exceptional overlay elevation.

Tint shadows to harmonize with background where appropriate.

---

# 14. Forms and focused desktop workflows

## Constrain width

Do not stretch input controls across the full desktop viewport.

Use a focused form region with enough room for labels, fields, errors, and supporting content. Surrounding whitespace is intentional.

## Keep the task protected

During registration, checkout, payment, or critical setup:

- suppress unrelated promotions,
- keep primary CTA obvious,
- use relevant imagery only if it remains subordinate,
- avoid popups or banners that interrupt completion.

## Structure long forms

- Group by meaning.
- Use section headings.
- Use field widths matching input type.
- Use two columns only when fields are naturally related and scan order remains obvious.
- Do not compress a long form into columns merely to reduce vertical scrolling.

---

# 15. Product and detail pages

Apply the playbook's product-content examples:

- Lead with name/object, key visual, price/status, and primary decision/action.
- Break dense feature prose into structured sections.
- Use icons/bullets for meaningful feature scanning.
- A two-column feature layout can improve comparison on desktop.
- Add genuinely useful evidence such as comparison, social proof, or supporting metrics only if it helps a decision.
- Avoid oversized imagery that overwhelms specifications or purchase actions.
- Make visible product variants easier to compare when hiding them in a dropdown adds unnecessary interaction.

---

# 16. Desktop states

Every production-ready design must include relevant states.

## Empty

- Explain what is absent.
- Explain what the user can do next.
- Provide a direct CTA.
- Add illustration or tips only if they help orientation.

## Error

- State what went wrong.
- State how to recover.
- Keep the error visually consistent with the product.
- Preserve entered data where possible.

## Destructive

- Use explicit destructive wording and semantics.
- Offer Cancel/back.
- Avoid ambiguous positive color.

## Loading

**[DERIVED]** Maintain layout stability when possible. Do not make the entire interface jump as data arrives.

## Success

**[DERIVED from status conventions and clarity]** Confirm meaningful completion, but do not block the next task with unnecessary celebration screens.

---

# 17. Desktop accessibility and inclusivity gate

Before finalizing:

- Text/background contrast meets appropriate accessibility needs; the playbook cites 4.5:1 for most text.
- State is not communicated by color alone.
- Body text is comfortably readable.
- Thin/light typography is not used where it degrades legibility.
- Text over imagery has protection against varying backgrounds.
- Long text is left aligned and has reasonable line length.
- Focused interactive elements remain distinguishable.
- Error messages explain the problem in text.
- Icons that are not universally understood have labels or accessible names.

**[DERIVED]** Also verify keyboard navigation, visible focus, logical focus order, and non-hover access to important content.

---

# 18. Desktop redesign procedure

When given an existing screenshot/codebase, do not redesign by taste alone.

## Phase 1 — Diagnose

List problems under:

- goal/task mismatch,
- hierarchy,
- proximity,
- clarity,
- alignment,
- contrast,
- simplicity,
- whitespace,
- layout,
- balance/harmony,
- consistency,
- visual cues,
- depth/texture,
- color,
- typography,
- interaction cost,
- states,
- desktop ergonomics.

For every issue give:

- observed problem,
- why it harms use,
- principle violated,
- specific fix,
- priority: critical / high / medium / polish.

## Phase 2 — Reconstruct structure

Rebuild:

1. user goal,
2. content priority,
3. task flow,
4. grouping,
5. layout/grid,
6. component roles.

## Phase 3 — Apply system

Define:

- typography scale,
- spacing scale,
- color roles,
- radii,
- border roles,
- shadow roles,
- icon family,
- button hierarchy,
- field styles,
- surface hierarchy.

## Phase 4 — Add desktop behavior

Specify:

- resize behavior,
- hover/pressed/focus states,
- keyboard access where relevant,
- scroll regions,
- sticky regions only when justified,
- overflow behavior,
- density states if needed.

## Phase 5 — Validate

Use the final checklist below.

---

# 19. Design output contract

When asked to create a desktop UI specification, output in this order unless the user asks for a different format:

1. **Design objective**
2. **Primary user/task**
3. **Information priority**
4. **Task flow / interaction-cost decisions**
5. **Page structure and layout**
6. **Desktop grid/resizing behavior**
7. **Component inventory**
8. **Hierarchy and spacing rules**
9. **Typography rules**
10. **Color and state system**
11. **Surface/border/shadow rules**
12. **Navigation behavior**
13. **Forms/input behavior**
14. **Empty/error/destructive states**
15. **Accessibility checks**
16. **What was deliberately removed or de-emphasized**
17. **Final QA checklist**

If generating code, implement the same system through reusable tokens and shared components rather than local one-off styles.

---

# 20. Desktop anti-slop guardrails

Do not generate the following by default:

- a hero-sized title inside an admin screen,
- a bento grid for unrelated information,
- cards around every piece of text,
- random gradients or blurred blobs,
- glassmorphism without a layer/legibility reason,
- giant rounded corners everywhere,
- oversized padding that lowers information utility,
- 3+ button styles with inconsistent semantics,
- icon-only navigation with unclear meaning,
- a unique accent color for each module,
- fake analytics charts used as decoration,
- excessively large imagery in task-oriented applications,
- long centered body text,
- hidden controls revealed only on hover when they are essential,
- full-width forms on large screens,
- repeated text that explains obvious UI,
- arbitrary spacing and radii.

A distinctive interface should come from the product's information model, task flow, content, brand, and purposeful composition — not ornamental randomness.

---

# 21. Final desktop QA checklist

Before approving a screen, answer yes to all relevant questions.

## Goal and interaction

- [ ] The user's main goal is obvious.
- [ ] The primary action is obvious.
- [ ] Unnecessary steps have been removed.
- [ ] Frequent actions are close to the objects they affect.
- [ ] Recognition is preferred over recall where possible.
- [ ] Repetitive actions have efficient patterns.

## Hierarchy and clarity

- [ ] Important information is visually stronger than supporting information.
- [ ] Unequal actions do not look equal.
- [ ] Labels and instructions accurately describe behavior.
- [ ] The interface is neither oversimplified nor overloaded.

## Proximity and layout

- [ ] Related items are grouped by distance.
- [ ] Unrelated groups have stronger separation.
- [ ] Main axes align consistently.
- [ ] Content order matches the user's decision order.
- [ ] Large screen width is used structurally, not wastefully.
- [ ] Focused content is not stretched unnecessarily.

## Typography

- [ ] Body text is comfortably readable.
- [ ] Long text stays near 45–75 characters per line.
- [ ] Body text is not excessively small or thin.
- [ ] Heading/body hierarchy is clear.
- [ ] Long passages are broken into paragraphs/subheads.
- [ ] Long text is left aligned.

## Color and contrast

- [ ] Primary color is used selectively.
- [ ] Status colors follow familiar conventions.
- [ ] Status is not color-only.
- [ ] Text has sufficient contrast.
- [ ] Text over images remains legible.
- [ ] Dark mode, if present, is independently designed.

## Consistency

- [ ] Radius and shape language is coherent.
- [ ] Buttons follow stable primary/secondary/tertiary roles.
- [ ] Repeated images use consistent framing.
- [ ] Repeated cards align consistently.
- [ ] Icon family/style is coherent.
- [ ] Spacing uses a system rather than random values.

## Depth and surfaces

- [ ] Whitespace is used before borders.
- [ ] Borders are thin/subtle unless a deliberate stronger treatment is justified.
- [ ] Shadows communicate elevation rather than decoration.
- [ ] Shadow hue/strength fits the background.
- [ ] Glass/overlap effects preserve readability.

## Forms and states

- [ ] Field size/format matches expected data.
- [ ] Field errors sit next to the affected field.
- [ ] Password fields use show/hide and inline validation when appropriate.
- [ ] Empty states guide the next action.
- [ ] Errors explain both problem and recovery.
- [ ] Destructive confirmations use explicit destructive semantics and a cancel path.

## Desktop behavior

- [ ] Resize behavior is defined.
- [ ] Pointer targets are not unnecessarily tiny.
- [ ] Important functionality is not hover-only.
- [ ] Keyboard/focus behavior is considered for application workflows.
- [ ] Scroll areas and sticky regions have a clear reason.

If any critical item fails, revise before visual polish.
