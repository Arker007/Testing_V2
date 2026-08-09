# Admin Panel Improvement Audit
> Industry standard design & UX review — March 10, 2026

---

## 🔴 Critical — Security / Correctness

### 1. Token Auth Uses `localStorage` — Vulnerable to XSS
- `admin_token` stored in `localStorage` is accessible to any JS on the page
- If a dependency or injected script runs, the token is stolen
- **Fix:** Move to `httpOnly` cookie set by the server; remove `localStorage.getItem("admin_token")` from all client-side fetch headers

### 2. Auth Check Only Runs on Mount — No Route-Level Guard
- `AdminLayout` checks `!token` in a `useEffect` which runs *after* render — the admin UI briefly flashes before redirect
- **Fix:** Check token synchronously before render; use a proper `<ProtectedRoute>` wrapper that returns `null` or a redirect before mounting children

### 3. `alert()` Used for Error Feedback
- `alert("Product not found")`, `alert("Upload failed")` in `AdminProductEditor` block the browser thread and look unprofessional
- **Fix:** Replace with inline toast/snackbar notification component

### 4. No CSRF Protection on Mutating API Calls
- `POST`/`PUT`/`DELETE` calls only use a Bearer token — no CSRF token in headers
- **Fix:** Add a `X-CSRF-Token` header or use `SameSite=Strict` cookies when switching to cookie auth

---

## 🟠 High Priority — UX & Consistency

### 5. Admin Sidebar Nav Links Have Old `0.15s` Transition ✅
- `.navItem` uses `transition: all .15s` — inconsistent with the `0.2s cubic-bezier(0.4,0,0.2,1)` standard now on the frontend
- Active state `.navActive` has no left accent bar (unlike the mobile drawer which has `::before`)
- **Fix:** Update to `0.2s cubic-bezier(0.4,0,0.2,1)`, add `::before` left accent bar on `.navActive`
- **Status:** Fixed in `AdminLayout.module.css` — explicit 3-property transition, `::before` 3px green accent bar on active + hover-ready state

### 6. `welcomeQuickBtn` Transition is `0.15s` / `all` ✅
- Uses `transition: all .15s` — same inconsistency
- **Fix:** Explicit property transitions with `0.2s cubic-bezier(0.4,0,0.2,1)`
- **Status:** Fixed in `Dashboard.module.css` — 5-property explicit transition + `translateY(-2px)` lift + brand-colored glow on hover

### 7. Media & Table Card Hover Transitions are `0.15s` / `0.1s` ✅
- `Media.module.css` `.card`: `transition: all .2s`
- `AdminTable.module.css` `.trow`: `transition: background .1s`
- `.imgAdd`, `.copyBtn`, `.filterSelect` all use `0.15s`
- **Fix:** Normalize to `0.2s cubic-bezier(0.4,0,0.2,1)` across all admin interactive elements
- **Status:** Fixed in `Media.module.css` (card explicit + `::before` accent bar, copyBtn explicit) and `AdminTable.module.css` (trow, imgAdd, searchInput all standardized)

### 8. Dashboard `statsRow` Only Shows 3 of 6 Columns ✅
- `.statsRow` is `repeat(6, 1fr)` but only 3 `StatCard` components are rendered — leaves 3 empty columns
- Cards look narrow and stretched on wide screens
- **Fix:** Change grid to `repeat(auto-fill, minmax(160px, 1fr))` or render all 6 stat slots
- **Status:** Fixed in `Dashboard.module.css` — changed to `repeat(auto-fill, minmax(160px, 1fr))`

### 9. No Empty State on Dashboard Stats When API Fails ✅
- If `/api/stats` fails, all stat values show `0` silently — admin can't distinguish zero from a fetch error
- **Fix:** Track error state and show a subtle "Could not load" indicator on failed stat cards
- **Status:** Fixed in `Dashboard.jsx` — `statsError` state; `.catch` sets flag; amber warning banner renders above stats row when fetch fails

### 10. `SiteContent.module.css` Tabs Use `transition: all .15s` ✅
- `.tab` uses `transition: all .15s` — inconsistent
- **Fix:** `0.2s cubic-bezier(0.4,0,0.2,1)` with explicit properties
- **Status:** Fixed in `SiteContent.module.css` — 3-property explicit transition

