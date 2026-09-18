import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { Input, Textarea } from "@/shared/ui";
import cStyles from "../styles/SiteContent.module.css";

const SLIDE_CONFIGS = [
  {
    id: "slide1",
    num: 1,
    label: "Slide 1: Plastic Lumber",
    shortLabel: "Slide 1",
    defaultCategory: "Recycled Plastic Lumber",
    defaultBadge: "Manufacturer & Supplier",
    defaultAccent: "RECYCLED",
    defaultTitle: "PLASTIC LUMBER",
    defaultDesc: "Premium grade recycled polymer profiles engineered to replace wood and metal in demanding industrial, marine, and construction environments.",
    defaultFeatures: [
      { title: "DURABLE", desc: "Built for long lasting structural performance", icon: "carbon:security" },
      { title: "WEATHERPROOF", desc: "Zero rot, zero splinter, moisture resistant", icon: "carbon:rain-drop" },
      { title: "HIGH STRENGTH", desc: "High load capacity for demanding builds", icon: "carbon:flash" },
      { title: "ECO FRIENDLY", desc: "100% recycled polymer profile material", icon: "carbon:recycle" },
    ],
  },
  {
    id: "slide2",
    num: 2,
    label: "Slide 2: Plastic Pallets",
    shortLabel: "Slide 2",
    defaultCategory: "Industrial Plastic Pallets",
    defaultBadge: "Manufacturer & Supplier",
    defaultAccent: "HEAVY-DUTY",
    defaultTitle: "PLASTIC PALLETS",
    defaultDesc: "High-capacity, injection-molded and extruded plastic pallets engineered for rigorous supply chains, warehousing, and export operations.",
    defaultFeatures: [
      { title: "HEAVY DUTY", desc: "Withstands heavy static & dynamic loads", icon: "carbon:security" },
      { title: "CHEMICAL RESIST", desc: "Resistant to acids, alkalis, and oils", icon: "carbon:rain-drop" },
      { title: "EXPORT READY", desc: "Naturally phytosanitary exempt (ISPM-15)", icon: "carbon:delivery-truck" },
      { title: "SUSTAINABLE", desc: "Fully recyclable at end of lifecycle", icon: "carbon:recycle" },
    ],
  },
  {
    id: "slide3",
    num: 3,
    label: "Slide 3: Outdoor Benches",
    shortLabel: "Slide 3",
    defaultCategory: "Outdoor Benches & Tables",
    defaultBadge: "Manufacturer & Supplier",
    defaultAccent: "WEATHERPROOF",
    defaultTitle: "GARDEN BENCHES",
    defaultDesc: "Durable, heavy-duty outdoor seating systems perfect for gardens, municipal parks, institutional campuses, and waterfronts.",
    defaultFeatures: [
      { title: "WEATHERPROOF", desc: "Engineered to perform in all weather conditions", icon: "carbon:security" },
      { title: "RUSTPROOF", desc: "Corrosion-resistant for enhanced durability", icon: "carbon:certificate" },
      { title: "MODERN DESIGN", desc: "Aesthetic and functional for all environments", icon: "carbon:star" },
      { title: "ECO FRIENDLY", desc: "Non-toxic, eco-friendly & safe for all use", icon: "carbon:recycle" },
    ],
  },
];

