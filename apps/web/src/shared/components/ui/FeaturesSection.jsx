import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Shield,
  Leaf,
  Weight,
  Sun,
  CloudRain,
  Globe,
} from "lucide-react";

import recycledPlasticProfiles from "../../../assets/images/recycled_plastic_profiles_1785866736886.jpg";
import highLoadCapacity from "../../../assets/images/high_load_capacity_1785866759510.jpg";
import weatherResistantBg from "../../../assets/images/weather_resistant_bg_1785866780021.jpg";
import indiaSupplyChainMap from "../../../assets/images/india_supply_chain_map_1785866798806.jpg";
import FeaturesCustomLifespanCards from "./FeaturesCustomLifespanCards";
import { featureCardVariant } from "./featureCardVariants";
import { useSite } from "../../context/SiteContext";

export default function FeaturesSection() {
  const { c } = useSite();

  if (c("show_why_us", "1") === "0") return null;

  return (
    <section className="bg-transparent py-16 md:py-24" id="features-advantage">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={featureCardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-light text-brand-text border border-slate-300/30 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span>Built to Perform. Made to Last.</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-2 mb-4 leading-tight">
            {c("why_us_title", "Engineered for Strength. Delivered with Trust.")}
          </h2>
          <p className="max-w-2xl mx-auto text-center text-slate-600 text-base md:text-lg leading-relaxed">
            {c("why_us_subtitle", "Sustainable engineering with industrial-grade strength, precision manufacturing, and reliable nationwide delivery.")}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-auto md:auto-rows-[300px] gap-4 md:gap-6">
          {/* Card 1 - Large: 100% Recycled */}
          <motion.div
            variants={featureCardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
            className="md:col-span-2 md:row-span-2 rounded-[24px] border border-slate-800/80 bg-navy p-6 md:p-8 shadow-xl relative overflow-hidden group flex flex-col justify-between min-h-[380px] md:min-h-[560px]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={recycledPlasticProfiles}
                alt="100% Recycled Profiles"
                className="absolute right-0 bottom-0 h-full w-2/3 object-cover object-left opacity-80 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-brand/20 bg-brand/10 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.08]">
                  <Leaf className="w-6 h-6 md:w-7 md:h-7 text-brand" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-6 md:mt-8 mb-3 md:mb-4 tracking-tight leading-tight">
                  {c("why_us_f1_title", "100% Recycled")}
                </h3>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-[95%] md:max-w-[90%] font-medium drop-shadow-sm">
                  {c("why_us_f1_desc", "Manufactured from 100% recycled plastic for exceptional durability while reducing environmental impact.")}
                </p>
              </div>

              <div className="mt-6 md:mt-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand/20 border border-brand/30 text-brand text-xs font-semibold shadow-sm backdrop-blur-md">
                  <Leaf className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">Eco-Friendly • Sustainable • Earth Responsible</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - High Load Capacity */}
          <motion.div
            variants={featureCardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
            transition={{ delay: 0.1 }}
            className="md:col-span-2 rounded-[24px] border border-slate-800/80 bg-navy p-6 md:p-8 shadow-xl relative overflow-hidden group flex flex-col justify-between min-h-[260px] md:min-h-[260px]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={highLoadCapacity}
                alt="High Load Capacity"
                className="absolute right-0 bottom-0 h-full w-1/2 object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-brand/20 bg-brand/10 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.08]">
                  <Weight className="w-6 h-6 md:w-7 md:h-7 text-brand" />
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white mt-5 md:mt-6 mb-2 md:mb-3 tracking-tight">
                  {c("why_us_f2_title", "High Load Capacity")}
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed max-w-[90%] md:max-w-[85%] font-medium drop-shadow-sm">
                  {c("why_us_f2_desc", "Engineered to withstand heavy industrial loads without bending, cracking, or rotting under extreme pressure.")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Pan India Supply */}
          <motion.div
            variants={featureCardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
            transition={{ delay: 0.2 }}
            className="md:col-span-2 md:row-span-2 rounded-[24px] border border-slate-800/80 bg-navy p-6 md:p-8 shadow-xl relative overflow-hidden group flex flex-col justify-between min-h-[380px] md:min-h-[560px]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={indiaSupplyChainMap}
                alt="Pan India Supply Chain Map"
                className="absolute bottom-0 left-0 w-full h-[65%] object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-brand/20 bg-brand/10 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.08]">
                  <Globe className="w-6 h-6 md:w-7 md:h-7 text-brand" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-6 md:mt-8 mb-3 md:mb-4 tracking-tight leading-tight">
                  {c("why_us_f4_title", "Pan India Supply")}
                </h3>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-[95%] md:max-w-[90%] font-medium drop-shadow-sm">
                  {c("why_us_f4_desc", "Efficient logistics network ensuring reliable delivery across India with consistent quality and highly dependable service.")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 4 - Weather Resistant */}
          <motion.div
            variants={featureCardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
            transition={{ delay: 0.3 }}
            className="md:col-span-2 rounded-[24px] border border-slate-800/80 bg-navy p-6 md:p-8 shadow-xl relative overflow-hidden group flex flex-col justify-between min-h-[260px] md:min-h-[260px]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={weatherResistantBg}
                alt="Weather Resistant Surface"
                className="absolute right-0 bottom-0 h-full w-1/2 object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-brand/20 bg-brand/10 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.08]">
                  <Sun className="w-6 h-6 md:w-7 md:h-7 text-brand" />
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white mt-5 md:mt-6 mb-2 md:mb-3 tracking-tight">
                  {c("why_us_f3_title", "Weather Resistant")}
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed max-w-[90%] md:max-w-[85%] font-medium drop-shadow-sm">
                  {c("why_us_f3_desc", "Impervious to moisture, UV exposure, and termites for long-lasting performance in any outdoor environment.")}
                </p>
              </div>

              <div className="flex justify-end mt-2">
                <div className="flex gap-2 items-center bg-navy/80 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 w-fit shadow-sm">
                  <CloudRain className="w-4 h-4 text-brand/90" />
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">UV</span>
                  <Shield className="w-4 h-4 text-brand/90" />
                </div>
              </div>
            </div>
          </motion.div>

          <FeaturesCustomLifespanCards cardVariant={featureCardVariant} />
        </div>

        
      </div>
    </section>
  );
}
