# Plan: Vishal Enterprise Website — Full Professional Audit & Improvement Roadmap

**Summary:** A deep audit of all 20 key source files (pages, components, server, config) reveals critical gaps across SEO, security, accessibility, conversion, and architecture. The most severe issues include ephemeral SQLite on Vercel (data loss on every cold start), fake product reviews shipped as real social proof, unprotected admin write routes, and zero per-page meta tags. This plan documents every issue by category with severity, root cause, solution, implementation advice, and industry benchmarks — followed by a prioritized 10-point execution roadmap.

---

## Part 1 — Design Problems

---

### D1 — No Mobile Breakpoint in Footer
**Severity: High**
**File:** [frontend/src/components/Footer.module.css](frontend/src/components/Footer.module.css)

**Problem:** `Footer.module.css` has only one breakpoint: `@media (max-width: 1024px) { grid: 1fr 1fr }`. At 375px (iPhone SE), both columns are ~155px wide — contact list and certifications aggressively word-wrap, overlapping icons and text.

**Solution:** Add `@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } .bottom { justify-content: center; text-align: center; } }`

**Industry example:** Shopify's footer collapses to single-column at 480px with centred copyright.

---

### D2 — Stats Grid Overflows at 500–767px
**Severity: Medium**
**File:** [frontend/src/pages/Home.module.css](frontend/src/pages/Home.module.css)

**Problem:** `.statsGrid` uses `repeat(4, 1fr)` and only breaks to `repeat(2, 1fr)` at 768px. On 500–767px viewports the 4-column grid overflows horizontally, causing horizontal scroll.

**Solution:** Add `@media (max-width: 640px) { .statsGrid { grid-template-columns: repeat(2, 1fr); } }` and at `@media (max-width: 360px) { grid-template-columns: 1fr; }`.

---

### D3 — Layout Jank on Home Page Category Load
**Severity: Medium**
**File:** [frontend/src/pages/Home.jsx](frontend/src/pages/Home.jsx)

**Problem:** Fallback `PRODUCTS_PREVIEW` static array and live `catGrid` from API render with different component structures. The page visually shifts (CLS) when categories arrive asynchronously.

**Solution:** Add a skeleton placeholder grid while categories load — render 4–6 skeleton cards with the same dimensions as real category cards. Use `opacity: 0.5` pulsing animation via CSS. Remove `PRODUCTS_PREVIEW` fallback entirely.

---

### D4 — Hardcoded Brand Colour #34ae70 in 30+ Places
**Severity: Medium**
**Files:** [frontend/src/components/Footer.module.css](frontend/src/components/Footer.module.css), [frontend/src/components/Navbar.module.css](frontend/src/components/Navbar.module.css), [frontend/src/pages/Home.module.css](frontend/src/pages/Home.module.css)

**Problem:** `#34ae70` is hardcoded across all CSS modules instead of using the `var(--brand)` CSS variable already defined in `index.css`. Any brand colour change requires editing 30+ lines.

**Solution:** Global find-and-replace all `#34ae70` occurrences with `var(--brand)`. Verify `--brand` is set in `:root` in `index.css`.

**Industry example:** Every major design system (Material, Atlassian, Shopify Polaris) uses design tokens.

---

### D5 — Navbar: No skip-navigation Link
**Severity: Medium**
**File:** [frontend/src/components/Navbar.jsx](frontend/src/components/Navbar.jsx)

**Problem:** No `<a href="#main-content" class="skip-nav">Skip to content</a>` before the `<header>`. Keyboard and screen-reader users must tab through all nav links on every page.

**Solution:** Add a visually-hidden skip link as the very first element in `App.jsx`'s `PublicLayout`, revealed on focus. Target `<main id="main-content">` wrapping the `<Outlet />`.

**Industry example:** GOV.UK, Apple.com, and GitHub all implement skip links.

---

### D6 — Weak CTA Copy
**Severity: Medium**
**File:** [frontend/src/pages/Home.jsx](frontend/src/pages/Home.jsx)

**Problem:** Home page CTA banner button reads "Start Partnership" — vague, no urgency, no value proposition. B2B buyers respond to specific, benefits-led CTAs.

**Solution:** Replace with "Get a Free Bulk Quote" or "Request Wholesale Pricing". Update the CMS key `cta_label` default.

**Industry example:** IndiaMART uses "Get Best Price", AlibabaB2B uses "Request Best Price & Terms".

