import React from "react";
import { Award } from "lucide-react";
import { useSite } from "../../shared/context/SiteContext";

export default function ExperienceBanner() {
  const { c } = useSite();

  if (c("about_cert_enabled", "1") === "0") return null;

  return (
    <section className="bg-gradient-to-br from-navy to-navy-light text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-brand text-navy flex items-center justify-center shrink-0 font-black text-2xl shadow-lg shadow-brand/20">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {c("experience_banner_title", "Over 15 Years of Industrial Excellence")}
              </h3>
              <p className="text-slate-300 text-sm mt-1 max-w-xl font-normal">
                {c(
                  "experience_banner_desc",
                  "Equipped with high-capacity extrusion lines and testing equipment at our Ankleshwar plant, ensuring zero defect tolerance on every shipment."
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {c("cert_gst", "GST Registered") && (
              <div className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold uppercase tracking-wider text-slate-200 border border-white/10">
                {c("cert_gst", "GST Registered")}
              </div>
            )}
            {c("cert_gmp", "Made in India") && (
              <div className="px-4 py-2 rounded-xl bg-brand/20 text-brand text-xs font-bold uppercase tracking-wider border border-brand/30">
                {c("cert_gmp", "Made in India")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
