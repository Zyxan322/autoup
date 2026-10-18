import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Droplets, Sparkles, ShieldCheck, Layers, MessageCircle, ShoppingBag, SlidersHorizontal } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { BeforeAfter } from '@/components/BeforeAfter';
import { HomeServices } from '@/components/HomeServices';
import { AutoGallery } from '@/components/AutoGallery';
import { photo } from '@/lib/media';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoUp — Premium Car Care Products & Essentials" },
      { name: "description", content: "Car shampoo, wax, cleaning chemicals and complete car-care essentials from AutoUp. Request a quotation on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "AutoUp — Premium Car Care Products" },
      { property: "og:description", content: "Bring out your car's best with premium car-care essentials from AutoUp." },
    ],
  }),
  component: Index,
});

type To = "/products" | "/services" | "/quote" | "/contact";
type Slide = { img: string; eyebrow: string; title: string; text: string; a: [string, To]; b: [string, To] };
const SLIDES: Slide[] = [
  { img: hero1, eyebrow: "Premium Automotive Care", title: "Bring Out Your Car's Best.", text: "Premium car-care essentials for a cleaner finish, deeper shine and better vehicle maintenance.", a: ["Explore Products", "/products"], b: ["Discover Our Services", "/services"] },
  { img: hero2, eyebrow: "Clean. Shine. Protect.", title: "Every Detail. Every Drive.", text: "Discover the essentials that help keep your vehicle looking its best.", a: ["Shop Car Care", "/products"], b: ["Get a Quote", "/quote"] },
  { img: hero3, eyebrow: "Your Car Deserves More", title: "Make Every Finish Count.", text: "From cleaning shampoos to protective waxes, find the right products for your car-care routine.", a: ["View Products", "/products"], b: ["Contact Us", "/contact"] },
  { img: hero4, eyebrow: "Care in Every Mile", title: "Shine That Turns Heads.", text: "Everything you need to keep your car clean, glossy and well-maintained — all in one place.", a: ["Browse Collection", "/products"], b: ["Request a Quote", "/quote"] },
];

