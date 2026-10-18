import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  Building,
  CheckCircle2,
  Droplets,
  HelpCircle,
  Layers,
  MessageCircle,
  Package,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import hero1 from "@/assets/Hero1.jpg";
import hero2 from "@/assets/Hero2.jpg";
import hero3 from "@/assets/hero3.jpg";
import hero4 from "@/assets/hero4.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { SITE, whatsappUrl } from "@/lib/site";
import { photo } from "@/lib/media";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoUp — Professional Automotive Cleaning Products Supplier" },
      {
        name: "description",
        content:
          "AutoUp supplies professional automotive cleaning products, concentrated car shampoos, waxes, and chemicals in bulk containers (20L, 25L, 20KG) to businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:title",
        content: "AutoUp — Professional Automotive Cleaning Products for Your Business",
      },
      {
        property: "og:description",
        content:
          "Discover automotive cleaning products for professional use. Explore our product range and contact our team for business inquiries, bulk purchasing, and supply information.",
      },
    ],
  }),
  component: Index,
});

/* =========================================================================
   1. HERO CAROUSEL COMPONENT
   ========================================================================= */
const HERO_SLIDES = [
  {
    img: hero1,
    tag: "B2B Automotive Cleaning Products",
    headline: "Professional Automotive Cleaning Products for Your Business",
    text: "Discover commercial-grade cleaning products and bulk concentrates engineered for professional vehicle care.",
  },
  {
    img: hero2,
    tag: "Commercial Bulk Packaging (20L • 25L • 20KG)",
    headline: "High-Yield Formulations for Wash Facilities",
    text: "Concentrated shampoos, waxes, and specialized chemicals packaged for high-throughput commercial operations.",
  },
  {
    img: hero3,
    tag: "Wholesale & Business Supply",
    headline: "Reliable Chemical Supply for Detailing Studios & Dealerships",
    text: "Supplying car washes, detailing centers, automotive workshops, and fleet operators with surface-safe cleaning solutions.",
  },
  {
    img: hero4,
    tag: "Direct Commercial Procurement",
    headline: "Equip Your Facility with Professional Auto-Care Products",
    text: "Direct wholesale inquiries, flexible container volumes, and fast quotation confirmations via WhatsApp.",
  },
];

