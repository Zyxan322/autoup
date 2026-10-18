import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import contactHero from "@/assets/contact-hero.jpg";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE, whatsappUrl } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AutoUp — WhatsApp & Phone" },
      { name: "description", content: "Get in touch with AutoUp on WhatsApp or phone for car-care products and quotations." },
      { property: "og:title", content: "Contact AutoUp" },
      { property: "og:description", content: "Message us on WhatsApp for products, advice and quotations." },
    ],
  }),
  component: ContactPage,
});

const FAQ = [
  ["How do I get prices?", "Add products to your cart and request a quotation — we'll reply on WhatsApp with pricing and availability."],
  ["Do you deliver?", "Delivery details are shared in your quotation based on your city and order."],
  ["Which products suit my car?", "Send us your car model and what you'd like to improve, and we'll recommend the right products."],
];

const input = "h-12 w-full rounded-xl border border-input bg-card px-4 focus:border-primary focus:outline-none";

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone" | "message" | "city" | "email" | "items", string>>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<"name" | "phone" | "message", string>> = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!/^[+\d\s()-]{7,}$/.test(form.phone)) er.phone = "Please enter a valid phone number.";
    if (form.message.trim().length < 5) er.message = "Please write a short message.";
    setErrors(er);
    if (Object.keys(er).length) return;
    window.open(whatsappUrl(`Hello AutoUp,\n\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`), "_blank");
  };

  return (
    <>
      <PageHero image={contactHero} eyebrow="Contact" title="Let's Talk Car Care." crumb="Contact">
        Questions about products or a quotation? We're a message away.
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="space-y-4">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="card-stroke flex items-center gap-4 rounded-2xl bg-card p-6">
            <MessageCircle className="size-6 text-primary" /><div><p className="font-semibold">WhatsApp</p><p className="text-sm text-muted-foreground">{SITE.phoneDisplay}</p></div>
          </a>
          <a href={`tel:${SITE.whatsappLocal}`} className="card-stroke flex items-center gap-4 rounded-2xl bg-card p-6">
            <Phone className="size-6 text-primary" /><div><p className="font-semibold">Phone</p><p className="text-sm text-muted-foreground">{SITE.phoneDisplay}</p></div>
          </a>
          <div className="card-stroke flex items-center gap-4 rounded-2xl bg-card p-6"><MapPin className="size-6 text-primary" /><div><p className="font-semibold">Location</p><p className="text-sm text-muted-foreground">{SITE.address}</p></div></div>
          <div className="card-stroke flex items-center gap-4 rounded-2xl bg-card p-6"><Clock className="size-6 text-primary" /><div><p className="font-semibold">Hours</p><p className="text-sm text-muted-foreground">{SITE.hours}</p></div></div>
          <p className="pt-2 text-sm text-muted-foreground">Looking for something specific? <Link to="/products" className="text-primary underline-offset-4 hover:underline">Browse products</Link> or <Link to="/services" className="text-primary underline-offset-4 hover:underline">view services</Link>.</p>
        </div>

        <form onSubmit={submit} noValidate className="space-y-4 rounded-3xl border bg-card p-8 shadow-card">
          <h2 className="text-2xl font-semibold">Send us a message</h2>
          {(["name", "phone"] as const).map((k) => (
            <div key={k}>
              <label className="mb-1.5 block text-sm font-medium capitalize" htmlFor={k}>{k === "name" ? "Full name" : "Phone number"}</label>
              <input id={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className={input} />
              {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
            </div>
          ))}
          <div>
            <label className="mb-1.5 block text-sm font-medium" htmlFor="message">Message</label>
            <textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${input} h-auto py-3`} />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <Button type="submit" variant="hero" size="xl" className="w-full">Send via WhatsApp</Button>
          <p className="text-xs text-muted-foreground">Your message opens in WhatsApp so you can send it directly to AutoUp.</p>
        </form>
      </section>

      <section className="section-dark py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map(([q = "", a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
