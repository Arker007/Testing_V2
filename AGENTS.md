# AGENTS.md

## Core Directives
* Token Economy: Zero fluff, greetings, or postambles. Output code/diffs directly.
* Code Edits: Return surgical diffs or targeted functions only. No full-file rewrites unless requested.
* Quality Gate: Enforce strict typing, modularity, zero compiler warnings, defensive assertions.

## File Hierarchy & Formats
| Pattern | Format / Standard | Role | Token Strategy |
| :--- | :--- | :--- | :--- |
| `src/**/*.ts` | TS Strict (`noImplicitAny`) | Business logic | Minimal JSDoc, explicit return types |
| `src/components/*.tsx` | React FC / Tailwind | UI elements | Functional, atomic, no inline styles |
| `tests/**/*.spec.ts` | Vitest / Jest | Coverage | Concise unit tests, minimal mock payloads |
| `docs/*.md` | Compact Markdown | Spec / Architecture | Bullet lists, ASCII diagrams only |
| `config/*.json` | JSON Schema | Settings | Single-line arrays, no redundant keys |

## Execution Rules
1. Context Scoping: Fetch targeted line ranges only; never load unreferenced files.
2. Syntax Density: Use ternary, nullish coalescing (`??`), and optional chaining (`?.`).
3. Comments: Max 1 inline comment per function. Document *why*, never *what*.
4. Error Handling: Unified error classes; concise guard clauses early in function execution.
5. Verification: Self-check syntax/types before emitting code.