---

### D7 — Confusing "Est. 2008" Display Order
**Severity: Low**
**File:** [frontend/src/pages/About.jsx](frontend/src/pages/About.jsx)

**Problem:** Hero stat renders value first, then label — displays as `2008 Est.` instead of the conventional `Est. 2008`. Reads oddly, especially for international buyers.

**Solution:** Swap value/label render order in the hero stats component, or use the pattern `"Est. {year}"` as a single string.

---

### D8 — Hero Subtitle Contradicts yearsExperience
**Severity: Low**
**File:** [frontend/src/pages/About.jsx](frontend/src/pages/About.jsx)

**Problem:** Hero subtitle hardcodes "20 years..." but `co('yearsExperience', '15')` in other sections says 15 years. Contradictory messaging erodes trust.

**Solution:** Replace all hardcoded year references with `co('yearsExperience')` consistently across About, Home, and Footer.

---

## Part 2 — Performance Issues

---

### P1 — Font Awesome Full Bundle via CDN
**Severity: High**
**File:** [frontend/index.html](frontend/index.html)

**Problem:** `all.min.css` loads ~400KB of CSS + webfont files covering thousands of icons. The site uses only a small subset (solid + brands). CDN introduces a render-blocking external request.

**Solution:** Replace with a self-hosted subset kit — use FontAwesome's subsetting tool or `fontawesome-subset` npm package. Alternatively, migrate to self-hosted SVGs via `lucide-react` (already in dependencies).

**Industry example:** Google, Vercel, and Linear all use SVG icon libraries, not icon fonts.

---

### P2 — framer-motion + lucide-react Are Unused Dependencies
**Severity: High**
**File:** [frontend/package.json](frontend/package.json)

**Problem:** `framer-motion` (~140KB gzipped) and `lucide-react` are listed as dependencies but not visibly used in any component. They bloat the bundle.

**Solution:** Run `npm ls --depth=0` and `grep -r "framer-motion\|lucide-react" src/` to confirm. Remove unused packages. Bundle savings: ~150–180KB gzipped.

---

### P3 — Counter Animation Uses setInterval Instead of requestAnimationFrame
**Severity: Medium**
**File:** [frontend/src/pages/Home.jsx](frontend/src/pages/Home.jsx)

**Problem:** `Counter` component fires `setInterval` every ~30ms triggering many React re-renders on slower devices.

**Solution:** Replace with `requestAnimationFrame`-based loop — compute delta from elapsed time, call `setCount`, and `cancelAnimationFrame` on unmount. React re-renders are batched naturally.

---

### P4 — Logo Image Has No Width/Height (CLS Risk)
**Severity: Medium**
**File:** [frontend/src/components/Navbar.jsx](frontend/src/components/Navbar.jsx)

**Problem:** Logo `<img>` has no `width` / `height` HTML attributes and no `fetchpriority="high"`. If a logo image is set via CMS, browser cannot reserve layout space, causing CLS (Cumulative Layout Shift) — a Core Web Vitals metric.

**Solution:** Add explicit `width="120" height="40"` (or whatever the logo dimensions are) and `fetchpriority="high"` to the logo `<img>`. In `OptimizedImage`, expose a `priority` prop that sets `fetchpriority="high" loading="eager"`.

---

### P5 — No Cache-Control Headers for Static Assets
**Severity: Medium**
**File:** [vercel.json](vercel.json)

**Problem:** Vercel serves `/assets/*` and `/uploads/*` with default headers. Hashed Vite build files should be cached for 1 year immutably; upload images should be cached for at least 7 days.

**Solution:** Add to `vercel.json`:
```json
"headers": [
  { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
  { "source": "/uploads/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=604800" }] }
]
```

---

### P6 — Heavy Gradient Layers on Hero (Low-End GPU Cost)
**Severity: Low**
**File:** [frontend/src/pages/Home.module.css](frontend/src/pages/Home.module.css)

**Problem:** `.heroBg::after` stacks two nested `radial-gradient` layers on top of the parent's 3-layer gradient — all on a full-viewport absolute element. This is GPU-heavy on low-end Android devices.

**Solution:** Flatten to a single `radial-gradient` + `linear-gradient` on the element itself using CSS multiple backgrounds shorthand. Remove the `::after` pseudo-element.

---

## Part 3 — SEO Weaknesses

---

