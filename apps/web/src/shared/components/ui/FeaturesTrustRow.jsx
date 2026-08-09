import React from "react";
import { Shield, Leaf } from "lucide-react";
import { useSite } from "../../context/SiteContext";

export default function FeaturesTrustRow() {
  const { c } = useSite();

  return (
    <div className="mt-8 md:mt-16 border border-slate-200/80 rounded-2xl bg-white p-6 md:p-8 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {/* Value 1 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-brand/10 text-brand-text flex items-center justify-center shrink-0 border border-brand/15">
          <Leaf className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {c("why_us_t1_title", "Sustainable Choice")}
          </h4>
          <p className="text-slate-500 text-xs leading-relaxed">
            {c("why_us_t1_desc", "Low carbon footprint and environmentally responsible.")}
          </p>
        </div>
      </div>

      {/* Value 2 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-brand/10 text-brand-text flex items-center justify-center shrink-0 border border-brand/15">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {c("why_us_t2_title", "Corrosion Proof")}
          </h4>
          <p className="text-slate-500 text-xs leading-relaxed">
            {c("why_us_t2_desc", "Resistant to chemicals, salt, and corrosion.")}
          </p>
        </div>
      </div>

      {/* Value 3 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-brand/10 text-brand-text flex items-center justify-center shrink-0 border border-brand/15">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {c("why_us_t3_title", "Low Maintenance")}
          </h4>
          <p className="text-slate-500 text-xs leading-relaxed">
            {c("why_us_t3_desc", "No painting, no sealing, just long-lasting performance.")}
          </p>
        </div>
      </div>

      {/* Value 4 */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-brand/10 text-brand-text flex items-center justify-center shrink-0 border border-brand/15">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-1">
            {c("why_us_t4_title", "Reliable Support")}
          </h4>
          <p className="text-slate-500 text-xs leading-relaxed">
            {c("why_us_t4_desc", "Expert guidance and dedicated customer support.")}
          </p>
        </div>
      </div>
    </div>
  );
}
