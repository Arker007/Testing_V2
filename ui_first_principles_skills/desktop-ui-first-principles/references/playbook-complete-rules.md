# Complete UI/UX Playbook Rules — First-Principles Interpretation

## Scope and source boundary

This reference converts the full 144-page *The UI/UX Playbook — Tips & Tricks for Exceptional Designs* into operational design rules.

Two labels are used throughout:

- **[PLAYBOOK]** = directly grounded in the uploaded playbook.
- **[DERIVED]** = a platform/application rule logically derived from the playbook's principles. It is not claimed as text from the book.

The playbook's central premise is that UI and UX are inseparable: a visually polished interface that is difficult to use fails, and a functionally sound interface that is visually weak can also fail to engage or inspire trust. Good design joins visual quality with usability.

---

# 1. First-principles design model

Before styling, reason from the user's goal.

For every screen, component, action, and decoration, answer these questions in order:

1. **What is the user's immediate goal?**
2. **What information or action is essential to that goal?**
3. **What can be removed, delayed, collapsed, or demoted?**
4. **What should the user notice first, second, and third?**
5. **Which elements belong together?**
6. **What is the shortest, clearest path to task completion?**
7. **What visual treatment communicates importance, state, and relationship without ambiguity?**
8. **What conventions should remain familiar rather than be reinvented?**
9. **What happens in empty, loading, success, error, destructive, and edge states?**
10. **Can the interface be understood without relying on color alone?**
11. **Is every visual effect helping hierarchy, clarity, separation, or brand expression?**
12. **Would removing an element improve focus without harming understanding?**

**[DERIVED] Governing rule:** Every visual element consumes one or more scarce resources — attention, space, memory, motion, time, or physical effort. It must earn that cost.

---

# 2. Visual hierarchy

## Principle

**[PLAYBOOK]** Visual hierarchy is the arrangement of interface elements to communicate relative importance. Users should not have to infer which information or action matters most.

Use a deliberate combination of:

- size,
- color,
- contrast,
- font weight,
- position,
- spacing,
- visual cues,
- prominence of controls.

## Operational rules

- Rank content before styling it.
- Give the primary action unmistakably greater emphasis than secondary or tertiary actions.
- Do not make multiple actions equal in size, contrast, and color if they have different importance.
- Keep destructive inline actions visually restrained until needed.
- Make key values more prominent than their labels when the value is what users seek.
- Do not enlarge decorative or low-priority content until it competes with important information.
- Use vibrant/accent color selectively to guide attention rather than spreading it across the whole interface.
- Darker/stronger foreground treatment can advance important elements; lighter or quieter treatment can recede supporting content.
- Use size and icons to create distinctions when a flat label:value presentation makes scanning difficult.

## Failure patterns

- Every button looks primary.
- Product imagery overwhelms price/name/action.
- Labels are larger or heavier than the values users care about.
- Accent color appears everywhere, so nothing feels important.
- Decorative cards or badges fight the actual task for attention.

---

# 3. Proximity

## Principle

**[PLAYBOOK]** The Gestalt Law of Proximity means elements placed close together are perceived as related, while separated elements are perceived as distinct.

## Operational rules

- Space labels closer to their own fields than to neighboring fields.
- Keep helper text, validation, price, metadata, and actions visually attached to the item they describe.
- Increase space between unrelated groups.
- Use proximity before adding boxes, borders, separators, or background panels.
- Keep related actions near the object or content they affect.
- Reuse the same spacing relationship for repeated structures.

## Important source example

The playbook contrasts equal label spacing that causes ambiguity with a form where a label is closer to its corresponding field and farther from the next field. The intended lesson is not a universal pixel value; it is consistent relational spacing.

---

# 4. Clarity

## Principle

**[PLAYBOOK]** Clear interfaces let users understand what they are seeing and how to interact with it without guessing.

Clarity fails in three common ways.

## 4.1 Oversimplification

- Do not remove labels or context merely to make a screen look minimal.
- Icons without sufficient meaning or labels can force users to guess.
- Simplicity is not the same as omission.

## 4.2 Overwhelming complexity

- Do not expose every possible setting, action, or metric at equal priority.
- Reduce visible choices to what is needed for the current task.
- Organize or progressively reveal secondary controls.

## 4.3 Misguided UX