function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 38,
  });
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIdx(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || paused) return;
    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 6500);
    return () => clearInterval(timer);
  }, [emblaApi, paused]);

  const slide = HERO_SLIDES[activeIdx] ?? HERO_SLIDES[0];

  return (
    <section
      className="section-dark relative h-[92svh] min-h-[580px] max-h-[860px] overflow-hidden select-none"
      aria-label="Professional automotive cleaning products hero"
      onPointerDown={() => setPaused(true)}
    >
      {/* Sliding Embla Viewport */}
      <div ref={emblaRef} className="h-full w-full overflow-hidden">
        <div className="flex h-full w-full">
          {HERO_SLIDES.map((s, n) => (
            <div
              key={n}
              className="relative h-full w-full flex-[0_0_100%] min-w-0 overflow-hidden"
              aria-hidden={n !== activeIdx}
            >
              <img
                src={s.img}
                alt=""
                width={1920}
                height={1088}
                loading={n === 0 ? "eager" : "lazy"}
                fetchPriority={n === 0 ? "high" : "auto"}
                className={cn(
                  "size-full object-cover brightness-[0.88] contrast-[1.06] saturate-[1.08] transition-transform duration-[7000ms] ease-out",
                  n === activeIdx ? "scale-105" : "scale-100",
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightened, Focused Hero Overlays — keeps the car / product image prominently visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 via-40% to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-fade-bottom pointer-events-none" />

      {/* Editorial Content — Compact & Focused on Left */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center pt-12">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div
            key={activeIdx}
            className="pointer-events-auto flex max-w-xl flex-col items-start text-left animate-in fade-in slide-in-from-bottom-5 duration-500"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md shadow-[0_0_15px_rgba(22,119,255,0.25)]">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              {slide.tag}
            </div>

            {/* B2B Headline */}
            <h1 className="mt-4 font-sans text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              {slide.headline}
            </h1>

            {/* Concise Supporting Text */}
            <p className="mt-4 max-w-lg text-sm sm:text-base text-white/90 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {slide.text}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Button
                asChild
                variant="hero"
                size="lg"
                className="group relative overflow-hidden shadow-[0_0_25px_rgba(22,119,255,0.6)] hover:shadow-[0_0_32px_rgba(22,119,255,0.85)] transition-all font-semibold"
              >
                <Link to="/products">
                  Explore Our Products
                  <ArrowRight className="size-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="glass"
                size="lg"
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 font-medium transition-all"
              >
                <Link to="/quote">Request a Wholesale Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-8 right-5 lg:right-8 flex items-center gap-2 z-20 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
        {HERO_SLIDES.map((_, n) => (
          <button
            key={n}
            type="button"
            aria-label={`Go to slide ${n + 1}`}
            aria-pressed={n === activeIdx}
            onClick={() => {
              setPaused(true);
              emblaApi?.scrollTo(n);
            }}
            className="group p-1 cursor-pointer focus:outline-none"
          >
            <span
              className={cn(
                "block h-1.5 transition-all duration-500 rounded-full",
                n === activeIdx
                  ? "w-8 bg-primary shadow-[0_0_12px_var(--electric)]"
                  : "w-2.5 bg-white/40 hover:bg-white/80",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   2. PRODUCT CATEGORIES (Supported by actual inventory)
   ========================================================================= */
const CATEGORY_CARDS = [
  {
    title: "Car Shampoo",
    cat: "Car Shampoo",
    desc: "Concentrated foam shampoos and pre-washes formulated for automatic and manual wash systems.",
    image: "editorial-10",
    containerSize: "20L & 20KG",
    itemCount: "4 Products",
  },
  {
    title: "Cleaning Chemicals",
    cat: "Cleaning Chemicals",
    desc: "Heavy-duty all-purpose cleaners (ChemX C2) for engines, rims, linings, and high-grime components.",
    image: "editorial-16",
    containerSize: "25L Drum",
    itemCount: "ChemX Series",
  },
  {
    title: "Car Wax & Polish",
    cat: "Car Wax & Polish",
    desc: "Post-wash final touch shine waxes (F55) delivering instant gloss, zero residue, and dust repellency.",
    image: "detail-2",
    containerSize: "20L Container",
    itemCount: "F55 Final Touch",
  },
  {
    title: "Interior Cleaners",
    cat: "Interior Cleaners",
    desc: "Dashboard and trim polishes (ChemX D2) engineered for vinyl, leather, and interior plastics.",
    image: "detail-1",
    containerSize: "20KG Drum",
    itemCount: "ChemX D2",
  },
  {
    title: "Exterior Cleaners",
    cat: "Exterior Cleaners",
    desc: "Solvent tire dressings (O2, ChemX T1) and ammonia-free streakless glass polishes (G4).",
    image: "editorial-12",
    containerSize: "20L & 20KG",
    itemCount: "Tire & Glass Care",
  },
];

/* =========================================================================
   3. WHO WE SUPPLY (B2B Commercial Target Audiences)
   ========================================================================= */
const WHO_WE_SUPPLY = [
  {
    title: "Car Wash Businesses",
    desc: "High-throughput automatic tunnel washes and manual hand wash bays requiring high-dilution shampoo concentrates.",
    icon: Droplets,
  },
  {
    title: "Automotive Detailing Studios",
    desc: "Specialized vehicle detailers demanding high-gloss finishing waxes, tire polishes, and interior conditioners.",
    icon: Sparkles,
  },
  {
    title: "Vehicle Dealerships",
    desc: "New and pre-owned vehicle showrooms preparing cars for customer handover with showroom surface gloss.",
    icon: Building,
  },
  {
    title: "Automotive Workshops",
    desc: "Service centers and mechanical garages requiring powerful degreasing chemicals for engine bays and rims.",
    icon: Warehouse,
  },
  {
    title: "Fleet & Transport Operators",
    desc: "Commercial transport companies, taxi fleets, and rental operators maintaining fleets under rigorous daily schedules.",
    icon: Truck,
  },
  {
    title: "Distributors & Resellers",
    desc: "Regional automotive product wholesalers and procurement teams sourcing reliable commercial-grade chemicals.",
    icon: Users,
  },
];

/* =========================================================================
   4. WHY CHOOSE AUTOUP (Verified B2B Strengths)
   ========================================================================= */
const WHY_CHOOSE_ITEMS = [
  {
    icon: Package,
    title: "Commercial-Grade Bulk Containers",
    desc: "Standardized 20-litre, 25-litre, and 20-kilogram commercial containers designed specifically for high-frequency business usage.",
  },
  {
    icon: Droplets,
    title: "High Dilution Ratios & Economy",
    desc: "Formulations engineered for dilution rates up to 1:100 and 1:150, significantly reducing chemical cost per cleaned vehicle.",
  },
  {
    icon: ShieldCheck,
    title: "Paint-Safe & Clear-Coat Tested",
    desc: "Formulas engineered to preserve automotive paint, protect clear coats, and safely treat delicate vinyl, leather, and glass.",
  },
  {
    icon: MessageCircle,
    title: "Direct WhatsApp Commercial Quotes",
    desc: "Fast, itemized quotation turnarounds with verified container stock and transparent supply information directly via WhatsApp.",
  },
];

/* =========================================================================
   5. BULK & WHOLESALE INQUIRIES WORKFLOW
   ========================================================================= */
const WHOLESALE_STEPS = [
  {
    step: "01",
    title: "Select Products",
    desc: "Review our 10 verified commercial product formulas and select the container quantities needed for your operation.",
  },
  {
    step: "02",
    title: "Submit Business Information",
    desc: "Provide your company name, location, and estimated monthly or sample volume through our simple inquiry form.",
  },
  {
    step: "03",
    title: "Receive Verified Quotation",
    desc: "Our commercial representative confirms stock availability, volume pricing, and logistics options directly on WhatsApp.",
  },
];

/* =========================================================================
   6. B2B FREQUENTLY ASKED QUESTIONS
   ========================================================================= */
const B2B_FAQ = [
  [
    "What products does AutoUp supply?",
    "AutoUp supplies commercial automotive cleaning products including concentrated car shampoos (Colour Wax Shampoo, Pre-Wash), all-purpose degreasers (ChemX C2), finishing waxes (F55), dashboard conditioners (ChemX D2), tire dressings (ChemX T1, O2 Solvent), and streak-free glass polish (G4).",
  ],
  [
    "Does AutoUp provide consumer car washing or vehicle detailing services?",
    "No. AutoUp is strictly a B2B product supplier. We do not provide car washing, detailing, vehicle polishing, or in-person cleaning services to individual retail consumers.",
  ],
  [
    "What container sizes are available for business purchasing?",
    "Our products are supplied in heavy-duty commercial packaging: 20-litre liquid containers, 25-litre chemical drums, and 20-kilogram containers for pre-wash concentrates and polishes.",
  ],
  [
    "How can businesses request wholesale pricing?",
    "You can build an inquiry list on our website and click 'Request a Wholesale Quote', or message our team directly on WhatsApp. We provide itemized wholesale quotations based on your required products and order volume.",
  ],
  [
    "What are the dilution recommendations for car wash operations?",
    "Each product features specific dilution guidelines printed on the packaging. For example, our Colour Wax Shampoo dilutes at 1 litre to 100 litres of water for manual washing and 1:150 for pump systems, delivering cost-effective operational economics.",
  ],
  [
    "Are product prices shown on the website?",
    "Because AutoUp is a B2B supplier, wholesale pricing is customized based on order volumes and delivery locations. Pricing is verified directly through our quotation and WhatsApp inquiry flow.",
  ],
];

/* =========================================================================
   MAIN HOMEPAGE COMPONENT
   ========================================================================= */
function Index() {
  return (
    <div className="flex flex-col">
      {/* 1. Header (Rendered globally via __root.tsx) */}

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Product Categories */}
      <section id="categories" className="page-band bg-background border-b border-border/60">
        <div className="page-inner">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-primary">COMMERCIAL CATEGORIES</span>
            <h2 className="section-title">Product Categories</h2>
            <p className="section-copy">
              Explore professional cleaning chemistry grouped by application surface and commercial wash
              requirements.
            </p>
          </Reveal>

          <div className="category-grid mt-10">
            {CATEGORY_CARDS.map((c, n) => (
              <Reveal key={c.title} className={`category-item category-item-${n}`}>
                <Link
                  to="/products"
                  search={{ cat: c.cat }}
                  className="section-dark group relative block h-full overflow-hidden rounded-2xl border border-white/10 shadow-lg hover:border-primary/40 transition-colors"
                >
                  <img
                    src={photo(c.image)}
                    alt={c.title}
                    width={560}
                    height={400}
                    loading="lazy"
                    className="size-full object-cover brightness-[0.7] contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="rounded-full bg-primary/20 border border-primary/40 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-primary">
                          {c.containerSize}
                        </span>
                        <span className="text-[0.68rem] text-white/60">{c.itemCount}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{c.title}</h3>
                      <p className="mt-1 text-xs text-white/75 line-clamp-2 max-w-sm">{c.desc}</p>
                    </div>
                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white backdrop-blur group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ArrowRight className="size-4" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products (5 per row on desktop) */}
      <section className="section-dark page-band bg-[#080b11] border-b border-white/5">
        <div className="page-inner">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <Reveal className="max-w-2xl">
              <span className="eyebrow text-primary">ACTUAL PRODUCT CATALOG</span>
              <h2 className="section-title text-white">Featured Automotive Cleaning Products</h2>
              <p className="section-copy text-white/75">
                Authentic LifeLines commercial formulations packaged in high-capacity containers for
                professional vehicle cleaning operations.
              </p>
            </Reveal>
            <Reveal>
              <Button asChild variant="glass" size="lg" className="border-white/20 text-white">
                <Link to="/products">
                  View Full Catalog (10 Products) <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
            </Reveal>
          </div>

          {/* 5 Compact Cards Per Row on Desktop */}
          <div className="card-grid-5 mt-10">
            {PRODUCTS.slice(0, 10).map((p, n) => (
              <Reveal key={p.slug} delay={(n % 5) * 50}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose AutoUp */}
      <section className="page-band bg-background border-b border-border/60">
        <div className="page-inner">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <span className="eyebrow text-primary">COMMERCIAL ADVANTAGES</span>
              <h2 className="section-title">Why Businesses Choose AutoUp</h2>
              <p className="section-copy">
                AutoUp supplies high-efficiency cleaning chemistry that allows professional wash and
                detailing teams to achieve superior surface shine, reduce chemical waste, and safeguard customer
                vehicles.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {WHY_CHOOSE_ITEMS.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-border/80 bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
                  >
                    <Icon className="size-5 text-primary mb-2.5" />
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="relative overflow-hidden rounded-2xl border border-border shadow-xl">
              <img
                src={photo("editorial-1")}
                alt="Automotive cleaning chemicals commercial supply"
                width={720}
                height={580}
                loading="lazy"
                className="aspect-[5/4] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-bold text-primary backdrop-blur-md mb-2">
                  <PackageCheck className="size-3.5" />
                  Heavy-Duty Containers
                </div>
                <h3 className="text-xl font-bold">Standard 20L, 25L & 20KG Drums</h3>
                <p className="mt-1 text-xs text-white/80">
                  Engineered specifically for business inventory, automated dosing pumps, and commercial wash
                  bays.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Who We Supply */}
      <section className="section-dark page-band bg-[#090c12] border-b border-white/5">
        <div className="page-inner">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="eyebrow text-primary">TARGET BUSINESS CLIENTELE</span>
            <h2 className="section-title text-white">Who AutoUp Supplies</h2>
            <p className="section-copy text-white/75 mx-auto">
              Our products are engineered to support commercial automotive facilities and high-volume vehicle
              cleaning operations across diverse business sectors.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHO_WE_SUPPLY.map(({ title, desc, icon: Icon }, idx) => (
              <Reveal key={title} delay={idx * 60}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-primary/40 hover:bg-white/[0.07] transition-all">
                  <div className="size-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bulk and Wholesale Inquiries */}
      <section className="page-band bg-background border-b border-border/60">
        <div className="page-inner">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal className="rounded-3xl border border-border/80 bg-card p-8 sm:p-10 shadow-sm">
              <span className="eyebrow text-primary">ORDERING PROCESS</span>
              <h2 className="section-title">Bulk and Wholesale Inquiries</h2>
              <p className="section-copy">
                We make commercial chemical procurement straightforward, fast, and transparent. Learn how
                businesses contact AutoUp for product availability, container volumes, and pricing.
              </p>

              <div className="mt-8 space-y-6">
                {WHOLESALE_STEPS.map((s) => (
                  <div key={s.step} className="flex gap-4 items-start">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/30 font-mono text-sm font-bold text-primary">
                      {s.step}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/quote">Request a Wholesale Quote</Link>
                </Button>
                <Button asChild variant="line" size="lg">
                  <a
                    href={whatsappUrl(
                      "Hello AutoUp, I would like to inquire about bulk wholesale purchasing for automotive cleaning products.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal className="space-y-6">
              <div className="rounded-2xl border border-border/80 bg-card/60 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                  <h3 className="font-semibold text-foreground">Verified Container Sizing</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every product is supplied in manufacturer-verified commercial capacities (20L, 25L, 20KG)
                  matching industrial handling requirements.
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/60 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                  <h3 className="font-semibold text-foreground">Flexible Order Volumes</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Whether requesting initial product test samples or scheduled pallet deliveries for multi-bay
                  chains, we tailor supply arrangements to your operational scale.
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/60 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="size-5 text-primary shrink-0" />
                  <h3 className="font-semibold text-foreground">Accurate Label Data & Dilution Guidance</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Printed container instructions provide precise dilution ratios for high-pressure spray
                  pumps, foam lances, and manual wash buckets.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. About AutoUp */}
      <section className="section-dark page-band bg-[#07090e] border-b border-white/5">
        <div className="page-inner">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <span className="eyebrow text-primary">COMPANY OVERVIEW</span>
              <h2 className="section-title text-white">About AutoUp</h2>
              <p className="section-copy text-white/80">
                AutoUp is a specialized B2B supplier of automotive cleaning products, concentrated
                detergents, and vehicle maintenance chemistry.
              </p>
              <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
                <p className="text-sm text-white/90 leading-relaxed">
                  <strong className="text-primary font-bold">Important Note:</strong> AutoUp sells and
                  supplies automotive cleaning products exclusively. We do NOT provide car washing, vehicle
                  detailing, polishing, or mobile cleaning services to consumers.
                </p>
              </div>
              <p className="mt-5 text-xs text-white/70 leading-relaxed">
                By focusing strictly on product chemistry and wholesale supply, we ensure commercial buyers
                receive reliable stock, authentic LifeLines packaging, and verified chemical specifications.
              </p>

              <div className="mt-8 flex gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/about">Read More About Us</Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link to="/contact">Contact Commercial Team</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal className="overflow-hidden rounded-2xl border border-white/10 shadow-xl">
              <img
                src={photo("editorial-2")}
                alt="Professional automotive cleaning products and commercial care"
                width={720}
                height={580}
                loading="lazy"
                className="aspect-[5/4] w-full object-cover brightness-[0.8] contrast-[1.1]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions */}
      <section className="page-band bg-background border-b border-border/60">
        <div className="mx-auto max-w-3xl px-5 py-8">
          <Reveal className="text-center">
            <span className="eyebrow text-primary">QUESTIONS & ANSWERS</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-copy mx-auto">
              Answers regarding our commercial product inventory, container sizes, and B2B ordering
              procedures.
            </p>
          </Reveal>

          <Accordion type="single" collapsible className="mt-10">
            {B2B_FAQ.map(([q = "", a]) => (
              <AccordionItem key={q} value={q} className="border-border/80">
                <AccordionTrigger className="py-5 text-base font-semibold hover:text-primary transition-colors text-left text-foreground">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-5">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 10. Final CTA Banner */}
      <section className="section-dark relative overflow-hidden py-24 sm:py-32">
        <img
          src={photo("detail-4")}
          alt="Automotive product supply for businesses"
          width={1920}
          height={1080}
          loading="lazy"
          className="absolute inset-0 size-full object-cover brightness-[0.4] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60" />

        <Reveal className="page-inner relative">
          <span className="eyebrow text-primary">COMMERCIAL VEHICLE CARE</span>
          <h2 className="section-title max-w-2xl text-white">
            Looking for Automotive Cleaning Products for Your Business?
          </h2>
          <p className="section-copy max-w-xl text-white/80">
            Discover automotive cleaning products for professional use. Explore our product range and contact
            our team for business inquiries, bulk purchasing, and supply information.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              variant="hero"
              size="xl"
              className="shadow-[0_0_25px_-5px_var(--electric)] font-semibold"
            >
              <Link to="/quote">
                Request a Quote <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="glass"
              size="xl"
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/40 text-emerald-300 font-semibold"
            >
              <a
                href={whatsappUrl(
                  "Hello AutoUp, I am interested in your automotive cleaning products for business use. Please share product availability and pricing information.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4 mr-2" />
                Contact on WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* 11. Footer (Rendered globally via __root.tsx) */}
    </div>
  );
}
