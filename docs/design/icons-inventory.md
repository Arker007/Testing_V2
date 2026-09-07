# Application Icon Inventory

This document tracks all icons used across the Vishal Enterprise web application (`apps/web/src/`), standardizing on `@iconify/react` with the `solar:*` icon family (along with select brand logos).

---

## 1. Navigation, Shell & Layout

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `solar:hamburger-menu-linear` | `Navbar.jsx`, `AdminTopBar.jsx` | Toggles mobile navigation menu and admin sidebar |
| `solar:close-circle-linear` / `solar:close-circle-bold` | `MobileNavDrawer.jsx`, `NavbarSearch.jsx` | Closes mobile drawers and clears search inputs |
| `solar:home-2-linear` | `MobileBottomNav.jsx`, `PageHero.jsx`, `ErrorBoundary.jsx`, `NotFoundPage.jsx` | Home breadcrumb and navigation shortcuts |
| `solar:magnifer-linear` | `NavbarSearch.jsx`, `AdminTopBar.jsx`, `ProductSearchHeader.jsx` | Search trigger and search input icon |
| `solar:minimalistic-magnifer-linear` | `NavbarSearch.jsx` | Search icon in the global header search bar |
| `ix:cancel` | `NavbarSearch.jsx` | Quick-clear button for the search bar |
| `solar:moon-linear` / `solar:sun-2-linear` | `Navbar.jsx`, `AdminTopBar.jsx` | Dark / Light theme toggle switches |
| `solar:alt-arrow-down-linear` | `MegaMenu.jsx`, `Footer.jsx`, `MobileNavDrawer.jsx` | Dropdown indicator for category lists and collapsible footer menus |
| `solar:alt-arrow-up-linear` | `BackToTop.jsx` | "Scroll to Top" floating navigation action |
| `solar:document-text-linear` | `MobileBottomNav.jsx` | Quick navigation to technical specifications & catalog |
| `solar:plain-3-linear` | `Footer.jsx` | Newsletter subscription submit button |
| `solar:ruler-angular-linear` | `MegaMenu.jsx` | Custom dimension / industrial fabrication menu link |

---

## 2. Product Catalog, Details & Filtering

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `solar:filter-linear` | `ProductFilterSidebar.jsx` | Filter sidebar header and collapsible filter groups |
| `solar:tuning-2-linear` / `solar:tuning-square-linear` | `ProductCatalog.jsx`, `ProductSearchHeader.jsx` | Filter toggle button for mobile/desktop catalog views |
| `solar:widget-2-linear` | `ProductSearchHeader.jsx` | Grid view layout toggle |
| `solar:list-linear` | `ProductSearchHeader.jsx` | List view layout toggle |
| `solar:full-screen-square-linear` | `ProductGallery.jsx` | Triggers fullscreen high-res image modal |
| `solar:close-square-linear` | `ProductImageFullscreenModal.jsx` | Dismisses the fullscreen image modal |
| `solar:arrow-down-linear` | `ProductGridCard.jsx` | Quick view / product expansion trigger |
| `solar:arrow-right-up-linear` | `ProductsShowcase.jsx` | External link / direct product detail page navigation |
| `solar:box-minimalistic-linear` | `ProductGridCard.jsx`, `ProductHeaderSpecs.jsx` | Product SKU, packaging, and unit volume badge |
| `solar:leaf-linear` | `ProductTabsSection.jsx`, `SustainabilityPage.jsx` | Eco-score, 100% PCR plastic badge, and circular economy metrics |
| `solar:shield-check-linear` | `ProductHeaderSpecs.jsx`, `ProcurementAdvantage.jsx` | Quality assurance, ISO certification, and static load ratings |
| `solar:wrench-linear` | `ProductHeaderSpecs.jsx`, `IndustryValueProps.jsx` | Custom tooling, mold fabrication, and maintenance durability |
| `solar:waterdrops-linear` | `ProductTabsSection.jsx`, `home.constants.js` | Weatherproofing, chemical resistance, and moisture impermeability |
| `solar:snowflake-linear` | `ProcessSection.jsx` | Cold-storage stability and cryogenic testing |
| `solar:flame-linear` | `ProcessSection.jsx` | Fire retardancy and thermal tolerance testing |
| `solar:sort-from-top-to-bottom-linear` | `product-detail.constants.js` | Product table sorting indicator |