- Labels and instructions must accurately describe what controls will do.
- Do not use language that conflicts with the actual interaction state.
- Do not create an interaction that technically works but causes users to misunderstand intent.

## Clarity test

A user should be able to answer quickly:

- Where am I?
- What is this?
- What can I do?
- What happens if I do it?
- What is the main next step?
- What went wrong, if anything?

---

# 5. Alignment

## Principle

**[PLAYBOOK]** Alignment creates visual order and harmony by lining up text, images, and controls along consistent axes.

## Alignment modes

### Left alignment

Use for most reading content, especially longer text, lists, labels, and scan-heavy UI.

### Right alignment

Useful for numeric values, prices, or tabular data where right edges aid comparison.

### Center alignment

Useful for short, isolated content such as titles, short CTAs, or compact hero/empty-state blocks. Avoid it for long text because each line begins at a different point and increases reading effort.

## Operational rules

- Align related elements to shared visual edges.
- Use a grid to maintain alignment across regions.
- Use auto-layout or equivalent layout systems rather than manual arbitrary positioning.
- Pick an alignment strategy and maintain it across repeated components.
- Do not align one element differently without a functional or compositional reason.

---

# 6. Contrast

## Principle

**[PLAYBOOK]** Contrast improves readability, guidance, and accessibility. It helps different things stand apart and directs focus.

## Contrast tools

1. Color
2. Font weight/style
3. Size
4. Borders/outlines
5. Shadows

## Operational rules

- Use contrast intentionally to establish hierarchy, not decoration alone.
- Maintain accessible contrast between text and background.
- The playbook cites approximately **4.5:1** as an accessible contrast ratio for most text.
- Do not create hierarchy with color only; combine color with weight, size, iconography, labels, or position.
- Borders and outlines can create contrast when two surfaces are too similar, but use them sparingly.
- Shadows can separate floating elements from the background.

## Text over images

**[PLAYBOOK]** Text that is legible on one image can fail on another. Use a treatment that survives image variation:

- overlay,
- scrim,
- gradient,
- localized shadow,
- protected text region,
- sufficiently strong text/background contrast.

The effect must support legibility rather than merely appear stylish.

---

# 7. Simplicity

## Principle

**[PLAYBOOK]** Simplicity means reducing elements and content to their essential forms so users can accomplish goals with less cognitive effort.

## Operational rules

- Keep only the information and controls needed for the user's current decision or task.
- Remove irrelevant metadata, duplicate actions, and decorative clutter.
- Do not equate simplicity with hiding critical context.
- Ask what the user needs to know before adding what the organization wants to show.
- Prefer a clear purchase/task path over a feature-heavy card or screen.

**[DERIVED]** Use progressive disclosure when information is genuinely secondary, but do not hide content that provides immediate task value.

---

# 8. Whitespace

## Principle

**[PLAYBOOK]** Whitespace is unmarked space between elements. It can be any background color or texture; it is not literally required to be white.

Whitespace improves:

- readability,
- focus,
- visual separation,
- perceived calm,
- comprehension.

## Operational rules

- Start with more whitespace than you think you need, then reduce intentionally.
- Do not begin with a compressed layout and try to rescue it later.
- Use whitespace to create grouping and hierarchy before adding containers and borders.
- Do not stretch content simply because screen space is available.
- Keep compact functional content inside a clear focal area and allow surrounding breathing room.

## Spacing and sizing system

**[PLAYBOOK]** Establish a repeatable spacing system instead of arbitrary values. The book illustrates multiples such as 4-based scales and emphasizes consistent relationships.

- Choose a base unit.
- Use predictable multiples.
- Keep related-item gaps smaller than unrelated-group gaps.
- Reapply the same spacing rules across screens.
- Avoid random values such as 19px or 31px when a system value would work.

**[DERIVED]** A practical application may use a 4-unit or 8-unit family, but the governing principle is consistency and relational meaning, not a sacred number.

---

# 9. Layout

## Principle

**[PLAYBOOK]** Layout is the framework that connects aesthetics with usability. It determines what appears where and in what order.

## Operational rules

- Arrange information in the order users need it, not in the order it was supplied by a database or brief.
- Prioritize the key visual/object when visual recognition matters.
- Use a simple column layout when it improves scanability and perceived value.
- Do not force all information into the same row simply to appear compact.
- Explore creative layouts when a standard list is bland or fails to communicate differences.
- Creativity must preserve clarity and digestibility.

