import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Layers, Sparkles, X } from "lucide-react";
import galleryHero from "@/assets/detail-14.jpg";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { photo } from "@/lib/media";
import { PRODUCTS } from "@/lib/catalog";
import hero1 from "@/assets/Hero1.jpg";
import hero2 from "@/assets/Hero2.jpg";
import { useLocale, translateText } from "@/lib/i18n";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Visual Showcase & Gallery — AutoUp Automotive Care" },
      {
        name: "description",
        content:
          "Explore the AutoUp visual gallery: premium vehicle finishes, commercial product packaging, detailing craft, and surface protection transformations.",
      },
      { property: "og:title", content: "AutoUp Visual Gallery & Showcase" },
      {
        property: "og:description",
        content:
          "A rich visual collection of high-gloss automotive finishes, commercial wash results, and LifeLines products.",
      },
    ],
  }),
  component: GalleryPage,
});

type GalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  category: "Vehicles" | "Products" | "Details" | "Craft";
  image: string;
  aspect?: "tall" | "wide" | "square";
};

// Comprehensive inventory of all showcase assets
const GALLERY_ITEMS: GalleryItem[] = [
  // Flagship Hero Assets
  {
    id: "hero-1",
    title: "Commercial High-Throughput Wash",
    subtitle: "High-dilution foam shampoo and paint preservation",
    category: "Vehicles",
    image: hero1,
    aspect: "wide",
  },
  {
    id: "hero-2",
    title: "Precision Surface Glaze & Shine",
    subtitle: "Showroom mirror finish on deep metallic paint",
    category: "Vehicles",
    image: hero2,
    aspect: "wide",
  },

  // Real Product Containers
  ...PRODUCTS.map((p) => ({
    id: `prod-${p.slug}`,
    title: p.name,
    subtitle: `${p.variants[0]} Commercial Packaging · ${p.category}`,
    category: "Products" as const,
    image: p.image,
    aspect: "tall" as const,
  })),

  // Editorial Vehicle Showcases
  {
    id: "ed-1",
    title: "Silver Classic Coupe",
    subtitle: "Clear-coat surface protection on coastal highway",
    category: "Vehicles",
    image: photo("editorial-1"),
    aspect: "wide",
  },
  {
    id: "ed-2",
    title: "Sports Coupe Golden Hour",
    subtitle: "Hydrophobic water beading and deep gloss reflection",
    category: "Vehicles",
    image: photo("editorial-2"),
    aspect: "square",
  },
  {
    id: "ed-3",
    title: "Contemporary Luxury Coupe",
    subtitle: "Swirl-free paint finish with high-gloss luster",
    category: "Vehicles",
    image: photo("editorial-3"),
    aspect: "tall",
  },
  {
    id: "ed-4",
    title: "Modern German Sports Sedan",
    subtitle: "Pre-wash foam treated and spotless rinse",
    category: "Vehicles",
    image: photo("editorial-4"),
    aspect: "wide",
  },
  {
    id: "ed-5",
    title: "Deep Emerald Exotic Coupe",
    subtitle: "Advanced wax sealant and optical clarity",
    category: "Vehicles",
    image: photo("editorial-5"),
    aspect: "tall",
  },
  {
    id: "ed-6",
    title: "Midnight Sports Car Trackside",
    subtitle: "Brake fallout and road grime decontamination",
    category: "Vehicles",
    image: photo("editorial-6"),
    aspect: "square",
  },
  {
    id: "ed-7",
    title: "Luxury Flagship Sedan",
    subtitle: "Hand-finished paintwork with long-lasting barrier",
    category: "Vehicles",
    image: photo("editorial-7"),
    aspect: "wide",
  },
  {
    id: "ed-8",
    title: "Matte & Gloss Body Panels",
    subtitle: "Safe pH-neutral cleansing for specialized coatings",
    category: "Vehicles",
    image: photo("editorial-8"),
    aspect: "tall",
  },
  {
    id: "ed-9",
    title: "Classic European Roadster",
    subtitle: "Preserved vintage lacquer and chrome trim shine",
    category: "Vehicles",
    image: photo("editorial-9"),
    aspect: "square",
  },
  {
    id: "ed-10",
    title: "White Precision Track Coupe",
    subtitle: "Exterior foam wash with zero micro-scratching",
    category: "Vehicles",
    image: photo("editorial-10"),
    aspect: "wide",
  },
  {
    id: "ed-11",
    title: "Hypercar Aerodynamic Surfaces",
    subtitle: "Carbon fiber glaze and high-speed road protection",
    category: "Vehicles",
    image: photo("editorial-11"),
    aspect: "tall",
  },
  {
    id: "ed-12",
    title: "Monochrome Studio Showcase",
    subtitle: "Controlled lighting highlighting flawless reflection",
    category: "Vehicles",
    image: photo("editorial-12"),
    aspect: "wide",
  },
  {
    id: "ed-13",
    title: "Burgundy Classic Coupe",
    subtitle: "Showroom presence and rich depth of paintwork",
    category: "Vehicles",
    image: photo("editorial-13"),
    aspect: "square",
  },
  {
    id: "ed-14",
    title: "Silver Modern SUV",
    subtitle: "All-weather paint sealant against desert sun and dust",
    category: "Vehicles",
    image: photo("editorial-14"),
    aspect: "wide",
  },
  {
    id: "ed-15",
    title: "Saddle Leather Interior",
    subtitle: "Conditioned with ChemX D2 vinyl and trim polish",
    category: "Details",
    image: photo("editorial-15"),
    aspect: "square",
  },
  {
    id: "ed-16",
    title: "Performance Wheel & Caliper",
    subtitle: "ChemX C2 chemical degreaser removing baked brake dust",
    category: "Details",
    image: photo("editorial-16"),
    aspect: "tall",
  },

  // Macro Details & Detailing Craft
  {
    id: "dt-1",
    title: "Dashboard & Console Restoration",
    subtitle: "Non-greasy UV protective satin sheen",
    category: "Details",
    image: photo("detail-1"),
    aspect: "tall",
  },
  {
    id: "dt-2",
    title: "Paint Reflection Inspection",
    subtitle: "F55 final touch wax delivering hologram-free finish",
    category: "Craft",
    image: photo("detail-2"),
    aspect: "square",
  },
  {
    id: "dt-3",
    title: "Exterior Clean Bodywork",
    subtitle: "Streak-free rinse with G4 glass and body finish",
    category: "Craft",
    image: photo("detail-3"),
    aspect: "wide",
  },
  {
    id: "dt-4",
    title: "Sunset Golden Reflections",
    subtitle: "Enduring surface protection across road trips",
    category: "Vehicles",
    image: photo("detail-4"),
    aspect: "wide",
  },
  {
    id: "dt-5",
    title: "Water Droplet Beading",
    subtitle: "Hydrophobic surface tension from synthetic wax barriers",
    category: "Craft",
    image: photo("detail-5"),
    aspect: "square",
  },
  {
    id: "dt-6",
    title: "Alloy Rim Detail",
    subtitle: "O2 solvent polish applied for deep wet-look tire rubber",
    category: "Details",
    image: photo("detail-6"),
    aspect: "tall",
  },
  {
    id: "dt-7",
    title: "Exhaust & Diffuser Cleanse",
    subtitle: "Specialized carbon and soot dissolution chemistry",
    category: "Details",
    image: photo("detail-7"),
    aspect: "square",
  },
  {
    id: "dt-8",
    title: "Front Grille & Badge Preparation",
    subtitle: "Intricate cleaning with high-lubricity foam",
    category: "Craft",
    image: photo("detail-8"),
    aspect: "tall",
  },
  {
    id: "dt-9",
    title: "Crystal Clear Windshield",
    subtitle: "Ammonia-free G4 formula ensuring zero night glare",
    category: "Details",
    image: photo("detail-9"),
    aspect: "wide",
  },
  {
    id: "dt-10",
    title: "Ergonomic Interior Architecture",
    subtitle: "Supple, dust-resistant finish across cockpit surfaces",
    category: "Details",
    image: photo("detail-10"),
    aspect: "square",
  },
  {
    id: "dt-11",
    title: "Violet Sports Coupe",
    subtitle: "Dramatic wet-look reflection under ambient lights",
    category: "Vehicles",
    image: photo("detail-11"),
    aspect: "wide",
  },
  {
    id: "dt-12",
    title: "Workshop Service Bay",
    subtitle: "Commercial auto wash equipment and chemical supply",
    category: "Craft",
    image: photo("detail-12"),
    aspect: "square",
  },
  {
    id: "dt-13",
    title: "Microfiber Buffing & Finish",
    subtitle: "Final touch inspection before vehicle handover",
    category: "Craft",
    image: photo("detail-13"),
    aspect: "tall",
  },
  {
    id: "dt-14",
    title: "Teal Sports Car Coastal View",
    subtitle: "Protected against coastal sea salt, UV, and heat",
    category: "Vehicles",
    image: photo("detail-14"),
    aspect: "wide",
  },
  {
    id: "dt-15",
    title: "Engine Bay Cleanse",
    subtitle: "ChemX C2 all-purpose degreaser on mechanical assemblies",
    category: "Details",
    image: photo("detail-15"),
    aspect: "square",
  },
  {
    id: "dt-16",
    title: "Hydrophobic Hood Dispersion",
    subtitle: "Instant sheet displacement preventing mineral water spots",
    category: "Craft",
    image: photo("detail-16"),
    aspect: "tall",
  },
];

