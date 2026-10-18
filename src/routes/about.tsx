import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building, CheckCircle, Package, ShieldCheck, Truck } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AutoUp — B2B Automotive Cleaning Products Supplier" },
      {
        name: "description",
        content:
          "AutoUp is a dedicated B2B supplier of professional automotive cleaning products, concentrated shampoos, waxes, and chemicals for commercial vehicle cleaning operations.",
      },
      { property: "og:title", content: "About AutoUp — Commercial Automotive Cleaning Supply" },
      {
        property: "og:description",
        content:
          "Supplying car washes, detailing studios, automotive dealerships, workshops, and fleet operators with commercial cleaning chemicals.",
      },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    icon: Package,
    title: "Commercial-Grade Product Range",
    description:
      "We supply concentrated car shampoos, pre-wash chemicals, tire and dashboard polishes, glass cleaners, and finishing waxes formulated for heavy-duty commercial usage.",
  },
  {
    icon: Building,
    title: "Dedicated B2B Supply Focus",
    description:
      "AutoUp exclusively serves commercial businesses: car washes, detailing businesses, dealerships, workshops, distributors, and fleet operators requiring reliable bulk supply.",
  },
  {
    icon: Truck,
    title: "Transparent Inquiries & Direct Service",
    description:
      "Direct communication on WhatsApp and phone for bulk orders, custom container requirements, stock availability, and verified wholesale pricing.",
  },
];

const INDUSTRIES = [
  "Car wash businesses (automatic & manual systems)",
  "Automotive detailing & paint correction centers",
  "Automotive dealerships & showroom prep teams",
  "Automotive service centers & mechanic workshops",
  "Commercial transport fleets & logistics operators",
  "Regional automotive product distributors & resellers",
];

function AboutPage() {
  return (
    <>
      <PageHero
        image={aboutHero}
        eyebrow="About AutoUp"
        title="Professional Automotive Cleaning Supply for Businesses."
        crumb="About Us"
      >
        AutoUp specializes in the wholesale supply of automotive cleaning chemicals and concentrates
        engineered for professional vehicle maintenance and commercial wash facilities.
      </PageHero>

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-border/80 bg-card/60 p-8 sm:p-12 shadow-sm">
            <span className="eyebrow text-primary">OUR BUSINESS IDENTITY</span>
            <h2 className="mt-2 text-2xl font-bold sm:text-4xl text-foreground leading-snug">
              A Dedicated Automotive Chemical & Wash Products Partner
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
              AutoUp is a product supplier — we do not offer car washing, vehicle detailing, or mobile cleaning
              services to individual consumers. Instead, we equip commercial operators with the professional
              chemical formulations, bulk shampoo concentrates, surface glazes, and protective solutions
              they need to run high-efficiency, premium-finish cleaning operations.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Pillars */}
      <section className="section-dark py-20 bg-[#090b10] border-y border-white/5">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-8">
          {PILLARS.map(({ icon: Icon, title, description }, n) => (
            <Reveal key={title} delay={n * 100}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-primary/40 hover:shadow-[0_0_24px_-4px_rgba(22,119,255,0.25)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-primary">0{n + 1}</span>
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who We Supply section on About */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <span className="eyebrow">COMMERCIAL PARTNERSHIPS</span>
            <h2 className="section-title">Who AutoUp Supplies</h2>
            <p className="section-copy">
              Our products are trusted by businesses that demand consistent cleaning performance, high
              dilution yields, and surface safety across hundreds of vehicles each week.
            </p>
            <ul className="mt-6 space-y-3">
              {INDUSTRIES.map((ind) => (
                <li key={ind} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <CheckCircle className="size-4 text-primary shrink-0" />
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-2xl border border-border bg-card p-8">
            <ShieldCheck className="size-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground">Bulk Inquiries & Packaging</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              All core formulas are packaged in high-capacity containers (20L, 25L, 20KG) to optimize
              shipping, storage, and per-liter dilution economics. Contact our commercial team to request
              custom quotes and logistics details for your facility.
            </p>
            <div className="mt-6">
              <Button asChild variant="hero" size="lg">
                <Link to="/quote">
                  Request a Wholesale Quote <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-dark py-20 bg-[#07090e] border-t border-white/5">
        <Reveal className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-bold sm:text-5xl text-white">
            Looking for Automotive Cleaning Products for Your Business?
          </h2>
          <p className="mt-4 text-base text-white/80 max-w-xl mx-auto">
            Explore our product range and contact our commercial team for business inquiries, bulk
            purchasing, and supply information.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/products">Explore Our Products</Link>
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
