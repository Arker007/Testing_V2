import React from "react";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
import Card from "../../shared/components/ui/Card";

export default function ExperienceBanner() {
  const { c } = useSite();

  if (c("about_cert_enabled", "1") === "0") return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Card
        variant="elevated"
        className="p-8 sm:p-10 text-slate-900 dark:text-white shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-[#171E26] border border-slate-200/90 dark:border-white/10 rounded-2xl"
      >
        {/* Ambient radial glow blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 dark:bg-blue-500/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-xl bg-[var(--brand)] text-slate-950 flex items-center justify-center shrink-0 font-black text-2xl shadow-lg shadow-emerald-500/20 border border-[var(--brand)]">
              <Icon icon="solar:medal-ribbons-star-linear" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                {c("experience_banner_title", "Over 15 Years of Industrial Excellence")}
              </h3>
              <p className="text-slate-700 dark:text-slate-200 text-sm mt-1 max-w-xl font-normal leading-relaxed">
                {c(
                  "experience_banner_desc",
                  "Equipped with high-capacity extrusion lines and testing equipment at our Ankleshwar plant, ensuring zero defect tolerance on every shipment."
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto flex-wrap">
            {c("cert_gst", "GST Registered") && (
              <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white border border-slate-200 dark:border-white/15 shadow-xs">
                {c("cert_gst", "GST Registered")}
              </div>
            )}
            {c("cert_gmp", "Made in India") && (
              <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-[#88e31b] text-xs font-bold uppercase tracking-wider border border-emerald-300 dark:border-emerald-500/40 shadow-xs">
                {c("cert_gmp", "Made in India")}
              </div>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}