function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 38,
  });
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setI(emblaApi.selectedScrollSnap());
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
    }, 6000);
    return () => clearInterval(timer);
  }, [emblaApi, paused]);

  const user = (n: number) => {
    setPaused(true);
    emblaApi?.scrollTo(n);
  };

  const slide = SLIDES[i] ?? SLIDES[0];
  if (!slide) return null;

  return (
    <section
      className="section-dark relative h-[96svh] min-h-[620px] overflow-hidden select-none"
      aria-roledescription="carousel"
      onPointerDown={() => setPaused(true)}
    >
      {/* Sliding Embla Viewport for smooth animated transitions */}
      <div ref={emblaRef} className="h-full w-full overflow-hidden">
        <div className="flex h-full w-full">
          {SLIDES.map((s, n) => (
            <div
              key={n}
              className="relative h-full w-full flex-[0_0_100%] min-w-0 overflow-hidden"
              aria-hidden={n !== i}
            >
              <img
                src={s.img}
                alt=""
                width={1920}
                height={1088}
                loading={n === 0 ? "eager" : "lazy"}
                fetchPriority={n === 0 ? "high" : "auto"}
                className={cn(
                  "size-full object-cover brightness-[1.08] contrast-[1.06] saturate-[1.12] transition-transform duration-[6500ms] ease-out",
                  n === i ? "scale-105" : "scale-100"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prominent Overlay (subtle so cars shine through with high prominence) */}
      <div className="absolute inset-0 bg-hero-overlay pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-fade-bottom pointer-events-none" />

      {/* Editorial Content — Left Aligned, Premium Automotive Typography & CTAs */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center pt-16">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <div
            key={i}
            className="pointer-events-auto flex max-w-2xl lg:max-w-2xl xl:max-w-3xl flex-col items-start text-left animate-in fade-in slide-in-from-bottom-8 duration-700"
          >
            {/* Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-md shadow-[0_0_15px_rgba(22,119,255,0.2)]">
              <span className="size-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--electric)]" />
              {slide.eyebrow}
            </div>

            {/* Heading */}
            <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {slide.text}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Button
                asChild
                variant="hero"
                size="xl"
                className="group relative overflow-hidden shadow-[0_0_28px_rgba(22,119,255,0.65)] hover:shadow-[0_0_36px_rgba(22,119,255,0.9)] transition-all duration-300 font-semibold"
              >
                <Link to={slide.a[1]}>
                  {slide.a[0]}
                  <ArrowRight className="size-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="glass"
                size="xl"
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 shadow-lg font-medium transition-all duration-300"
              >
                <Link to={slide.b[1]}>{slide.b[0]}</Link>
              </Button>
            </div>

            {/* Micro Trust Features */}
            <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-white/75 drop-shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary shrink-0" />
                <span>100% Paint-Safe Formulas</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary shrink-0" />
                <span>Showroom Finish & Gloss</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Indicators — Positioned bottom right for visual balance with left text */}
      <div className="absolute bottom-9 right-5 lg:right-8 flex items-center gap-2 z-20 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
        {SLIDES.map((_, n) => (
          <button
            key={n}
            type="button"
            aria-label={`Go to slide ${n + 1}`}
            aria-pressed={n === i}
            onClick={() => user(n)}
            className="group p-1 cursor-pointer focus:outline-none"
          >
            <span
              className={cn(
                "block h-1.5 transition-all duration-500 rounded-full",
                n === i
                  ? "w-8 bg-primary shadow-[0_0_12px_var(--electric)]"
                  : "w-2.5 bg-white/40 hover:bg-white/80"
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

const CATS = [
  { title: "Exterior Cleaning", cat: "Exterior Cleaners", image: "editorial-10" },
  { title: "Interior Cleaning", cat: "Interior Cleaners", image: "detail-1" },
  { title: "Paint Shine", cat: "Car Wax & Polish", image: "editorial-12" },
  { title: "Protective Wax", cat: "Car Wax & Polish", image: "detail-2" },
  { title: "Complete Car-Care Kits", cat: "All Products", image: "editorial-11" },
];

const FAQ = [
  ["Which car-care products does AutoUp offer?", "Explore shampoos, cleaning chemicals, paste wax, exterior cleaners, interior care conditioners and microfiber detailing accessories in our current collection."],
  ["How do I choose the right car shampoo?", "Our Foam Car Shampoo is pH-neutral and safe for all finishes including waxes, sealants and ceramic coatings. Dilute according to instructions for regular bucket or foam cannon washing."],
  ["How can I request a product quotation?", "Add your desired products and quantities to your cart, click 'Get a Quote', enter your vehicle and contact details, and send the formatted request directly via WhatsApp."],
  ["Can I request a quotation for multiple products and custom sizes?", "Yes. Your quotation automatically itemizes all products, selected container sizes, and quantities from your cart for fast WhatsApp confirmation."],
  ["How do I contact AutoUp through WhatsApp?", "Click any 'WhatsApp us' or 'Request Quote' button across the site to instantly start a direct conversation with our detailing specialists."],
  ["Are product prices verified online?", "All prices and bulk trade discounts are confirmed promptly in your quotation so you receive accurate real-time pricing and stock confirmation."],
];

function Index() {
  return (
    <>
      {/* 1. Hero Carousel */}
      <Hero />

      {/* 2. Brand Introduction (LIGHT BACKGROUND) */}
      <section className="page-band bg-background">
        <div className="page-inner grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-2xl border border-border shadow-xl">
            <img
              src={photo("editorial-1")}
              alt="Silver classic coupe parked on scenic coastal highway"
              width={720}
              height={580}
              loading="lazy"
              className="aspect-[5/4] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-black/70 backdrop-blur-md border border-white/10 px-4 py-1.5 text-xs font-semibold text-white">
              <span className="text-primary mr-1.5">●</span> Surface-Safe Technology
            </div>
          </Reveal>

          <Reveal>
            <p className="eyebrow">THE AUTOUP DIFFERENCE</p>
            <h2 className="section-title">More Than Clean. It's a Better Kind of Shine.</h2>
            <p className="section-copy">
              Discover car-care essentials designed to help you maintain a showroom exterior, a fresh interior and deep surface protection that lasts on every mile.
            </p>

            <div className="my-8 grid grid-cols-3 gap-4">
              {[
                [Droplets, "Clean", "Lifts stubborn road grime safely"],
                [Sparkles, "Shine", "Deep wet-look reflection"],
                [ShieldCheck, "Protect", "Hydrophobic surface barrier"],
              ].map(([Icon, label, desc]) => {
                const I = Icon as typeof Droplets;
                return (
                  <div key={String(label)} className="rounded-xl border border-border/80 bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm">
                    <I className="size-6 text-primary mb-2" />
                    <h3 className="text-sm font-semibold text-foreground">{String(label)}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-normal">{String(desc)}</p>
                  </div>
                );
              })}
            </div>

            <Button asChild variant="line" size="lg">
              <Link to="/products">
                Explore Products <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 3. Interactive Before & After Transformation (DARK BACKGROUND) */}
      <section className="section-dark page-band bg-[#090b10] border-y border-white/5">
        <div className="page-inner">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">SEE THE TRANSFORMATION</p>
            <h2 className="section-title">See the Difference. Feel the Finish.</h2>
            <p className="section-copy">
              Drag the interactive divider to witness the dramatic transformation that thoughtful automotive care makes on road film, brake fallout, and surface clarity.
            </p>
          </Reveal>
          <Reveal>
            <BeforeAfter />
          </Reveal>
        </div>
      </section>

      {/* 4. Compact 5-Column Services Grid (LIGHT BACKGROUND) */}
      <HomeServices />

      {/* 5. Featured Products (DARK BACKGROUND) */}
      <section className="section-dark page-band bg-[#0c0f16] border-y border-white/5">
        <div className="page-inner">
          <Reveal>
            <p className="eyebrow">CURATED COLLECTION</p>
            <h2 className="section-title max-w-2xl">The Essentials Behind a Brilliant Finish.</h2>
            <p className="section-copy">
              Hand-picked bestsellers ready to add directly to your vehicle care regimen.
            </p>
          </Reveal>

          <div className="card-grid-5 mt-10">
            {PRODUCTS.slice(0, 5).map((p, n) => (
              <Reveal key={p.slug} delay={n * 60}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/products">
                Shop All Products <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Automotive Care Categories (LIGHT BACKGROUND) */}
      <section className="page-band bg-background">
        <div className="page-inner">
          <Reveal>
            <p className="eyebrow">SURFACE CATEGORIES</p>
            <h2 className="section-title">Care From Every Angle.</h2>
            <p className="section-copy">
              Browse tailored solutions organized by vehicle surface to achieve maximum optical clarity and longevity.
            </p>
          </Reveal>

          <div className="category-grid mt-10">
            {CATS.map((c, n) => (
              <Reveal key={c.title} className={`category-item category-item-${n}`}>
                <Link
                  to="/products"
                  search={{ cat: c.cat === "All Products" ? undefined : c.cat }}
                  className="section-dark group relative block h-full overflow-hidden rounded-xl border border-white/10 shadow-lg"
                >
                  <img
                    src={photo(c.image)}
                    alt={c.title}
                    width={560}
                    height={400}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[0.65rem] font-bold uppercase tracking-wider text-primary">Category</span>
                      <h3 className="text-xl font-semibold text-white tracking-tight">{c.title}</h3>
                    </div>
                    <div className="grid size-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ArrowRight className="size-4" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Three-Step Care Routine (DARK BACKGROUND) */}
      <section className="section-dark page-band bg-[#0a0d14] border-y border-white/5">
        <div className="page-inner">
          <Reveal>
            <p className="eyebrow">THE AUTOUP SYSTEM</p>
            <h2 className="section-title">A Simple Routine. A Better Finish.</h2>
            <p className="section-copy">
              Follow our three-stage care methodology to clean without scratching, bring out deep gloss, and lock in long-term protection.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              ["Clean", "Dissolve traffic film, bug splatter and brake dust safely with pH-neutral, high-lubricity foam shampoo.", "editorial-16"],
              ["Shine", "Revitalize paint depth, optical clarity and leather suppleness with specialized conditioners and glazes.", "detail-13"],
              ["Protect", "Seal clear coat with hydrophobic carnauba and synthetic barriers that repel water, dust and UV rays.", "detail-15"],
            ].map(([title, text, img], n) => (
              <Reveal key={title} delay={n * 100}>
                <article className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-primary/40 hover:-translate-y-1">
                  <div className="aspect-[16/10] overflow-hidden rounded-lg">
                    <img
                      src={photo(img ?? "")}
                      alt={title}
                      width={520}
                      height={340}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  </div>
                  <div className="mt-5 flex items-start gap-4">
                    <span className="font-display text-xl font-bold text-primary">0{n + 1}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why Choose AutoUp (LIGHT BACKGROUND) */}
      <section className="page-band bg-background">
        <div className="page-inner grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">WHY CHOOSE AUTOUP</p>
            <h2 className="section-title">Everything You Need to Care for Your Car.</h2>
            <p className="section-copy">
              We design premium detailing chemistry and vehicle maintenance essentials that provide professional results with zero compromise on surface safety.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                [Layers, "Focused Range", "Curated car-care essentials with no filler products."],
                [SlidersHorizontal, "Surface Safe", "Formulas tailored for clear coat, alloy wheels, glass & leather."],
                [ShoppingBag, "Fast Cart Selection", "Instant item review with size variants and quantity controls."],
                [MessageCircle, "Direct WhatsApp Quotes", "Get personalized recommendations and verified pricing."],
              ].map(([Icon, title, t]) => {
                const I = Icon as typeof Layers;
                return (
                  <div key={String(title)} className="rounded-xl border border-border/80 bg-card p-4 transition-all hover:border-primary/40">
                    <I className="mb-2.5 size-6 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">{String(title)}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{String(t)}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="overflow-hidden rounded-2xl border border-border shadow-xl">
            <img
              src={photo("detail-3")}
              alt="White modern sedan parked outside contemporary architecture"
              width={720}
              height={720}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </Reveal>
        </div>
      </section>

      {/* 9. Premium Automotive Image Gallery (DARK BACKGROUND) */}
      <AutoGallery />

      {/* 10. FAQ Accordion (LIGHT BACKGROUND) */}
      <section className="page-band bg-background">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="text-center">
            <p className="eyebrow">FREQUENT QUESTIONS</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-copy mx-auto">
              Everything you need to know about our products, surfaces, and instant WhatsApp quotations.
            </p>
          </Reveal>

          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map(([q = "", a]) => (
              <AccordionItem key={q} value={q} className="border-border/80">
                <AccordionTrigger className="py-5 text-base font-semibold hover:text-primary transition-colors text-left">
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

      {/* 11. Cinematic Final CTA Banner (DARK BACKGROUND) */}
      <section className="section-dark relative overflow-hidden py-28 sm:py-36">
        <img
          src={photo("detail-4")}
          alt="Blue sports coupe parked during golden hour sunset"
          width={1920}
          height={1080}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />

        <Reveal className="page-inner relative">
          <p className="eyebrow text-primary">CARE IN EVERY MILE</p>
          <h2 className="section-title max-w-2xl text-white">
            Ready to Elevate Your Car-Care Routine?
          </h2>
          <p className="section-copy max-w-xl text-white/80">
            Explore our curated catalog of automotive shampoos, waxes, and conditioning solutions, or request an immediate quotation on WhatsApp.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="hero" size="xl" className="shadow-[0_0_25px_-5px_var(--electric)]">
              <Link to="/products">
                Explore Products <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/quote">Request a Quote</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