### S1 — No Per-Route `<title>` or `<meta description>` (CRITICAL)
**Severity: High**
**All pages**

**Problem:** Every page — Home, Products, ProductDetail, About, Contact — shares the identical `index.html` static title `"Vishal Enterprise | Sustainable Plastic Manufacturing"` and the same `<meta description>`. Google cannot distinguish pages. Product pages have no individual title, making them unfindable by product name.

**Solution:** Add `react-helmet-async` (or use the native `document.title` + a `useDocumentTitle` hook). Each page sets its own `<title>` and `<meta name="description">`.

Examples:
- Home: `"Recycled Plastic Pallets & Industrial Containers | Vishal Enterprise"`
- Products: `"Our Products – Plastic Pallets, Crates, Drums | Vishal Enterprise"`
- ProductDetail: `"{product.name} – {product.category} | Vishal Enterprise"`
- About: `"About Us – 15 Years of Sustainable Manufacturing | Vishal Enterprise"`
- Contact: `"Contact Us – Get a Bulk Quote | Vishal Enterprise"`

**Industry example:** IndiaMART generates unique `<title>` + `<meta description>` for every product listing.

---

### S2 — No og:image, og:url, or Twitter Card Meta Tags
**Severity: High**
**File:** [frontend/index.html](frontend/index.html)

**Problem:** No `og:image` defined. All WhatsApp/LinkedIn/Twitter shares of any URL render as a blank link with no image — click-through rates drop by ~3×. B2B buyers share product links over WhatsApp constantly.

**Solution:** Add to `index.html`:
```html
<meta property="og:image" content="/og-image.jpg" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Vishal Enterprise" />
<meta name="twitter:card" content="summary_large_image" />
```
Create a 1200×630px branded OG image asset.

---

### S3 — Favicon is Vite Default Logo
**Severity: High**
**File:** [frontend/index.html](frontend/index.html)

**Problem:** `<link rel="icon" href="/vite.svg" />` — the Vite logo appears on browser tabs and bookmarks. This is an amateur signal visible to every visitor and business contact.

**Solution:** Replace with a branded favicon: compress the company logo to 32×32 and 180×180 (Apple touch icon) PNG formats. Add `apple-touch-icon` link tag.

---

### S4 — No Structured Data (JSON-LD) on Any Page
**Severity: High**
**Files:** [frontend/src/pages/ProductDetail.jsx](frontend/src/pages/ProductDetail.jsx), [frontend/src/pages/Contact.jsx](frontend/src/pages/Contact.jsx)

**Problem:** No `Product`, `LocalBusiness`, or `BreadcrumbList` JSON-LD schemas. Rich results (star ratings, product info, business hours, address) are completely absent from Google search results.

**Solution:**
- `ProductDetail.jsx`: Inject `<script type="application/ld+json">` with `@type: "Product"` including `name`, `image`, `description`, `brand`, `offers`, `sku`.
- `Contact.jsx`: Inject `@type: "LocalBusiness"` with address, phone, coordinates, opening hours.
- `App.jsx` or each page: Inject `BreadcrumbList` schema matching the visible breadcrumb.

**Industry example:** Flipkart, Amazon, and IndiaMart all use Product schema — they dominate rich results.

---

### S5 — Breadcrumbs Show Literal Placeholder Strings
**Severity: High**
**File:** [frontend/src/pages/ProductDetail.jsx](frontend/src/pages/ProductDetail.jsx)

**Problem:** Breadcrumbs render `<Link>Category</Link>` and `<Link>Subcategory</Link>` as literal text, not real data. This is visible to users and tells Google the BreadcrumbList is synthetic.

**Solution:** Resolve actual `category.name` from the product's `categoryId` by matching against the already-fetched categories list. Display `Home > {category.name} > {product.name}`.

---

### S6 — theme-color Meta Tag is Wrong Brand Colour
**Severity: Low**
**File:** [frontend/index.html](frontend/index.html)

**Problem:** `<meta name="theme-color" content="#0ea5e9">` — this Tailwind sky-500 blue contrasts with the entire green brand identity. Mobile Chrome/Safari browser chrome shows blue.

**Solution:** Change to `content="#34ae70"` (the brand green) or `content="#0f1117"` (the dark nav background).

---

### S7 — Poor Keyword Targeting in H1/H2 Headings
**Severity: Medium**
**Files:** [frontend/src/pages/Home.jsx](frontend/src/pages/Home.jsx), [frontend/src/pages/About.jsx](frontend/src/pages/About.jsx), [frontend/src/pages/Products.jsx](frontend/src/pages/Products.jsx)