---

## 3. Inquiries, RFQ Modals & Conversions

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `solar:shield-check-bold` | `InquiryModal.jsx` | "Direct Factory RFQ" authenticity badge |
| `solar:chat-round-dots-bold` | `InquiryModal.jsx`, `MobileBottomNav.jsx`, `ProductDetailView.jsx` | Direct WhatsApp quote trigger & inquiry actions |
| `solar:user-linear` | `InquiryModal.jsx`, `TimedInquiryModal.jsx` | Form input icon for full contact name |
| `solar:phone-calling-linear` | `InquiryModal.jsx`, `TimedInquiryModal.jsx` | Form input icon for Phone / WhatsApp number |
| `solar:letter-linear` | `InquiryModal.jsx`, `TimedInquiryModal.jsx` | Form input icon for Work Email |
| `solar:buildings-2-linear` | `InquiryModal.jsx`, `TimedInquiryModal.jsx` | Form input icon for Company / Organization name |
| `solar:box-linear` | `InquiryModal.jsx` | Form input icon for requested order quantity/volume |
| `solar:clock-circle-linear` | `InquiryModal.jsx`, `IndustryValueProps.jsx` | "Response ~2h" guarantee indicator |
| `solar:check-circle-bold` | `InquiryModal.jsx`, `TimedInquiryModal.jsx` | Form submission success confirmation checkmark |
| `solar:copy-linear` / `solar:check-read-linear` | `InquiryModal.jsx`, `ContactInfoItem.jsx` | Copies inquiry reference code / contact info to clipboard |
| `solar:danger-triangle-linear` | `InquiryModal.jsx`, `Login.jsx` | Form validation and submission error banners |
| `solar:restart-linear` / `solar:spinner-linear` | `InquiryModal.jsx`, `Login.jsx`, `AdminMedia.jsx` | Loading spinner during asynchronous requests and "New Inquiry" reset |

---

## 4. Contact Page & Trust Badges

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `solar:delivery-linear` | `ContactTrustedRow.jsx` | Pan-India logistics and freight dispatch capability |
| `solar:shield-warning-linear` | `ContactTrustedRow.jsx` | Heavy-duty chemical resistance and safety rating |
| `solar:test-tube-minimalistic-linear` | `ContactTrustedRow.jsx` | Laboratory polymer batch testing & QA |
| `solar:buildings-3-linear` | `ContactTrustedRow.jsx`, `Footer.jsx` | Ankleshwar GIDC manufacturing facility address |
| `solar:map-point-linear` | `ContactFormSection.jsx`, `Footer.jsx` | Factory GPS location and map markers |
| `solar:chat-round-line-linear` | `ContactFaqSection.jsx`, `ContactInfoColumn.jsx` | FAQ section heading and customer support channels |
| `solar:headphones-round-linear` | `ContactFormSection.jsx` | Dedicated sales support helpline icon |
| `solar:routing-2-linear` | `ContactFormSection.jsx` | "Get Directions" Google Maps navigation link |
| `solar:plain-2-linear` | `ContactFormSection.jsx` | "Send Message" inquiry submit button icon |

---

## 5. Manufacturing, Sustainability & About Us

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `solar:cpu-linear` / `solar:cpu-bolt-linear` | `ManufacturingPage.jsx`, `ProcessSection.jsx` | Automated injection moulding & machinery metrics |
| `solar:bolt-linear` | `ManufacturingPage.jsx` | High-throughput cycle times and power efficiency |
| `solar:star-linear` | `ManufacturingPage.jsx`, `HomeCtaSection.jsx` | Premium polymer grade and featured highlight badges |
| `solar:sparkles-linear` | `ProcessSection.jsx` | Resin purification and additive enrichment stage |
| `solar:layers-linear` / `solar:layers-minimalistic-linear` | `ProcessSection.jsx`, `AboutStatsSection.jsx` | Multi-layer structural reinforcement and polymer layering |
| `solar:target-linear` | `WhoWeAreSection.jsx` | Corporate vision and sustainability target milestones |
| `solar:sun-fog-linear` | `WhyChooseUsSection.jsx` | UV stability and outdoor weathering resistance |
| `solar:medal-ribbons-star-linear` | `AboutStatsSection.jsx` | Decades of manufacturing excellence & awards |
| `solar:verified-check-linear` | `ManufacturingPage.jsx`, `FeaturesSection.jsx` | Verified industrial standards & certified compliance |

