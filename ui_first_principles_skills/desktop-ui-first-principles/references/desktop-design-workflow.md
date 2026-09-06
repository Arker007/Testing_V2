# Desktop Design Workflow — Operational Template

Use this template when the skill must produce an actual screen, redesign plan, component specification, or implementation brief.

## A. Task model

- User:
- Context:
- Primary goal:
- Primary object:
- Primary action:
- Secondary actions:
- Destructive actions:
- Must-see data:
- Nice-to-have data:
- Repeated tasks:
- User expertise: novice / mixed / expert

## B. Interaction-cost audit

For each step in the current or proposed flow, record:

| Step | Cognitive effort | Physical effort | Time effort | Keep/change |
|---|---|---|---|---|
| 1 | | | | |

Questions:

- Can a step be removed?
- Can known data be prefilled?
- Can options be shown directly instead of hidden?
- Can related action and object be moved closer?
- Can recognition replace memory?
- Can repetitive work be batched?

## C. Information priority

Rank every visible element:

- P0 = required for immediate task
- P1 = important decision support
- P2 = useful context
- P3 = rare/secondary utility
- P4 = decorative or optional

P0/P1 receive the strongest layout positions. P3 belongs in quieter regions or overflow. P4 must justify its existence.

## D. Layout skeleton

Define:

- global navigation,
- page header/task anchor,
- primary workspace,
- contextual/secondary region,
- persistent actions,
- transient overlays,
- scroll boundaries.

Then specify resize rules for each.

## E. Design-system decisions

Record:

- spacing base/system,
- type family/families,
- type hierarchy,
- readable text width,
- radius family,
- surface hierarchy,
- border hierarchy,
- shadow hierarchy,
- icon family,
- color roles,
- status semantics,
- primary/secondary/tertiary button behavior.

## F. State matrix

For each component/screen consider:

- default,
- hover,
- focus,
- active/pressed,
- selected,
- disabled,
- loading,
- empty,
- error,
- success,
- no permission,
- destructive confirmation.

Only include states that are meaningful for that component.

## G. Final reduction pass

Ask of every element:

1. Does it serve the user goal?
2. Does it communicate necessary information or action?
3. Is it at the correct hierarchy level?
4. Is it grouped with related content?
5. Does it add avoidable interaction cost?
6. Could whitespace/alignment replace its border/card?
7. Could a familiar convention communicate it more clearly?
8. If removed, what breaks?

If the answer to 8 is "nothing", remove it.
