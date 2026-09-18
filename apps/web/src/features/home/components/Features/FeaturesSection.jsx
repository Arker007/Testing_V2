import React from "react";
import { Icon } from "@iconify/react";
import { useSite } from "@/shared/context/SiteContext";
import Card from "@/shared/ui/data-display/Card";
import SectionHeader from "@/shared/ui/layout/SectionHeader";
import FeaturesTrustRow from "./FeaturesTrustRow";
import qualityControlImg from "@/assets/images/backgrounds/high_load_capacity_1785866759510.jpg";
import customDesignImg from "@/assets/images/backgrounds/custom_manufacturing_bg_1785866818566.jpg";
import ecoPlasticImg from "@/assets/images/marketing/recycled_plastic_profiles_1785866736886.jpg";
import weatherRoiImg from "@/assets/images/backgrounds/weather_resistant_bg_1785866780021.jpg";

export default function FeaturesSection() {
  const { c } = useSite();

  if (c("show_why_us", "1") === "0") return null;

  const features = [
    {
      icon: "carbon:certificate",
      tag: c("why_us_f1_tag", "ASTM D638 QA"),
      image: qualityControlImg,
      imageAlt: "HDPE Polymer structural flexural testing",
      title: c("why_us_f1_title", "Quality Control Process"),
      desc: c(
        "why_us_f1_desc",
        "We ensure superior quality products by rigorously testing HDPE polymer profiles for tensile strength, density, structural stability, and weather durability."
      ),
    },
    {
      icon: "carbon:settings",
      tag: c("why_us_f2_tag", "OEM Custom"),
      image: customDesignImg,
      imageAlt: "Custom high-precision extrusion dies and molding",
      title: c("why_us_f2_title", "Custom Solution Design"),
      desc: c(
        "why_us_f2_desc",
        "Tailored recycled polymer lumber dimensions, steel core reinforcements, custom colors, grain textures, and heavy-duty designs available upon request."
      ),
    },
    {
      icon: "carbon:recycle",
      tag: c("why_us_f3_tag", "100% Circular"),
      image: ecoPlasticImg,
      imageAlt: "Recycled plastic structural profiles ready for application",
      title: c("why_us_f3_title", "Eco-Friendly Recycled Plastic"),
      desc: c(
        "why_us_f3_desc",
        "100% recycled HDPE material diversion preventing landfill & marine plastic waste. A sustainable alternative replacing timber & steel."
      ),
    },
    {
      icon: "carbon:chart-line",
      tag: c("why_us_f4_tag", "High ROI SLA"),
      image: weatherRoiImg,
      imageAlt: "Weather-resistant recycled plastic lumber installation",
      title: c("why_us_f4_title", "Cost Savings & ROI"),
      desc: c(
        "why_us_f4_desc",
        "Zero maintenance, no termite destruction, and superior life cycle value compared to wood or metal across decades of heavy use."
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={c("why_us_eyebrow", c("why_us_badge", "Why Choose Us"))}
          title={c("why_us_title", "Engineered for Extreme Durability")}
          subtitle={c(
            "why_us_subtitle",
            "Combining circular economy plastic recycling with precision industrial polymer manufacturing."
          )}
          align="center"
          className="mb-8 md:mb-10"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          {/* Feature Cards */}
          {features.map((feat, idx) => (
            <Card
              key={idx}
              className="md:col-span-3 bg-[var(--bg-surface)] p-5 sm:p-6 rounded-[var(--radius-card,8px)] border border-[var(--border-subtle)] hover:border-[var(--border-brand)] transition-all duration-300 group hover:-translate-y-1 hover:shadow-md flex flex-col justify-between overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Card Media Preview */}
                <div className="relative w-full h-44 sm:h-48 mb-4 rounded-[var(--radius-sm,6px)] overflow-hidden bg-slate-900 border border-[var(--border-subtle)] shrink-0">
                  <img
                    src={feat.image}
                    alt={feat.imageAlt}
                    width="400"
                    height="192"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      const fallbacks = [
                        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?q=80&w=800&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
                      ];
                      e.currentTarget.src = fallbacks[idx % fallbacks.length];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-sm,6px)] bg-black/65 backdrop-blur-md border border-white/20 text-[0.6875rem] font-bold text-white tracking-wider">
                      {feat.tag}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-[var(--radius-btn,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] text-[var(--brand-primary)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <Icon icon={feat.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="text-[1.0625rem] font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                    {feat.title}
                  </h3>
                </div>

                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-auto">
                  {feat.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Features Trust Row */}
        <FeaturesTrustRow />
      </div>
    </section>
  );
}
