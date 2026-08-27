import re

with open('apps/web/src/index.css', 'r') as f:
    content = f.read()

new_typography = """/* Base font family for the entire document */
html, body, #root {
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-base);
  font-size: var(--font-size-md);
  color: var(--text-primary);
  line-height: var(--line-height-body);
}

/* Semantic Typography Classes */
.text-display {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  letter-spacing: var(--tracking-display);
}
.text-h1 {
  font-family: var(--font-family-primary);
  font-size: 48px;
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  letter-spacing: var(--tracking-h1);
}
.text-h2 {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
  letter-spacing: var(--tracking-h2);
}
.text-h3 {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
  letter-spacing: var(--tracking-h3);
}
.text-h4 {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
  letter-spacing: var(--tracking-h4);
}
.text-body-lg {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);
}
.text-body {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);
}
.text-label {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-body);
}
.text-caption {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-body);
}
.text-micro {
  font-family: var(--font-family-primary);
  font-size: 12px;
  font-weight: var(--font-weight-medium);
}

/* H1: Display / Hero */
h1,
.page-title,
.pageTitle,
.hero-title,
.heroTitle,
.hero-heading,
.heroHeading,
.mainTitle,
[class*="heroTitle"],
[class*="heroHeading"] {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  letter-spacing: var(--tracking-display);
}

/* H2: Section */
h2,
.section-title,
.sectionTitle,
.sectionHeader,
.sectionHeading,
.section-heading,
.heading-h2,
[class*="sectionTitle"],
[class*="sectionHeading"] {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
  letter-spacing: var(--tracking-h2);
}

/* H3: Subheading */
h3,
.heading-h3,
[class*="h3Title"] {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
  letter-spacing: var(--tracking-h3);
}

/* H4: Card Title */
h4,
h5,
.card-title,
.cardTitle,
.card-heading,
.cardHeading,
.itemTitle,
.featureTitle,
.productCardTitle,
[class*="cardTitle"],
[class*="cardHeading"] {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
  letter-spacing: var(--tracking-h4);
}

/* Body Large */
.body-l,
.bodyL,
.text-lg,
.heroDescription,
.section-subtitle,
.sectionSubtitle,
.lead-text,
.lead {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);
}

/* Body Content */
body,
p,
li,
td,
input,
textarea,
select,
.body-copy,
.bodyCopy,
.section-desc,
.sectionDesc,
.description,
.banner-description,
.ctaDescText,
.indDesc,
.catCardDesc,
.projDetail,
.cardDesc,
.featureDesc,
.stepDesc,
.valuePropDesc,
.listDescription,
.modalDescription,
.testimonialQuote {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);
}

/* Small / Label */
small,
label,
.badge,
.tag,
.pill,
.chip,
.caption,
.statSubtext,
.footerNote,
.hintText,
.small-label,
.small,
.subtext,
.secondary-text,
.secondaryText,
.text-secondary-detail,
[class*="badge"],
[class*="label"],
[class*="tag"],
[class*="eyebrow"] {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-body);
}

/* Button */
button,
.btn,
.button,
.exploreBtnGlobal,
[class*="btn"],
[class*="Button"],
[class*="button"] {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
}

/* Nav */
nav,
nav a,
.nav-link,
.navLink,
.navItem,
.breadcrumbItem,
[class*="navLink"],
[class*="dropdownBtn"],
[class*="menuItem"],
[class*="nav_item"] {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
}

/* ==========================================================================
   MOBILE TYPOGRAPHY SCALE (max-width: 768px)
   ========================================================================== */
@media (max-width: 768px) {
  /* 1. Display / Hero Title - 32px (2rem) */
  h1,
  .hero-title,
  .heroTitle,
  .hero-heading,
  .heroHeading,
  .mainTitle,
  [class*="heroTitle"],
  [class*="heroHeading"] {
    font-size: 32px;
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-tight);
  }

  /* 2. Page Title / H1 - 28px (1.75rem) */
  .page-title,
  .pageTitle {
    font-size: 28px;
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-heading);
  }

  /* 3. Section Title / H2 - 24px (1.5rem) */
  h2,
  .section-title,
  .sectionTitle,
  .sectionHeader,
  .sectionHeading,
  .section-heading,
  .heading-h2,
  [class*="sectionTitle"],
  [class*="sectionHeading"] {
    font-size: 24px;
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-heading);
  }

  /* 4. Subheading / H3 - 20px (1.25rem) */
  h3,
  .heading-h3,
  [class*="h3Title"] {
    font-size: 20px;
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-heading);
  }

  /* 5. Card Title / H4 - 18px (1.125rem) */
  h4,
  h5,
  .card-title,
  .cardTitle,
  .card-heading,
  .cardHeading,
  .itemTitle,
  .featureTitle,
  .productCardTitle,
  [class*="cardTitle"],
  [class*="cardHeading"] {
    font-size: 18px;
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-heading);
  }

  /* 6. Body Large - 16px (1rem) */
  .body-l,
  .bodyL,
  .text-lg,
  .heroDescription,
  .section-subtitle,
  .sectionSubtitle,
  .lead-text,
  .lead {
    font-size: 16px;
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body);
  }

  /* 7. Body Content - 15px (0.9375rem) */
  body,
  p,
  li,
  td,
  input,
  textarea,
  select,
  .body-copy,
  .bodyCopy,
  .section-desc,
  .sectionDesc,
  .description,
  .banner-description,
  .ctaDescText,
  .indDesc,
  .catCardDesc,
  .projDetail,
  .cardDesc,
  .featureDesc,
  .stepDesc,
  .valuePropDesc,
  .listDescription,
  .modalDescription,
  .testimonialQuote {
    font-size: 15px;
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body);
  }

  /* 8. Small / Label - 13px (0.8125rem) */
  small,
  label,
  .badge,
  .tag,
  .pill,
  .chip,
  .caption,
  .statSubtext,
  .footerNote,
  .hintText,
  .small-label,
  .small,
  .subtext,
  .secondary-text,
  .secondaryText,
  .text-secondary-detail,
  [class*="badge"],
  [class*="label"],
  [class*="tag"],
  [class*="eyebrow"] {
    font-size: 13px;
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-body);
  }

  /* 9. Button - 15px */
  button,
  .btn,
  .button,
  .exploreBtnGlobal,
  [class*="btn"],
  [class*="Button"],
  [class*="button"] {
    font-size: 15px;
  }

  /* 10. Nav - 15px */
  nav,
  nav a,
  .nav-link,
  .navLink,
  .navItem,
  .breadcrumbItem,
  [class*="navLink"],
  [class*="dropdownBtn"],
  [class*="menuItem"],
  [class*="nav_item"] {
    font-size: 15px;
  }
}
"""

start_str = "/* Base font family for the entire document */"
end_str = ".exploreBtnGlobal {"

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_typography + content[end_idx:]
    with open('apps/web/src/index.css', 'w') as f:
        f.write(new_content)
    print("Updated index.css successfully.")
else:
    print("Could not find start or end strings.")

