import { createFileRoute, Link } from "@tanstack/react-router";
import aboutHero from "@/assets/about-hero.jpg";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AutoUp — Better Care, Better Shine" },
      { name: "description", content: "AutoUp focuses on car-care essentials that help you clean, maintain and enhance the look of your vehicle." },
      { property: "og:title", content: "About AutoUp" },
      { property: "og:description", content: "Better care. Better shine. Better every day." },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  ["Our approach to vehicle care", "We believe great results come from the right products used the right way — simple routines that keep your car looking its best between every drive."],
  ["Product quality and selection", "We focus on essentials that matter: shampoos, waxes, cleaners and accessories chosen to cover your complete car-care routine."],
  ["Our commitment to customers", "Clear advice, honest quotations and quick replies on WhatsApp. Tell us what you need and we'll help you find the right fit."],
];

function AboutPage() {
  return (
    <>
      <PageHero image={aboutHero} eyebrow="About AutoUp" title="Better Care. Better Shine. Better Every Day." crumb="About" />

      <section className="mx-auto max-w-5xl px-5 py-24 lg:px-8">
        <Reveal>
          <p className="font-display text-2xl leading-relaxed sm:text-4xl">
            AutoUp focuses on car-care essentials and products that help customers <span className="text-primary">clean, maintain and enhance</span> the appearance of their vehicles.
          </p>
        </Reveal>
      </section>

      <section className="section-dark py-24 bg-[#090b10] border-y border-white/5">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-8">
          {PILLARS.map(([t, d], n) => (
            <Reveal key={t} delay={n * 100}>
              <div className="h-full rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-primary/40 hover:shadow-[0_0_20px_-3px_rgba(22,119,255,0.25)]">
                <p className="font-display text-sm font-bold text-primary">0{n + 1}</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{t}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <Reveal className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">Ready to give your car more?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl"><Link to="/products">Explore Products</Link></Button>
            <Button asChild variant="line" size="xl"><Link to="/quote">Request a Quotation</Link></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
