import { Link } from "@tanstack/react-router";
import { Check, Eye, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PRODUCTS, type Service } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

const SERVICE_RECOMMENDATIONS: Record<string, string> = {
  "cleaning-essentials": "lifelines-waterless-car-wash",
  "cleaning-chemicals": "lifelines-chemx-c2",
  "car-shampoo": "lifelines-colour-wax-shampoo",
  "wax-shine": "lifelines-f55-wax",
  "exterior-care": "lifelines-chemx-t1",
  "interior-cleaning": "lifelines-chemx-d2",
  "paint-protection": "lifelines-f55-wax",
  "care-kits": "lifelines-pre-wash-shampoo",
};

const SERVICE_BENEFITS: Record<string, string[]> = {
  "car-shampoo": [
    "High-lubricity foam prevents swirl marks and wash scratches",
    "pH-neutral formula safe for ceramic coatings and waxes",
    "Effortlessly lifts road grime and environmental fallout",
  ],
  "cleaning-chemicals": [
    "Concentrated professional formulas for high-efficiency cleaning",
    "Breaks down stubborn brake dust, bug residue and road grime",
    "Safe on automotive clear coats, alloys, plastics and rubber",
  ],
  "wax-shine": [
    "Mirror-like wet gloss and deep optical clarity",
    "Hydrophobic water-beading barrier against weather",
    "UV inhibitors protect clear coat against oxidation",
  ],
  "interior-cleaning": [
    "Restores OEM matte finish without greasy, slick residue",
    "Nourishes leather, vinyl, dashboard plastics and trim",
    "Neutralizes vehicle cabin odors with fresh scent",
  ],
  "exterior-care": [
    "Streak-free quick touch-ups on paint, glass and chrome",
    "Anti-static dust-repelling formula keeps car cleaner longer",
    "Safe for wraps, emblems, rubber weatherstripping and badges",
  ],
  "cleaning-essentials": [
    "Scratch-free chenille wash mitts and ultra-plush drying towels",
    "High-absorbency microfiber traps grit away from clear coat",
    "Durable, reusable, and machine-washable for years of care",
  ],
  "paint-protection": [
    "Shields paintwork from harsh sun, acid rain and industrial fallout",
    "Extreme hydrophobic bead effect makes washing effortless",
    "Preserves depth, clarity and resale value",
  ],
  "care-kits": [
    "Complete curated bundle covering all three stages: Clean, Shine, Protect",
    "Includes essential applicators, microfiber towels and products",
    "Maximum convenience and value for automotive enthusiasts",
  ],
};

export function ServiceCard({ s, index }: { s: Service; index: number }) {
  const { add } = useCart();
  const recSlug = SERVICE_RECOMMENDATIONS[s.slug] ?? "foam-car-shampoo";
  const recProduct = PRODUCTS.find((p) => p.slug === recSlug) ?? PRODUCTS[0];

  const handleAdd = () => {
    add({
      slug: recProduct.slug,
      name: recProduct.name,
      variant: recProduct.variants[0],
      qty: 1,
      image: recProduct.image,
    });
    toast.success(`${recProduct.name} added to cart`);
  };

  const benefits = SERVICE_BENEFITS[s.slug] ?? [
    "Tailored specifically for the targeted vehicle surface",
    "Easy integration into your regular car-care routine",
    "Guaranteed surface safety and professional results",
  ];

  return (
    <article className="service-card-compact group">
      <div className="relative aspect-[16/11] overflow-hidden bg-black/10">
        <img
          src={s.image}
          alt={s.title}
          width={560}
          height={385}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <span className="absolute bottom-2 left-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-white backdrop-blur border border-white/10">
          0{index + 1}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="font-display text-sm font-semibold tracking-tight text-foreground line-clamp-1">
          {s.title}
        </h3>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {s.description}
        </p>

        <div className="mt-4 space-y-2">
          <Button
            onClick={handleAdd}
            className="w-full h-8 text-xs font-semibold cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(22,119,255,0.45)] transition-all"
            size="sm"
          >
            <ShoppingBag className="size-3.5 mr-1.5" />
            Add to Cart
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 text-xs font-medium border-primary/30 hover:border-primary hover:bg-primary/5 text-foreground hover:text-primary transition-all cursor-pointer"
              >
                <Eye className="size-3.5 mr-1.5" />
                View Details
              </Button>
            </DialogTrigger>

            <DialogContent className="section-dark max-h-[92svh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-xl p-6 border border-white/10 shadow-2xl backdrop-blur-2xl">
              <img
                src={s.image}
                alt={`${s.title} detail`}
                width={560}
                height={320}
                loading="lazy"
                className="mt-3 aspect-[16/9] w-full rounded-lg object-cover border border-white/10 shadow-md"
              />

              <div className="mt-2">
                <span className="eyebrow text-[0.68rem]">SERVICE CATEGORY</span>
                <DialogTitle className="text-2xl mt-1">{s.title}</DialogTitle>
              </div>

              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                {s.description} All formulations are tested for maximum surface safety and long-lasting optical clarity. Follow container dilution and application guidelines for optimum results.
              </DialogDescription>

              <div className="space-y-2 rounded-lg bg-white/5 p-4 border border-white/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Key Advantages & Benefits</p>
                <ul className="space-y-2 text-sm text-foreground/90">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="size-4 shrink-0 text-primary mt-0.5" />
                      <span className="text-xs leading-normal">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-white/10">
                <span>Featured Product:</span>
                <Link
                  to="/products/$slug"
                  params={{ slug: recProduct.slug }}
                  className="font-medium text-primary hover:underline"
                >
                  {recProduct.name}
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleAdd}
                  className="flex-1 cursor-pointer shadow-[0_0_15px_-3px_var(--electric)]"
                >
                  <ShoppingBag className="size-4 mr-2" />
                  Add to Cart
                </Button>
                <Button asChild variant="line" className="flex-1 cursor-pointer">
                  <Link to="/quote" search={{ service: s.slug }}>
                    Request Category Quote
                  </Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </article>
  );
}
