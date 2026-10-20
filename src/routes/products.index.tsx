import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowRight, Search, ShieldCheck, Sparkles, Truck } from "lucide-react";
import productsHero from "@/assets/products-hero.jpg";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import {
  CATEGORIES,
  GALLON_PRODUCTS,
  OTHER_COMMERCIAL_PRODUCTS,
  PRODUCTS,
  RETAIL_PRODUCTS,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { useLocale, translateText } from "@/lib/i18n";
import { ProfessionalGallonCard } from "@/components/ProfessionalGallonCard";

export const Route = createFileRoute("/products/")({
  validateSearch: z.object({ q: z.string().optional(), cat: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Automotive Cleaning Products Catalog — AutoUp B2B Supply" },
      {
        name: "description",
        content:
          "Explore professional automotive cleaning products, concentrated car shampoos, waxes, and chemicals available in commercial 20L, 25L, and 20KG containers for businesses.",
      },
      { property: "og:title", content: "AutoUp Commercial Product Catalog" },
      {
        property: "og:description",
        content:
          "Professional automotive cleaning supplies for car wash operators, detailing centers, dealerships, and fleet businesses.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { locale } = useLocale();
  const { q = "", cat = "All Products" } = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const [sort, setSort] = useState("featured");
  const list = useMemo(() => {
    const term = q.toLowerCase();
    const r = PRODUCTS.filter(
      (p) =>
        (cat === "All Products" || p.category === cat) &&
        (!term ||
          p.name.toLowerCase().includes(term) ||
          translateText(p.name, locale).toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          translateText(p.category, locale).toLowerCase().includes(term) ||
          (p.code && p.code.toLowerCase().includes(term))),
    );
    return [...r].sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : a.featured - b.featured,
    );
  }, [q, cat, sort, locale]);

  const retailProducts = list.filter((product) => product.packageType === "retail");
  const gallonProducts = list.filter((product) => product.packageType === "gallon");
  const otherCommercialProducts = list.filter(
    (product) => product.packageType === "other-commercial",
  );

  return (
    <>
      <PageHero
        image={productsHero}
        eyebrow="B2B Commercial Catalog"
        title="Professional Automotive Cleaning Products"
        crumb="Products"
      >
        Commercial-grade concentrated shampoos, waxes, cleaners, and surface chemicals supplied in bulk
        containers (20L, 25L, 20KG) for business operations.
      </PageHero>

      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="relative block w-full md:max-w-sm">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) =>
                navigate({ search: (s) => ({ ...s, q: e.target.value || undefined }), replace: true })
              }
              placeholder="Search products or codes (e.g. ChemX, F55, G4)..."
              className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
            className="h-12 rounded-full border border-input bg-card px-5 text-foreground focus:border-primary focus:outline-none cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() =>
                navigate({
                  search: (s) => ({ ...s, cat: c === "All Products" ? undefined : c }),
                  replace: true,
                })
              }
              className={cn(
                "rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer",
                cat === c
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_0_12px_rgba(22,119,255,0.4)]"
                  : "border-input bg-card hover:border-primary/60 text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground text-base">No products match your search criteria.</p>
            <button
              onClick={() => navigate({ search: {}, replace: true })}
              className="mt-4 text-sm font-semibold text-primary hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-10 space-y-16">
            {retailProducts.length > 0 && (
              <section aria-labelledby="car-care-products-title">
                <div className="mb-7 max-w-3xl">
                  <p className="eyebrow">
                    {locale === "ar" ? "عبوات يومية" : "EVERYDAY CARE"}
                  </p>
                  <h2 id="car-care-products-title" className="section-title mt-2">
                    {locale === "ar" ? "منتجات العناية بالسيارات" : "Car Care Products"}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {locale === "ar"
                      ? "منتجات احترافية للتنظيف والتلميع والحماية، للعناية اليومية بالمركبات."
                      : "Professional cleaning, shining and protection products for everyday vehicle care."}
                  </p>
                </div>
                <div className="card-grid-5">
                  {retailProducts.map((product, n) => (
                    <Reveal key={product.slug} delay={(n % 5) * 60}>
                      <ProductCard p={product} action="cart" />
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {gallonProducts.length > 0 && (
              <section aria-labelledby="professional-gallons-title">
                <div className="mb-7 max-w-3xl">
                  <p className="eyebrow">
                    {locale === "ar" ? "توريد تجاري" : "COMMERCIAL SUPPLY"}
                  </p>
                  <h2 id="professional-gallons-title" className="section-title mt-2">
                    {locale === "ar"
                      ? "حلول احترافية بعبوات 20 لترًا"
                      : "Professional 20L Gallon Solutions"}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {locale === "ar"
                      ? "حلول عناية بالجملة للورش ومراكز العناية ومغاسل السيارات والمنشآت التجارية."
                      : "Bulk car care solutions for workshops, detailing studios, car washes and commercial businesses."}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {gallonProducts.map((product, n) => (
                    <Reveal key={product.slug} delay={(n % 3) * 80}>
                      <ProfessionalGallonCard product={product} />
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {otherCommercialProducts.length > 0 && (
              <section aria-labelledby="other-commercial-products-title">
                <div className="mb-7 max-w-3xl">
                  <p className="eyebrow">
                    {locale === "ar" ? "عبوات تجارية أخرى" : "OTHER COMMERCIAL SIZES"}
                  </p>
                  <h2 id="other-commercial-products-title" className="section-title mt-2">
                    {locale === "ar" ? "أحجام تجارية إضافية" : "Additional Commercial Packaging"}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {locale === "ar"
                      ? "تظهر هذه المنتجات بأحجامها الأصلية المعتمدة، ولا تُصنّف ضمن عبوات 20 لترًا."
                      : "These products retain their verified original packaging sizes and are not classified as 20 L gallons."}
                  </p>
                </div>
                <div className="card-grid-5">
                  {otherCommercialProducts.map((product, n) => (
                    <Reveal key={product.slug} delay={(n % 5) * 60}>
                      <ProductCard p={product} />
                    </Reveal>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </section>

      {/* B2B Commercial Supply Strengths */}
      <section className="section-dark py-20 bg-[#090b10] border-t border-white/5">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-3 lg:px-8">
          <Reveal delay={0} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <Truck className="size-8 text-primary mb-3" />
            <h3 className="text-xl font-bold text-white">Commercial Bulk Packaging</h3>
            <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
              Standard commercial containers in 20L, 25L, and 20KG drums designed specifically for
              high-throughput business consumption.
            </p>
          </Reveal>

          <Reveal delay={100} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <Sparkles className="size-8 text-primary mb-3" />
            <h3 className="text-xl font-bold text-white">High Dilution Ratios</h3>
            <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
              Formulated for maximum yield per container, enabling cost-effective per-wash economics in
              both automated and manual washing systems.
            </p>
          </Reveal>

          <Reveal delay={200} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <ShieldCheck className="size-8 text-primary mb-3" />
            <h3 className="text-xl font-bold text-white">Surface-Safe Formulations</h3>
            <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
              Engineered to protect customer vehicle finishes, ceramic coatings, and delicate interior
              surfaces while thoroughly lifting grime.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="hero" size="xl" className="shadow-[0_0_20px_-3px_var(--electric)]">
            <Link to="/quote">
              Request a Wholesale Quote <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
