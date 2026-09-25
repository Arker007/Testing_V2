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
    quote: "We are extremely pleased with the premium recycled plastic pallets from Vishal Enterprise. They handle our heavy warehouse loads flawlessly and have significantly reduced our material handling costs over the years.",
    author: "Jessica Wall",
    role: "Logistics Manager, Legat Owen",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Switching to Vishal's high-density eco-friendly crates has helped us meet our rigorous sustainability targets while ensuring safe, damage-free transit of agricultural goods across India.",
    author: "Amit Patel",
    role: "Supply Chain Director, GreenField Organics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Highly consistent quality and prompt delivery. Their GST Registration truly reflects on the structural integrity of their custom heavy-duty pallets. Outstanding service!",
    author: "Rajesh Mehta",
    role: "Production Head, Gujarat Polymers",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];