**Problem:** `<h1>` headings use generic copy ("Our Material Journey", "Our Products") with no target keywords like "recycled plastic pallets manufacturer India" or "industrial bulk containers supplier".

**Solution:** Revise all `<h1>` and primary `<h2>` CMS defaults to include 1–2 primary keywords without keyword stuffing. Add these as the admin CMS defaults.

---

### S8 — FDA Approved Listed as a Certification
**Severity: High**
**File:** [frontend/src/components/Footer.jsx](frontend/src/components/Footer.jsx)

**Problem:** The `CERTS` array includes `'FDA Approved'` — the US Food & Drug Administration has no jurisdiction over recycled plastic pallets manufactured in India. This is either factually wrong or misleading. If audited by a business or regulator, this could be a compliance issue.

**Solution:** Remove `'FDA Approved'` immediately. Replace with applicable certifications: `'BIS Certified'`, `'ISO 9001:2015'`, `'MSME Registered'`, or actual held certificates.

---

## Part 4 — Conversion & Psychology Issues

---

### C1 — Fake Product Reviews Shipped as Live Social Proof (CRITICAL)
**Severity: High**
**File:** [frontend/src/pages/ProductDetail.jsx](frontend/src/pages/ProductDetail.jsx)

**Problem:** The Reviews tab hardcodes 3 fabricated reviews ("Alex M.", "2 weeks ago", 4.1 stars based on "42 reviews") with a non-functional "Write a Review" button. This is false social proof. Any informed buyer or competitor will spot it. It could violate consumer protection laws in India (Consumer Protection Act 2019, dark patterns).

**Solution:** Remove the Reviews tab entirely until real reviews can be collected. Replace with a "Request a Testimonial" form that emails the admin. Alternatively, display only verified inquiry-based feedback logged from the `Inquiries` admin panel.

---

### C2 — "Add to Cart" Button on B2B Inquiry Site
**Severity: High**
**File:** [frontend/src/pages/ProductDetail.jsx](frontend/src/pages/ProductDetail.jsx)

**Problem:** A "Add to Cart" button fires `alert("Added X to cart!")` via a JavaScript `alert()` — a dead stub shipped to production. B2B buyers don't use shopping carts; they request quotes. The `alert()` call blocks the main thread and looks completely unprofessional.

**Solution:** Remove the "Add to Cart" button and all cart-related state (`qty`, `handleAddToCart`). Replace with a second "Request Quote" CTA button that opens the `InquiryModal`.

---

### C3 — No Response Time Commitment on Contact Page
**Severity: Medium**
**File:** [frontend/src/pages/Contact.jsx](frontend/src/pages/Contact.jsx)

**Problem:** No SLA messaging near the form. B2B buyers often won't submit until they know when to expect a response — uncertainty kills conversion.

**Solution:** Add below the form submit button: `"We typically respond within 2 business hours. For urgent inquiries call +91 XXXXX XXXXX."` Add a `responseTime` CMS key.

**Industry example:** Salesforce, HubSpot, and large B2B sites always state response SLA near forms.

---

### C4 — No "Request Quote" CTA on Products Listing Page
**Severity: Medium**
**File:** [frontend/src/pages/Products.jsx](frontend/src/pages/Products.jsx)

**Problem:** Users who can't find what they need have no off-ramp. The Products page has no visible Contact/Quote CTA in the header or sticky bar.

**Solution:** Add a sticky bar at the top of the product grid: `"Can't find what you need? Get a custom quote →"` linking to `/contact`.

---

### C5 — No autocomplete Attributes on Form Fields
**Severity: Medium**
**File:** [frontend/src/pages/Contact.jsx](frontend/src/pages/Contact.jsx)

**Problem:** All form `<input>` fields have no `autocomplete` attribute. Chrome/Safari autofill doesn't work. Mobile users must type every field manually — dramatically hurts conversion on mobile.

**Solution:** Add appropriate `autocomplete` values: `given-name`, `family-name`, `email`, `tel`, `organization`, to all form fields in Contact and InquiryModal.

---

## Part 5 — Technical Problems

---

### T1 — SQLite on Vercel Serverless = Ephemeral Data (CRITICAL)
**Severity: High**
**File:** [vercel.json](vercel.json), [server/config/database.js](server/config/database.js)

