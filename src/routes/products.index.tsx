import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowRight, Search, ShieldCheck, Sparkles, Truck } from "lucide-react";
import productsHero from "@/assets/products-hero.jpg";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

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

const PAGE = 10;

function ProductsPage() {
  const { q = "", cat = "All Products" } = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const [sort, setSort] = useState("featured");
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(() => {
    const term = q.toLowerCase();
    const r = PRODUCTS.filter(
      (p) =>
        (cat === "All Products" || p.category === cat) &&
        (!term ||
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          (p.code && p.code.toLowerCase().includes(term))),
    );
    return [...r].sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : a.featured - b.featured,
    );
  }, [q, cat, sort]);

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
          <div className="card-grid-5 mt-10">
            {list.slice(0, shown).map((p, n) => (
              <Reveal key={p.slug} delay={(n % 5) * 60}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        )}

        {list.length > shown && (
          <div className="mt-12 text-center">
            <Button variant="line" size="xl" onClick={() => setShown((s) => s + PAGE)}>
              Load More Products
            </Button>
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