---

## 🟡 Medium Priority — Polish & Hierarchy

### 11. No `prefers-reduced-motion` Guard on Admin Skeletons ✅
- `Media.module.css` `.skele` shimmer runs unconditionally
- **Fix:** Wrap in `@media (prefers-reduced-motion: no-preference)` same as frontend fix #11
- **Status:** Fixed in `Media.module.css` — animation moved inside `@media (prefers-reduced-motion: no-preference)` guard

### 12. `welcomeSub` Text Contrast Too Low in Dark Banner ✅
- `.welcomeSub` uses `rgba(255,255,255,.5)` — same WCAG failure as the public site
- **Fix:** Raise to `rgba(255,255,255,.72)` minimum
- **Status:** Fixed in `Dashboard.module.css` — raised from `.5` to `.72`

### 13. `Login.module.css` `.brandDesc` and `.feature` Contrast Too Low ✅
- `.brandDesc: rgba(255,255,255,.5)`, `.feature: rgba(255,255,255,.6)` — both below WCAG AA
- **Fix:** Raise to `.72` and `.75` respectively
- **Status:** Fixed in `Login.module.css` — `.brandDesc` raised to `.72`, `.feature` raised to `.75`

### 14. No `:focus-visible` Styles Inside Admin ✅
- The global `index.css` `:focus-visible` rule applies, but admin-specific inputs (`.searchInput`, `.filterSelect`, `.paddedInput`) override focus with just `border-color` — no ring on button elements
- **Fix:** Verify all admin form controls show the branded focus ring; remove `outline: none` overrides
- **Status:** Fixed in `AdminTable.module.css` — `.searchInput` and `.filterSelect` both get `:focus-visible` rule with brand border + `0 0 0 3px rgba(52,174,112,.12)` ring; `outline:none` moved inside the focus rule so keyboard users get a visible indicator

### 15. Topbar Has No Shadow / Depth Separation ✅
- `.topbar` uses only `border-bottom: 1px solid #e2e8f0` against a `#f1f5f9` background — barely visible
- **Fix:** Add `box-shadow: 0 1px 4px rgba(0,0,0,.06)` for clear depth separation from page content
- **Status:** Fixed in `AdminLayout.module.css` — `box-shadow: 0 1px 4px rgba(0,0,0,.06)` added to `.topbar`

### 16. `AdminTable` Search Input Transition is `0.15s` ✅
- `.searchInput` uses `transition: border-color .15s` — inconsistent
- **Fix:** `transition: border-color 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)`
- **Status:** Fixed during High Priority #7 batch

### 17. `Dashboard.module.css` `welcomeTitle` Emoji is Hardcoded ✅
- `👋` is hardcoded in JSX — not accessible; screen readers announce the emoji name
- **Fix:** Wrap emoji in `<span aria-hidden="true">` or remove it
- **Status:** Fixed during High Priority #9 batch — emoji wrapped in `<span aria-hidden="true">`

---

## 🟢 Low Priority — Minor Refinements

### 18. Sidebar Collapse Hides Label But Not Tooltip ✅
- When collapsed, nav icons have no visible label — `title` attribute provides a browser tooltip on hover but it's delayed and unstyled
- **Fix:** Add a CSS tooltip (`:hover::after`) to `.navItem` when sidebar is collapsed for instant label display
- **Status:** Fixed in `AdminLayout.module.css` + `AdminLayout.jsx` — added `data-label` attributes to all nav items; `.sidebarCollapsed .navItem::after { content: attr(data-label) }` shows a dark pill tooltip to the right of each icon on hover

### 19. Admin Logo Area Has No Back-to-Site Link ✅
- Clicking the logo in the admin sidebar does nothing useful (no link)
- **Fix:** Wrap logo in `<Link to="/">` with `target="_blank"` to quickly jump to the live site
- **Status:** Fixed in `AdminLayout.jsx` — logo `<div>` replaced with `<a href="/" target="_blank" rel="noopener noreferrer">`; `.logo` CSS updated with `text-decoration: none; color: inherit`

### 20. `Inquiries.module.css` `.detailKey` Width is Fixed at 90px ✅
- Long key labels get truncated on small screens
- **Fix:** Use `min-width: 90px` instead of `width: 90px` so it can expand
- **Status:** Fixed in `Inquiries.module.css` — `width: 90px` → `min-width: 90px`

