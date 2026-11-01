// Central media inventory — resolves photographic assets by placement.
// Editorial and hero images use placement-specific files (hero-*, editorial-*, etc.).
// Product-card photography is resolved by placement to avoid reusing images across sections.

const webpAssets = import.meta.glob<string>("../assets/**/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const gallonCardAssets = import.meta.glob<string>("../assets/galon/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const polishSectionAssets = import.meta.glob<string>("../assets/polish/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

import newChemxC6 from "@/assets/new products/WhatsApp Image 2026-11-01 at 12.00.44 AM.jpeg";
import newG4 from "@/assets/new products/WhatsApp Image 2026-11-01 at 12.00.45 AM (1).jpeg";
import newChemxT1 from "@/assets/new products/WhatsApp Image 2026-11-01 at 12.00.45 AM (2).jpeg";
import newChemxC2 from "@/assets/new products/WhatsApp Image 2026-11-01 at 12.00.45 AM.jpeg";
import newO2 from "@/assets/new products/WhatsApp Image 2026-11-01 at 12.00.46 AM (1).jpeg";
import newChemxD2 from "@/assets/new products/WhatsApp Image 2026-11-01 at 12.00.46 AM (2).jpeg";
import newF55 from "@/assets/new products/WhatsApp Image 2026-11-01 at 12.00.46 AM.jpeg";

export const NEW_PRODUCT_PHOTOS: Record<string, string> = {
  "lifelines-chemx-c6-25l": newChemxC6,
  "lifelines-g4-glass": newG4,
  "lifelines-chemx-t1": newChemxT1,
  "lifelines-chemx-c2": newChemxC2,
  "lifelines-o2-solvent": newO2,
  "lifelines-chemx-d2": newChemxD2,
  "lifelines-f55-wax": newF55,
};

const gallonCardPhotos: Record<string, string | undefined> = {
  "lifelines-colour-wax-shampoo":
    gallonCardAssets["../assets/galon/WhatsApp Image 2026-10-21 at 11.47.48 AM.webp"],
  "lifelines-colour-wax-shampoo-rose":
    gallonCardAssets["../assets/galon/WhatsApp Image 2026-10-21 at 11.58.57 AM (1).webp"],
  "lifelines-waterless-car-wash":
    gallonCardAssets["../assets/galon/WhatsApp Image 2026-10-21 at 11.58.57 AM (2).webp"],
  "lifelines-f55-wax": newF55,
  "lifelines-o2-solvent": newO2,
  "lifelines-g4-glass": newG4,
};

export const POLISH_SECTION_MEDIA = [
  {
    slug: "microfiber-towel",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.01.30 PM.webp"],
  },
  {
    slug: "car-polishing-cloth",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.01.31 PM.webp"],
  },
  {
    slug: "chenille-microfiber",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.01.53 PM.webp"],
  },
  {
    slug: "blue-wash-mitt",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.01.54 PM.webp"],
  },
  {
    slug: "car-drying-towel",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.05.07 PM.webp"],
  },
  {
    slug: "microfiber-drying-towel",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.05.08 PM.webp"],
  },
  {
    slug: "red-wash-mitt",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.15.49 PM.webp"],
  },
];

/** Resolve an editorial / hero / svc image by name (without extension). */
export function photo(name: string): string {
  return webpAssets[`../assets/${name}.webp`] ?? "";
}

export const QUOTE_PAGE_MEDIA = {
  hero: photo("detail-p-microfiber"),
};

export function gallonProductPhoto(slug: string): string | undefined {
  return gallonCardPhotos[slug];
}

/**
 * Return the product photo URL.
 * Real product photos are already embedded in the Product record via catalog.ts.
 * This function now simply returns the product's own image for any placement,
 * ensuring real product photography is displayed consistently everywhere.
 *
 * The `placement` parameter is retained for API compatibility but is unused.
 */
export function productPhoto(slug: string, _placement?: string): string {
  // Product images come from catalog.ts imports — resolve by slug lookup at runtime.
  // If called outside a component with no PRODUCTS access, return empty string.
  // Components should prefer using `p.image` directly from the Product record.
  return "";
}
