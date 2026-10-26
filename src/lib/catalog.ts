// AutoUp product catalog — real LifeLines products with verified label data.
// Images imported directly from assets/products/ — one real photo per product.
import svcEssentials from "@/assets/svc-essentials.webp";
import svcChemicals from "@/assets/svc-chemicals.webp";
import svcShampoo from "@/assets/svc-shampoo.webp";
import svcWax from "@/assets/svc-wax.webp";
import svcExterior from "@/assets/svc-exterior.webp";
import svcInterior from "@/assets/svc-interior.webp";
import svcPaint from "@/assets/svc-paint.webp";
import svcKits from "@/assets/svc-kits.webp";

// Real product photographs — verified from label text
import pChemxC2 from "@/assets/products/product-chemx-c2.webp";
import pChemxD2 from "@/assets/products/product-chemx-d2.webp";
import pChemxT1 from "@/assets/products/product-chemx-t1.webp";
import pO2Solvent from "@/assets/products/product-o2-solvent.webp";
import pG4Glass from "@/assets/products/product-g4-glass.webp";
import pF55Wax from "@/assets/products/product-f55-wax.webp";
import pWaterlessWash from "@/assets/products/product-waterless-wash.webp";
import pColourWaxShampoo from "@/assets/products/product-colour-wax-shampoo.webp";
import pColourWaxShampooRose from "@/assets/products/product-colour-wax-shampoo-rose.webp";
import pPreWashShampoo from "@/assets/products/product-pre-wash-shampoo.webp";
import pC6Bottle from "@/assets/products/imgi_10_adbaf30f-77cd-4723-9725-0c340de48414-500x500-ZbPENDcUWk8hs1lVpz5ILjSwIj7F3MXrAmSFQu36.webp";
import pO2Bottle from "@/assets/products/imgi_11_4f1f3ac3-aebb-400c-b0de-e1ae1de0caab-500x500-HQgb89xy4fBVsvZiFmNggqEvhcjHG8v9KooUCtYb.webp";
import pWaterlessBottle from "@/assets/products/imgi_18_2277741b-cccd-4f7d-9444-1c89c9fcd57b-500x500-TzKStWMTy3Q1JNG5b5oLuuPts1SQG5WVFrGp4hXk.webp";
import pRustRemover from "@/assets/products/imgi_19_0385406c-2c3d-4ab7-a3fc-1704ee12ce6a-500x500-zLtbRBuI8yxMR17Ga5NauoICRuBbWOq0hTc13XF0.webp";
import pPreWashBottle from "@/assets/products/imgi_20_6c5faa3b-8ddb-464d-b3b2-923851cbe446-500x500-MU8e8ssvw5EqbExg4nsUCPi7isgckN4MrIFHuvUY.webp";
import pIronRemover from "@/assets/products/imgi_22_eb0c09eb-18c9-475e-a8e5-5723d8f937c2-500x500-Bxm4ILMLbzCpg0ZXqFjYrs9UERkf4sGuQOCr7EkN.webp";
import pShampooWaxBottle from "@/assets/products/imgi_30_220e1edb-cfd6-43ba-8003-5813d686f78e-500x500-WVvvvjZ7GPmdgUBUwOPjSOeWmvEMiLGLNZngKVZm.webp";
import pD2Bottle from "@/assets/products/imgi_35_38190e6b-4e92-439b-b543-9f91846c6d0a-500x500-MtQDKaypgVMaWVQcgLYzkOx6ta6zUpUkOb0OAySO.webp";

export type Service = { slug: string; title: string; description: string; image: string };

export const SERVICES: Service[] = [
  {
    slug: "cleaning-essentials",
    title: "Car Cleaning Essentials",
    description: "Towels, mitts, buckets and the everyday basics for a safe wash.",
    image: svcEssentials,
  },
  {
    slug: "cleaning-chemicals",
    title: "Automotive Cleaning Chemicals",
    description: "Cleaners and concentrates for a wide range of vehicle surfaces.",
    image: svcChemicals,
  },
  {
    slug: "car-shampoo",
    title: "Premium Car Shampoo",
    description: "Rich foaming shampoos that lift dirt while being gentle on paint.",
    image: svcShampoo,
  },
  {
    slug: "wax-shine",
    title: "Vehicle Wax & Shine",
    description: "Waxes and shine products for a deep, glossy finish.",
    image: svcWax,
  },
  {
    slug: "exterior-care",
    title: "Exterior Car Care",
    description: "Wheel, tyre, glass and body care for the outside of your car.",
    image: svcExterior,
  },
  {
    slug: "interior-cleaning",
    title: "Interior Cleaning Solutions",
    description: "Products for seats, dashboards, trims and carpets.",
    image: svcInterior,
  },
  {
    slug: "paint-protection",
    title: "Paint Care & Protection",
    description: "Help protect paintwork and keep water beading off the surface.",
    image: svcPaint,
  },
  {
    slug: "care-kits",
    title: "Complete Car-Care Kits",
    description: "Curated bundles with everything you need in one box.",
    image: svcKits,
  },
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
  code?: string | undefined; // product code printed on label, if readable
  packageType: "retail" | "gallon" | "other-commercial";
  category: (typeof CATEGORIES)[number];
  short: string;
  description: string;
  variants: string[];
  usage: string;
  image: string;
  price?: number | undefined; // only set when a verified price exists
  featured: number;
};

