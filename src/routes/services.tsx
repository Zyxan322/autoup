import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/lib/catalog";
import { photo } from "@/lib/media";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Car-Care Categories — AutoUp" },
      { name: "description", content: "Explore AutoUp car-care categories: shampoos, waxes, cleaning chemicals, interior and exterior care, and complete kits." },
      { property: "og:title", content: "Services & Car-Care Categories — AutoUp" },
      { property: "og:description", content: "Everything your car needs to shine. Book now or request a quote." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        image={photo("editorial-2")}
        eyebrow="What We Offer"
        title="Everything Your Car Needs to Shine."
        crumb="Services"
      >
        A complete range of car-care essentials — choose a category and book it straight into your quotation.
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="card-grid-5">
          {SERVICES.map((s, n) => (
            <Reveal key={s.slug} delay={(n % 5) * 60}>
              <ServiceCard s={s} index={n} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section-dark py-20">
        <Reveal className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">Not sure what you need?</h2>
          <p className="mt-4 text-muted-foreground">Tell us about your car and we'll recommend the right products.</p>
          <Button asChild variant="hero" size="xl" className="mt-8"><Link to="/quote">Get a Quote</Link></Button>
        </Reveal>
      </section>
    </>
  );
}
