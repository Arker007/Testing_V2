export const COMPARISON_CATEGORIES = [
  {
    id: "pallets",
    label: "Warehouse & Export Pallets",
    targetAudience: "Commercial Procurement & Logistics Managers",
    summary: "How engineered recycled plastic pallets outperform timber in racking, cold chain, and automated handling.",
    rows: [
      {
        parameter: "Operational Lifespan",
        plastic: "10+ Years (250+ heavy-duty trip cycles)",
        wood: "1 to 2 Years (frequent cracked deckboards)",
        advantage: "5x to 10x longer working life",
        isWinner: true
      },
      {
        parameter: "ISPM-15 Export Clearance",
        plastic: "100% Exempt (zero fumigation or delays)",
        wood: "Mandatory heat treatment & ISPM-15 stamping",
        advantage: "Zero customs quarantine risk",
        isWinner: true
      },
      {
        parameter: "Moisture & Weight Consistency",
        plastic: "0% Absorption (constant tare weight always)",
        wood: "Absorbs up to 25% water weight in humidity",
        advantage: "Predictable freight payloads",
        isWinner: true
      },
      {
        parameter: "Hygiene & Washdown",
        plastic: "Impermeable, acid/alkali inert, steam washable",
        wood: "Porous fibers harbor bacteria, mold & oils",
        advantage: "Pharma & food safety compliant",
        isWinner: true
      },
      {
        parameter: "Workplace & Conveyor Safety",
        plastic: "Zero nails, zero splinters, uniform automated dimensions",
        wood: "Protruding nails, loose slats, splinter hazards",
        advantage: "Protects goods and warehouse staff",
        isWinner: true
      },
      {
        parameter: "Total Cost of Ownership (TCO)",
        plastic: "Zero maintenance cost + 100% scrap buyback value",
        wood: "Continuous nail/board repair costs & disposal fees",
        advantage: "Lowest cost per pallet trip",
        isWinner: true
      }
    ]
  },
  {
    id: "lumber",
    label: "Civil & Outdoor Structural Lumber",
    targetAudience: "Regional Contractors, Builders & Municipalities",
    summary: "Engineered recycled plastic profiles replace conventional timber in walkways, park benches, fencing & substructures.",
    rows: [
      {
        parameter: "Termite & Biological Decay",
        plastic: "100% Termite & borer proof, zero fungal rot",
        wood: "Vulnerable to termite hollow-out & damp rot",
        advantage: "Immune to pest destruction",
        isWinner: true
      },
      {
        parameter: "Monsoon & Coastal Weathering",
        plastic: "Unaffected by continuous rain, saltwater & coastal humidity",
        wood: "Swelling, surface splintering, warping & moss buildup",
        advantage: "50-year outdoor durability",
        isWinner: true
      },
      {
        parameter: "Routine Upkeep & Treatment",
        plastic: "Zero painting, waterproofing, or sanding required",
        wood: "Annual sanding, oiling, varnishing & toxic chemical coats",
        advantage: "Zero ongoing maintenance budget",
        isWinner: true
      },
      {
        parameter: "Workability & Tooling",
        plastic: "Standard woodworking tools (saw, drill, router, screw)",
        wood: "Standard woodworking tools",
        advantage: "Direct drop-in replacement",
        isWinner: false // Both use standard tools
      },
      {
        parameter: "Splintering & Public Safety",
        plastic: "Smooth solid surface, zero splinters for public benches",
        wood: "Forms sharp splinters as grain weathers outdoors",
        advantage: "Safe for parks & public amenities",
        isWinner: true
      },
      {
        parameter: "Environmental & Circularity",
        plastic: "Diverts landfill plastic; 100% circular polymer",
        wood: "Consumes natural forest timber; treated wood hard to recycle",
        advantage: "Carbon-reducing green specification",
        isWinner: true
      }
    ]
  }
];
