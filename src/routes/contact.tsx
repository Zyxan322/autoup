import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Clock, Globe, MapPin, Phone } from "lucide-react";
import contactHero from "@/assets/contact-hero.webp";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE, whatsappUrl } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AutoUp — B2B Wholesale Automotive Cleaning Products" },
      {
        name: "description",
        content:
          "Contact AutoUp for wholesale automotive cleaning products, bulk purchasing, product availability, and commercial supply quotes.",
      },
      { property: "og:title", content: "Contact AutoUp — Commercial Supply Inquiries" },
      {
        property: "og:description",
        content:
          "Connect with AutoUp on WhatsApp or phone for business inquiries, commercial container pricing, and wholesale supply terms.",
      },
    ],
  }),
  component: ContactPage,
});

const FAQ = [
  [
    "How can my business request wholesale pricing and quotations?",
    "You can submit a wholesale quote request through our website, or contact us directly on WhatsApp with your required products, container sizes, and estimated order volumes. Our team provides fast, itemized commercial quotations.",
  ],
  [
    "What container sizes are available for commercial purchasing?",
    "Our products are packaged in high-yield commercial volumes, including 20-litre and 25-litre drums as well as 20-kilogram containers for pre-wash concentrates and polishes, optimized for high-volume business usage.",
  ],
  [
    "What types of businesses does AutoUp supply?",
    "AutoUp supplies commercial car wash operations (automatic and manual), vehicle detailing studios, automotive dealerships, mechanic workshops, commercial transport fleets, and regional automotive product distributors.",
  ],
  [
    "Does AutoUp provide consumer car wash or detailing services?",
    "No. AutoUp is strictly a product manufacturer and wholesale supplier. We do not offer car washing, vehicle detailing, polishing, or mobile cleaning services to individual retail consumers.",
  ],
  [
    "How are shipping and delivery arranged?",
    "Delivery arrangements, freight options, and regional logistics are coordinated and confirmed directly during the quotation process based on your business location and order volume.",
  ],
];