**Problem:** Vercel serverless functions run in an ephemeral filesystem. SQLite writes are lost on every deployment and between concurrent Lambda instances. The admin panel will appear to work, but all data changes disappear. The in-memory cache and `loginAttempts` rate limiter also reset per cold start — the rate limiter offers zero protection.

**Solution:** Migrate to a persistent serverless-compatible database:
- **Recommended:** [Turso](https://turso.tech) (libSQL, drop-in SQLite replacement, free tier, files stored remotely)
- Or: PlanetScale (MySQL), Neon (PostgreSQL), MongoDB Atlas
- For rate limiting: use Upstash Redis (serverless-compatible)

**Industry example:** Vercel's own docs explicitly warn against SQLite; they recommend Vercel Postgres or Neon.

---

### T2 — Wildcard CORS on All API Routes (CRITICAL)
**Severity: High**
**File:** [server/index.js](server/index.js)

**Problem:** `app.use(cors())` allows any origin to call all API endpoints including admin write routes. A malicious site can POST to `/api/admin/products` from any domain.

**Solution:**
```js
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'https://vishalenterprise.in',
  credentials: true
}));
```
Gate admin routes additionally by checking `req.headers.origin` against the whitelist.

---

### T3 — Admin Routes Have No Server-Side Auth Guard (CRITICAL)
**Severity: High**
**File:** [server/middleware/auth.js](server/middleware/auth.js)

**Problem:** Research indicates `requireAuth` middleware may be a no-op or rely solely on client-side token presence checks. Admin write routes (create/update/delete product, category, media) must verify JWT server-side on every request.

**Solution:** Ensure `requireAuth` in `auth.js` verifies the `Authorization: Bearer <token>` header using `jwt.verify(token, process.env.JWT_SECRET)` and returns 401 if invalid. Apply to all `/admin/*` routes. Rotate `JWT_SECRET` if it was ever committed to source.

---

### T4 — dangerouslySetInnerHTML on CMS Values (XSS)
**Severity: High**
**Files:** [frontend/src/pages/Home.jsx](frontend/src/pages/Home.jsx)

**Problem:** `dangerouslySetInnerHTML={{ __html: c('hero_title') }}` and checklist items are rendered directly from CMS-controlled values. A compromised or malicious admin account could inject `<script>` tags that execute for all visitors.

**Solution:** Use a sanitization library: `import DOMPurify from 'dompurify'` and wrap all CMS HTML: `dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c('hero_title')) }}`.

**Industry example:** Every major CMS (WordPress, Contentful) sanitizes output before rendering.

---

### T5 — No Global API Rate Limiting
**Severity: High**
**File:** [server/routes/api.js](server/routes/api.js)

**Problem:** No rate limiting on `/api/contact` (spam form submissions), `/api/inquiries`, or `/api/auth/login` (brute force). The existing login attempt counter in `auth.js` is in-memory and resets on every cold start.

**Solution:** Use `express-rate-limit` on all public API routes. For `/api/auth/login`, apply stricter limits (5 requests/15min). On Vercel serverless, back the store with Upstash Redis.

---

### T6 — `alert()` in Production Code
**Severity: High**
**File:** [frontend/src/pages/ProductDetail.jsx](frontend/src/pages/ProductDetail.jsx)

**Problem:** `handleAddToCart` executes `window.alert()` — a synchronous browser API that blocks the main thread, is unstyled, and looks completely unprofessional. This is a development stub.

**Solution:** Remove entirely (see C2 above). If a toast notification is needed anywhere on the site, use a lightweight library like `react-hot-toast`.

---

### T7 — Contact Form Labels Not Associated with Inputs
**Severity: High**
**File:** [frontend/src/pages/Contact.jsx](frontend/src/pages/Contact.jsx)

**Problem:** `<label>` elements exist but have no `htmlFor` attributes, and `<input>` elements have no matching `id` attributes. Labels are visual-only — clicking a label does not focus the field. Screen readers cannot associate label text with the input.

**Solution:** Add `id="firstName"` to each input and `htmlFor="firstName"` to each label. This is a 5-minute fix that doubles accessibility and usability compliance.

**Standard:** WCAG 2.1 Success Criterion 1.3.1 (Level A).

---

### T8 — Variable Shadowing Bug in Products.jsx
**Severity: Medium**
**File:** [frontend/src/pages/Products.jsx](frontend/src/pages/Products.jsx)

**Problem:** `const c = useSite().c` is the CMS helper. Inside `categories.map(c => ...)`, `c` is shadowed by the map parameter — the CMS helper is inaccessible within this callback. Any use of `c()` inside the map would silently call the wrong function.

**Solution:** Rename either: destructure as `const { c: cms } = useSite()` and use `cms()` throughout, or rename the map parameter to `cat`.

---

### T9 — Product IDs Are Enumerable Timestamps
**Severity: Medium**
**File:** [server/models/Product.js](server/models/Product.js)

**Problem:** `id = 'prod_' + Date.now()` — timestamp-based IDs are sequential and guessable. Attackers can enumerate all product IDs and product-based resources.

**Solution:** Replace with `require('crypto').randomUUID()` for both Product and Category IDs.

---

### T10 — No Pagination on Product API
**Severity: Medium**
**File:** [server/models/Product.js](server/models/Product.js)

**Problem:** `findAll` runs `SELECT *` with no `LIMIT` — returns the entire products table on every request. With 1000+ products this causes a large payload and a full table scan.

**Solution:** Add `LIMIT $limit OFFSET $offset` to the `findAll` SQL. Expose `?page=` and `?limit=` query params in the products route. Update the frontend to paginate or use infinite scroll.

---

### T11 — build Script Missing in Root package.json
**Severity: Medium**
**File:** [package.json](package.json)

**Problem:** `"build": "node scripts/build.js"` references a file that does not exist in the workspace. CI/build pipelines will fail with `MODULE_NOT_FOUND`.

**Solution:** Create `server/scripts/build.js` with the necessary build steps, or remove the script and document the correct build command in `README.md`.

---

### T12 — uncaughtException Handler Does Not Exit
**Severity: Medium**
**File:** [server/index.js](server/index.js)

**Problem:** Per Node.js documentation, after an uncaught exception the process is in an undefined state. Not calling `process.exit(1)` after logging can result in memory leaks and undefined behavior.

**Solution:** Add `process.exit(1)` after the `console.error` in the `uncaughtException` handler. A process manager (PM2, Vercel) will restart it automatically.

---

### T13 — iframe src Regex Allows Arbitrary Origins
**Severity: Medium**
**File:** [frontend/src/pages/Contact.jsx](frontend/src/pages/Contact.jsx)

**Problem:** `rawEmbed.match(/src=["'](.*?)["']/)` extracts any src value from the admin-entered map embed, including `javascript:` URIs or arbitrary cross-origin iframes.

**Solution:** After extraction, validate the URL against an allowlist: `const allowed = ['https://maps.google.com','https://www.google.com/maps'];` and reject if the hostname is not in the list.

---

## Part 6 — Branding & Positioning Gaps

---

### B1 — Generic H1 Copy Across All Pages
**Severity: High**
**Multiple files**

**Problem:** H1 headings are either generic ("Our Products", "Contact Us") or keyword-free. For a B2B manufacturer, H1s should position the company: its geography, specialisation, and target buyer.

**Solution:** Revise CMS defaults:
- Home: `"India's Leading Recycled Plastic Pallet & Container Manufacturer"`
- About: `"About Vishal Enterprise – Sustainable Plastic Manufacturing Since 2008"`
- Products: `"Recycled Plastic Products – Pallets, Crates & Industrial Containers"`

---

### B2 — No OG Image = Weak Brand on Social
**Severity: High**
**File:** [frontend/index.html](frontend/index.html)

**Problem:** (See S2.) Social shares appear as blank text links. Every WhatsApp forward, LinkedIn post, and email preview is an opportunity to reinforce brand identity.

**Solution:** Create a 1200×630px OG image with company logo, tagline, and a product hero shot. Store at `/public/og-image.jpg`.

---

### B3 — CTA Messaging Doesn't Match B2B Context
**Severity: Medium**
**Files:** [frontend/src/pages/Home.jsx](frontend/src/pages/Home.jsx)

**Problem:** "Start Partnership" and "Learn More" CTAs are generic. B2B buyers think in terms of pricing, MOQ, samples, and lead time — not "partnerships".

**Solution:** Replace all generic CTAs:
- Hero: `"Request Bulk Quote"`, `"Download Product Catalogue"`
- CTA Banner: `"Get a Free Sample Kit"` or `"Talk to Our Sales Team"`
- Product Detail: `"Request MOQ & Pricing"` instead of "Enquire Now"

---

### B4 — "20 Years Experience" vs "15 Years" Contradiction
**Severity: Medium**
**File:** [frontend/src/pages/About.jsx](frontend/src/pages/About.jsx)

**Problem:** (See D8.) Two different year counts appear on the same site. To any careful buyer or investor, this looks sloppy or dishonest.

**Solution:** Centralise all experience references to `co('yearsExperience')` with a single source of truth set in the admin panel.

---

### B5 — No Product Catalogue Download
**Severity: Medium**
**Multiple pages**

**Problem:** B2B buyers in manufacturing and logistics expect a downloadable PDF catalogue. Without one, the site cannot replace sales calls for initial qualification. It is a missed lead capture opportunity (catalogue download → email capture).

**Solution:** Add a "Download Catalogue" CTA on the Products page and Hero. Create a PDF product catalogue asset. Gate download behind an email capture form (name + email + company) to generate leads even from non-contact-form visitors.

---

---

## 10-Point Prioritized Improvement Roadmap

| # | Action | Severity | Impact |
|---|---|---|---|
| **1** | **Fix SQLite / Vercel architecture** — migrate to Turso or Neon for persistent serverless DB | 🔴 Critical | Data integrity; nothing else matters if DB resets |
| **2** | **Remove fake reviews and `alert()` stub** — delete hardcoded reviews, remove Add to Cart, add real InquiryModal CTA | 🔴 Critical | Trust & professionalism |
| **3** | **Add per-route `<title>` + `<meta description>`** via `react-helmet-async` on all 5 pages | 🔴 Critical | SEO — all other optimisations are meaningless without this |
| **4** | **Harden security** — restrict CORS to production domain, verify `requireAuth` is enforcing JWT server-side, add rate limiting | 🔴 Critical | Security |
| **5** | **Replace Vite favicon + add og:image** — brand favicon, 1200×630 og-image.jpg, twitter:card, og:url | 🟠 High | Brand + social CTR |
| **6** | **Add JSON-LD structured data** — `Product` on ProductDetail, `LocalBusiness` on Contact, `BreadcrumbList` on all pages | 🟠 High | Rich results + local SEO |
| **7** | **Fix all accessibility issues** — label/input `htmlFor`/`id` pairing, `aria-expanded` on burger, focus trap in mobile drawer, skip-nav link | 🟠 High | Legal compliance (WCAG 2.1 A) + usability |
| **8** | **Fix mobile responsiveness** — Footer 640px single-column breakpoint, statsGrid 640px breakpoint, Home category skeleton loader | 🟠 High | Mobile UX (60%+ traffic is mobile) |
| **9** | **Remove FDA Approved certification + fix CTA copy** — remove legally inaccurate claim, update all CTAs to B2B-specific language, add response SLA to Contact | 🟠 High | Trust + conversion |
| **10** | **Performance cleanup** — remove unused `framer-motion` + `lucide-react`, replace Font Awesome CDN with subset, add `Cache-Control` headers in `vercel.json`, replace `#34ae70` hardcodes with `var(--brand)` | 🟡 Medium | Page speed + maintainability |

---

## Verification

After each roadmap step, verify:
1. **Steps 1–4:** Test admin panel data persistence across Vercel deploys; run `curl -H "Origin: https://evil.com"` against admin routes to verify CORS rejection; confirm JWT is rejected on tampered tokens.
2. **Steps 5–6:** Use [Open Graph Debugger](https://developers.facebook.com/tools/debug/) and [Google Rich Results Test](https://search.google.com/test/rich-results) to validate.
3. **Steps 7–8:** Run [axe DevTools](https://www.deque.com/axe/) browser extension; test at 375px viewport in Chrome DevTools.
4. **Steps 9–10:** Check performance before/after with [PageSpeed Insights](https://pagespeed.web.dev/); run `npm run build` and inspect bundle output.

---

## Decisions

- Chose Turso over PlanetScale (MySQL) — Turso is libSQL (SQLite-compatible), requiring minimal code changes vs. a full ORM migration
- Chose `react-helmet-async` over `document.title` — handles SSR-readiness and meta description in a single API
- Chose DOMPurify over removing `dangerouslySetInnerHTML` — preserves CMS formatting capability (bold, breaks) while eliminating XSS
- Fake reviews must be removed, not "replaced with blank" — even an empty Reviews tab is better than fabricated ones