## Forms inspired by final output

**[PLAYBOOK]** A form can mirror how the submitted information will appear in the result. This can make the input process more relatable and help users understand what they are creating.

Use this pattern when:

- the user is composing a profile, listing, card, page, product, resume, or structured object;
- seeing the relationship between input and final output reduces uncertainty.

Do not use it when the preview adds noise or distracts from the task.

---

# 10. Balance and harmony

## Principle

**[PLAYBOOK]** Individual design choices must work together as a coherent whole.

Apply balance through:

1. **Proportion and scale** — no single element should overpower others without reason.
2. **Color harmony** — avoid overusing one color; use harmonious supporting colors.
3. **Element relationships** — spacing, typography, sizing, and structure should feel related.

## Operational rules

- A large image can remain visually important without swallowing the title and CTA.
- Use brand/accent color to guide, not flood.
- Avoid forcing a single saturated color across every component.
- Maintain visual rhythm between image, title, metadata, and action.

---

# 11. Consistency

## Principle

**[PLAYBOOK]** Consistency creates a unified and predictable experience. It reduces learning cost, builds trust, and creates cohesion.

Consistency does not require every element to be identical. Context can change, but essential component behavior and visual language should remain stable.

## 11.1 Shape and corner radius consistency

- Use a coherent radius family.
- Do not mix rounded media with square buttons and unrelated card geometry without intent.

## 11.2 Button consistency

- Keep primary, secondary, and tertiary button treatments stable across screens.
- Do not give equivalent actions different colors on every card.
- Color differences should communicate role or state, not random local decoration.

## 11.3 Image consistency

- Normalize image dimensions, framing, cropping, or shape across repeated cards.
- Use a consistent image container when source images vary.

## 11.4 Card length consistency

- Prefer consistent heights in repeated card rows when possible.
- Keep heading and description lengths reasonably balanced.
- If content lengths vary, align CTAs to a common baseline and absorb extra space inside the card rather than letting action rows jump vertically.

## 11.5 Icon consistency

- Choose a coherent icon family and style.
- Do not casually mix filled, outlined, detailed, simplistic, and unrelated icon weights.
- Mixing styles is acceptable when it encodes function or state — for example a filled selected icon and outlined inactive icons.
- Custom icon sets are useful when they remain coherent with the brand.

---

# 12. Visual cues

## Principle

**[PLAYBOOK]** Visual cues help users understand and remember information faster than text-only presentation.

Useful cues include:

- illustrations,
- icons,
- logos,
- avatars,
- imagery,
- badges,
- familiar shapes.

## Operational rules

- Use imagery when it makes a concept easier to understand, not as filler.
- In message/inbox lists, recognizable sender imagery or logos can speed identification.
- Add icons to improve scanning where text labels alone are slow or visually repetitive.
- Do not add a different decorative icon to every item if it creates more noise than signal.

---

# 13. Depth and texture

## Principle

**[PLAYBOOK]** Depth can clarify layers, improve usability, and make interactive/floating elements easier to notice. It should not become visual clutter.

## 13.1 Shadows

Use shadows to:

- distinguish dropdowns and popovers from underlying content,
- separate controls placed over dynamic imagery/maps,
- communicate elevation.

### Shadow quality

- Prefer soft, controlled shadows to harsh, heavy shadows.
- Match shadow hue to the surrounding background when possible; pure black/gray can feel jarring on colored surfaces.
- Define a repeatable shadow system.

The playbook recommends at least three useful shadow roles:

1. **Soft** — cards, buttons, small surfaces.
2. **Medium** — floating elements such as dropdowns, modals, popovers.
3. **Strong** — elements that must clearly stand out, such as major overlays or urgent layers.

## 13.2 Backgrounds and outlines

- Slight background shifts can divide interface regions without heavy boxes.
- Outlines can create divisions and navigation clarity.
- Use the lightest mechanism that communicates structure.

## 13.3 Borders

- Avoid excessive borders around every region.
- Use thin, light borders when a boundary is needed.
- Prefer whitespace and subtle background differences when they can do the same job.
- Breaking the "thin and light" rule can be valid if a stronger border supports a deliberate visual style without overwhelming the screen.

## 13.4 Glass effect

- Glassmorphism can create depth and modernity when aligned with brand and purpose.
- It is not a default decoration.
- Use it only when text and controls remain legible over the background.
- Reject it when background complexity, weak contrast, or transparency harms readability or accessibility.

