// AutoUp product catalog — real LifeLines products with verified label data.
// Images imported directly from assets/products/ — one real photo per product.
import svcEssentials from "@/assets/svc-essentials.jpg";
import svcChemicals from "@/assets/svc-chemicals.jpg";
import svcShampoo from "@/assets/svc-shampoo.jpg";
import svcWax from "@/assets/svc-wax.jpg";
import svcExterior from "@/assets/svc-exterior.jpg";
import svcInterior from "@/assets/svc-interior.jpg";
import svcPaint from "@/assets/svc-paint.jpg";
import svcKits from "@/assets/svc-kits.jpg";

// Real product photographs — verified from label text
import pChemxC2 from "@/assets/products/product-chemx-c2.jpeg";
import pChemxD2 from "@/assets/products/product-chemx-d2.jpeg";
import pChemxT1 from "@/assets/products/product-chemx-t1.jpeg";
import pO2Solvent from "@/assets/products/product-o2-solvent.jpeg";
import pG4Glass from "@/assets/products/product-g4-glass.jpeg";
import pF55Wax from "@/assets/products/product-f55-wax.jpeg";
import pWaterlessWash from "@/assets/products/product-waterless-wash.jpeg";
import pColourWaxShampoo from "@/assets/products/product-colour-wax-shampoo.jpeg";
import pColourWaxShampooRose from "@/assets/products/product-colour-wax-shampoo-rose.jpeg";
import pPreWashShampoo from "@/assets/products/product-pre-wash-shampoo.jpeg";

export type Service = { slug: string; title: string; description: string; image: string };

export const SERVICES: Service[] = [
  { slug: "cleaning-essentials", title: "Car Cleaning Essentials", description: "Towels, mitts, buckets and the everyday basics for a safe wash.", image: svcEssentials },
  { slug: "cleaning-chemicals", title: "Automotive Cleaning Chemicals", description: "Cleaners and concentrates for a wide range of vehicle surfaces.", image: svcChemicals },
  { slug: "car-shampoo", title: "Premium Car Shampoo", description: "Rich foaming shampoos that lift dirt while being gentle on paint.", image: svcShampoo },
  { slug: "wax-shine", title: "Vehicle Wax & Shine", description: "Waxes and shine products for a deep, glossy finish.", image: svcWax },
  { slug: "exterior-care", title: "Exterior Car Care", description: "Wheel, tyre, glass and body care for the outside of your car.", image: svcExterior },
  { slug: "interior-cleaning", title: "Interior Cleaning Solutions", description: "Products for seats, dashboards, trims and carpets.", image: svcInterior },
  { slug: "paint-protection", title: "Paint Care & Protection", description: "Help protect paintwork and keep water beading off the surface.", image: svcPaint },
  { slug: "care-kits", title: "Complete Car-Care Kits", description: "Curated bundles with everything you need in one box.", image: svcKits },
];

export const CATEGORIES = [
  "All Products",
  "Car Shampoo",
  "Cleaning Chemicals",
  "Car Wax & Polish",
  "Interior Cleaners",
  "Exterior Cleaners",
] as const;

export type Product = {
  slug: string;
  name: string;
  code?: string; // product code printed on label, if readable
  category: (typeof CATEGORIES)[number];
  short: string;
  description: string;
  variants: string[];
  usage: string;
  image: string;
  price?: number; // only set when a verified price exists
  featured: number;
};

