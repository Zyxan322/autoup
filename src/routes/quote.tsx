import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, MessageCircle, Minus, Plus, X } from "lucide-react";
import quoteImg from "@/assets/quote.jpg";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { buildQuoteMessage, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quote")({
  validateSearch: z.object({ service: z.string().optional(), from: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Request a Quotation — AutoUp" },
      { name: "description", content: "Request a quotation for AutoUp car-care products and services, sent straight to us on WhatsApp." },
      { property: "og:title", content: "Request a Quotation — AutoUp" },
      { property: "og:description", content: "Choose products and services, then send your quotation request on WhatsApp." },
    ],
  }),
  component: QuotePage,
});

const field = "h-12 w-full rounded-xl border border-input bg-card px-4 focus:border-primary focus:outline-none";
const DRAFT = "autoup-quote-draft";

function QuotePage() {
  const { service } = Route.useSearch();
  const { items, setQty, remove } = useCart();
  const [f, setF] = useState({ name: "", phone: "", city: "", email: "", requestType: "Products", notes: "", delivery: "" });
  const [services, setServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone" | "city" | "email" | "items", string>>>({});
  const [review, setReview] = useState(false);

  useEffect(() => {
    try {
      const d = sessionStorage.getItem(DRAFT);
      if (d) setF((x) => ({ ...x, ...JSON.parse(d) }));
    } catch {}
  }, []);
  useEffect(() => {
    sessionStorage.setItem(DRAFT, JSON.stringify(f));
  }, [f]);
  useEffect(() => {
    if (service) {
      const s = SERVICES.find((x) => x.slug === service);
      if (s) {
        setServices((prev) => (prev.includes(s.title) ? prev : [...prev, s.title]));
        setF((x) => ({ ...x, requestType: items.length ? "Both" : "Services" }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  const toggle = (t: string) => setServices((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const data = {
    ...f,
    products: items.map((i) => ({ name: i.name, qty: i.qty, variant: i.variant })),
    services,
  };

  const validate = () => {
    const e: Partial<Record<"name" | "phone" | "city" | "email" | "items", string>> = {};
    if (!f.name.trim()) e.name = "Full name is required.";
    if (!/^[+\d\s()-]{7,}$/.test(f.phone)) e.phone = "Please enter a valid phone number.";
    if (!f.city.trim()) e.city = "City is required.";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Please enter a valid email.";
    if (!items.length && !services.length) e.items = "Add at least one product or select a service.";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="section-dark relative hidden lg:block">
        <img src={quoteImg} alt="Detailer drying a white car with a microfiber towel" width={1024} height={1408} className="sticky top-0 h-screen w-full object-cover" />
        <div className="absolute inset-0 bg-fade-bottom" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="eyebrow">Quotation</p>
          <p className="mt-3 font-display text-4xl font-bold leading-tight">Tell us what you need. We'll handle the rest.</p>
        </div>
      </div>

      <div className="px-5 pb-20 pt-28 sm:px-10 lg:px-14">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to shopping</Link>
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Request a Quotation</h1>
        <p className="mt-3 text-muted-foreground">Your quotation request will be sent to AutoUp through WhatsApp.</p>

        {!review ? (
          <form
            noValidate
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (validate()) setReview(true);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {([["name", "Full name *"], ["phone", "Phone number *"], ["city", "City *"], ["email", "Email (optional)"]] as const).map(([k, l]) => (
                <div key={k}>
                  <label htmlFor={k} className="mb-1.5 block text-sm font-medium">{l}</label>
                  <input id={k} type={k === "email" ? "email" : k === "phone" ? "tel" : "text"} value={f[k]} onChange={set(k)} className={field} />
                  {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
                </div>
              ))}
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Request type</p>
              <div className="flex gap-2">
                {["Products", "Services", "Both"].map((t) => (
                  <button type="button" key={t} onClick={() => setF({ ...f, requestType: t })} className={cn("rounded-full border px-5 py-2 text-sm", f.requestType === t ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-primary")}>{t}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Selected products</p>
              {items.length === 0 ? (
                <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">No products yet. <Link to="/products" className="text-primary hover:underline">Browse products</Link></p>
              ) : (
                <ul className="divide-y rounded-xl border bg-card">
                  {items.map((i) => (
                    <li key={i.slug + i.variant} className="flex items-center gap-3 p-3">
                      <img src={i.image} alt="" width={48} height={48} className="size-12 rounded-lg object-cover" />
                      <div className="flex-1 text-sm"><p className="font-medium">{i.name}</p><p className="text-xs text-muted-foreground">{i.variant}</p></div>
                      <button type="button" aria-label="Decrease" onClick={() => setQty(i.slug, i.variant, i.qty - 1)} className="rounded-full border p-1"><Minus className="size-3" /></button>
                      <span className="w-5 text-center text-sm">{i.qty}</span>
                      <button type="button" aria-label="Increase" onClick={() => setQty(i.slug, i.variant, i.qty + 1)} className="rounded-full border p-1"><Plus className="size-3" /></button>
                      <button type="button" aria-label="Remove" onClick={() => remove(i.slug, i.variant)} className="p-1 text-muted-foreground hover:text-destructive"><X className="size-4" /></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Services</p>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <button type="button" key={s.slug} onClick={() => toggle(s.title)} className={cn("rounded-full border px-4 py-2 text-xs", services.includes(s.title) ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-primary")}>{s.title}</button>
                ))}
              </div>
              {errors.items && <p className="mt-2 text-xs text-destructive">{errors.items}</p>}
            </div>

            <div>
              <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">Additional requirements</label>
              <textarea id="notes" rows={3} value={f.notes} onChange={set("notes")} className={`${field} h-auto py-3`} />
            </div>
            <div>
              <label htmlFor="delivery" className="mb-1.5 block text-sm font-medium">Preferred delivery or service details</label>
              <input id="delivery" value={f.delivery} onChange={set("delivery")} className={field} />
            </div>

            <p className="text-xs text-muted-foreground">Privacy: your details are only used to prepare your quotation and are sent directly to AutoUp in WhatsApp.</p>
            <Button type="submit" variant="hero" size="xl" className="w-full">Review Quotation</Button>
          </form>
        ) : (
          <div className="mt-10 space-y-5">
            <h2 className="text-2xl font-semibold">Order summary</h2>
            <pre className="whitespace-pre-wrap rounded-2xl border bg-card p-6 font-sans text-sm leading-relaxed">{buildQuoteMessage(data)}</pre>
            <Button asChild variant="hero" size="xl" className="w-full">
              <a href={whatsappUrl(buildQuoteMessage(data))} target="_blank" rel="noreferrer"><MessageCircle /> Send Quotation on WhatsApp</a>
            </Button>
            <Button variant="line" size="xl" className="w-full" onClick={() => setReview(false)}>Edit details</Button>
            <p className="text-center text-xs text-muted-foreground">Your quotation request will be sent to AutoUp through WhatsApp. Your order is confirmed only once AutoUp replies.</p>
          </div>
        )}
      </div>
    </div>
  );
}
