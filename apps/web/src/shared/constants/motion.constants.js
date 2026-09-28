/**
 * Centralized Motion & Animation Design Tokens (Single Source of Truth)
 * Grounded in Ant Design Motion Principles: Natural, Performant, and Concise.
 * Synchronized across all React components, Framer Motion variants, and CSS bridges.
 */

// ── Standardized Easings (Ant Design Motion Curves) ──
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.4, 0, 0.2, 1];
export const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1];
export const EASE_ANT_NATURAL = [0.2, 0, 0, 1]; // Ant Motion natural curve
export const EASE_ANT_ENTER = [0.0, 0, 0.2, 1];  // Ant Motion performant entrance
export const EASE_ANT_EXIT = [0.4, 0, 1, 1];     // Ant Motion fast exit velocity

// ── Standardized Durations (Performant Enterprise Motion) ──
export const DURATION_INSTANT = 0.1;
export const DURATION_FAST = 0.12; // Fast exit velocity
export const DURATION_BASE = 0.2;  // Enterprise standard entrance
export const DURATION_SMOOTH = 0.28;
export const DURATION_SLOW = 0.4;

// ── Standardized Springs (Natural Interaction Feedback) ──
export const SPRING_ANT_BUTTON = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

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
export const STAGGER_FAST = 0.03;
export const STAGGER_BASE = 0.05;
export const STAGGER_SMOOTH = 0.08;

// ── Standardized Transition Presets ──
export const transitionFast = {
  duration: DURATION_FAST,
  ease: EASE_ANT_EXIT,
};

export const transitionBase = {
  duration: DURATION_BASE,
  ease: EASE_OUT_EXPO,
};

export const transitionSmooth = {
  duration: DURATION_SMOOTH,
  ease: EASE_OUT_EXPO,
};

// ── Reusable Component Animation Variants (Ant Motion Compliant) ──
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionBase,
  },
  exit: {
    opacity: 0,
    transition: transitionFast, // Fast exit velocity
  },
};

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSmooth,
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: transitionFast, // Simultaneous, concise exit
  },
};

/**
 * Performant List Container
 * Entrance is staggered for visual hierarchy; exit dismisses all items simultaneously as one unit.
 */
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_BASE,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0, // Eliminate staggered exit delays
      duration: DURATION_FAST,
      ease: EASE_ANT_EXIT,
    },
  },
};

export const modalScaleVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION_BASE,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 3,
    transition: {
      duration: DURATION_FAST, // Performant fast exit
      ease: EASE_ANT_EXIT,
    },
  },
};

export const dropdownVariants = {
  hidden: { opacity: 0, y: -4, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION_BASE,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.99,
    transition: {
      duration: DURATION_FAST,
      ease: EASE_ANT_EXIT,
    },
  },
};

export const dropdownMenuVariants = dropdownVariants;

export const chevronRotateVariants = {
  collapsed: { rotate: 0, transition: { duration: DURATION_FAST, ease: EASE_OUT_EXPO } },
  expanded: { rotate: 180, transition: { duration: DURATION_BASE, ease: EASE_OUT_EXPO } },
};