export default function HeroSectionEditor({
  cms,
  setCms,
  isCmsGroupEnabled,
  searchFieldQuery = "",
}) {
  const [activeTab, setActiveTab] = useState("slide1");

  const setM = (key) => (e) => setCms((p) => ({ ...p, [key]: e.target.value }));

  // Calculate search matches per tab
  const tabMatchCounts = useMemo(() => {
    if (!searchFieldQuery) return { general: 0, slide1: 0, slide2: 0, slide3: 0 };
    const q = searchFieldQuery.toLowerCase();

    const generalFields = [
      "show_hero", "hero_cta_primary", "hero_assistance_title", 
      "hero_assistance_sub", "hero_assistance_btn", "hero_assistance_phone"
    ];
    const genMatches = generalFields.filter(k => 
      k.includes(q) || (cms[k] && cms[k].toLowerCase().includes(q))
    ).length;

    const counts = { general: genMatches };

    SLIDE_CONFIGS.forEach(s => {
      const keys = [
        `home_slide${s.num}_category`,
        `home_slide${s.num}_badge`,
        `home_slide${s.num}_title_accent`,
        `home_slide${s.num}_title_main`,
        `home_slide${s.num}_desc`,
        `home_slide${s.num}_f1_title`, `home_slide${s.num}_f1_desc`,
        `home_slide${s.num}_f2_title`, `home_slide${s.num}_f2_desc`,
        `home_slide${s.num}_f3_title`, `home_slide${s.num}_f3_desc`,
        `home_slide${s.num}_f4_title`, `home_slide${s.num}_f4_desc`,
      ];
      counts[s.id] = keys.filter(k => 
        k.includes(q) || (cms[k] && cms[k].toLowerCase().includes(q))
      ).length;
    });

    return counts;
  }, [searchFieldQuery, cms]);

  const currentSlide = SLIDE_CONFIGS.find(s => s.id === activeTab);

  return (
    <div style={!isCmsGroupEnabled ? { opacity: 0.55, pointerEvents: "none" } : {}}>
      {/* Sub Navigation Bar for Hero */}
      <div className={cStyles.heroSubNav}>
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`${cStyles.heroSubBtn} ${activeTab === "general" ? cStyles.heroSubBtnActive : ""}`}
        >
          <Icon icon="carbon:settings-adjust" className="w-4 h-4" />
          <span>General & Assistance Card</span>
          {searchFieldQuery && tabMatchCounts.general > 0 && (
            <span className={cStyles.heroSubBadge}>{tabMatchCounts.general}</span>
          )}
        </button>

        {SLIDE_CONFIGS.map((slide) => {
          const accentVal = cms[`home_slide${slide.num}_title_accent`] ?? slide.defaultAccent;
          const mainVal = cms[`home_slide${slide.num}_title_main`] ?? slide.defaultTitle;
          const matchCount = tabMatchCounts[slide.id] || 0;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveTab(slide.id)}
              className={`${cStyles.heroSubBtn} ${activeTab === slide.id ? cStyles.heroSubBtnActive : ""}`}
            >
              <Icon icon="carbon:presentation-file" className="w-4 h-4" />
              <span>{slide.shortLabel}: {accentVal} {mainVal}</span>
              {searchFieldQuery && matchCount > 0 && (
                <span className={cStyles.heroSubBadge}>{matchCount}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* GENERAL & ASSISTANCE TAB */}
      {activeTab === "general" && (
        <div>
          {/* Section Controls */}
          <div className={cStyles.heroSectionCard}>
            <div className={cStyles.heroSectionCardHeader}>
              <Icon icon="carbon:switcher" className="w-4 h-4 text-emerald-600" />
              <span>Section Visibility & Primary Action</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label className={cStyles.formLabel}>
                  <Icon icon="carbon:checkbox-checked" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
                  <span>Section Visibility</span>
                  <span className={cStyles.fieldKeyBadge}>show_hero</span>
                </label>
                <label className={cStyles.toggleRow}>
                  <span className={cStyles.toggleSwitch}>
                    <input 
                      id="field-show_hero"
                      type="checkbox" 
                      checked={cms.show_hero === "1" || cms.show_hero === undefined} 
                      onChange={(e) => setM("show_hero")({ target: { value: e.target.checked ? "1" : "0" } })} 
                    />
                    <span className={cStyles.toggleSlider} />
                  </span>
                  <span className={cStyles.toggleLabelText}>Show Homepage Hero Carousel</span>
                </label>
              </div>

              <div>
                <label htmlFor="field-hero_cta_primary" className={cStyles.formLabel}>
                  <Icon icon="carbon:string-text" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
                  <span>Primary CTA Button Text</span>
                  <span className={cStyles.fieldKeyBadge}>hero_cta_primary</span>
                </label>
                <Input 
                  id="field-hero_cta_primary"
                  type="text" 
                  value={cms.hero_cta_primary !== undefined ? cms.hero_cta_primary : "EXPLORE PRODUCTS"} 
                  onChange={setM("hero_cta_primary")} 
                  placeholder="EXPLORE PRODUCTS" 
                />
              </div>
            </div>
          </div>

          {/* Floating Assistance Card */}
          <div className={cStyles.heroSectionCard}>
            <div className={cStyles.heroSectionCardHeader}>
              <Icon icon="carbon:headset" className="w-4 h-4 text-emerald-600" />
              <span>Floating Support / Assistance Card</span>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label htmlFor="field-hero_assistance_title" className={cStyles.formLabel}>
                  <Icon icon="carbon:string-text" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
                  <span>Assistance Card Title</span>
                  <span className={cStyles.fieldKeyBadge}>hero_assistance_title</span>
                </label>
                <Input 
                  id="field-hero_assistance_title"
                  type="text" 
                  value={cms.hero_assistance_title !== undefined ? cms.hero_assistance_title : "NEED ASSISTANCE?"} 
                  onChange={setM("hero_assistance_title")} 
                  placeholder="NEED ASSISTANCE?" 
                />
              </div>

              <div>
                <label htmlFor="field-hero_assistance_phone" className={cStyles.formLabel}>
                  <Icon icon="carbon:phone" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
                  <span>Direct Hotline Phone Number</span>
                  <span className={cStyles.fieldKeyBadge}>hero_assistance_phone</span>
                </label>
                <Input 
                  id="field-hero_assistance_phone"
                  type="text" 
                  value={cms.hero_assistance_phone !== undefined ? cms.hero_assistance_phone : "+91 98986 86379"} 
                  onChange={setM("hero_assistance_phone")} 
                  placeholder="+91 98986 86379" 
                />
              </div>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label htmlFor="field-hero_assistance_sub" className={cStyles.formLabel}>
                <Icon icon="carbon:text-align-left" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
                <span>Assistance Prompt / Subtitle</span>
                <span className={cStyles.fieldKeyBadge}>hero_assistance_sub</span>
              </label>
              <Textarea 
                id="field-hero_assistance_sub"
                rows={2} 
                value={cms.hero_assistance_sub !== undefined ? cms.hero_assistance_sub : "Our team is ready to help you find the right solution."} 
                onChange={setM("hero_assistance_sub")} 
                placeholder="Our team is ready to help you find the right solution." 
              />
            </div>

            <div>
              <label htmlFor="field-hero_assistance_btn" className={cStyles.formLabel}>
                <Icon icon="carbon:string-text" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
                <span>Assistance Button Text</span>
                <span className={cStyles.fieldKeyBadge}>hero_assistance_btn</span>
              </label>
              <Input 
                id="field-hero_assistance_btn"
                type="text" 
                value={cms.hero_assistance_btn !== undefined ? cms.hero_assistance_btn : "CONTACT US"} 
                onChange={setM("hero_assistance_btn")} 
                placeholder="CONTACT US" 
              />
            </div>
          </div>
        </div>
      )}

      {/* INDIVIDUAL SLIDE EDITORS */}
      {currentSlide && (
        <div>
          {/* Live Preview Card */}
          <div className={cStyles.heroPreviewCard}>
            <div className={cStyles.heroPreviewHeader}>
              <div className={cStyles.heroPreviewBadge}>
                <Icon icon="carbon:tag" className="w-3 h-3" />
                <span>{cms[`home_slide${currentSlide.num}_category`] ?? currentSlide.defaultCategory}</span>
                <span style={{ opacity: 0.5 }}>•</span>
                <span>{cms[`home_slide${currentSlide.num}_badge`] ?? currentSlide.defaultBadge}</span>
              </div>
              <span style={{ fontSize: "0.7rem", opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
                Live Slide {currentSlide.num} Preview
              </span>
            </div>

            <h4 className={cStyles.heroPreviewTitle}>
              <span className={cStyles.heroPreviewAccent}>
                {cms[`home_slide${currentSlide.num}_title_accent`] ?? currentSlide.defaultAccent}
              </span>
              <span className={cStyles.heroPreviewMain}>
                {cms[`home_slide${currentSlide.num}_title_main`] ?? currentSlide.defaultTitle}
              </span>
            </h4>

            <p className={cStyles.heroPreviewDesc}>
              {cms[`home_slide${currentSlide.num}_desc`] ?? currentSlide.defaultDesc}
            </p>
          </div>

          {/* Slide Core Copy */}
          <div className={cStyles.heroSectionCard}>
            <div className={cStyles.heroSectionCardHeader}>
              <Icon icon="carbon:text-font" className="w-4 h-4 text-emerald-600" />
              <span>Slide {currentSlide.num} — Headings & Category Copy</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label htmlFor={`field-home_slide${currentSlide.num}_category`} className={cStyles.formLabel}>
                  <Icon icon="carbon:tag" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
                  <span>Category Tagline</span>
                  <span className={cStyles.fieldKeyBadge}>{`home_slide${currentSlide.num}_category`}</span>
                </label>
                <Input 
                  id={`field-home_slide${currentSlide.num}_category`}
                  type="text" 
                  value={cms[`home_slide${currentSlide.num}_category`] !== undefined ? cms[`home_slide${currentSlide.num}_category`] : currentSlide.defaultCategory} 
                  onChange={setM(`home_slide${currentSlide.num}_category`)} 
                  placeholder={currentSlide.defaultCategory} 
                />
              </div>

              <div>
                <label htmlFor={`field-home_slide${currentSlide.num}_badge`} className={cStyles.formLabel}>
                  <Icon icon="carbon:certificate" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
                  <span>Subtitle Badge</span>
                  <span className={cStyles.fieldKeyBadge}>{`home_slide${currentSlide.num}_badge`}</span>
                </label>
                <Input 
                  id={`field-home_slide${currentSlide.num}_badge`}
                  type="text" 
                  value={cms[`home_slide${currentSlide.num}_badge`] !== undefined ? cms[`home_slide${currentSlide.num}_badge`] : currentSlide.defaultBadge} 
                  onChange={setM(`home_slide${currentSlide.num}_badge`)} 
                  placeholder={currentSlide.defaultBadge} 
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label htmlFor={`field-home_slide${currentSlide.num}_title_accent`} className={cStyles.formLabel}>
                  <Icon icon="carbon:highlight" className="w-3.5 h-3.5 text-lime-600 inline mr-0.5 opacity-80" />
                  <span>Accent Word (Lime Highlight)</span>
                  <span className={cStyles.fieldKeyBadge}>{`home_slide${currentSlide.num}_title_accent`}</span>
                </label>
                <Input 
                  id={`field-home_slide${currentSlide.num}_title_accent`}
                  type="text" 
                  value={cms[`home_slide${currentSlide.num}_title_accent`] !== undefined ? cms[`home_slide${currentSlide.num}_title_accent`] : currentSlide.defaultAccent} 
                  onChange={setM(`home_slide${currentSlide.num}_title_accent`)} 
                  placeholder={currentSlide.defaultAccent} 
                />
              </div>

              <div>
                <label htmlFor={`field-home_slide${currentSlide.num}_title_main`} className={cStyles.formLabel}>
                  <Icon icon="carbon:string-text" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
                  <span>Main Title Headline (White)</span>
                  <span className={cStyles.fieldKeyBadge}>{`home_slide${currentSlide.num}_title_main`}</span>
                </label>
                <Input 
                  id={`field-home_slide${currentSlide.num}_title_main`}
                  type="text" 
                  value={cms[`home_slide${currentSlide.num}_title_main`] !== undefined ? cms[`home_slide${currentSlide.num}_title_main`] : currentSlide.defaultTitle} 
                  onChange={setM(`home_slide${currentSlide.num}_title_main`)} 
                  placeholder={currentSlide.defaultTitle} 
                />
              </div>
            </div>

            <div>
              <label htmlFor={`field-home_slide${currentSlide.num}_desc`} className={cStyles.formLabel}>
                <Icon icon="carbon:text-align-left" className="w-3.5 h-3.5 text-emerald-600 inline mr-0.5 opacity-80" />
                <span>Slide Description Paragraph</span>
                <span className={cStyles.fieldKeyBadge}>{`home_slide${currentSlide.num}_desc`}</span>
              </label>
              <Textarea 
                id={`field-home_slide${currentSlide.num}_desc`}
                rows={3} 
                value={cms[`home_slide${currentSlide.num}_desc`] !== undefined ? cms[`home_slide${currentSlide.num}_desc`] : currentSlide.defaultDesc} 
                onChange={setM(`home_slide${currentSlide.num}_desc`)} 
                placeholder={currentSlide.defaultDesc} 
              />
            </div>
          </div>

          {/* 4 Feature Highlights Grid */}
          <div className={cStyles.heroSectionCard}>
            <div className={cStyles.heroSectionCardHeader}>
              <Icon icon="carbon:star-filled" className="w-4 h-4 text-emerald-600" />
              <span>Slide {currentSlide.num} — 4 Key Feature Badges (Interactive Pills)</span>
            </div>

            <div className={cStyles.heroFeatureGrid}>
              {[1, 2, 3, 4].map((fNum) => {
                const defaultF = currentSlide.defaultFeatures[fNum - 1];
                const titleKey = `home_slide${currentSlide.num}_f${fNum}_title`;
                const descKey = `home_slide${currentSlide.num}_f${fNum}_desc`;

                return (
                  <div key={fNum} className={cStyles.heroFeatureCard}>
                    <div className={cStyles.heroFeatureCardHeader}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <Icon icon={defaultF.icon} className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Feature Badge {fNum}</span>
                      </span>
                      <span className={cStyles.fieldKeyBadge}>F{fNum}</span>
                    </div>

                    <div>
                      <label htmlFor={`field-${titleKey}`} className={cStyles.formLabel} style={{ fontSize: "0.75rem" }}>
                        <span>Badge Title</span>
                        <span className={cStyles.fieldKeyBadge}>{titleKey}</span>
                      </label>
                      <Input 
                        id={`field-${titleKey}`}
                        type="text" 
                        value={cms[titleKey] !== undefined ? cms[titleKey] : defaultF.title} 
                        onChange={setM(titleKey)} 
                        placeholder={defaultF.title} 
                      />
                    </div>

                    <div>
                      <label htmlFor={`field-${descKey}`} className={cStyles.formLabel} style={{ fontSize: "0.75rem" }}>
                        <span>Badge Description</span>
                        <span className={cStyles.fieldKeyBadge}>{descKey}</span>
                      </label>
                      <Input 
                        id={`field-${descKey}`}
                        type="text" 
                        value={cms[descKey] !== undefined ? cms[descKey] : defaultF.desc} 
                        onChange={setM(descKey)} 
                        placeholder={defaultF.desc} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
