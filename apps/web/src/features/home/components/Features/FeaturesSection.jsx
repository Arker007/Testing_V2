import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSite } from "@/shared/context/SiteContext";
import FeaturesTrustRow from "./FeaturesTrustRow";
import styles from "./Features.module.css";

export default function FeaturesSection() {
  const { c } = useSite();

  if (c("show_why_us", "1") === "0") return null;

  const rawTitle = c("why_us_title", "Engineered for Demanding Environments");

  const renderTitle = () => {
    if (rawTitle.toLowerCase().startsWith("engineered for")) {
      const remaining = rawTitle.slice("engineered for".length).trim();
      return (
        <>
          Engineered for
          <br />
          <span className="text-[var(--brand-primary)]">{remaining}</span>
        </>
      );
    }
    return rawTitle;
  };

  const featureCards = [
    {
      category: c("why_us_f1_category", "Quality Assurance"),
      title: c("why_us_f1_title", "Quality Assurance"),
      desc: c(
        "why_us_f1_desc",
        "Rigorous testing ensures superior structural performance, dimensional stability, and weather durability."
      ),
      href: "/products",
      icon: <Icon icon="solar:shield-check-linear" className="w-6 h-6" />,
    },
    {
      category: c("why_us_f2_category", "Custom Manufacturing"),
      title: c("why_us_f2_title", "Custom Profiles"),
      desc: c(
        "why_us_f2_desc",
        "Tailored recycled polymer profiles, reinforced designs, and custom textures to meet your application needs."
      ),
      href: "/products",
      icon: <Icon icon="solar:layers-minimalistic-linear" className="w-6 h-6" />,
    },
    {
      category: c("why_us_f3_category", "Sustainable Materials"),
      title: c("why_us_f3_title", "Recycled Material"),
      desc: c(
        "why_us_f3_desc",
        "100% recycled HDPE material diverting landfill and marine plastic waste. A sustainable alternative to timber and steel."
      ),
      href: "/sustainability",
      icon: <Icon icon="solar:restart-circle-linear" className="w-6 h-6" />,
    },
    {
      category: c("why_us_f4_category", "Business Value"),
      title: c("why_us_f4_title", "Cost Efficiency"),
      desc: c(
        "why_us_f4_desc",
        "Minimal maintenance, no termite damage, and a longer service life deliver lower total cost of ownership across decades of use."
      ),
      href: "/contact",
      icon: <Icon icon="solar:graph-up-linear" className="w-6 h-6" />,
    },
  ];

  return (
    <section
      id="features-durability"
      aria-label="Features and Durability"
      className="py-10 sm:py-14 md:py-16 bg-[var(--bg-surface-secondary)] border-t border-b border-[var(--border-subtle)] relative overflow-hidden"
    >
      <div className="max-w-[1580px] w-full mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
        {/* Split Section: Hero / Value Proposition + Feature Cards Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
          data-purpose="hero-feature-split"
        >
          {/* Left Column: Value Proposition & Product Cutouts */}
          <div className="lg:col-span-6 flex flex-col justify-between relative pt-2">
            <div>
              {/* Subheader tag */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-7 h-[2.5px] bg-[var(--brand-primary)] inline-block" />
                <span className="text-xs md:text-sm font-bold tracking-widest text-[var(--text-brand)] uppercase">
                  {c("why_us_eyebrow", c("why_us_badge", "WHY CHOOSE VISHAL ENTERPRISE"))}
                </span>
              </div>

              {/* Main Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.4rem] leading-[1.08] font-black tracking-tight text-[var(--text-primary)] mb-5">
                {renderTitle()}
              </h2>

              {/* Body Description */}
              <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl font-normal leading-relaxed mb-8">
                {c(
                  "why_us_subtitle",
                  "We manufacture high-performance recycled plastic solutions with precision engineering, structural strength, and low-maintenance durability for real-world industrial use."
                )}
              </p>

              {/* Key Checkmarks */}
              <ul className="space-y-3.5 mb-10">
                <li className="flex items-center space-x-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-[var(--text-inverse)]">
                    <Icon icon="solar:check-read-linear" className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-[15px] sm:text-base font-semibold text-[var(--text-primary)]">
                    {c("why_us_bullet_1", "Certified ASTM flexural & tensile QA")}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-[var(--text-inverse)]">
                    <Icon icon="solar:check-read-linear" className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-[15px] sm:text-base font-semibold text-[var(--text-primary)]">
                    {c("why_us_bullet_2", "Custom die tooling & reinforced profiles")}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-[var(--text-inverse)]">
                    <Icon icon="solar:check-read-linear" className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-[15px] sm:text-base font-semibold text-[var(--text-primary)]">
                    {c("why_us_bullet_3", "100% industrial circular polymer recycling")}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-[var(--text-inverse)]">
                    <Icon icon="solar:check-read-linear" className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span className="text-[15px] sm:text-base font-semibold text-[var(--text-primary)]">
                    {c("why_us_bullet_4", "Zero rotting, splintering, or termite corrosion")}
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual Extrusion Product Showcase */}
            <div className="relative w-full mt-4 min-h-[190px] flex items-end justify-between">
              {/* Left Bottom Motto Text */}
              <div className="relative z-10 pb-4">
                <div className="w-7 h-[1.5px] bg-[var(--border-strong)] mb-2" />
                <p className="text-[11px] uppercase tracking-widest font-semibold text-[var(--text-muted)] leading-tight">
                  BUILT TODAY<br />FOR A CLEANER TOMORROW
                </p>
              </div>

              {/* Product Simulation (Structural profiles + Pellets) */}
              <div className="relative flex-1 flex justify-center items-end pr-4 sm:pr-12">
                {/* Handwritten Annotation with Curved Arrow */}
                <div className="absolute -top-14 right-20 sm:right-28 flex flex-col items-center pointer-events-none select-none z-20">
                  <span
                    className={`${styles.fontHandwriting} text-[var(--text-muted)] text-2xl -rotate-6 tracking-wide text-center leading-5`}
                  >
                    Recycled<br />for a stronger<br />tomorrow
                  </span>
                  <svg
                    className="w-10 h-10 text-[var(--text-muted)] -mt-1 ml-6 rotate-12"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                    viewBox="0 0 50 50"
                  >
                    <path d="M12 8 C 24 16, 28 28, 22 42" />
                    <path d="M16 38 L 22 42 L 27 36" />
                  </svg>
                </div>

                {/* Profile Beams Graphic Composition */}
                <div className="relative flex items-end -space-x-4">
                  {/* Horizontal Hollow Extruded Profile 1 */}
                  <div
                    className={`relative w-28 sm:w-36 h-20 ${styles.polymerProfileTexture} rounded-sm border-t border-l border-[var(--border-subtle)] flex items-center justify-center p-3 shadow-2xl`}
                  >
                    <div
                      className={`w-full h-full ${styles.profileInnerHole} rounded-[2px] border border-[var(--border-default)] flex items-center justify-center`}
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--neutral-950)]" />
                    </div>
                  </div>

                  {/* Vertical Hollow Profile 2 */}
                  <div
                    className={`relative w-24 sm:w-28 h-32 -mb-2 ${styles.polymerProfileTexture} rounded-sm border-t border-l border-[var(--border-subtle)] flex flex-col items-center justify-around p-2.5 shadow-2xl z-10`}
                  >
                    <div className={`w-full h-10 ${styles.profileInnerHole} rounded-[2px] border border-[var(--border-default)]`} />
                    <div className={`w-full h-10 ${styles.profileInnerHole} rounded-[2px] border border-[var(--border-default)]`} />
                  </div>

                  {/* Profile Beam 3 (Reinforced Decking cross-section) */}
                  <div
                    className={`relative w-20 sm:w-24 h-40 ${styles.polymerProfileTexture} rounded-sm border-t border-l border-[var(--border-subtle)] flex flex-col items-center justify-between p-2.5 shadow-2xl z-10`}
                  >
                    <div className={`w-full h-8 ${styles.profileInnerHole} rounded-[2px]`} />
                    <div className={`w-full h-8 ${styles.profileInnerHole} rounded-[2px]`} />
                    <div className={`w-full h-8 ${styles.profileInnerHole} rounded-[2px]`} />
                  </div>

                  {/* Recycled Pellets Bed Representation */}
                  <div className="absolute -bottom-2 -right-8 w-44 sm:w-56 h-12 pointer-events-none z-10 flex flex-wrap gap-1 items-end opacity-90 overflow-hidden">
                    {/* Polymer Pellets */}
                    <div className="w-full h-full bg-gradient-to-t from-[var(--neutral-950)] via-[var(--navy-900)] to-transparent rounded-full filter blur-[0.6px] relative">
                      <span className="absolute bottom-1 left-2 w-2.5 h-2.5 rounded-full bg-[var(--brand-primary)] inline-block shadow" />
                      <span className="absolute bottom-2 left-6 w-2 h-2 rounded-full bg-[var(--brand-hover)] inline-block" />
                      <span className="absolute bottom-1 left-10 w-2.5 h-2.5 rounded-full bg-[var(--neutral-400)] inline-block" />
                      <span className="absolute bottom-3 left-14 w-2 h-2 rounded-full bg-[var(--brand-active)] inline-block" />
                      <span className="absolute bottom-1 left-18 w-3 h-3 rounded-full bg-[var(--neutral-800)] inline-block" />
                      <span className="absolute bottom-2 left-24 w-2.5 h-2.5 rounded-full bg-[var(--brand-primary)] inline-block" />
                      <span className="absolute bottom-1 left-30 w-2 h-2 rounded-full bg-[var(--neutral-300)] inline-block" />
                      <span className="absolute bottom-2 left-36 w-3 h-3 rounded-full bg-[var(--brand-hover)] inline-block" />
                      <span className="absolute bottom-1 right-2 w-2.5 h-2.5 rounded-full bg-[var(--neutral-900)] inline-block" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Clean Feature Cards Grid */}
          <div
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
            data-purpose="feature-cards-grid"
          >
            {featureCards.map((card, idx) => (
              <article
                key={idx}
                className="bg-[var(--bg-surface)] rounded-[var(--radius-card,16px)] p-6 sm:p-8 flex flex-col justify-between shadow-[var(--shadow-sm)] border border-[var(--border-subtle)] transition-all hover:shadow-[var(--shadow-md)] hover:border-[var(--brand-border)]"
              >
                <div>
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-[var(--radius-icon,8px)] bg-[var(--brand-soft)] border border-[var(--border-brand)] flex items-center justify-center text-[var(--text-brand)] dark:text-[var(--brand-primary)] shadow-xs mb-5">
                    {card.icon}
                  </div>

                  {/* Category */}
                  <span className="block text-[11px] font-bold tracking-wider text-[var(--text-muted)] uppercase mb-1.5">
                    {card.category}
                  </span>

                  {/* Heading */}
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2.5">
                    {card.title}
                  </h3>

                  {/* Paragraph */}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* CTA Link */}
                <div className="pt-6">
                  <Link
                    to={card.href}
                    className="inline-flex items-center space-x-2 text-xs font-bold tracking-wider text-[var(--brand-primary)] hover:text-[var(--brand-hover)] group"
                  >
                    <span className="w-6 h-6 rounded-full border border-[var(--brand-primary)] flex items-center justify-center group-hover:bg-[var(--brand-primary)] group-hover:text-[var(--text-inverse)] transition-colors">
                      <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>Learn more</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Metrics Ribbon */}
        <FeaturesTrustRow />
      </div>
    </section>
  );
}


