import React from "react";
import { motion } from "framer-motion";
import { Droplets, Sun, ShieldCheck, Wrench } from "lucide-react";

const iconMap = {
  waterproof: {
    Icon: Droplets,
    variants: {
      hover: {
        y: [0, -3, 0],
        transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
      }
    }
  },
  uv: {
    Icon: Sun,
    variants: {
      hover: {
        rotate: 360,
        transition: { duration: 4, repeat: Infinity, ease: "linear" }
      }
    }
  },
  termite: {
    Icon: ShieldCheck,
    variants: {
      hover: {
        scale: [1, 1.15, 1],
        transition: { duration: 0.5, ease: "easeInOut" }
      }
    }
  },
  maintenance: {
    Icon: Wrench,
    variants: {
      hover: {
        rotate: [0, 15, -15, 15, 0],
        transition: { duration: 0.5, ease: "easeInOut" }
      }
    }
  }
};

export const AnimatedFeatureIcon = React.memo(function AnimatedFeatureIcon({ type }) {
  const config = iconMap[type];
  if (!config) return null;

  const MotionIcon = motion.create(config.Icon);
  return <MotionIcon className="w-4 h-4 text-[#98d12a]" variants={config.variants} />;
});