export const DISPLAY_GALLERY_ITEMS = GALLERY_ITEMS.filter((item) =>
  ["hero-1", "hero-2", "ed-15", "ed-16", "dt-2", "dt-3", "dt-13", "dt-15"].includes(item.id),
);
const CATEGORY_TABS = ["All Images", "Vehicles", "Details", "Craft"] as const;

function GalleryPage() {
  const { locale } = useLocale();
  const [tab, setTab] = useState<(typeof CATEGORY_TABS)[number]>("All Images");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (tab === "All Images") return DISPLAY_GALLERY_ITEMS;
    return DISPLAY_GALLERY_ITEMS.filter((item) => item.category === tab);
  }, [tab]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      <PageHero
        image={galleryHero}
        eyebrow="Visual Portfolio"
        title="Automotive Care & Product Gallery"
        crumb="Gallery"
      >
        Explore our curated visual showcase of vehicle finishes, commercial product packaging,
        surface restoration, and professional car wash results.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-14">
        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setLightboxIndex(null);
                }}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-250 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer ${
                  tab === t
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(22,119,255,0.4)]"
                    : "border border-input bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {translateText(t, locale)}{" "}
                {t === "All Images"
                  ? `(${DISPLAY_GALLERY_ITEMS.length})`
                  : `(${DISPLAY_GALLERY_ITEMS.filter((i) => i.category === t).length})`}
              </button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" />
            {locale === "ar"
              ? `يعرض المعرض ${filtered.length} صور`
              : `Showing ${filtered.length} gallery assets`}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, idx) => (
            <Reveal key={item.id} delay={(idx % 6) * 40} className="h-full">
              <article
                onClick={() => setLightboxIndex(idx)}
                className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#090b11] shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_12px_32px_rgba(22,119,255,0.3)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={translateText(item.title, locale)}
                    loading="lazy"
                    className="size-full object-cover brightness-[0.9] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Scrim on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="rounded-full bg-black/75 border border-white/15 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {translateText(item.category, locale)}
                    </span>
                  </div>

                  {/* Hover Quick Zoom Icon */}
                  <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <Eye className="size-4" />
                  </div>

                  {/* Bottom Text Content revealed / translated on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300">
                    <h3 className="font-display text-base font-bold text-white tracking-tight leading-snug drop-shadow-md">
                      {translateText(item.title, locale)}
                    </h3>
                    <p className="mt-1 text-xs text-white/80 line-clamp-2 leading-relaxed">
                      {translateText(item.subtitle, locale)}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox Dialog Modal */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) setLightboxIndex(null);
        }}
      >
        {activeItem && (
          <DialogContent className="section-dark w-[calc(100%-2rem)] max-w-5xl rounded-3xl border border-white/15 bg-black/95 p-6 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {translateText(activeItem.title, locale)}
                </DialogTitle>
                <DialogDescription className="mt-0.5 text-xs sm:text-sm text-white/70">
                  {translateText(activeItem.subtitle, locale)} ·{" "}
                  {locale === "ar" ? "الفئة:" : "Category:"}{" "}
                  <span className="text-primary font-semibold">
                    {translateText(activeItem.category, locale)}
                  </span>
                </DialogDescription>
              </div>
            </div>

            {/* Lightbox Media Frame */}
            <div className="relative mt-4 flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-950/80 p-2 border border-white/10 max-h-[70vh]">
              <img
                src={activeItem.image}
                alt={translateText(activeItem.title, locale)}
                className="max-h-[66vh] max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Controls Bar */}
            <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null ? (prev + filtered.length - 1) % filtered.length : 0,
                  )
                }
                className="border-white/20 text-white hover:bg-white/10 hover:text-primary cursor-pointer"
              >
                <ChevronLeft className="size-4 mr-1" />
                Previous
              </Button>

              <span className="text-xs font-semibold text-muted-foreground font-mono">
                {(lightboxIndex ?? 0) + 1} / {filtered.length}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null ? (prev + 1) % filtered.length : 0,
                  )
                }
                className="border-white/20 text-white hover:bg-white/10 hover:text-primary cursor-pointer"
              >
                Next
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Bottom CTA Banner */}
      <section className="section-dark py-20 bg-[#07090e] border-t border-white/5">
        <Reveal className="mx-auto max-w-3xl px-5 text-center">
          <span className="eyebrow text-primary">COMMERCIAL SUPPLY</span>
          <h2 className="section-title text-white">
            Interested in the Products Behind These Finishes?
          </h2>
          <p className="section-copy text-white/75 mx-auto max-w-xl">
            Explore our complete collection of commercial automotive shampoos, waxes, and chemicals, or
            request wholesale quotations directly for your facility.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/products">
                Explore Products Catalog <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/quote">Request a Wholesale Quote</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
