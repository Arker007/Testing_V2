import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

function createMotionIcon(iconName) {
  const IconWrapper = React.forwardRef((props, ref) => {
    const {
      _variants,
      _initial,
      _animate,
      _whileHover,
      _whileTap,
      _whileFocus,
      _whileDrag,
      _whileInView,
      _transition,
      _custom,
      className,
      style,
      ...iconProps
    } = props;

    return React.createElement(
      "span",
      {
        ref,
        className: `inline-flex items-center justify-center shrink-0 ${className || "w-5 h-5"}`,
        style,
      },
      React.createElement(Icon, { icon: iconName, className: "w-full h-full", ...iconProps })
    );
  });
  IconWrapper.displayName = `MotionIcon(${iconName})`;
  return motion.create(IconWrapper);
}

export const MotionHardHat = createMotionIcon("solar:shield-warning-linear");
export const MotionShieldCheck = createMotionIcon("solar:shield-check-linear");
export const MotionRoute = createMotionIcon("solar:map-point-linear");
export const MotionTrees = createMotionIcon("solar:leaf-linear");
export const MotionSchool = createMotionIcon("solar:buildings-2-linear");
export const MotionWarehouse = createMotionIcon("solar:box-minimalistic-linear");
export const MotionSprout = createMotionIcon("solar:leaf-linear");
export const MotionHomeIcon = createMotionIcon("solar:home-smile-linear");
export const MotionBuilding2 = createMotionIcon("solar:buildings-3-linear");
export const MotionArrowRight = createMotionIcon("solar:arrow-right-linear");

export const hardHatVariants = {
  hover: {
    y: [0, -4, 0],
    rotate: [0, -5, 5, -5, 0],
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

export const shieldCheckVariants = {
  hover: {
    scale: [1, 1.15, 1],
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

export const routeVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, 10, -10, 0],
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

export const treesVariants = {
  hover: {
    skewX: [0, 6, -6, 4, 0],
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

export const schoolVariants = {
  hover: {
    y: [0, -4, 0],
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

export const warehouseVariants = {
  hover: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

export const sproutVariants = {
  hover: {
    scale: [1, 1.2, 1.05, 1.1],
    y: [0, -2, -1],
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const homeIconVariants = {
  hover: {
    scale: 1.1,
    y: -2,
    transition: { type: "spring", stiffness: 300, damping: 12 }
  }
};

export const building2Variants = {
  hover: {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300, damping: 12 }
  }
};

export const bentoArrowVariants = {
  hover: {
    x: 4,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

export const industryCardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    y: -6,
    borderColor: "var(--brand-border)",
    boxShadow: "0 20px 40px -10px var(--navy-glow), 0 0 20px -5px var(--brand-glow-subtle)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};