const input =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function ContactPage() {
  const { locale } = useLocale();
  const [form, setForm] = useState({
    companyName: "",
    name: "",
    phone: "",
    city: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<"companyName" | "name" | "phone" | "city" | "message", string>>
  >({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<"companyName" | "name" | "phone" | "city" | "message", string>> = {};
    if (!form.companyName.trim()) er.companyName = "Please enter your business or company name.";
    if (!form.name.trim()) er.name = "Please enter contact person name.";
    if (!/^[+\d\s()-]{7,}$/.test(form.phone))
      er.phone = "Please enter a valid business phone number.";
    if (!form.city.trim()) er.city = "Please enter your city.";
    if (form.message.trim().length < 5) er.message = "Please write a short inquiry message.";
    setErrors(er);
    if (Object.keys(er).length) return;

    const b2bMsg =
      locale === "ar"
        ? [
            "مرحباً AutoUp،",
            "",
            "لدي استفسار تجاري حول منتجات تنظيف السيارات لديكم.",
            "",
            `الشركة: ${form.companyName}`,
            `اسم مسؤول التواصل: ${form.name}`,
            `الهاتف: ${form.phone}`,
            `المدينة: ${form.city}`,
            "",
            `الاستفسار / المتطلبات:\n${form.message}`,
          ].join("\n")
        : [
            "Hello AutoUp,",
            "",
            "I have a business inquiry regarding your automotive cleaning products.",
            "",
            `Company: ${form.companyName}`,
            `Contact Name: ${form.name}`,
            `Phone: ${form.phone}`,
            `City: ${form.city}`,
            "",
            `Inquiry / Requirements:\n${form.message}`,
          ].join("\n");

    window.open(whatsappUrl(b2bMsg), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageHero
        image={contactHero}
        eyebrow="Commercial Inquiries"
        title="Contact AutoUp Commercial Supply"
        crumb="Contact"
      >
        Reach our B2B team for product availability, bulk purchasing inquiries, wholesale pricing,
        and container supply information.
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-10 lg:py-16">
        {/* Left Column: Direct Commercial Contact */}
        <Reveal delay={60} direction="up" className="space-y-4">
          <a
            href={`tel:${SITE.whatsappLocal}`}
            className="card-stroke flex items-center gap-4 rounded-2xl bg-card p-6 hover:border-primary/50 transition-colors"
          >
            <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Phone className="size-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Phone Inquiries</p>
              <p className="text-sm text-foreground/80">{SITE.phoneDisplay}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Commercial sales line</p>
            </div>
          </a>

          <div className="card-stroke flex items-center gap-4 rounded-2xl bg-card p-6">
            <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
              <Building2 className="size-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground">B2B Product Supply</p>
              <p className="text-sm text-muted-foreground">Bulk containers (20L, 25L, 20KG)</p>
            </div>
          </div>

          <div className="card-stroke flex items-center gap-4 rounded-2xl bg-card p-6">
            <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
              <MapPin className="size-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Location</p>
              <p className="text-sm text-muted-foreground">
                {locale === "ar" ? SITE.address.ar : SITE.address.en}
              </p>
            </div>
          </div>

          <div className="card-stroke flex items-center gap-4 rounded-2xl bg-card p-6">
            <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
              <Clock className="size-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Business Hours</p>
              <p className="text-sm text-muted-foreground">{SITE.hours}</p>
            </div>
          </div>

          <p className="pt-2 text-xs text-muted-foreground">
            Looking for specific cleaning chemical formulas?{" "}
            <Link to="/products" className="text-primary underline-offset-4 hover:underline">
              Browse products catalog
            </Link>{" "}
            or{" "}
            <Link to="/quote" className="text-primary underline-offset-4 hover:underline">
              request a wholesale quote
            </Link>
            .
          </p>
        </Reveal>

        {/* Right Column: Commercial Inquiry Form */}
        <Reveal delay={120} direction="up">
          <form
            onSubmit={submit}
            noValidate
            className="space-y-4 rounded-3xl border border-border/80 bg-card p-8 shadow-card"
          >
            <div className="mb-2">
              <span className="eyebrow text-primary">BUSINESS INQUIRY</span>
              <h2 className="text-2xl font-bold text-foreground">Send a Wholesale Inquiry</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Submit your company details and requirements to receive pricing and availability.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium" htmlFor="companyName">
                  Company / Business Name *
                </label>
                <input
                  id="companyName"
                  placeholder="e.g. Apex Wash Studio"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className={input}
                />
                {errors.companyName && (
                  <p className="mt-1 text-xs text-destructive">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium" htmlFor="name">
                  Contact Person Name *
                </label>
                <input
                  id="name"
                  placeholder="e.g. Alex Rahman"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={input}
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium" htmlFor="phone">
                  Business Phone / WhatsApp *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="e.g. +971 50 123 4567"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={input}
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium" htmlFor="city">
                  City / Region *
                </label>
                <input
                  id="city"
                  placeholder="e.g. Dubai / Riyadh / Dammam"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className={input}
                />
                {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium" htmlFor="message">
                Products of Interest & Estimated Volumes *
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us which products you need (e.g. Pre-Wash Shampoo, ChemX C2, F55 Wax) and expected container quantities or delivery city..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${input} h-auto py-3`}
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full font-semibold">
              Send Inquiry via WhatsApp
            </Button>
            <p className="text-center text-xs text-muted-foreground leading-relaxed">
              Your inquiry will open directly in WhatsApp with our commercial team.
            </p>
          </form>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="section-dark py-20 bg-[#090b10] border-t border-white/5">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="text-center">
            <span className="eyebrow text-primary">COMMERCIAL FAQ</span>
            <h2 className="text-3xl font-bold sm:text-4xl text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Clear answers regarding our products, wholesale purchasing, and B2B ordering.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <Accordion type="single" collapsible className="mt-10">
              {FAQ.map(([q = "", a]) => (
                <AccordionItem key={q} value={q} className="border-white/10">
                  <AccordionTrigger className="text-left text-base text-white hover:text-primary transition-colors">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-white/70 leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