export const PRODUCTS: Product[] = [
  {
    slug: "lifelines-colour-wax-shampoo",
    name: "Colour Wax Shampoo",
    code: undefined,
    category: "Car Shampoo",
    short: "Advanced formula that preserves paint and delivers a long-lasting attractive luster.",
    description: "LifeLines Colour Wax Shampoo is a new and advanced formula that preserves the car paint and gives it an attractive luster that lasts for a long time. The formula has the ability to break up dirt, oil and grease with ease. pH-neutral — does not affect the hand at all.",
    variants: ["20 L"],
    usage: "Remove accumulated dirt using a water pump first. Mix 1 litre of LifeLines shampoo with 100 litres of water for hand washing, or 1 litre with 150 litres for in-pump use. After spraying, leave for 3 minutes, then rinse and dry with a towel.",
    image: pColourWaxShampoo,
    featured: 1,
  },
  {
    slug: "lifelines-colour-wax-shampoo-rose",
    name: "Colour Wax Shampoo — Rose",
    code: undefined,
    category: "Car Shampoo",
    short: "Same advanced wax shampoo formula in a signature rose fragrance.",
    description: "LifeLines Colour Wax Shampoo (Rose) preserves the car paint and gives it an attractive luster that lasts for a long time. Phosphate-free, concentrate formula — removes dirt, pH neutral, quick drying.",
    variants: ["20 L"],
    usage: "Mix 1 litre with 100 litres of water for hand washing, or 1 litre with 150 litres for in-pump use. Leave on surface for 3 minutes, then rinse thoroughly and dry.",
    image: pColourWaxShampooRose,
    featured: 2,
  },
  {
    slug: "lifelines-pre-wash-shampoo",
    name: "Pre Wash Car Shampoo",
    code: undefined,
    category: "Car Shampoo",
    short: "High-performance pre-wash for automatic and manual car wash systems.",
    description: "LifeLines Pre Wash Car Shampoo is a high-performance shampoo designed for use in automatic car wash systems and manual car wash systems. It effectively removes dirt, oil and road films, leaving the surface clean and ready for further treatment. High lubrication to reduce friction; easy to rinse; suitable for all types of vehicles.",
    variants: ["20 KG"],
    usage: "Automatic car wash: 40–50 ml per car. Manual: 1 litre of shampoo to 100 litres of water. Dilute, spray onto the car, leave for no more than 2 minutes to react with dirt, then rinse thoroughly with water.",
    image: pPreWashShampoo,
    featured: 3,
  },
  {
    slug: "lifelines-waterless-car-wash",
    name: "Waterless Car Wash",
    code: undefined,
    category: "Car Shampoo",
    short: "Wash your car without water — cleans, shines and protects in one step.",
    description: "LifeLines Waterless Car Wash Shampoo is a distinct and unique formula that has a high ability to break up dirt and remove it with ease. The formula also contains Wax to preserve the car's paint and give it a distinctive shine. Reduces water use and waste. Environmentally friendly.",
    variants: ["20 L"],
    usage: "Spray the product directly on the surface of the car from the outside, leave for 30 seconds, then wipe with a microfiber towel (preferably wet).",
    image: pWaterlessWash,
    featured: 4,
  },
  {
    slug: "lifelines-chemx-c2",
    name: "ChemX C2",
    code: "ChemX C2",
    category: "Cleaning Chemicals",
    short: "Chemical all-purpose cleaner for engines, rims, interiors and more.",
    description: "LifeLines ChemX C2 is a Chemical All-Purpose Cleaner. It cleans engines, rims, linings, interior seats, leather and car floors according to the recommended dilution. An advanced American formula that preserves paint and car interior according to the manufacturer's recommended instructions.",
    variants: ["25 L"],
    usage: "First, clean the engines, rims and liners. Dilute 1 litre of the product to 5 litres of water. Spray, leave for a maximum of two minutes, then rinse thoroughly. For interior seats, leather and floors: use appropriate special brushes for tough dirt. For velvet chairs, fabrics and floor mats: dilute 1 litre of product in 10 litres of water.",
    image: pChemxC2,
    featured: 5,
  },
  {
    slug: "lifelines-f55-wax",
    name: "F55 Final Touch Wax",
    code: "F55",
    category: "Car Wax & Polish",
    short: "Post-wash shine wax — instant gloss, no residue, dust-resistant.",
    description: "LifeLines F55 Final Touch provides an exceptional final shine to cars after washing. Leaves the car's surface glossy and radiant while reducing dust and stain adhesion. Delivers instant shine. Easy to use after washing. Leaves no residue or unwanted marks. Protects the paint and reduces dust adhesion.",
    variants: ["20 L"],
    usage: "After washing or during drying, spray an appropriate amount of product onto a clean, soft cloth. Wipe the car's surface in a circular motion for a perfect shine.",
    image: pF55Wax,
    featured: 6,
  },
  {
    slug: "lifelines-chemx-d2",
    name: "ChemX D2",
    code: "ChemX D2",
    category: "Interior Cleaners",
    short: "Dashboard polish for vinyl, leather and plastic — long-lasting shine.",
    description: "LifeLines ChemX D2 Dashboard Polish produces a deep, rich, long-lasting shine in all interior plastic and rubber surfaces, especially the dashboard. ChemX D2 will give you the desired results time after time. Suitable for Vinyl, Leather and Plastic surfaces. Cleans, conditions and protects.",
    variants: ["20 KG"],
    usage: "Shake the container before each use. Dilute 1:1 or use as-is for best results. For optimal results, apply the product evenly with a sponge and allow it to dry.",
    image: pChemxD2,
    featured: 7,
  },
  {
    slug: "lifelines-chemx-t1",
    name: "ChemX T1",
    code: "ChemX T1",
    category: "Exterior Cleaners",
    short: "Tire polish for deep, rich, long-lasting shine on rubber surfaces.",
    description: "LifeLines ChemX T1 Tire Polish produces a deep, rich, long-lasting shine in all exterior plastic and rubber surfaces. New or old. ChemX T1 will give you the desired results time after time. Ready to use without any dilution.",
    variants: ["20 KG"],
    usage: "For best results, apply to a dry and clean surface. Spray evenly at all surfaces and let the product dry away from dust.",
    image: pChemxT1,
    featured: 8,
  },
  {
    slug: "lifelines-o2-solvent",
    name: "O2 Solvent Tire Polish",
    code: "O2",
    category: "Exterior Cleaners",
    short: "Powerful solvent tire polish for deep shine and long-lasting protection.",
    description: "LifeLines O2 Solvent is a powerful and effective tire polish that gives your car tires a deep shine and long-lasting protection, designed to resist dirt and water. Contains petroleum solvents, silicone oils and added stabilisers.",
    variants: ["20 L"],
    usage: "1. Clean the tires thoroughly and ensure they are completely dry. 2. Spray the product onto the tire. 3. Spread it evenly using a sponge. For external use only. Flammable — keep away from heat and sparks.",
    image: pO2Solvent,
    featured: 9,
  },
  {
    slug: "lifelines-g4-glass",
    name: "G4 Car Glass Cleaner & Polish",
    code: "G4",
    category: "Exterior Cleaners",
    short: "Ammonia-free glass cleaner and polish — streak-free, long-lasting protection.",
    description: "LifeLines G4 Car Glass Cleaner & Polish is specially formulated to efficiently remove stains, dust and fingerprints while leaving a protective layer that helps prevent dust from sticking for longer. Ammonia-free formula, safe for glass surfaces. Prevents streaks and watermarks after cleaning. Long-lasting protection against dust and dirt. Fast-drying; leaves no residue.",
    variants: ["20 L"],
    usage: "1. Spray the polish directly onto the glass. 2. Wipe the glass with a soft, dry cloth in circular motions. 3. For best results, avoid direct sunlight during application. Avoid contact with eyes and skin.",
    image: pG4Glass,
    featured: 10,
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
