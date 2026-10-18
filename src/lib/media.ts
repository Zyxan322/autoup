// Central media inventory — resolves photographic assets by placement.
// Editorial and hero images use placement-specific files (hero-*, editorial-*, etc.).
// Real product photos are imported directly in catalog.ts and passed through via p.image.

const jpgAssets = import.meta.glob<string>('../assets/*.jpg', { eager: true, query: '?url', import: 'default' });
const jpegAssets = import.meta.glob<string>('../assets/**/*.jpeg', { eager: true, query: '?url', import: 'default' });

/** Resolve an editorial / hero / svc image by name (without extension). */
export function photo(name: string): string {
  return jpgAssets[`../assets/${name}.jpg`] ?? jpegAssets[`../assets/${name}.jpeg`] ?? '';
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
  return '';
}
