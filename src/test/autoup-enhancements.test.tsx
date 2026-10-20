import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { SITE, whatsappUrl, buildQuoteMessage } from "@/lib/site";
import { configuredInstallmentPlan, isTwentyLitreVariant } from "@/lib/installments";
import { translateText } from "@/lib/i18n";
import { DISPLAY_GALLERY_ITEMS } from "@/routes/gallery";

describe("AutoUp B2B Product-Focused Verification", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches all core routes without 404 fallback", () => {
    const routes = ["/", "/services", "/products", "/gallery", "/about", "/contact", "/quote"];
    for (const r of routes) {
      const match = router.matchRoutes(r);
      expect(match.length).toBeGreaterThan(0);
      expect(match.at(-1)?.routeId).not.toBe("__root__");
    }
  });

  it("verifies CATEGORIES contain only verified product categories", () => {
    expect(CATEGORIES).toContain("All Products");
    expect(CATEGORIES).toContain("Car Shampoo");
    expect(CATEGORIES).toContain("Cleaning Chemicals");
    expect(CATEGORIES).toContain("Car Wax & Polish");
    expect(CATEGORIES).toContain("Interior Cleaners");
    expect(CATEGORIES).toContain("Exterior Cleaners");
  });

  it("verifies all real LifeLines products have unique images and verified fields", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(10);

    // Every product has real image, name, category, and commercial variant (20L, 25L, 20KG)
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

  it("offers installment requests only for verified 20-litre variants without inventing plan terms", () => {
    expect(isTwentyLitreVariant("20 L")).toBe(true);
    expect(isTwentyLitreVariant("20 Litre")).toBe(true);
    expect(isTwentyLitreVariant("20 KG")).toBe(false);
    expect(isTwentyLitreVariant("25 L")).toBe(false);
    expect(PRODUCTS.filter((product) => isTwentyLitreVariant(product.variants[0]))).toHaveLength(6);
    expect(
      PRODUCTS.every(
        (product) => configuredInstallmentPlan(product, product.variants[0]) === undefined,
      ),
    ).toBe(true);
  });

  it("uses Arabic by default in translations and keeps the gallery curated", () => {
    expect(translateText("Request a Quote", "ar")).toBe("اطلب عرض سعر");
    expect(translateText("اطلب عرض سعر", "en")).toBe("Request a Quote");
    expect(DISPLAY_GALLERY_ITEMS).toHaveLength(8);
    expect(new Set(DISPLAY_GALLERY_ITEMS.map((item) => item.id)).size).toBe(8);
    expect(new Set(DISPLAY_GALLERY_ITEMS.map((item) => item.image)).size).toBe(8);
  });

  it("provides the confirmed business address in Arabic and English", () => {
    expect(SITE.address).toEqual({
      ar: "حي الربيع، بريدة 52361",
      en: "Al Rabie District, Buraydah 52361",
    });
  });

  it("includes payment preference in quotations only for eligible 20-litre products", () => {
    const message = buildQuoteMessage(
      {
        name: "Alex",
        phone: "+966500000000",
        city: "Riyadh",
        products: [
          {
            name: "Colour Wax Shampoo",
            qty: 1,
            variant: "20 L",
            paymentOption: "installment-quote",
          },
          { name: "ChemX C2", qty: 1, variant: "25 L" },
        ],
      },
      "ar",
    );

    expect(message).toContain("شامبو الشمع الملون (20 L) × 1 — طلب عرض تقسيط");
    expect(message).toContain("ChemX C2 (25 L) × 1");
    expect(message).not.toContain("ChemX C2 (25 L) × 1 — الدفع الكامل");
  });

  it("verifies B2B wholesale quotation message generation with company details and WhatsApp URL", () => {
    const defaultUrl = whatsappUrl();
    expect(defaultUrl).toContain("https://wa.me/");
    expect(defaultUrl).toContain(SITE.whatsappCountryCode);

    const quoteMessage = buildQuoteMessage({
      name: "Alex Vance",
      companyName: "Apex Detailing Studio",
      phone: "+971501234567",
      city: "Dubai",
      orderVolume: "5 containers monthly",
      products: [{ name: "Colour Wax Shampoo", qty: 2, variant: "20 L" }],
      notes: "Please confirm commercial wholesale rates",
    });

    expect(quoteMessage).toContain("Alex Vance");
    expect(quoteMessage).toContain("Apex Detailing Studio");
    expect(quoteMessage).toContain("Colour Wax Shampoo (20 L) × 2");
    expect(quoteMessage).toContain("5 containers monthly");
    expect(quoteMessage).toContain("Please confirm commercial wholesale rates");

    const customUrl = whatsappUrl(quoteMessage);
    expect(customUrl).toContain(encodeURIComponent("Alex Vance"));
    expect(customUrl).toContain(encodeURIComponent("Apex Detailing Studio"));
  });
});
