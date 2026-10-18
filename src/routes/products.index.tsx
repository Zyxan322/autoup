import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
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
      { title: "Shop Car Care Products — AutoUp Collection" },
      { name: "description", content: "Browse AutoUp car shampoo, wax, cleaners, interior care and detailing accessories. Add to cart and request a quotation." },
      { property: "og:title", content: "Explore the AutoUp Collection" },
      { property: "og:description", content: "Car-care essentials, all in one place." },
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
      (p) => (cat === "All Products" || p.category === cat) && (!term || p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)),
    );
    return [...r].sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : a.featured - b.featured));
  }, [q, cat, sort]);

  return (
    <>
      <PageHero image={productsHero} eyebrow="The AutoUp Collection" title="Explore the AutoUp Collection" crumb="Products">
        Cleaning solutions and shine-enhancing essentials for your vehicle-care routine.
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="relative block w-full md:max-w-sm">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => navigate({ search: (s) => ({ ...s, q: e.target.value || undefined }), replace: true })}
              placeholder="Search products…"
              className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-4 focus:border-primary focus:outline-none"
            />
          </label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products" className="h-12 rounded-full border border-input bg-card px-5 focus:border-primary focus:outline-none">
            <option value="featured">Sort: Featured</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => navigate({ search: (s) => ({ ...s, cat: c === "All Products" ? undefined : c }), replace: true })}
              className={cn("rounded-full border px-4 py-2 text-sm transition-colors", cat === c ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card hover:border-primary")}
            >
              {c}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">No products match your search.</p>
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
          <div className="mt-10 text-center"><Button variant="line" size="xl" onClick={() => setShown((s) => s + PAGE)}>Load More</Button></div>
        )}
      </section>

      <section className="section-dark py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 lg:px-8">
          {[
            ["Wash", "Start with a gentle shampoo and a clean mitt, working from the roof down."],
            ["Protect", "Apply wax or a protection product to a clean, dry surface for lasting gloss."],
            ["Maintain", "Refresh interiors and touch up exteriors regularly to keep that just-cleaned look."],
          ].map(([t, d], n) => (
            <Reveal key={t} delay={n * 100}>
              <p className="font-display text-5xl font-bold text-primary">0{n + 1}</p>
              <h3 className="mt-3 text-2xl font-semibold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center"><Button asChild variant="hero" size="xl"><Link to="/contact">Need advice? Contact us</Link></Button></div>
      </section>
    </>
  );
}
