import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  ArrowLeft,
  Building2,
  Check,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import quoteImg from "@/assets/quote.webp";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { buildQuoteMessage, whatsappUrl } from "@/lib/site";
import { toast } from "sonner";
import { useLocale, translateText } from "@/lib/i18n";
import { isTwentyLitreVariant } from "@/lib/installments";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/quote")({
  validateSearch: z.object({ from: z.string().optional(), product: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Request Wholesale Quote — AutoUp B2B Supply" },
      {
        name: "description",
        content:
          "Request a wholesale quotation for commercial automotive cleaning products, concentrated shampoos, waxes, and chemicals.",
      },
      { property: "og:title", content: "Request Wholesale Quote — AutoUp B2B Supply" },
      {
        property: "og:description",
        content:
          "Submit your business details and required product volumes for bulk pricing and supply confirmation.",
      },
    ],
  }),
  component: QuotePage,
});

const field =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const DRAFT = "autoup-b2b-quote-draft";

function QuotePage() {
  const { product } = Route.useSearch();
  const { items, setQty, remove, add } = useCart();
  const { locale } = useLocale();
  const [f, setF] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    city: "",
    country: "",
    orderVolume: "",
    notes: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "companyName" | "phone" | "city" | "email" | "items", string>>
  >({});
  const [review, setReview] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-add selected product from URL if passed
  useEffect(() => {
    if (product) {
      const p = PRODUCTS.find((x) => x.slug === product);
      if (p && !items.some((i) => i.slug === p.slug)) {
        add({ slug: p.slug, name: p.name, variant: p.variants[0], qty: 1, image: p.image });
      }
    }
  }, [product, items, add]);

  useEffect(() => {
    try {
      const d = sessionStorage.getItem(DRAFT);
      if (d) setF((x) => ({ ...x, ...JSON.parse(d) }));
    } catch (error) {
      console.error("Unable to restore the saved AutoUp quote draft.", error);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(DRAFT, JSON.stringify(f));
  }, [f]);

  const data = {
    ...f,
    products: items.map((i) => ({
      name: i.name,
      qty: i.qty,
      variant: i.variant,
      paymentOption: i.paymentOption,
    })),
  };

  const validate = () => {
    const e: Partial<
      Record<"name" | "companyName" | "phone" | "city" | "email" | "items", string>
    > = {};
    if (!f.name.trim()) e.name = "Contact name is required.";
    if (!f.companyName.trim()) e.companyName = "Company or business name is required.";
    if (!/^[+\d\s()-]{7,}$/.test(f.phone))
      e.phone = "Please enter a valid business phone / WhatsApp number.";
    if (!f.city.trim()) e.city = "City is required.";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email))
      e.email = "Please enter a valid business email.";
    if (!items.length && !f.notes.trim()) {
      e.items = "Please select at least one product or describe your required items below.";
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const set =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setF({ ...f, [k]: e.target.value });

  const formattedMessage = buildQuoteMessage(data, locale);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    toast.success("Quote request copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Visual Column */}
      <div className="section-dark relative hidden lg:block bg-[#07090e]">
        <img
          src={quoteImg}
          alt="Automotive care products and commercial vehicle maintenance"
          width={1024}
          height={1408}
          fetchPriority="high"
          decoding="async"
          className="sticky top-0 h-screen w-full object-cover brightness-[0.75] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <Reveal delay={60} direction="up" className="absolute bottom-12 left-12 right-12 z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-md mb-4">
            <Building2 className="size-3.5" />
            B2B Commercial Supply
          </div>
          <p className="font-display text-4xl font-bold leading-tight text-white">
            Wholesale Automotive Cleaning Products for Your Business.
          </p>
          <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-lg">
            Dedicated supply of concentrated car shampoos, waxes, degreasers, and surface chemicals
            packaged in 20L, 25L, and 20KG commercial containers.
          </p>
        </Reveal>
      </div>

      {/* Right Form Column */}
      <div className="px-5 pb-20 pt-28 sm:px-10 lg:px-14">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to product catalog
        </Link>
        <Reveal delay={60} direction="up" className="mt-6">
          <span className="eyebrow">COMMERCIAL INQUIRY</span>
          <h1 className="mt-2 text-3xl font-bold sm:text-5xl tracking-tight text-foreground">
            Request a Wholesale Quote
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Provide your business requirements below to receive verified wholesale pricing,
            container availability, and volume supply terms directly from our team.
          </p>
        </Reveal>

        {!review ? (
          <form
            noValidate
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (validate()) setReview(true);
            }}
          >
            {/* Business Contact Details */}
            <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
                1. Business & Contact Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="companyName" className="mb-1.5 block text-xs font-medium">
                    Company / Business Name *
                  </label>
                  <input
                    id="companyName"
                    placeholder="e.g. Apex Car Wash / Star Detailing"
                    value={f.companyName}
                    onChange={set("companyName")}
                    className={field}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-xs text-destructive">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium">
                    Contact Person Name *
                  </label>
                  <input
                    id="name"
                    placeholder="e.g. Alex Rahman"
                    value={f.name}
                    onChange={set("name")}
                    className={field}
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-medium">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +971 50 123 4567"
                    value={f.phone}
                    onChange={set("phone")}
                    className={field}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium">
                    Business Email (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="procurement@company.com"
                    value={f.email}
                    onChange={set("email")}
                    className={field}
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="city" className="mb-1.5 block text-xs font-medium">
                    City / Region *
                  </label>
                  <input
                    id="city"
                    placeholder="e.g. Dubai / Riyadh / Sharjah"
                    value={f.city}
                    onChange={set("city")}
                    className={field}
                  />
                  {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="country" className="mb-1.5 block text-xs font-medium">
                    Country (optional)
                  </label>
                  <input
                    id="country"
                    placeholder="e.g. United Arab Emirates"
                    value={f.country}
                    onChange={set("country")}
                    className={field}
                  />
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
                  2. Selected Products & Quantities
                </h2>
                <Link
                  to="/products"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <Plus className="size-3" /> Add from catalog
                </Link>
              </div>

              {items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/80 p-5 text-center">
                  <ShoppingBag className="mx-auto size-8 text-muted-foreground/60 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No products added yet. Add products to your wholesale quote list:
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {PRODUCTS.slice(0, 4).map((p) => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() =>
                          add({
                            slug: p.slug,
                            name: p.name,
                            variant: p.variants[0],
                            qty: 1,
                            image: p.image,
                          })
                        }
                        className="rounded-full border border-border/80 bg-background/60 px-3 py-1 text-xs hover:border-primary hover:text-primary transition-colors cursor-pointer"
                      >
                        + {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-border/60 rounded-xl border border-border/80 bg-card">
                  {items.map((i) => (
                    <li
                      key={`${i.slug}${i.variant ?? ""}${i.paymentOption ?? "full"}`}
                      className="flex items-center gap-3 p-3.5"
                    >
                      <div className="size-12 shrink-0 rounded-lg bg-black/40 border border-white/5 p-1 flex items-center justify-center">
                        <img
                          src={i.image}
                          alt=""
                          width={48}
                          height={48}
                          loading="lazy"
                          decoding="async"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {translateText(i.name, locale)}
                        </p>
                        <p className="text-xs text-primary/80 font-medium">{i.variant}</p>
                        {isTwentyLitreVariant(i.variant) && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {i.paymentOption === "installment-quote"
                              ? locale === "ar"
                                ? "طلب عرض تقسيط"
                                : "Installment quote requested"
                              : locale === "ar"
                                ? "الدفع الكامل"
                                : "Full payment"}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 border border-border/80 rounded-lg bg-background px-1.5 py-0.5">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(i.slug, i.variant, i.qty - 1, i.paymentOption)}
                          className="p-1 text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{i.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQty(i.slug, i.variant, i.qty + 1, i.paymentOption)}
                          className="p-1 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => remove(i.slug, i.variant, i.paymentOption)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {errors.items && <p className="text-xs text-destructive">{errors.items}</p>}

              <div>
                <label htmlFor="orderVolume" className="mb-1.5 block text-xs font-medium">
                  Estimated Order Volume / Frequency
                </label>
                <input
                  id="orderVolume"
                  placeholder="e.g. 5–10 containers monthly, sample order, or single bulk pallet"
                  value={f.orderVolume}
                  onChange={set("orderVolume")}
                  className={field}
                />
              </div>

              <div>
                <label htmlFor="notes" className="mb-1.5 block text-xs font-medium">
                  Additional Requirements / Inquiries
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Specify particular container requirements, delivery location, or specific product inquiries..."
                  value={f.notes}
                  onChange={set("notes")}
                  className={`${field} h-auto py-3`}
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Wholesale pricing and stock availability are verified directly by our commercial team
              and sent to you via WhatsApp / email.
            </p>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full text-base font-semibold"
            >
              Review Wholesale Quote Request
            </Button>
          </form>
        ) : (
          /* Step 2: Review and Submit */
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <h2 className="text-lg font-bold text-foreground">Review Quotation Details</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Confirm your business inquiry details before opening WhatsApp.
              </p>
            </div>

            <div className="relative">
              <pre className="whitespace-pre-wrap rounded-2xl border border-border bg-card p-6 font-mono text-xs leading-relaxed text-foreground/90 overflow-x-auto">
                {formattedMessage}
              </pre>
              <button
                type="button"
                onClick={handleCopy}
                className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground backdrop-blur-sm transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="space-y-3">
              <Button asChild variant="hero" size="xl" className="w-full text-base font-semibold">
                <a
                  href={whatsappUrl(formattedMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="size-5 fill-white stroke-none" />
                  Send Quote Request on WhatsApp
                </a>
              </Button>

              <Button
                type="button"
                variant="line"
                size="xl"
                className="w-full"
                onClick={() => setReview(false)}
              >
                Edit Inquired Items & Details
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground leading-relaxed">
              Your inquiry will open in WhatsApp so you can send it directly to AutoUp. Our
              commercial representative will review product stock and send a wholesale quotation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
