/**
 * MegaMenu Catalog Data & Hierarchy
 * Structured for the redesigned category sidebar + 3-column sub-group layout
 * Conforms to AGENTS.md icon standard: @iconify/react with solar:* icons
 */

export const MEGA_MENU_CATEGORIES = [
  {
    slug: "plastic-pallets",
    id: "plastic-pallets",
    name: "Plastic Pallets",
    icon: "solar:box-minimalistic-linear",
    description: "ISPM-15 export, heavy racking, euro, and chemical pallets",
    columns: [
      {
        groups: [
          {
            title: "Racking & High Bay",
            items: [
              { name: "Heavy-Duty Rackable Pallet", id: "pallet-hd-racking-1210" },
              { name: "Reversible Double-Deck Pallet", id: "pallet-4way-reversible-1212" },
              { name: "Steel-Reinforced Industrial Pallet", query: "steel reinforced" },
              { name: "Automated AS/RS Pallet", query: "automated" },
            ],
            showAllQuery: "racking",
          },
          {
            title: "Export & Euro Standards",
            items: [
              { name: "Euro Standard Pallet (1200x800)", id: "pallet-euro-export-1208" },
              { name: "Medium-Duty 2-Way (1100x1100)", id: "pallet-2way-entry-1111" },
              { name: "Air Freight Nestable Pallet", query: "nestable" },
              { name: "ISPM-15 Exempt Shipping Skid", query: "export" },
            ],
            showAllQuery: "export",
          },
          {
            title: "Drum & Chemical Storage",
            items: [
              { name: "Chemical 4-Drum Pallet", query: "drum" },
              { name: "Acid & Alkali Resistant Skid", query: "chemical" },
              { name: "Spill Containment Platform", query: "containment" },
            ],
            showAllQuery: "chemical",
          },
        ],
      },
      {
        groups: [
          {
            title: "Custom Skids & Bases",
            items: [
              { name: "Recycled RPL Skid (1300x1100)", id: "pallet-plastic-lumber-skid" },
              { name: "Transformer & Machinery Skid", query: "machinery skid" },
              { name: "Heavy Equipment Footings", query: "footings" },
              { name: "Bespoke Warehouse Runners", query: "runners" },
            ],
            showAllQuery: "skid",
          },
          {
            title: "Hygiene & Food Grade",
            items: [
              { name: "Pharma Cleanroom Solid Deck", query: "cleanroom" },
              { name: "Washable Smooth Surface Pallet", query: "smooth surface" },
              { name: "Cold Storage Pallet (-30°C)", query: "cold storage" },
            ],
            showAllQuery: "hygiene",
          },
          {
            title: "Pallet Accessories",
            items: [
              { name: "Anti-Slip Rubber Grommets", query: "grommets" },
              { name: "Perimeter Safety Lips", query: "safety lip" },
              { name: "RFID Asset Tracking Inserts", query: "rfid" },
            ],
            showAllQuery: "accessories",
          },
        ],
      },
      {
        groups: [
          {
            title: "Industrial Storage",
            items: [
              { name: "Stackable Bulk Bag Pallet", query: "bulk bag" },
              { name: "Flour & Cement Bag Skid", query: "cement" },
              { name: "Foundry Heavy Casting Skid", query: "foundry" },
            ],
            showAllQuery: "storage",
          },
          {
            title: "Logistics & Transport",
            items: [
              { name: "Container Stuffing Pallet", query: "container" },
              { name: "Roller Conveyor Solid Runners", query: "conveyor" },
              { name: "Returnable Transit Packaging", query: "returnable" },
            ],
            showAllQuery: "transport",
          },
          {
            title: "Sustainability & Standards",
            items: [
              { name: "100% Recycled Polymer Pallet", query: "recycled" },
              { name: "Closed-Loop Exchange Pallet", query: "circular" },
              { name: "Zero Fumigation Certification", query: "fumigation" },
            ],
            showAllQuery: "sustainability",
          },
        ],
      },
    ],
  },
  {
    slug: "plastic-lumber",
    id: "plastic-lumber",
    name: "Plastic Lumber",
    icon: "solar:layers-minimalistic-linear",
    description: "Structural profiles, heavy posts, decking, and tongue-groove battens",
    columns: [
      {
        groups: [
          {
            title: "Structural Profiles",
            items: [
              { name: "RPL 2x4 Lumber (38x89mm)", id: "lumber-rpl-2x4" },
              { name: "RPL 2x6 Joist (38x140mm)", query: "2x6" },
              { name: "RPL 2x2 Batten (38x38mm)", query: "2x2" },
              { name: "Structural 2x8 Heavy Beam", query: "2x8" },
            ],
            showAllQuery: "structural",
          },
          {
            title: "Interlocking & Tongue-Groove",
            items: [
              { name: "Tongue & Groove (25x125mm)", id: "lumber-rpl-tongue-groove" },
              { name: "Equestrian Stable Planks", query: "stable" },
              { name: "Privacy Fence Infill Boards", query: "infill" },
              { name: "Wind-Tight Partition Battens", query: "partition" },
            ],
            showAllQuery: "tongue-groove",
          },
          {
            title: "Custom Cut & Finishes",
            items: [
              { name: "Teak Brown Woodgrain Finish", query: "woodgrain" },
              { name: "Charcoal Grey & Jet Black", query: "charcoal" },
              { name: "Custom Cutoff Lengths", query: "cutoff" },
            ],
            showAllQuery: "custom",
          },
        ],
      },
      {
        groups: [
          {
            title: "Heavy Posts & Pilings",
            items: [
              { name: "Heavy-Duty Post 4x4 (90x90mm)", id: "lumber-rpl-4x4-post" },
              { name: "Solid RPL Piling 6x6 (140x140mm)", query: "6x6" },
              { name: "In-Ground Burial Pergola Posts", query: "pergola" },
              { name: "Highway & Signage Uprights", query: "signage" },
            ],
            showAllQuery: "posts",
          },
          {
            title: "Marine & Waterfront",
            items: [
              { name: "Marine Dock Bumper Timber", query: "dock" },
              { name: "Saltwater Submerged Pilings", query: "marine" },
              { name: "Shipyard Rubbing Strips", query: "rubbing" },
            ],
            showAllQuery: "marine",
          },
          {
            title: "Fasteners & Hardware",
            items: [
              { name: "Stainless Structural Screws", query: "screws" },
              { name: "Pre-Drilled Counterbore Posts", query: "drilled" },
              { name: "Machined Chamfered Caps", query: "chamfered" },
            ],
            showAllQuery: "hardware",
          },
        ],
      },
      {
        groups: [
          {
            title: "Decking & Boardwalks",
            items: [
              { name: "RPL Decking Plank 2x6", id: "lumber-rpl-2x6-decking" },
              { name: "Anti-Slip Ribbed Decking", query: "anti-slip" },
              { name: "Wetland Boardwalk Planks", query: "boardwalk" },
              { name: "Barefoot-Safe Pool Decks", query: "pool" },
            ],
            showAllQuery: "decking",
          },
          {
            title: "Industrial Retaining",
            items: [
              { name: "Retaining Wall Sleepers", query: "sleepers" },
              { name: "Industrial Step Stringers", query: "stringers" },
              { name: "Soil Erosion Barriers", query: "erosion" },
            ],
            showAllQuery: "retaining",
          },
          {
            title: "Eco Durability",
            items: [
              { name: "50+ Year Maintenance-Free", query: "durable" },
              { name: "Zero Chemical Leaching", query: "eco" },
              { name: "Termite & Borer Proof", query: "termite" },
            ],
            showAllQuery: "durability",
          },
        ],
      },
    ],
  },
  {
    slug: "garden-bench",
    id: "garden-bench",
    name: "Garden Benches",
    icon: "solar:armchair-linear",
    description: "Park, society, municipal, and heritage benches",
    columns: [
      {
        groups: [
          {
            title: "Municipal & Public Parks",
            items: [
              { name: "Classic Municipal Bench (1.8m)", id: "bench-classic-municipal-180" },
              { name: "4-Seater Society Park Bench", query: "society" },
              { name: "Heavy-Duty Public Garden Bench", query: "public" },
              { name: "Anti-Theft Bolt-Down Bench", query: "anti-theft" },
            ],
            showAllQuery: "municipal",
          },
          {
            title: "Heritage & Vintage",
            items: [
              { name: "Cast Iron Heritage Bench (1.5m)", id: "bench-cast-iron-hybrid-150" },
              { name: "Victorian Scrollwork Bench", query: "victorian" },
              { name: "Botanical Garden Vintage Seat", query: "botanical" },
            ],
            showAllQuery: "heritage",
          },
          {
            title: "Memorial & Inscribed",
            items: [
              { name: "Memorial Plaque Engraved Bench", query: "memorial" },
              { name: "Donor Dedication Bench", query: "dedication" },
              { name: "Corporate Branded Park Bench", query: "corporate" },
            ],
            showAllQuery: "memorial",
          },
        ],
      },
      {
        groups: [
          {
            title: "Backless & Promenade",
            items: [
              { name: "Contemporary Backless Bench (1.8m)", id: "bench-backless-promenade-180" },
              { name: "Dual-Orientation Plaza Bench", query: "plaza" },
              { name: "Transit Platform Seater", query: "transit" },
            ],
            showAllQuery: "backless",
          },
          {
            title: "Tree Surround & Curved",
            items: [
              { name: "Hexagonal Tree Surround Bench", query: "tree surround" },
              { name: "Circular Garden Centerpiece", query: "circular" },
              { name: "Curved Promenade Bench", query: "curved" },
            ],
            showAllQuery: "curved",
          },
          {
            title: "Hardware & Anchoring",
            items: [
              { name: "Ground Anchor Fastener Kits", query: "anchors" },
              { name: "Anti-Skate Deterrent Dividers", query: "anti-skate" },
              { name: "Center Armrest Add-Ons", query: "armrests" },
            ],
            showAllQuery: "hardware",
          },
        ],
      },
      {
        groups: [
          {
            title: "Campus & Courtyard",
            items: [
              { name: "University Campus Gathering Bench", query: "campus" },
              { name: "Hospital Healing Garden Seat", query: "hospital" },
              { name: "Waterfront Promenade Bench", query: "waterfront" },
            ],
            showAllQuery: "campus",
          },
          {
            title: "Resort & Hospitality",
            items: [
              { name: "Resort Poolside Bench", query: "poolside" },
              { name: "Clubhouse Terrace Seater", query: "clubhouse" },
              { name: "Golf Course Rest Station", query: "golf" },
            ],
            showAllQuery: "resort",
          },
          {
            title: "Material Specifications",
            items: [
              { name: "Weatherproof Recycled HDPE", query: "hdpe" },
              { name: "UV Stabilized Solid Color", query: "uv" },
              { name: "Graffiti Resistant Slats", query: "graffiti" },
            ],
            showAllQuery: "specs",
          },
        ],
      },
    ],
  },
  {
    slug: "plastic-table",
    id: "plastic-table",
    name: "Recycled Plastic Tables",
    icon: "solar:widget-2-linear",
    description: "Picnic sets, dining ensembles, and park game tables",
    columns: [
      {
        groups: [
          {
            title: "Picnic Ensembles",
            items: [
              { name: "A-Frame Picnic Ensemble (1.8m)", id: "table-rpl-aframe-picnic" },
              { name: "6-8 Seater Heavyweight Set", query: "6-8 seater" },
              { name: "Campus Canteen Picnic Unit", query: "canteen" },
              { name: "Dual Attached Bench Ensemble", query: "ensemble" },
            ],
            showAllQuery: "picnic",
          },
          {
            title: "Accessible & ADA",
            items: [
              { name: "Wheelchair Accessible Picnic Table", query: "wheelchair" },
              { name: "Extended Overhang Tabletop", query: "overhang" },
              { name: "Universal Access Park Table", query: "universal" },
            ],
            showAllQuery: "accessible",
          },
          {
            title: "Park Games & Activity",
            items: [
              { name: "Chess & Checkerboard Table", query: "chess" },
              { name: "Kids School Play Picnic Set", query: "kids" },
              { name: "Community Activity Center Table", query: "activity" },
            ],
            showAllQuery: "games",
          },
        ],
      },
      {
        groups: [
          {
            title: "Commercial Dining",
            items: [
              { name: "Outdoor Dining Table (1200x800)", id: "table-rpl-dining-1208" },
              { name: "Slatted Restaurant Terrace Table", query: "restaurant" },
              { name: "Heavy Aluminum Frame Table", query: "aluminum frame" },
              { name: "Resort Patio Dining Ensemble", query: "resort" },
            ],
            showAllQuery: "dining",
          },
          {
            title: "Cafe & Bistro",
            items: [
              { name: "Round Cafe Bistro Table (900mm)", id: "table-rpl-round-bistro-90" },
              { name: "Square Balcony Table (750x750)", query: "balcony" },
              { name: "Cocktail High-Top Bar Table", query: "cocktail" },
            ],
            showAllQuery: "bistro",
          },
          {
            title: "Table Accessories",
            items: [
              { name: "Center Parasol Umbrella Ring", query: "parasol" },
              { name: "Heavy Weighted Steel Base", query: "weighted base" },
              { name: "Stainless Leveling Foot Glides", query: "leveling" },
            ],
            showAllQuery: "accessories",
          },
        ],
      },
      {
        groups: [
          {
            title: "Hospitality Ensembles",
            items: [
              { name: "Rooftop Cafe Sets", query: "rooftop" },
              { name: "Hotel Garden Breakfast Tables", query: "hotel" },
              { name: "Brewery Beer Garden Benches", query: "beer garden" },
            ],
            showAllQuery: "hospitality",
          },
          {
            title: "Institutional Furniture",
            items: [
              { name: "Highway Rest Stop Tables", query: "rest stop" },
              { name: "Industrial Canteen Ensembles", query: "canteen" },
              { name: "Military Base Outdoor Tables", query: "military" },
            ],
            showAllQuery: "institutional",
          },
          {
            title: "Hygiene & Maintenance",
            items: [
              { name: "Stain-Proof Wipe Clean Top", query: "stain proof" },
              { name: "Hot Cup & Spill Resistant", query: "heat resistant" },
              { name: "Zero Splinters & Zero Warping", query: "warp proof" },
            ],
            showAllQuery: "hygiene",
          },
        ],
      },
    ],
  },
  {
    slug: "custom-products",
    id: "custom-products",
    name: "Custom Products",
    icon: "solar:tuning-square-linear",
    description: "Bespoke molded parts, wear strips, and CNC components",
    columns: [
      {
        groups: [
          {
            title: "Industrial Molded Shapes",
            items: [
              { name: "Custom Recycled Parts", id: "custom-industrial-molded-parts" },
              { name: "CNC Machined Wear Strips", query: "wear strips" },
              { name: "Heavy Equipment Bushings", query: "bushings" },
              { name: "Chute Liners & Guides", query: "chute liners" },
            ],
            showAllQuery: "industrial",
          },
          {
            title: "Compression Molding",
            items: [
              { name: "Bespoke Cross-Section Dies", query: "dies" },
              { name: "High-Load Machine Footings", query: "footings" },
              { name: "Vibration Dampener Blocks", query: "vibration" },
            ],
            showAllQuery: "molding",
          },
          {
            title: "Engineering Polymers",
            items: [
              { name: "UHMW-PE Substitutes", query: "uhmw" },
              { name: "High Impact Polyolefin Alloys", query: "polyolefin" },
              { name: "Chemical Resistant Blends", query: "chemical" },
            ],
            showAllQuery: "polymers",
          },
        ],
      },
      {
        groups: [
          {
            title: "Ranch & Paddock Fencing",
            items: [
              { name: "Post & Rail Ranch Fence (3-Rail)", id: "fence-rpl-ranch-rail-3rail" },
              { name: "Equine Paddock Fencing", query: "equine" },
              { name: "Livestock Crib-Proof Posts", query: "crib-proof" },
            ],
            showAllQuery: "ranch",
          },
          {
            title: "Infrastructure Support",
            items: [
              { name: "Chemical Tank Saddle Supports", query: "saddles" },
              { name: "Pipe Support Chocks & Wedges", query: "chocks" },
              { name: "Underground Cable Spacers", query: "spacers" },
            ],
            showAllQuery: "infrastructure",
          },
          {
            title: "Railway & Transport",
            items: [
              { name: "Level Crossing Shims", query: "railway" },
              { name: "Heavy Cargo Dunnage Blocks", query: "dunnage" },
              { name: "Forklift Wheel Chocks", query: "chocks" },
            ],
            showAllQuery: "transport",
          },
        ],
      },
      {
        groups: [
          {
            title: "Maritime & Harbor",
            items: [
              { name: "Harbor Dock Rubbing Strakes", query: "harbor" },
              { name: "Mooring Dolphin Bumpers", query: "dolphin" },
              { name: "Boat Slip Wear Strips", query: "boat slip" },
            ],
            showAllQuery: "maritime",
          },
          {
            title: "Boundary & Energy",
            items: [
              { name: "Solar Farm Boundary Enclosure", query: "solar farm" },
              { name: "Substation Security Wall", query: "substation" },
              { name: "Acoustic Noise Barriers", query: "acoustic" },
            ],
            showAllQuery: "boundary",
          },
          {
            title: "CAD & Custom Tooling",
            items: [
              { name: "Custom Tooling from CAD/3D", query: "cad" },
              { name: "Rapid Prototype Tooling", query: "prototyping" },
              { name: "Certified B2B Tolerances", query: "tolerances" },
            ],
            showAllQuery: "tooling",
          },
        ],
      },
    ],
  },
  {
    slug: "outdoor-furniture",
    id: "outdoor-furniture",
    name: "Outdoor Furniture",
    icon: "solar:sun-linear",
    description: "Chairs, loungers, planters, and community amenities",
    columns: [
      {
        groups: [
          {
            title: "Chairs & Seating",
            items: [
              { name: "Recycled Plastic Adirondack Chair", query: "adirondack" },
              { name: "High-Back Porch Rocking Chair", query: "rocking chair" },
              { name: "Heavy Patio Lounge Armchair", query: "armchair" },
              { name: "Stackable Outdoor Cafe Chairs", query: "cafe chairs" },
            ],
            showAllQuery: "seating",
          },
          {
            title: "Poolside & Sun",
            items: [
              { name: "Ergonomic Pool Sun Lounger", query: "sun lounger" },
              { name: "Multi-Position Recliner", query: "recliner" },
              { name: "Resort Towel & Drink Stand", query: "towel stand" },
            ],
            showAllQuery: "poolside",
          },
        ],
      },
      {
        groups: [
          {
            title: "Planters & Greenery",
            items: [
              { name: "Municipal Heavy Tree Planters", query: "tree planters" },
              { name: "Square Botanical Herb Planters", query: "herb planters" },
              { name: "Urban Streetscape Flower Boxes", query: "flower boxes" },
              { name: "Self-Draining Planter Beds", query: "draining" },
            ],
            showAllQuery: "planters",
          },
          {
            title: "Courtyard Accents",
            items: [
              { name: "Outdoor Cushion Storage Boxes", query: "storage box" },
              { name: "Pergola Corner Planters", query: "corner planter" },
              { name: "Bespoke Sized Greenery Troughs", query: "troughs" },
            ],
            showAllQuery: "accents",
          },
        ],
      },
      {
        groups: [
          {
            title: "Waste & Recycling",
            items: [
              { name: "Dual-Stream Waste & Recycle Bin", query: "recycle bin" },
              { name: "Municipal Park Heavy Trash Can", query: "trash can" },
              { name: "Tamper-Resistant Public Bin", query: "public bin" },
              { name: "Litter Station with Rain Hood", query: "litter station" },
            ],
            showAllQuery: "waste",
          },
          {
            title: "Comfort & Longevity",
            items: [
              { name: "Non-Fading UV Color Formulas", query: "uv protection" },
              { name: "All-Weather Heavyweight Stability", query: "heavyweight" },
              { name: "Splinter-Free Silky Touch", query: "splinter-free" },
            ],
            showAllQuery: "comfort",
          },
        ],
      },
    ],
  },
  {
    slug: "garden-fence",
    id: "garden-fence",
    name: "Garden Fence",
    icon: "solar:shield-check-linear",
    description: "Maintenance-free perimeter and residential fencing",
    columns: [
      {
        groups: [
          {
            title: "Residential Fencing",
            items: [
              { name: "Decorative Picket Garden Fence", query: "picket" },
              { name: "Modern Slatted Privacy Fence", query: "privacy" },
              { name: "Boundary Wall Infill Panels", query: "infill" },
              { name: "Flower Bed Border Edging", query: "border" },
            ],
            showAllQuery: "residential",
          },
          {
            title: "Estate & Villa",
            items: [
              { name: "Villa Perimeter Boundaries", query: "villa" },
              { name: "Driveway Entrance Gates", query: "gates" },
              { name: "Horizontal Batten Fences", query: "batten" },
            ],
            showAllQuery: "estate",
          },
        ],
      },
      {
        groups: [
          {
            title: "Agricultural & Farm",
            items: [
              { name: "3-Rail Horse Paddock Fence", query: "3-rail" },
              { name: "Heavy Rot-Proof Boundary Posts", query: "boundary posts" },
              { name: "Livestock Pasture Perimeter", query: "pasture" },
              { name: "Farmhouse Security Gates", query: "farm gates" },
            ],
            showAllQuery: "agricultural",
          },
          {
            title: "Corral & Stable",
            items: [
              { name: "Equine Arena Perimeter", query: "arena" },
              { name: "Dairy Farm Separation Panels", query: "dairy" },
              { name: "Rot-Free Gate Posts", query: "gate posts" },
            ],
            showAllQuery: "corral",
          },
        ],
      },
      {
        groups: [
          {
            title: "Commercial & Utility",
            items: [
              { name: "Solar Farm Perimeter Fence", query: "solar farm" },
              { name: "Acoustic Noise Wall Panels", query: "acoustic wall" },
              { name: "Highway Snow & Sand Barrier", query: "highway" },
              { name: "Public Park Border Railings", query: "park railings" },
            ],
            showAllQuery: "commercial",
          },
          {
            title: "Post & Hardware",
            items: [
              { name: "Direct Burial 4x4 Posts", query: "burial posts" },
              { name: "Galvanized Steel Mounting Plates", query: "brackets" },
              { name: "Decorative Pyramid Post Caps", query: "post caps" },
            ],
            showAllQuery: "hardware",
          },
        ],
      },
    ],
  },
];

export const MEGA_MENU_CATALOG = MEGA_MENU_CATEGORIES.reduce((acc, cat) => {
  acc[cat.slug] = cat;
  return acc;
}, {});