---

# 14. Color

## Principle

**[PLAYBOOK]** Color sets mood, expresses brand, supports hierarchy, and can influence behavior. It must be controlled.

## 14.1 Less is often more

- Do not cover the interface in the primary brand color.
- Reserve stronger color for important actions, interactive cues, and select highlights.
- Too many colors create visual clutter and weaken hierarchy.

## 14.2 Background color

- Neutral backgrounds often make content easier to focus on.
- Colored backgrounds can work for splash screens, headers, or special sections when the color improves the experience rather than competing with content.

## 14.3 Dark backgrounds / dark mode

- Dark UI can reduce glare in low-light contexts and support a focused visual experience.
- Offer light/dark choices where appropriate.
- A dark theme must preserve readability and hierarchy rather than merely invert colors.

## 14.4 Do not rely on color alone

For error, success, warning, or selection states, pair color with at least one additional cue:

- icon,
- label,
- explanatory text,
- shape,
- pattern,
- position/state change.

## 14.5 Follow familiar status conventions

- Error/destructive: commonly red.
- Success/safe: commonly green.

The playbook warns against arbitrary brand-colored status semantics when those choices conflict with learned conventions.

---

# 15. Typography

## Principle

**[PLAYBOOK]** Typography is a structural part of UI, not a finishing layer. Readability comes before stylistic novelty.

## 15.1 Choose a font appropriate to context

- A font should match the tone and domain.
- Serif can communicate traditional/elegant qualities.
- Script can support selected expressive/lifestyle contexts.
- Sans-serif often fits technology and modern product interfaces.
- Ensure licensing permits intended use.

## 15.2 Readability and aesthetics

- Do not choose a font that looks distinctive but is difficult to read.
- Avoid overly decorative body text.

## 15.3 Use at most two font families

- A single versatile family is often best.
- Two families can work if one has a clear role, such as headings vs body.
- More fonts usually introduce clutter and weak brand cohesion.

## 15.4 Ideal line length

The playbook gives useful body-copy targets:

- **Desktop:** roughly **45–75 characters per line**.
- **Mobile:** roughly **30–40 characters per line**.

Treat these as readability targets, not absolute rules.

## 15.5 Break long paragraphs

- Prefer shorter paragraphs.
- Create visual stopping points.
- Use subheadings to make long content easier to scan.
- Icons or dividers may reinforce sections when they add meaning.

## 15.6 Text contrast

- Avoid unnecessary pure black on pure white or pure white on pure black if a softer near-black/near-white system achieves readable contrast with a more refined result.
- This is not permission to lower contrast below accessibility needs.

## 15.7 Font weight

- Use stronger weight for headings or key points.
- Use regular/medium body weight for sustained reading.
- Do not use the same weight everywhere when hierarchy depends on typographic distinction.
- Light headings can work when hierarchy is established through size, color, spacing, or other strong cues.

## 15.8 Avoid extremes

- Avoid very light text colors that fail accessibility.
- Avoid extra-light/thin body weights that break down on small screens or low-quality displays.

## 15.9 Size communicates importance

- Important content should usually have stronger size contrast than supporting text.
- The playbook uses **16px** as a common main/body size and warns against body text below roughly **12px**.
- Platform, audience, and typeface can require adjustment.

## 15.10 Line height

The playbook recommends a practical starting range for body text of about **1.5–1.6×** text size, with tighter line height for headings.

A useful relationship is:

- large headings → tighter line height,
- smaller body text → more generous line height.

It illustrates headings around roughly **1.2–1.3×** as a practical pattern.

## 15.11 Text alignment

- Left align most long-form text.
- Center/right alignment is best reserved for short or special-purpose content.

## Typography anti-patterns from the playbook

Avoid:

- pure black/pure white everywhere without need,
- identical text color for headings and body when hierarchy disappears,
- identical weight for headings and body,
- larger line-height for headings than paragraphs,
- poor text/background contrast,
- body type that is too small,
- extra-thin body fonts,
- too many font families,
- fonts that compromise either aesthetics or readability.

---

# 16. Interaction cost

## Principle

**[PLAYBOOK]** Interaction cost is the amount of mental, physical, and time effort required for a user to reach a goal.

It has three components:

1. **Cognitive effort** — understanding, remembering, deciding.
2. **Physical effort** — clicking, tapping, typing, scrolling, moving a pointer.
3. **Time effort** — delays caused by steps, waiting, searching, or slow paths.

The goal is not literally zero interaction. The goal is to remove interaction that does not contribute to the user's task.

## Strategies

### 16.1 Keep related actions close

- Use proximity and Fitts's Law logic: controls should be near the object they affect and easy to acquire.
- Persistent playback or transport controls are a good example when frequent actions should not require navigation.

### 16.2 Minimize choice

- Do not force users to inspect large sets of equivalent options when only a small relevant set is needed.
- Curate, rank, categorize, filter, or recommend.

### 16.3 Make better use of working memory

- Break large information sets into meaningful chunks.
- Use headings and grouping instead of presenting a wall of information.
- The playbook references the familiar approximately-seven-items working-memory heuristic; use it as a heuristic, not a rigid capacity limit.

### 16.4 Reduce distractions

- Remove unrelated banners, popups, and visual noise during focused tasks.
- Protect the user's attention when reading, paying, registering, or completing a flow.

### 16.5 Promote recognition over recall

- Show familiar options, history, thumbnails, labels, icons, or "continue" states rather than asking users to remember information.

### 16.6 Streamline tasks

- Remove steps that do not affect the outcome.
- Prefill known information where appropriate.
- Use autofill and suitable defaults.

### 16.7 Reduce repetition

- Provide bulk actions, repeatable tools, autofill, templates, formulas, or automation when users must perform the same operation repeatedly.

### 16.8 Improve direct manipulation

The playbook's product-option example shows lower cost when:

- all color choices are visible rather than hidden in a dropdown,
- quantity can be changed with a direct compact selector,
- the primary purchase action sits next to the selection controls.

### 16.9 Use one-click paths carefully

A direct "Buy now" style action can lower friction when the user's intent is clear and the business model supports it. It should not remove needed review or safety steps.

---

# 17. Bonus pattern: expose useful content directly

**[PLAYBOOK]** Do not hide high-value content behind an extra promotional/banner click if the content itself is what users came for.

Benefits identified by the playbook:

- immediate value,
- reduced friction,
- more relevant first impression.

Operational rule:

- Lead with the useful content; let promotional framing support it rather than block it.

---

# 18. Bonus pattern: design fields for the data type

**[PLAYBOOK]** Do not use a one-size-fits-all input field.

Examples:

- Verification code → separated/segmented digits when that improves clarity.
- CVC → compact field sized to expected input.
- Expiry date → compact field that matches format.
- ZIP/postal code → field sized and formatted to expected value.
- Card number → longer field.

Benefits:

- lower ambiguity,
- more efficient space use,
- quicker parsing,
- fewer errors.

**[DERIVED]** Also select the appropriate platform input mode/keypad whenever possible.

---

# 19. Bonus pattern: password fields

## Avoid confirm-password fields

**[PLAYBOOK]** A second confirm-password field increases interaction cost, can force repetition after errors, and can provide a false sense of security if users copy/paste the same typo.

Prefer:

- a single password field,
- show/hide password control,
- inline password strength/rule validation.

---

# 20. Bonus pattern: destructive confirmation dialogs

**[PLAYBOOK]** For destructive actions:

- use a destructive color convention for the irreversible primary action,
- label it explicitly with the action (for example, Delete),
- provide a Cancel/back option,
- do not use a positive/safe color such as green for destruction.

For left-to-right interfaces, the playbook presents:

- Cancel on the left,
- Delete on the right,

because this aligns with backward vs forward/proceed scanning logic.

**[DERIVED]** For right-to-left interfaces, reconsider directional placement rather than blindly copying LTR order.

---

# 21. Bonus pattern: avoid long blocks of product/content text

**[PLAYBOOK]** Dense paragraphs make product information hard to scan.

Instead:

- break content into smaller logical sections,
- use concise headings,
- use icons or bullets for features where useful,
- use one- or two-column organization when it improves comparison and scan speed,
- preserve a short summary for context.

The playbook encourages adding useful value beyond a supplied brief when doing so genuinely helps the user — for example social proof, comparison data, or a feature visualization.

## Relevance guardrail

Creativity must remain relevant. Every addition should answer at least one of these:

- Does it help the user understand?
- Does it help the user decide?
- Does it help the user complete the task?
- Does it reduce uncertainty?
- Does it improve trust?

