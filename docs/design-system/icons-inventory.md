# Application Icon Inventory

This document tracks all icons used across the Vishal Enterprise web application (`apps/web/src/`), standardizing on `@iconify/react` with the **Hugeicons Stroke Rounded** icon family (`hugeicons:*`) with zero additional bundle packages.

---

## 1. Navigation, Shell & Layout

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `hugeicons:menu-01` | `Navbar.jsx`, `AdminTopBar.jsx`, `MobileBottomNav.jsx` | Toggles mobile navigation menu and admin sidebar |
| `hugeicons:cancel-circle` | `Navbar.jsx`, `MobileNavDrawer.jsx`, `NavbarSearch.jsx`, `Modal.jsx` | Closes mobile drawers, dismisses modals, and clears search inputs |
| `hugeicons:home-01` | `MobileBottomNav.jsx`, `PageHero.jsx`, `ErrorBoundary.jsx`, `NotFoundPage.jsx` | Home breadcrumb and navigation shortcuts |
| `hugeicons:search-01` | `NavbarSearch.jsx`, `AdminTopBar.jsx`, `ProductSearchHeader.jsx` | Search trigger and search input icon |
| `hugeicons:sun-01` / `hugeicons:moon-02` | `Navbar.jsx`, `AdminTopBar.jsx` | Dark / Light theme toggle switches |
| `hugeicons:arrow-down-01` | `MegaMenu.jsx`, `Footer.jsx`, `MobileNavDrawer.jsx` | Dropdown indicator for category lists and collapsible footer menus |
| `hugeicons:arrow-up-01` | `BackToTop.jsx` | "Scroll to Top" floating navigation action |
| `hugeicons:file-01` | `MobileBottomNav.jsx` | Quick navigation to technical specifications & catalog |
| `hugeicons:sent` | `Footer.jsx` | Newsletter subscription submit button |
| `hugeicons:ruler` | `MegaMenu.jsx` | Custom dimension / industrial fabrication menu link |

---

## 2. Product Catalog, Details & Filtering

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `hugeicons:configuration-01` | `ProductCatalog.jsx`, `ProductSearchHeader.jsx`, `ProductFilterSidebar.jsx` | Filter toggle button and configuration settings |
| `hugeicons:arrow-right-01` | `ProductsShowcase.jsx`, `ProductGridCard.jsx`, `MegaMenu.jsx` | Forward navigation, view all, and detail page transitions |
| `hugeicons:arrow-up-right-01` | `ProductsShowcase.jsx`, `ProcurementCtaBand.jsx` | External link / direct product detail page navigation |
| `hugeicons:package` | `ProductGridCard.jsx`, `MegaMenu.jsx`, `ProcurementAdvantage.jsx` | Product SKU, packaging, pallets, and unit volume badge |
| `hugeicons:leaf-01` | `ProductTabsSection.jsx`, `SustainabilityPage.jsx` | Eco-score, 100% PCR plastic badge, and circular economy metrics |
| `hugeicons:shield-check` | `ProductHeaderSpecs.jsx`, `ProcurementAdvantage.jsx`, `ProductTabsSection.jsx` | Quality assurance, ISO certification, and static load ratings |
| `hugeicons:wrench-01` | `ProductHeaderSpecs.jsx`, `IndustryValueProps.jsx` | Custom tooling, mold fabrication, and maintenance durability |
| `hugeicons:droplet` | `ProductTabsSection.jsx`, `home.constants.js` | Weatherproofing, chemical resistance, and moisture impermeability |
| `hugeicons:snowflake` | `ProcessSection.jsx` | Cold-storage stability and cryogenic testing |
| `hugeicons:fire` | `ProcessSection.jsx` | Fire retardancy and thermal tolerance testing |
| `hugeicons:download-01` | `MegaMenu.jsx`, `ProductTabsSection.jsx` | Download product catalog / engineering spec datasheet |

---

