import React from "react";
import { Icon } from "@iconify/react";
import { useSite } from "../../shared/context/SiteContext";
import Card from "../../shared/components/ui/Card";
import Badge from "../../shared/components/ui/Badge";

export default function SustainabilitySection() {
  const { c, co } = useSite();

  if (c("show_home_about", "1") === "0") return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Card
        variant="elevated"
        className="p-8 sm:p-12 text-slate-900 dark:text-white shadow-xl relative overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-[#171E26] border border-slate-200/90 dark:border-white/10 rounded-2xl"
      >
        {/* Ambient radial glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand)]/10 dark:bg-[var(--brand)]/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-12 items-center">
          {/* Left Graphic */}
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border-2 border-dashed border-emerald-400 dark:border-emerald-500/50 flex items-center justify-center text-emerald-600 dark:text-[#88e31b] shadow-sm animate-icon-pulse">
              <Icon icon="solar:leaf-linear" className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>
            <Badge variant="brand" size="md">
              Circular Economy
            </Badge>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2">
                <Badge variant="brand" size="sm">
                  {c("home_about_eyebrow", "Our Environmental Impact")}
                </Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                {c("home_about_title", "Replacing Wood. Saving Forests.")}
              </h2>
            </div>
            <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base font-normal leading-relaxed">
              {c(
                "home_about_desc",
                `At ${co("name", "VISHAL ENTERPRISE")}, we turn recycled plastic into high-durability products. This prevents plastic waste from reaching landfills and provides strong, rot-proof alternatives to traditional wood without requiring toxic chemical treatments.`
              )}
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 p-3 sm:p-4 rounded-xl text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-[#88e31b]">
                  {c("home_about_stat1_number", "20+")}
                </div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mt-1">
                  {c("home_about_stat1_label", "Years Experience")}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 p-3 sm:p-4 rounded-xl text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-[#88e31b]">
                  {c("home_about_stat2_number", "1000+")}
                </div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mt-1">
                  {c("home_about_stat2_label", "Satisfied Clients")}
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 p-3 sm:p-4 rounded-xl text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-[#88e31b]">
                  {c("home_about_stat3_number", "1500+")}
                </div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mt-1">
                  {c("home_about_stat3_label", "Tons Recycled")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
