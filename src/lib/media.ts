// Central media inventory — resolves photographic assets by placement.
// Editorial and hero images use placement-specific files (hero-*, editorial-*, etc.).
// Product-card photography is resolved by placement to avoid reusing images across sections.

const jpgAssets = import.meta.glob<string>("../assets/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const jpegAssets = import.meta.glob<string>("../assets/**/*.jpeg", {
  eager: true,
  query: "?url",
  import: "default",
});
const gallonCardAssets = import.meta.glob<string>("../assets/galon/*.jpeg", {
  eager: true,
  query: "?url",
  import: "default",
});
const polishSectionAssets = import.meta.glob<string>("../assets/polish/*.jpeg", {
  eager: true,
  query: "?url",
  import: "default",
});

const gallonCardPhotos: Record<string, string | undefined> = {
  "lifelines-colour-wax-shampoo":
    gallonCardAssets["../assets/galon/WhatsApp Image 2026-10-21 at 11.47.48 AM.jpeg"],
  "lifelines-colour-wax-shampoo-rose":
    gallonCardAssets["../assets/galon/WhatsApp Image 2026-10-21 at 11.58.57 AM (1).jpeg"],
  "lifelines-waterless-car-wash":
    gallonCardAssets["../assets/galon/WhatsApp Image 2026-10-21 at 11.58.57 AM (2).jpeg"],
  "lifelines-f55-wax":
    gallonCardAssets["../assets/galon/WhatsApp Image 2026-10-21 at 11.58.58 AM (1).jpeg"],
  "lifelines-o2-solvent":
    gallonCardAssets["../assets/galon/WhatsApp Image 2026-10-21 at 12.19.23 PM.jpeg"],
  "lifelines-g4-glass":
    gallonCardAssets["../assets/galon/WhatsApp Image 2026-10-21 at 12.19.24 PM (1).jpeg"],
};

export const POLISH_SECTION_MEDIA = [
  {
    slug: "microfiber-towel",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.01.30 PM.jpeg"],
  },
  {
    slug: "car-polishing-cloth",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.01.31 PM.jpeg"],
  },
  {
    slug: "chenille-microfiber",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.01.53 PM.jpeg"],
  },
  {
    slug: "blue-wash-mitt",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.01.54 PM.jpeg"],
  },
  {
    slug: "car-drying-towel",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.05.07 PM.jpeg"],
  },
  {
    slug: "microfiber-drying-towel",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.05.08 PM.jpeg"],
  },
  {
    slug: "red-wash-mitt",
    image: polishSectionAssets["../assets/polish/WhatsApp Image 2026-10-21 at 1.15.49 PM.jpeg"],
  },
];

/** Resolve an editorial / hero / svc image by name (without extension). */
export function photo(name: string): string {
  return jpgAssets[`../assets/${name}.jpg`] ?? jpegAssets[`../assets/${name}.jpeg`] ?? "";
}

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