## 3. Inquiries, RFQ Modals & Conversions

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `hugeicons:shield-check` | `InquiryModal.jsx` | "Direct Factory RFQ" authenticity badge |
| `hugeicons:chat-01` | `InquiryModal.jsx`, `MobileBottomNav.jsx`, `ProductDetailView.jsx` | Direct WhatsApp quote trigger & inquiry actions |
| `hugeicons:user` | `InquiryModal.jsx`, `TimedInquiryModal.jsx` | Form input icon for full contact name |
| `hugeicons:call` / `hugeicons:call-ringing-01` | `InquiryModal.jsx`, `TimedInquiryModal.jsx` | Form input icon for Phone / WhatsApp number |
| `hugeicons:mail-01` | `InquiryModal.jsx`, `TimedInquiryModal.jsx` | Form input icon for Work Email |
| `hugeicons:building-03` | `InquiryModal.jsx`, `TimedInquiryModal.jsx` | Form input icon for Company / Organization name |
| `hugeicons:package` | `InquiryModal.jsx` | Form input icon for requested order quantity/volume |
| `hugeicons:clock-01` | `InquiryModal.jsx`, `IndustryValueProps.jsx` | "Response ~2h" guarantee indicator |
| `hugeicons:checkmark-circle-02` | `InquiryModal.jsx`, `TimedInquiryModal.jsx` | Form submission success confirmation checkmark |
| `hugeicons:copy-01` | `InquiryModal.jsx`, `ContactInfoItem.jsx` | Copies inquiry reference code / contact info to clipboard |
| `hugeicons:alert-02` | `InquiryModal.jsx`, `Login.jsx` | Form validation and submission error banners |
| `hugeicons:reload` | `InquiryModal.jsx`, `Login.jsx` | Reset inquiry and reload state |

---

## 4. Contact Page & Trust Badges

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `hugeicons:delivery-truck-01` | `ContactTrustedRow.jsx`, `HomeCtaSection.jsx` | Pan-India logistics and freight dispatch capability |
| `hugeicons:security-check` | `ContactTrustedRow.jsx` | Heavy-duty chemical resistance and safety rating |
| `hugeicons:flask-conical` | `ContactTrustedRow.jsx` | Laboratory polymer batch testing & QA |
| `hugeicons:building-03` | `ContactTrustedRow.jsx`, `Footer.jsx` | Ankleshwar GIDC manufacturing facility address |
| `hugeicons:location-01` | `ContactFormSection.jsx`, `Footer.jsx` | Factory GPS location and map markers |
| `hugeicons:chat-01` | `ContactFaqSection.jsx`, `ContactInfoColumn.jsx` | FAQ section heading and customer support channels |
| `hugeicons:customer-service` | `ContactFormSection.jsx`, `HomeHero.jsx` | Dedicated sales support helpline icon |
| `hugeicons:route-01` | `ContactFormSection.jsx` | "Get Directions" Google Maps navigation link |
| `hugeicons:sent` | `ContactFormSection.jsx` | "Send Message" inquiry submit button icon |

---

## 5. Manufacturing, Sustainability & About Us

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `hugeicons:cpu` | `ManufacturingPage.jsx`, `ProcessSection.jsx` | Automated injection moulding & machinery metrics |
| `hugeicons:flash` | `ManufacturingPage.jsx` | High-throughput cycle times and power efficiency |
| `hugeicons:star` | `ManufacturingPage.jsx`, `HomeCtaSection.jsx` | Premium polymer grade and featured highlight badges |
| `hugeicons:sparkles` | `ProcessSection.jsx` | Resin purification and additive enrichment stage |
| `hugeicons:layers-01` | `ProcessSection.jsx`, `AboutStatsSection.jsx` | Multi-layer structural reinforcement and polymer layering |
| `hugeicons:target-02` | `WhoWeAreSection.jsx` | Corporate vision and sustainability target milestones |
| `hugeicons:sun-01` | `WhyChooseUsSection.jsx` | UV stability and outdoor weathering resistance |
| `hugeicons:award-01` | `AboutStatsSection.jsx` | Decades of manufacturing excellence & awards |
| `hugeicons:recycle-01` | `SustainabilitySection.jsx`, `SustainabilityPage.jsx` | 100% Post-Consumer recycled resin circular lifecycle |

---

