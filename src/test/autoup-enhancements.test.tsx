import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { HOME_SERVICES } from "@/lib/home-services";
import { photo } from "@/lib/media";
import { PRODUCTS, SERVICES } from "@/lib/catalog";
import { SITE, whatsappUrl, buildQuoteMessage } from "@/lib/site";

describe("AutoUp Enhancements Verification", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches all core routes without 404 fallback", () => {
    const routes = ["/", "/services", "/products", "/about", "/contact", "/quote"];
    for (const r of routes) {
      const match = router.matchRoutes(r);
      expect(match.length).toBeGreaterThan(0);
      expect(match.at(-1)?.routeId).not.toBe("__root__");
    }
  });

  it("verifies HOME_SERVICES contains exactly 5 categories matching specification", () => {
    expect(HOME_SERVICES).toHaveLength(5);

    const expectedTitles = [
      "Car Shampoo",
      "Cleaning Chemicals",
      "Car Wax & Polish",
      "Interior Care",
      "Exterior Care",
    ];

    const actualTitles = HOME_SERVICES.map((s) => s.title);
    expect(actualTitles).toEqual(expectedTitles);

    HOME_SERVICES.forEach((s) => {
      expect(s.slug).toBeDefined();
      expect(s.description).toBeDefined();
      expect(s.image).toBeTruthy();
      expect(s.modalImage).toBeTruthy();
      expect(s.product).toBeDefined();
      expect(s.product.slug).toBeDefined();
      // Ensure modal image is distinct from card image
      expect(s.image).not.toBe(s.modalImage);
    });
  });

  it("verifies unique photographic assets across service placements", () => {
    const serviceCardImages = HOME_SERVICES.map((s) => s.image);
    const serviceModalImages = HOME_SERVICES.map((s) => s.modalImage);

    // Ensure all 5 card images are distinct
    const uniqueCards = new Set(serviceCardImages);
    expect(uniqueCards.size).toBe(5);

    // Ensure all 5 modal images are distinct
    const uniqueModals = new Set(serviceModalImages);
    expect(uniqueModals.size).toBe(5);

    // Ensure card images and modal images don't overlap
    for (const img of serviceCardImages) {
      expect(serviceModalImages).not.toContain(img);
    }
  });

  it("verifies real LifeLines products have unique images and required fields", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(10);
    expect(SERVICES.length).toBeGreaterThanOrEqual(5);

    // Every product has real image, name, category, and at least one variant
    PRODUCTS.forEach((p) => {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.image).toBeTruthy();
      expect(p.variants.length).toBeGreaterThan(0);
      expect(p.description).toBeTruthy();
      expect(p.usage).toBeTruthy();
    });

    // All product images are unique — no reuse across products
    const allImages = PRODUCTS.map((p) => p.image);
    const uniqueImages = new Set(allImages);
    expect(uniqueImages.size).toBe(PRODUCTS.length);
  });

  it("verifies WhatsApp URL and quotation message generation preserves quotation and contact data", () => {
    const defaultUrl = whatsappUrl();
    expect(defaultUrl).toContain("https://wa.me/");
    expect(defaultUrl).toContain(SITE.whatsappCountryCode);

    const quoteMessage = buildQuoteMessage({
      name: "Alex Vance",
      phone: "+971501234567",
      city: "Dubai",
      requestType: "Product Inquiry",
      products: [{ name: "Colour Wax Shampoo", qty: 2, variant: "20 L" }],
      services: ["Car Shampoo"],
      notes: "Please confirm shipping timeline",
    });

    expect(quoteMessage).toContain("Alex Vance");
    expect(quoteMessage).toContain("Colour Wax Shampoo (20 L) × 2");
    expect(quoteMessage).toContain("Requested Services:\nCar Shampoo");

    const customUrl = whatsappUrl(quoteMessage);
    expect(customUrl).toContain(encodeURIComponent("Alex Vance"));
  });
});
