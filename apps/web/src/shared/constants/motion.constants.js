/**
 * Centralized Motion & Animation Design Tokens (Single Source of Truth)
 * Synchronized across all React components, Framer Motion variants, and CSS bridges.
 */

// ── Standardized Easings ──
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.4, 0, 0.2, 1];
export const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1];

// ── Standardized Durations (in seconds for Framer Motion) ──
export const DURATION_INSTANT = 0.1;
export const DURATION_FAST = 0.15;
export const DURATION_BASE = 0.25;
export const DURATION_SMOOTH = 0.35;
export const DURATION_SLOW = 0.5;

// ── Standardized Springs ──
export const SPRING_SNAPPY = {
  type: "spring",
  stiffness: 320,
  damping: 24,
};

export const SPRING_GENTLE = {
  type: "spring",
  stiffness: 220,
  damping: 20,
};

export const SPRING_CARD_HOVER = {
  type: "spring",
  stiffness: 300,
  damping: 22,
};

// ── Standardized Staggers ──
export const STAGGER_FAST = 0.04;
export const STAGGER_BASE = 0.07;
export const STAGGER_SMOOTH = 0.1;

// ── Standardized Transition Presets ──
export const transitionFast = {
  duration: DURATION_FAST,
  ease: EASE_OUT_EXPO,
};

export const transitionBase = {
  duration: DURATION_BASE,
  ease: EASE_OUT_EXPO,
};

export const transitionSmooth = {
  duration: DURATION_SMOOTH,
  ease: EASE_OUT_EXPO,
};

// ── Reusable Component Animation Variants ──
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionBase,
  },
  exit: {
    opacity: 0,
    transition: transitionFast,
  },
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSmooth,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: transitionFast,
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_BASE,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    transition: transitionFast,
  },
};

export const modalScaleVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitionBase,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 4,
    transition: transitionFast,
  },
};

export const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.992 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.992,
    transition: {
      duration: 0.15,
      ease: EASE_OUT_EXPO,
    },
  },
};
