# Mobile Design Workflow — Operational Template

## A. Task model

- User:
- Context of use:
- Immediate goal:
- Primary object:
- Primary action:
- Secondary actions:
- Destructive actions:
- Must-see information:
- Below-the-fold information:
- Typing required:
- One-hand priority: high / medium / low

## B. Interaction-cost audit

For every step:

| Step | Taps | Typing | Scroll/reach | Cognitive effort | Keep/change |
|---|---:|---:|---|---|---|
| 1 | | | | | |

Questions:

- Can this tap be removed?
- Can this value be prefilled?
- Can this option be visible instead of hidden?
- Can this control move into easier thumb reach?
- Can the user recognize instead of remember?
- Can this content be shown directly instead of gated?

## C. Information priority

- P0 = needed now
- P1 = important supporting decision
- P2 = useful later in the scroll
- P3 = rare secondary utility
- P4 = decorative/optional

Place P0/P1 early. P3 belongs behind lower emphasis or secondary access. P4 must justify its screen cost.

## D. Vertical screen skeleton

1. Top orientation/context
2. Critical content
3. Primary action or task control
4. Supporting details
5. Secondary sections
6. Rare actions

Modify when task logic requires it, but preserve a deliberate order.

## E. Thumb-zone map

Classify controls:

- Easy reach: high-frequency, primary.
- Stretch: secondary.
- Hard reach: rare/navigation only.

If a high-frequency action sits in the hard zone, redesign placement.

## F. Input plan

For every field record:

- expected data type,
- visual width/structure,
- keyboard/input mode,
- autofill possibility,
- validation rule,
- error message,
- next-field behavior.

## G. State matrix

Consider:

- default,
- pressed,
- selected,
- disabled,
- loading,
- empty,
- error,
- success,
- offline,
- permission denied,
- destructive confirmation,
- keyboard open.

Only include states that are meaningful.

## H. Final reduction pass

Ask of every element:

1. Does it help the current task?
2. Is it needed now?
3. Is it in the correct hierarchy position?
4. Is it comfortably reachable if frequently used?
5. Does it add a tap or memory burden?
6. Could grouping/whitespace communicate the same thing more simply?
7. Could a familiar convention reduce explanation?
8. If removed, what breaks?

If the answer to 8 is "nothing", remove it.