If not, omit it.

---

# 22. Bonus pattern: avoid distractions during task completion

**[PLAYBOOK]** Unrelated promotions or eye-catching content placed beside a focused task such as account creation can increase errors, abandonment, and frustration.

A relevant visual can still improve the composition when it:

- supports the brand or context,
- does not compete with the task,
- remains visually subordinate to the form/primary action.

---

# 23. Bonus pattern: do not fill the whole screen

**[PLAYBOOK]** Large displays do not require form fields and CTAs to stretch across the full width.

- Keep forms and focused tasks at a sensible reading/interaction width.
- Use surrounding whitespace to reinforce focus.
- A different background or supporting image can make unused space intentional.

---

# 24. Bonus pattern: overlapping images for depth

**[PLAYBOOK]** Overlapping imagery can create sophistication and break rigid linear layouts.

Use it carefully:

- separate overlapping shapes from clashing backgrounds,
- use an outline/background treatment that visually separates layers,
- preserve readability and clear component boundaries.

Overlap is not automatically better than a simple layout; it works only when the relationships remain legible.

---

# 25. Bonus pattern: design for the thumb zone

**[PLAYBOOK]** Mobile devices are often used one-handed. Frequently used actions should sit in areas comfortably reachable by the thumb.

- Put primary/frequent CTAs in easy reach.
- Avoid forcing repeated high-priority taps into hard-to-reach top corners.
- Consider device size and grip.

This is a mobile-specific physical-interaction principle.

---

# 26. Bonus pattern: empty states

**[PLAYBOOK]** Empty states should guide and motivate, not merely announce absence.

A useful empty state can include:

- clear explanation,
- illustration when appropriate,
- short guidance,
- examples or tips,
- a direct CTA to create/add/import/start.

Turn the empty state into the next step.

---

# 27. Bonus pattern: error states and 404 pages

**[PLAYBOOK]** Good error states should:

1. clearly communicate what went wrong,
2. provide a clear and actionable solution,
3. maintain visual consistency with the product.

A branded 404 page can use creativity, humor, illustration, or character while still providing useful recovery links.

The error experience should help the user recover rather than punish the mistake.

---

# 28. Bonus pattern: navigation dropdowns

**[PLAYBOOK]** Improve navigation dropdowns by:

- using icons as visual aids when they help users recognize item purpose,
- grouping related items into clear categories,
- using images selectively for highlighted/featured content,
- avoiding an image beside every item when that creates clutter.

Navigation visuals should increase scan speed, not merely decorate the menu.

---

# 29. Anti-pattern index

Reject or revise an interface when it exhibits several of these patterns:

- equal emphasis for unequal actions,
- information priority determined by database order,
- image dominance over core task content,
- labels detached from fields,
- oversimplified icon-only controls with unclear meaning,
- too many simultaneous options,
- inconsistent alignment,
- inconsistent radius/button/image/icon systems,
- arbitrary spacing values,
- excessive borders,
- strong black shadows on colored backgrounds,
- glassmorphism used regardless of legibility,
- accent/brand color used everywhere,
- color-only status cues,
- too many fonts,
- extra-light body type,
- unreadably small body text,
- long line lengths,
- long paragraphs without subheads,
- weak text contrast,
- hidden valuable content behind promotional gates,
- generic one-size-fits-all inputs,
- redundant confirm-password fields,
- green destructive buttons,
- dense feature paragraphs,
- promotional distractions beside high-focus tasks,
- stretched full-width forms on large screens,
- important mobile CTAs outside comfortable reach,
- dead-end empty states,
- unhelpful error messages,
- navigation menus with unstructured item dumps.

---

# 30. First-principles audit order

When reviewing a design, inspect in this order. Do not start with cosmetic polish.

1. User goal and task success
2. Required information/actions
3. Interaction cost
4. Information priority
5. Grouping/proximity
6. Layout/order
7. Alignment/grid
8. Hierarchy/contrast
9. Simplicity/clarity
10. Whitespace/spacing system
11. Typography/readability
12. Color/state semantics
13. Consistency
14. Visual cues
15. Depth/texture/borders
16. Input design
17. Empty/error/destructive states
18. Platform ergonomics
19. Brand expression
20. Decorative refinement

If an earlier layer is broken, fixing a later layer rarely solves the real problem.
