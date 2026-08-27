apps/web/src/
├── main.jsx                         # React entry point initializing StrictMode and global context
├── App.jsx                          # Router configuration, global layout wrappers, and 404 routes
│
├── shared/                          # ── 1. CORE DESIGN SYSTEM & REUSABLE UTILITIES ──
│   ├── components/                  # Application-wide UI primitives & shared components
│   │   ├── PageHero/                # 🚀 Centralized Shared Hero Banner for inner pages
│   │   │   ├── PageHero.jsx         # Reusable Hero component (About, Contact, Products, etc.)
│   │   │   ├── PageHero.module.css  # Shared glassmorphism hero styles & typography
│   │   │   └── index.js             # Barrel export for PageHero
│   │   │
│   │   ├── AnimatedFeatureIcon.jsx  # Animated SVG feature badge icon component
│   │   ├── ErrorBoundary.jsx        # Fallback UI catch wrapper for uncaught React errors
│   │   ├── InquiryModal.jsx         # Global quote and contact request popup modal
│   │   ├── OptimizedImage.jsx       # WebP image loader with blur placeholder support
│   │   ├── ProductsShowcase.jsx     # Cross-page product highlight grid
│   │   ├── QuoteButton.jsx          # Global action trigger for inquiry modals
│   │   ├── ScrollProgressBar.jsx    # Header scroll-completion progress indicator
│   │   └── ui/                      # Pure unstyled UI design system primitives
│   │       ├── Badge.jsx            # Category and status pill badge tag
│   │       ├── Button.jsx           # Reusable action button primitive
│   │       ├── Card.jsx             # Glassmorphism surface container component
│   │       └── CustomSelect.jsx     # Custom select dropdown input component
│   │
│   ├── context/
│   │   └── SiteContext.jsx          # Central CMS & company provider hook (`useSite()`)
│   │
│   ├── hooks/                       # Global application hooks
│   │   ├── useApi.js                # Standardized fetch wrapper with automatic headers & error state
│   │   ├── useDocumentTitle.js      # Dynamic document head title management hook
│   │   ├── useInquiry.js            # Customer inquiry & lead submission hook
│   │   └── useProducts.js           # Product list fetching, filtering, and pagination hook
│   │
│   ├── styles/                      # ── Global Design System Core ──
│   │   ├── index.css                # Master stylesheet importing tokens, resets, and utilities
│   │   └── core/
│   │       ├── base-reset.css       # CSS normalize and HTML element resets
│   │       ├── dark-theme.css       # Dark theme token maps (`[data-theme="dark"]`)
│   │       ├── tokens.css           # Design tokens (brand palette, typography, spacing, radii)
│   │       └── utilities.css        # Global utility classes and helper styles
│   │
│   └── utils/                       # Helper utilities & API clients
│       ├── api.js                   # Network HTTP client wrapper for Express backend endpoints
│       ├── formatters.js            # Currency, date, and string formatting functions
│       ├── parsers.js               # Product spec string & JSON parsing utilities
│       └── whatsapp.js              # Direct WhatsApp chat link generator
│
├── features/                        # ── 2. DOMAIN-SCOPED MODULES (Encapsulated) ──
│   │
│   ├── about/                       # About domain components & localized styles
│   │   ├── AboutCtaSection.jsx      # Bottom call-to-action banner for About page
│   │   ├── ExperienceBanner.jsx     # Industrial track record and manufacturing numbers banner
│   │   ├── TestimonialsSection.jsx  # Customer feedback and partner review carousel
│   │   ├── WhoWeAreSection.jsx      # Company mission and background overview
│   │   ├── WhyChooseUsSection.jsx   # Value proposition highlight grid
│   │   └── about.module.css         # Scoped styles for About feature sections
│   │
│   ├── admin/                       # Admin portal dashboard components
│   │   ├── AdminSettings.jsx        # Admin portal security and password options
│   │   ├── Dashboard.jsx            # Central dashboard metrics overview view
│   │   ├── Dashboard.module.css     # Scoped styles for admin dashboard layout
│   │   └── components/
│   │       ├── AdminCommandPalette.jsx # Keyboard search palette modal
│   │       ├── AdminLayout.jsx          # Dashboard frame wrapper layout
│   │       ├── AdminLayout.module.css  # Scoped styles for admin layout frame
│   │       ├── AdminNotificationsDropdown.jsx # Notification menu dropdown
│   │       ├── AdminSidebar.jsx         # Admin portal sidebar menu
│   │       ├── AdminTable.module.css    # Scoped styles for admin data tables
│   │       ├── AdminTopBar.jsx          # Admin header bar with profile options
│   │       ├── RichTextEditor.jsx       # Dynamic content rich text editor
│   │       └── RichTextEditor.module.css # Scoped styles for rich text editor
│   │
│   ├── auth/                        # Authentication components
│   │   ├── Login.jsx                # Admin authentication form
│   │   └── Login.module.css         # Scoped styles for login page container
│   │
│   ├── contact/                     # Contact domain components & styles
│   │   ├── ContactFaqSection.jsx     # FAQ accordion grid
│   │   ├── ContactFormSection.jsx    # Interactive quote inquiry form
│   │   ├── ContactInfoColumn.jsx     # Address, phone, and direct contact card
│   │   ├── ContactInfoItem.jsx       # Individual contact detail row item
│   │   ├── ContactTrustedRow.jsx     # Trust badges list for B2B partners
│   │   ├── ContactWorkflowSection.jsx# Customer inquiry processing steps
│   │   └── contact.module.css        # Scoped styles for contact feature components
│   │
│   ├── content-management/          # Admin CMS tree & key-value editors
│   │   ├── CompanyForm.jsx          # Company contact and profile manager
│   │   ├── SectionEditor.jsx        # Dynamic page section content manager
│   │   ├── SiteContent.jsx          # Central site CMS key-value editor
│   │   ├── SiteContent.module.css   # Scoped styles for CMS manager interface
│   │   ├── SiteContentSidebar.jsx   # CMS section selection sidebar menu
│   │   ├── TeamEditor.jsx           # Team member profile editor
│   │   └── TimelineEditor.jsx       # Company history timeline editor
│   │
│   ├── home/                        # Landing page domain components & styles
│   │   ├── HomeCtaSection.jsx       # Homepage bottom inquiry call-to-action
│   │   ├── HomeHero.jsx             # Dynamic, interactive landing hero (Custom for homepage)
│   │   ├── IndustriesGrid.jsx       # Target industry applications Bento grid
│   │   ├── IndustryCard.jsx         # Individual industry application card
│   │   ├── IndustryValueProps.jsx   # Recycled plastic manufacturing advantages
│   │   ├── ProcessSection.jsx       # Plastic recycling & production workflow steps
│   │   ├── SustainabilitySection.jsx# Environmental impact metric showcase
│   │   ├── TrustedBySection.jsx     # Client logo slider carousel
│   │   └── home.module.css          # Scoped styles for custom homepage feature modules
│   │
│   ├── inquiries/                   # Admin lead management components
│   │   ├── AdminInquiries.jsx       # Customer inquiries table overview
│   │   ├── AdminInquiryDetail.jsx    # Detailed inquiry inspection modal
│   │   └── Inquiries.module.css     # Scoped styles for lead management UI
│   │
│   ├── media/                       # Admin media explorer components
│   │   ├── AdminMedia.jsx           # Upload manager and media library grid
│   │   └── Media.module.css         # Scoped styles for media gallery
│   │
│   ├── navigation/                  # Navigation header, footer, and menu drawers
│   │   ├── AnnouncementBar.jsx      # Top alert/announcement strip banner
│   │   ├── Footer.jsx               # Site-wide links and company details footer
│   │   ├── Footer.module.css        # Scoped styles for footer section
│   │   ├── MegaMenu.jsx             # Product category rich dropdown menu
│   │   ├── MobileBottomNav.jsx      # Fixed mobile action bar
│   │   ├── MobileBottomNav.module.css # Scoped styles for mobile bottom navigation bar
│   │   ├── MobileNavDrawer.jsx      # Slide-out drawer menu for mobile screens
│   │   ├── Navbar.jsx               # Main desktop navigation header bar
│   │   ├── Navbar.module.css        # Scoped styles for desktop header bar
│   │   └── NavbarSearch.jsx         # Search overlay popup for products
│   │
│   ├── product-detail/              # Single product view components & styles
│   │   ├── ProductBenefitsGrid.jsx  # Feature benefits grid component
│   │   ├── ProductGallery.jsx       # Zoomable image gallery with thumbnails
│   │   ├── ProductHeaderSpecs.jsx   # Price, title, and key technical specifications
│   │   ├── ProductSpecsModal.jsx    # Full technical specs comparison modal
│   │   ├── ProductTabsSection.jsx   # Description, data sheet, and review tab menu
│   │   ├── RelatedProductsSection.jsx # Category-matched product slider
│   │   └── product-detail.module.css # Scoped styles for product detail view
│   │
│   └── products/                    # Catalog list, search, and category components
│       ├── MobileCategoryBar.jsx    # Horizontal mobile category filter slider
│       ├── ProductFilterSidebar.jsx # Sidebar attribute filter controls
│       ├── ProductGridCard.jsx      # Product display card for grid layout
│       ├── ProductListItemCard.jsx  # Compact product list row view
│       ├── ProductSearchHeader.jsx  # Catalog header and active filters toolbar
│       ├── QuickViewModal.jsx       # Product preview modal
│       ├── products.module.css      # Scoped styles for catalog and filter components
│       ├── admin/
│       │   ├── AdminProductEditor.jsx # Product creation & edit form view
│       │   └── AdminProducts.jsx     # Admin product inventory table
│       └── categories/
│           ├── AdminCategories.jsx  # Category management table
│           └── AdminCategoryEditor.jsx # Category creation & edit form
│
└── pages/                           # ── 3. THIN PAGE LAYOUT CONTAINERS ──
    ├── Home.jsx                     # Composes features/home (Uses HomeHero)
    ├── Home.module.css              # Layout container boundaries for Homepage
    ├── About.jsx                    # Composes features/about + PageHero
    ├── About.module.css             # Layout container boundaries for About view
    ├── Products.jsx                 # Composes features/products + PageHero
    ├── Products.module.css          # Layout grid boundaries for Catalog view
    ├── ProductDetail.jsx            # Composes features/product-detail
    ├── ProductDetail.module.css     # Layout boundaries for Product Detail view
    ├── Contact.jsx                  # Composes features/contact + PageHero
    ├── Contact.module.css           # Layout spacing rules for Contact view
    ├── Manufacturing.jsx            # Composes Manufacturing view + PageHero
    ├── Sustainability.jsx           # Composes Sustainability view + PageHero
    ├── NotFound.jsx                 # 404 error page component
    └── NotFound.module.css          # 404 error page layout styling
