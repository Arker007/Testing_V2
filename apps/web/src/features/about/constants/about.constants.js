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
    quote: "Vishal Enterprise has been a reliable partner for our pallet requirements. The quality and durability of their recycled plastic pallets have helped us improve our handling operations while supporting our sustainability goals.",
    role: "Procurement Manager",
    company: "Pharma Company",
    icon: "solar:buildings-2-bold"
  },
  {
    quote: "Switching to Vishal's high-density eco-friendly pallets and crates has helped us meet our rigorous sustainability targets while ensuring safe, damage-free transit of goods across India.",
    role: "Supply Chain Director",
    company: "Logistics Enterprise",
    icon: "solar:box-minimalistic-bold"
  },
  {
    quote: "Highly consistent quality and prompt factory delivery. Their engineering excellence truly reflects in the structural load capacity and longevity of their custom heavy-duty pallets.",
    role: "Operations Head",
    company: "Industrial Manufacturing Ltd.",
    icon: "solar:factory-bold"
  }
];