---

## 6. Admin Panel & Content Management

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `solar:chart-square-linear` / `solar:graph-up-linear` | `adminNav.constants.js`, `Dashboard.jsx` | Admin analytics and inquiry conversion metrics |
| `solar:box-open-linear` | `AdminProducts.jsx` | Product inventory and SKU management tab |
| `solar:tag-linear` | `AdminCategories.jsx`, `adminNav.constants.js` | Product category taxonomy management |
| `solar:inbox-linear` / `solar:inbox-line-linear` | `AdminInquiries.jsx`, `AdminInquiryDetail.jsx` | Incoming RFQ inquiry inbox and status workflow |
| `solar:reply-linear` | `AdminInquiryDetail.jsx` | Direct email / communication reply to inquiry |
| `solar:gallery-linear` / `solar:gallery-wide-linear` | `AdminMedia.jsx`, `ImagesTab.jsx` | Media asset gallery and thumbnail previews |
| `solar:upload-track-linear` / `solar:upload-track-2-linear` | `AdminMedia.jsx`, `ImagesTab.jsx` | Asset and image upload action buttons |
| `solar:pen-linear` | `AdminProducts.jsx`, `TeamEditor.jsx`, `TimelineEditor.jsx` | Edit record / modify content section button |
| `solar:trash-bin-trash-linear` / `solar:trash-bin-trash-bold-duotone` | `AdminProducts.jsx`, `ConfirmDialog.jsx` | Delete product, image, or timeline entry |
| `solar:add-circle-linear` | `SpecsTab.jsx`, `TimelineEditor.jsx`, `AdminCategoryEditor.jsx` | Add new row, specification, or team member |
| `solar:diskette-linear` | `GeneralTab.jsx`, `SectionEditor.jsx`, `SettingsTab.jsx` | Save changes / commit updates to database |
| `solar:settings-linear` / `solar:settings-minimalistic-linear` | `SpecsTab.jsx`, `AdminSidebar.jsx` | Technical specifications configuration & site settings |
| `solar:lock-password-linear` | `Login.jsx` | Admin password security field |
| `solar:logout-2-linear` | `AdminSidebar.jsx` | Admin session logout action |
| `solar:bell-linear` / `solar:bell-bing-linear` | `AdminNotificationsDropdown.jsx` | New quote notifications and unread alert bell |
| `solar:stars-linear` | `AdminNotificationsDropdown.jsx` | High-priority or new unread notification indicator |
| `solar:briefcase-linear` | `TeamModalFields.jsx` | Team member role / title input |
| `solar:calendar-date-linear` | `TimelineModalFields.jsx` | Company history timeline date input |
| `solar:flag-linear` | `TimelineModalFields.jsx` | Company milestone / achievement flag |

---

## 7. Shared UI Primitives

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `solar:alt-arrow-left-linear` / `solar:alt-arrow-right-linear` | `Pagination.jsx`, `Carousel.jsx`, `Accordion.jsx` | Pagination steps, image sliders, and accordion toggles |
| `solar:arrow-left-linear` / `solar:arrow-right-linear` | `Button.jsx`, `InteractiveHoverButton.jsx` | Directional call-to-action buttons |
| `solar:check-read-bold` / `solar:minus-bold` | `Checkbox.jsx` | Checked and indeterminate checkbox states |
| `solar:cloud-upload-linear` | `FileUpload.jsx` | Drag-and-drop file upload zone icon |
| `solar:user-bold` | `Avatar.jsx` | Default user avatar fallback |
| `solar:info-circle-linear` | `SectionEditor.jsx`, `HelpTip.jsx` | Contextual help tooltips and informative banners |
| `solar:refresh-circle-bold-duotone` | `AppRouter.jsx` | Global page transition / fallback loader |

---

## 8. External Brand & Social Icons

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `logos:whatsapp-icon` | `Footer.jsx`, `WhatsAppButton.jsx` | Official WhatsApp branding on floating and footer buttons |
| `logos:linkedin-icon` | `Footer.jsx` | Company LinkedIn profile link in the footer |