## 6. Admin Panel & Content Management

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `hugeicons:analytics-01` / `hugeicons:analytics-up` | `adminNav.constants.js`, `Dashboard.jsx` | Admin analytics and inquiry conversion metrics |
| `hugeicons:package` | `AdminProducts.jsx` | Product inventory and SKU management tab |
| `hugeicons:tag-01` | `AdminCategories.jsx`, `adminNav.constants.js` | Product category taxonomy management |
| `hugeicons:inbox` | `AdminInquiries.jsx`, `AdminInquiryDetail.jsx` | Incoming RFQ inquiry inbox and status workflow |
| `hugeicons:reply` | `AdminInquiryDetail.jsx` | Direct email / communication reply to inquiry |
| `hugeicons:image-01` | `AdminMedia.jsx`, `ImagesTab.jsx` | Media asset gallery and thumbnail previews |
| `hugeicons:upload-01` | `AdminMedia.jsx`, `ImagesTab.jsx` | Asset and image upload action buttons |
| `hugeicons:edit-02` | `AdminProducts.jsx`, `TeamEditor.jsx`, `TimelineEditor.jsx` | Edit record / modify content section button |
| `hugeicons:delete-02` | `AdminProducts.jsx`, `ConfirmDialog.jsx` | Delete product, image, or timeline entry |
| `hugeicons:add-circle` | `SpecsTab.jsx`, `TimelineEditor.jsx`, `AdminCategoryEditor.jsx` | Add new row, specification, or team member |
| `hugeicons:floppy-disk` | `GeneralTab.jsx`, `SectionEditor.jsx`, `SettingsTab.jsx` | Save changes / commit updates to database |
| `hugeicons:settings-01` | `SpecsTab.jsx`, `AdminSidebar.jsx` | Technical specifications configuration & site settings |
| `hugeicons:lock-password` | `Login.jsx` | Admin password security field |
| `hugeicons:logout-01` | `AdminSidebar.jsx` | Admin session logout action |
| `hugeicons:notification-01` / `hugeicons:notification-02` | `AdminNotificationsDropdown.jsx` | New quote notifications and unread alert bell |
| `hugeicons:briefcase-01` | `TeamModalFields.jsx` | Team member role / title input |
| `hugeicons:calendar-01` | `TimelineModalFields.jsx` | Company history timeline date input |
| `hugeicons:flag-01` | `TimelineModalFields.jsx` | Company milestone / achievement flag |

---

## 7. Shared UI Primitives

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `hugeicons:arrow-left-01` / `hugeicons:arrow-right-01` | `Pagination.jsx`, `Carousel.jsx`, `Accordion.jsx`, `Button.jsx` | Directional navigation, pagination steps, and toggles |
| `hugeicons:checkmark-circle-02` | `Checkbox.jsx`, `Alert.jsx`, `Toast.jsx` | Checked and success status icons |
| `hugeicons:checkmark-square-01` | `Checkbox.jsx` | Checked square checkbox state |
| `hugeicons:remove-circle` | `Checkbox.jsx` | Indeterminate checkbox state |
| `hugeicons:upload-01` | `FileUpload.jsx` | Drag-and-drop file upload zone icon |
| `hugeicons:user` | `Avatar.jsx` | Default user avatar fallback |
| `hugeicons:information-circle` | `SectionEditor.jsx`, `Alert.jsx`, `Toast.jsx` | Contextual help tooltips and informative banners |
| `hugeicons:alert-02` / `hugeicons:alert-circle` | `Alert.jsx`, `Toast.jsx` | Warnings and error state indicators |

---

## 8. External Brand & Social Icons

| Icon Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `logos:whatsapp-icon` | `Footer.jsx`, `WhatsAppButton.jsx` | Official WhatsApp branding on floating and footer buttons |
| `logos:linkedin-icon` | `Footer.jsx` | Company LinkedIn profile link in the footer |

---

## 9. Regulatory & Compliance Icons

| Component / Identifier | Locations / Files | Purpose |
| :--- | :--- | :--- |
| `<GstIcon />` | `ContactFormSection.jsx`, `Footer.jsx`, `ExperienceBanner.jsx`, `SpreadQualityStandards.jsx` | Authentic Indian Goods and Services Tax (GST) emblem & tax verification badge |