export const PRODUCTS: Product[] = [
  {
    slug: "lifelines-colour-wax-shampoo",
    name: "Colour Wax Shampoo",
    packageType: "gallon",
    code: undefined,
    category: "Car Shampoo",
    short: "Advanced formula that preserves paint and delivers a long-lasting attractive luster.",
    description:
      "LifeLines Colour Wax Shampoo is a new and advanced formula that preserves the car paint and gives it an attractive luster that lasts for a long time. The formula has the ability to break up dirt, oil and grease with ease. pH-neutral — does not affect the hand at all.",
    variants: ["20 L"],
    usage:
      "Remove accumulated dirt using a water pump first. Mix 1 litre of LifeLines shampoo with 100 litres of water for hand washing, or 1 litre with 150 litres for in-pump use. After spraying, leave for 3 minutes, then rinse and dry with a towel.",
    image: pColourWaxShampoo,
    featured: 1,
  },
  {
    slug: "lifelines-colour-wax-shampoo-rose",
    name: "Colour Wax Shampoo — Rose",
    packageType: "gallon",
    code: undefined,
    category: "Car Shampoo",
    short: "Same advanced wax shampoo formula in a signature rose fragrance.",
    description:
      "LifeLines Colour Wax Shampoo (Rose) preserves the car paint and gives it an attractive luster that lasts for a long time. Phosphate-free, concentrate formula — removes dirt, pH neutral, quick drying.",
    variants: ["20 L"],
    usage:
      "Mix 1 litre with 100 litres of water for hand washing, or 1 litre with 150 litres for in-pump use. Leave on surface for 3 minutes, then rinse thoroughly and dry.",
    image: pColourWaxShampooRose,
    featured: 2,
  },
  {
    slug: "lifelines-pre-wash-shampoo",
    name: "Pre Wash Car Shampoo",
    packageType: "other-commercial",
    code: undefined,
    category: "Car Shampoo",
    short: "High-performance pre-wash for automatic and manual car wash systems.",
    description:
      "LifeLines Pre Wash Car Shampoo is a high-performance shampoo designed for use in automatic car wash systems and manual car wash systems. It effectively removes dirt, oil and road films, leaving the surface clean and ready for further treatment. High lubrication to reduce friction; easy to rinse; suitable for all types of vehicles.",
    variants: ["20 KG"],
    usage:
      "Automatic car wash: 40–50 ml per car. Manual: 1 litre of shampoo to 100 litres of water. Dilute, spray onto the car, leave for no more than 2 minutes to react with dirt, then rinse thoroughly with water.",
    image: pPreWashShampoo,
    featured: 3,
  },
  {
    slug: "lifelines-waterless-car-wash",
    name: "Waterless Car Wash",
    packageType: "gallon",
    code: undefined,
    category: "Car Shampoo",
    short: "Wash your car without water — cleans, shines and protects in one step.",
    description:
      "LifeLines Waterless Car Wash Shampoo is a distinct and unique formula that has a high ability to break up dirt and remove it with ease. The formula also contains Wax to preserve the car's paint and give it a distinctive shine. Reduces water use and waste. Environmentally friendly.",
    variants: ["20 L"],
    usage:
      "Spray the product directly on the surface of the car from the outside, leave for 30 seconds, then wipe with a microfiber towel (preferably wet).",
    image: pWaterlessWash,
    featured: 4,
  },
  {
    slug: "lifelines-chemx-c2",
    name: "ChemX C2",
    packageType: "other-commercial",
    code: "ChemX C2",
    category: "Cleaning Chemicals",
    short: "Chemical all-purpose cleaner for engines, rims, interiors and more.",
    description:
      "LifeLines ChemX C2 is a Chemical All-Purpose Cleaner. It cleans engines, rims, linings, interior seats, leather and car floors according to the recommended dilution. An advanced American formula that preserves paint and car interior according to the manufacturer's recommended instructions.",
    variants: ["25 L"],
    usage:
      "First, clean the engines, rims and liners. Dilute 1 litre of the product to 5 litres of water. Spray, leave for a maximum of two minutes, then rinse thoroughly. For interior seats, leather and floors: use appropriate special brushes for tough dirt. For velvet chairs, fabrics and floor mats: dilute 1 litre of product in 10 litres of water.",
    image: pChemxC2,
    featured: 5,
  },
  {
    slug: "lifelines-f55-wax",
    name: "F55 Final Touch Wax",
    packageType: "gallon",
    code: "F55",
    category: "Car Wax & Polish",
    short: "Post-wash shine wax — instant gloss, no residue, dust-resistant.",
    description:
      "LifeLines F55 Final Touch provides an exceptional final shine to cars after washing. Leaves the car's surface glossy and radiant while reducing dust and stain adhesion. Delivers instant shine. Easy to use after washing. Leaves no residue or unwanted marks. Protects the paint and reduces dust adhesion.",
    variants: ["20 L"],
    usage:
      "After washing or during drying, spray an appropriate amount of product onto a clean, soft cloth. Wipe the car's surface in a circular motion for a perfect shine.",
    image: pF55Wax,
    featured: 6,
  },
  {
    slug: "lifelines-chemx-d2",
    name: "ChemX D2",
    packageType: "other-commercial",
    code: "ChemX D2",
    category: "Interior Cleaners",
    short: "Dashboard polish for vinyl, leather and plastic — long-lasting shine.",
    description:
      "LifeLines ChemX D2 Dashboard Polish produces a deep, rich, long-lasting shine in all interior plastic and rubber surfaces, especially the dashboard. ChemX D2 will give you the desired results time after time. Suitable for Vinyl, Leather and Plastic surfaces. Cleans, conditions and protects.",
    variants: ["20 KG"],
    usage:
      "Shake the container before each use. Dilute 1:1 or use as-is for best results. For optimal results, apply the product evenly with a sponge and allow it to dry.",
    image: pChemxD2,
    featured: 7,
  },
  {
    slug: "lifelines-chemx-t1",
    name: "ChemX T1",
    packageType: "other-commercial",
    code: "ChemX T1",
    category: "Exterior Cleaners",
    short: "Tire polish for deep, rich, long-lasting shine on rubber surfaces.",
    description:
      "LifeLines ChemX T1 Tire Polish produces a deep, rich, long-lasting shine in all exterior plastic and rubber surfaces. New or old. ChemX T1 will give you the desired results time after time. Ready to use without any dilution.",
    variants: ["20 KG"],
    usage:
      "For best results, apply to a dry and clean surface. Spray evenly at all surfaces and let the product dry away from dust.",
    image: pChemxT1,
    featured: 8,
  },
  {
    slug: "lifelines-o2-solvent",
    name: "O2 Solvent Tire Polish",
    packageType: "gallon",
    code: "O2",
    category: "Exterior Cleaners",
    short: "Powerful solvent tire polish for deep shine and long-lasting protection.",
    description:
      "LifeLines O2 Solvent is a powerful and effective tire polish that gives your car tires a deep shine and long-lasting protection, designed to resist dirt and water. Contains petroleum solvents, silicone oils and added stabilisers.",
    variants: ["20 L"],
    usage:
      "1. Clean the tires thoroughly and ensure they are completely dry. 2. Spray the product onto the tire. 3. Spread it evenly using a sponge. For external use only. Flammable — keep away from heat and sparks.",
    image: pO2Solvent,
    featured: 9,
  },
  {
    slug: "lifelines-g4-glass",
    name: "G4 Car Glass Cleaner & Polish",
    packageType: "gallon",
    code: "G4",
    category: "Exterior Cleaners",
    short: "Ammonia-free glass cleaner and polish — streak-free, long-lasting protection.",
    description:
      "LifeLines G4 Car Glass Cleaner & Polish is specially formulated to efficiently remove stains, dust and fingerprints while leaving a protective layer that helps prevent dust from sticking for longer. Ammonia-free formula, safe for glass surfaces. Prevents streaks and watermarks after cleaning. Long-lasting protection against dust and dirt. Fast-drying; leaves no residue.",
    variants: ["20 L"],
    usage:
      "1. Spray the polish directly onto the glass. 2. Wipe the glass with a soft, dry cloth in circular motions. 3. For best results, avoid direct sunlight during application. Avoid contact with eyes and skin.",
    image: pG4Glass,
    featured: 10,
  },
  {
    slug: "lifelines-chemx-c6-500ml",
    name: "ChemX C6",
    code: "C6",
    packageType: "retail",
    category: "Cleaning Chemicals",
    short: "Chemical degreaser in a verified 500 ml bottle.",
    description: "ChemX C6 chemical degreaser in a 500 ml bottle.",
    variants: ["500 ml"],
    usage: "Follow the dilution and use directions printed on the product label.",
    image: pC6Bottle,
    featured: 11,
  },
  {
    slug: "lifelines-o2-solvent-500ml",
    name: "O2 Solvent Tire Polish",
    code: "O2",
    packageType: "retail",
    category: "Exterior Cleaners",
    short: "O2 tire polish in a verified 500 ml bottle.",
    description: "LifeLines O2 Solvent Tire Polish in a 500 ml bottle.",
    variants: ["500 ml"],
    usage: "Follow the directions printed on the product label.",
    image: pO2Bottle,
    featured: 12,
  },
  {
    slug: "lifelines-waterless-car-wash-480ml",
    name: "Waterless Car Wash",
    packageType: "retail",
    category: "Car Shampoo",
    short: "Waterless car wash in a verified 480 ml bottle.",
    description: "LifeLines Waterless Car Wash in a 480 ml bottle.",
    variants: ["480 ml"],
    usage: "Follow the directions printed on the product label.",
    image: pWaterlessBottle,
    featured: 13,
  },
  {
    slug: "lifelines-pre-wash-shampoo-1kg",
    name: "Pre Wash Car Shampoo",
    packageType: "retail",
    category: "Car Shampoo",
    short: "Pre-wash shampoo in a verified 1 kg bottle.",
    description: "LifeLines Pre Wash Car Shampoo in a 1 kg bottle.",
    variants: ["1 kg"],
    usage: "Follow the dilution and use directions printed on the product label.",
    image: pPreWashBottle,
    featured: 14,
  },
  {
    slug: "lifelines-chemx-d2-500ml",
    name: "ChemX D2 Dashboard Polish",
    code: "ChemX D2",
    packageType: "retail",
    category: "Interior Cleaners",
    short: "Dashboard polish in a verified 500 ml bottle.",
    description: "LifeLines ChemX D2 Dashboard Polish in a 500 ml bottle.",
    variants: ["500 ml"],
    usage: "Follow the directions printed on the product label.",
    image: pD2Bottle,
    featured: 15,
  },
  {
    slug: "lifelines-iron-remover-460ml",
    name: "Iron Remover",
    packageType: "retail",
    category: "Cleaning Chemicals",
    short: "Iron remover in a verified 460 ml spray bottle.",
    description: "LifeLines Iron Remover in a 460 ml spray bottle.",
    variants: ["460 ml"],
    usage: "Follow the directions printed on the product label.",
    image: pIronRemover,
    featured: 16,
  },
  {
    slug: "lifelines-rust-remover-rr-5l",
    name: "Professional Rust Remover RR",
    code: "RR",
    packageType: "retail",
    category: "Cleaning Chemicals",
    short: "Professional rust remover in a verified 5 L container.",
    description: "LifeLines Professional Rust Remover RR in a 5 L container.",
    variants: ["5 L"],
    usage: "Follow the directions printed on the product label.",
    image: pRustRemover,
    featured: 17,
  },
  {
    slug: "lifelines-shampoo-wax-1l",
    name: "Shampoo Wax",
    packageType: "retail",
    category: "Car Shampoo",
    short: "Shampoo wax in a verified 1 L bottle.",
    description: "LifeLines Shampoo Wax in a 1 L bottle.",
    variants: ["1 L"],
    usage: "Follow the dilution and use directions printed on the product label.",
    image: pShampooWaxBottle,
    featured: 18,
  },
];

export const RETAIL_PRODUCTS = PRODUCTS.filter((product) => product.packageType === "retail");
export const GALLON_PRODUCTS = PRODUCTS.filter((product) => product.packageType === "gallon");
export const OTHER_COMMERCIAL_PRODUCTS = PRODUCTS.filter(
  (product) => product.packageType === "other-commercial",
);

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
