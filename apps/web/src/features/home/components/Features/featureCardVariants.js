export const featureCardVariant = {
  hidden: {
    opacity: 0,
    y: 20,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  visible: {
    opacity: 1,
    y: 0,
    borderColor: "rgba(255, 255, 255, 0.08)",
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    y: -4,
    borderColor: "rgba(152, 209, 42, 0.4)",
    boxShadow: "0 16px 32px -8px rgba(11, 47, 99, 0.3), 0 0 16px -4px rgba(152, 209, 42, 0.2)",
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 24,
    },
  },
};