### 21. Media Grid Has No Hover Accent Bar ✅
- `.card` in `Media.module.css` uses basic `translateY(-2px)` — no `::before` top bar pattern consistent with the rest of the site
- **Fix:** Add `::before` green gradient top bar matching the product/category card pattern
- **Status:** Fixed during High Priority #7 batch — `::before` gradient top bar added to `.card` in `Media.module.css`

### 22. No Confirmation Dialog on Delete Actions ✅
- Delete buttons throughout the admin (products, categories, media) have no undo or confirmation step beyond a browser `confirm()` (or none at all)
- **Fix:** Replace with an inline confirmation state ("Are you sure? Cancel / Delete") within the UI
- **Status:** Fixed in `AdminProducts.jsx` and `AdminCategories.jsx` — replaced `window.confirm()` with `confirmDelete` state; delete button click sets `confirmDelete = id`; shows inline "Delete? Yes / No" row in `rowActions`; CSS for `.confirmRow/.confirmYes/.confirmNo` added to `AdminTable.module.css`

### 23. `RichTextEditor` Has No Min-Height Constraint ✅
- The rich text editor can collapse to near-zero height when empty, making it hard to click into
- **Fix:** Add `min-height: 120px` to the editor content area
- **Status:** Pre-solved — `RichTextEditor.module.css` already has `.wrap :global(.ql-editor) { min-height: 140px }` exceeding the required minimum

---

## Summary Table

| Priority | # | Issue | Files Affected |
|---|---|---|---|
| 🔴 Critical | 1 | `localStorage` token — XSS risk | `AdminLayout.jsx`, all admin pages |
| 🔴 Critical | 2 | Auth flashes UI before redirect | `AdminLayout.jsx` |
| 🔴 Critical | 3 | `alert()` for errors | `AdminProductEditor.jsx` |
| 🔴 Critical | 4 | No CSRF protection | All mutating fetches |
| 🟠 High | 5 | Sidebar nav `0.15s` + no active bar | `AdminLayout.module.css` | ✅ |
| 🟠 High | 6 | `welcomeQuickBtn` transition `0.15s` | `Dashboard.module.css` | ✅ |
| 🟠 High | 7 | Media/table transitions inconsistent | `Media.module.css`, `AdminTable.module.css` | ✅ |
| 🟠 High | 8 | Stats grid 6-col with 3 items | `Dashboard.module.css`, `Dashboard.jsx` | ✅ |
| 🟠 High | 9 | No error state on stat cards | `Dashboard.jsx` | ✅ |
| 🟠 High | 10 | SiteContent tab `0.15s` transition | `SiteContent.module.css` | ✅ |
| 🟡 Medium | 11 | No `prefers-reduced-motion` on admin skeletons | `Media.module.css` | ✅ |
| 🟡 Medium | 12 | `welcomeSub` contrast too low | `Dashboard.module.css` | ✅ |
| 🟡 Medium | 13 | Login brand text contrast too low | `Login.module.css` | ✅ |
| 🟡 Medium | 14 | Focus ring not enforced on admin inputs | `AdminTable.module.css`, `Login.module.css` | ✅ |
| 🟡 Medium | 15 | Topbar no depth shadow | `AdminLayout.module.css` | ✅ |
| 🟡 Medium | 16 | Search input transition `0.15s` | `AdminTable.module.css` | ✅ |
| 🟡 Medium | 17 | Hardcoded emoji not accessible | `Dashboard.jsx` | ✅ |
| 🟢 Low | 18 | Collapsed sidebar has no CSS tooltip | `AdminLayout.module.css` | ✅ |
| 🟢 Low | 19 | Logo has no back-to-site link | `AdminLayout.jsx` | ✅ |
| 🟢 Low | 20 | `.detailKey` fixed width truncates | `Inquiries.module.css` | ✅ |
| 🟢 Low | 21 | Media card no accent bar | `Media.module.css` | ✅ |
| 🟢 Low | 22 | No confirm dialog on deletes | All admin editor pages | ✅ |
| 🟢 Low | 23 | `RichTextEditor` no min-height | `RichTextEditor.module.css` | ✅ |
