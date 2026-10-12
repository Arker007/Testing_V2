export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const testimonials = [
  {
    quote: "Switching to Vishal Enterprise's heavy-duty recycled plastic pallets reduced our warehouse breakage to zero. Their racking pallets easily handle our 1.5-ton chemical drum loads.",
    author: "Jessica Wall",
    role: "Supply Chain Manager, Legat Owen Logistics",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Their recycled plastic crates are tough, hygienic, and withstand harsh field handling. We've eliminated wood splinter contamination completely from our supply line.",
    author: "Amit Patel",
    role: "Operations Director, GreenField Organics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Consistently uniform melt flow and clean melt filtration on their recycled plastic granules. We procure full truckloads every month for our industrial molding plant.",
    author: "Rajesh Mehta",
    role: "Plant Head, Gujarat Polymers",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];
