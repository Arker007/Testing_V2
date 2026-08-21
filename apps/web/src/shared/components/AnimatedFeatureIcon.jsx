import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */
import { Icon } from "@iconify/react";

const iconMap = {
  waterproof: {
    icon: "solar:cloud-waterdrop-linear",
    variants: {
      hover: {
        y: [0, -3, 0],
        transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
      }
    }
  },
  uv: {
    icon: "solar:sun-2-linear",
    variants: {
      hover: {
        rotate: 360,
        transition: { duration: 4, repeat: Infinity, ease: "linear" }
      }
    }
  },
  termite: {
    icon: "solar:shield-check-linear",
    variants: {
      hover: {
        scale: [1, 1.15, 1],
        transition: { duration: 0.5, ease: "easeInOut" }
      }
    }
  },
  maintenance: {
    icon: "solar:wrench-linear",
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

  return (
    <motion.span className="inline-flex items-center justify-center" variants={config.variants}>
      <Icon icon={config.icon} className="w-4 h-4 text-[#98d12a]" />
    </motion.span>
  );
});
