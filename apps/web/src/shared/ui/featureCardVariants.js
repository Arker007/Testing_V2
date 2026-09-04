export const featureCardVariant = {
  hidden: {
    opacity: 0,
    y: 30,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  visible: {
    opacity: 1,
    y: 0,
    borderColor: "rgba(255, 255, 255, 0.08)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    y: -6,
    borderColor: "rgba(152, 209, 42, 0.4)",
    boxShadow: "0 20px 40px -10px rgba(11, 47, 99, 0.35), 0 0 20px -5px rgba(152, 209, 42, 0.25)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};
