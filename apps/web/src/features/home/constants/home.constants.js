import React from "react";
import { motion } from "motion/react";
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
      React.createElement(Icon, {
        icon: iconName,
        className: "w-full h-full text-current shrink-0",
        width: "20",
        height: "20",
        ...iconProps,
      })
    );
  });
  IconWrapper.displayName = `MotionIcon(${iconName})`;
  return motion.create(IconWrapper);
}

export const MotionHardHat = createMotionIcon("hugeicons:shield-check");
export const MotionShieldCheck = createMotionIcon("hugeicons:shield-check");
export const MotionRoute = createMotionIcon("hugeicons:route-01");
export const MotionTrees = createMotionIcon("hugeicons:tree-01");
export const MotionSchool = createMotionIcon("hugeicons:award-01");
export const MotionWarehouse = createMotionIcon("hugeicons:package");
export const MotionSprout = createMotionIcon("hugeicons:leaf-01");
export const MotionHomeIcon = createMotionIcon("hugeicons:home-01");
export const MotionBuilding2 = createMotionIcon("hugeicons:building-03");
export const MotionArrowRight = createMotionIcon("hugeicons:arrow-right-01");

export const hardHatVariants = {};
export const shieldCheckVariants = {};
export const routeVariants = {};
export const treesVariants = {};
export const schoolVariants = {};
export const warehouseVariants = {};
export const sproutVariants = {};
export const homeIconVariants = {};
export const building2Variants = {};
export const bentoArrowVariants = {};

export const industryCardVariant = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.35,
      ease: [0.25, 1, 0.5, 1]
    }
  }),
  hover: {
    y: -6,
    scale: 1.015,
    transition: {
      type: "tween",
      duration: 0.12,
      delay: 0,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};
