import { motion } from "framer-motion";
import {
  HardHat,
  ShieldCheck,
  Route,
  Trees,
  School,
  Warehouse,
  Sprout,
  Home as HomeIcon,
  Building2,
  ArrowRight
} from "lucide-react";

export const MotionHardHat = motion.create(HardHat);
export const MotionShieldCheck = motion.create(ShieldCheck);
export const MotionRoute = motion.create(Route);
export const MotionTrees = motion.create(Trees);
export const MotionSchool = motion.create(School);
export const MotionWarehouse = motion.create(Warehouse);
export const MotionSprout = motion.create(Sprout);
export const MotionHomeIcon = motion.create(HomeIcon);
export const MotionBuilding2 = motion.create(Building2);
export const MotionArrowRight = motion.create(ArrowRight);

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
    borderColor: "rgba(152, 209, 42, 0.4)",
    boxShadow: "0 20px 40px -10px rgba(11, 47, 99, 0.25), 0 0 20px -5px rgba(152, 209, 42, 0.15)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};
