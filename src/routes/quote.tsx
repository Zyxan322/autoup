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
import quoteImg from "@/assets/hero-3.webp";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { buildQuoteMessage, whatsappUrl } from "@/lib/site";
import { toast } from "sonner";
import { useLocale, translateText } from "@/lib/i18n";
import { isTwentyLitreVariant } from "@/lib/installments";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/quote")({
  validateSearch: z.object({
    from: z.string().optional(),
    product: z.string().optional(),
    service: z.string().optional(),
  }),
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
  "quote-field h-11 w-full rounded-xl border px-3.5 text-sm transition-colors focus:outline-none";
const DRAFT = "autoup-b2b-quote-draft";
const COUNTRIES = [
  { value: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  { value: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
  { value: "Bahrain", ar: "البحرين" },
  { value: "Kuwait", ar: "الكويت" },
  { value: "Oman", ar: "عُمان" },
  { value: "Qatar", ar: "قطر" },
] as const;
const CITIES: Record<string, string[]> = {
  "Saudi Arabia": [
    "Riyadh",
    "Jeddah",
    "Buraydah",
    "Dammam",
    "Al Khobar",
    "Mecca",
    "Medina",
    "Abha",
    "Tabuk",
    "Other",
  ],
  "United Arab Emirates": [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
    "Other",
  ],
  Bahrain: ["Manama", "Muharraq", "Riffa", "Other"],
  Kuwait: ["Kuwait City", "Hawalli", "Salmiya", "Other"],
  Oman: ["Muscat", "Salalah", "Sohar", "Other"],
  Qatar: ["Doha", "Al Rayyan", "Al Wakrah", "Other"],
  Other: ["Other"],
};
const ARABIC_CITIES: Record<string, string> = {
  Riyadh: "الرياض",
  Jeddah: "جدة",
  Buraydah: "بريدة",
  Dammam: "الدمام",
  "Al Khobar": "الخبر",
  Mecca: "مكة المكرمة",
  Medina: "المدينة المنورة",
  Abha: "أبها",
  Tabuk: "تبوك",
  Dubai: "دبي",
  "Abu Dhabi": "أبوظبي",
  Sharjah: "الشارقة",
  Ajman: "عجمان",
  "Ras Al Khaimah": "رأس الخيمة",
  Fujairah: "الفجيرة",
  "Umm Al Quwain": "أم القيوين",
  Manama: "المنامة",
  Muharraq: "المحرق",
  Riffa: "الرفاع",
  "Kuwait City": "مدينة الكويت",
  Hawalli: "حولي",
  Salmiya: "السالمية",
  Muscat: "مسقط",
  Salalah: "صلالة",
  Sohar: "صحار",
  Doha: "الدوحة",
  "Al Rayyan": "الريان",
  "Al Wakrah": "الوكرة",
  Other: "أخرى",
};

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
    countryOther: "",
    cityOther: "",
    orderVolume: "",
    notes: "",
  });
  const [installmentPreferences, setInstallmentPreferences] = useState<
    Record<string, { enabled: boolean; months: 3 | 5 }>
  >({});
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
    country:
      locale === "ar"
        ? (COUNTRIES.find((country) => country.value === f.country)?.ar ??
          (f.country === "Other" ? f.countryOther : f.country))
        : f.country === "Other"
          ? f.countryOther
          : f.country,
    city:
      f.city === "Other"
        ? f.cityOther
        : locale === "ar"
          ? (ARABIC_CITIES[f.city] ?? f.city)
          : f.city,
    products: items.map((i) => ({
      name: i.name,
      qty: i.qty,
      variant: i.variant,
      paymentOption: isTwentyLitreVariant(i.variant)
        ? installmentPreferences[`${i.slug}::${i.variant ?? ""}::${i.paymentOption ?? "full"}`]
            ?.enabled
          ? "installment-quote"
          : "full"
        : i.paymentOption,
      installmentMonths:
        installmentPreferences[`${i.slug}::${i.variant ?? ""}::${i.paymentOption ?? "full"}`]
          ?.months,
    })),
  };
  const selectedCountry = COUNTRIES.some((country) => country.value === f.country)
    ? f.country
    : f.country
      ? "Other"
      : "";
  const selectedCities = CITIES[selectedCountry] ?? CITIES.Other;
  const selectedCity = selectedCities.includes(f.city) ? f.city : f.city ? "Other" : "";
  const otherCountryValue =
    f.country === "Other" ? f.countryOther : selectedCountry === "Other" ? f.country : "";
  const otherCityValue = f.city === "Other" ? f.cityOther : selectedCity === "Other" ? f.city : "";

  const validate = () => {
    const e: Partial<
      Record<"name" | "companyName" | "phone" | "city" | "country" | "email" | "items", string>
    > = {};
    if (!f.name.trim()) e.name = "Contact name is required.";
    if (!f.companyName.trim()) e.companyName = "Company or business name is required.";
    if (!/^[+\d\s()-]{7,}$/.test(f.phone))
      e.phone = "Please enter a valid business phone / WhatsApp number.";
    if (!f.country.trim() || (f.country === "Other" && !f.countryOther.trim()))
      e.country = locale === "ar" ? "يرجى اختيار الدولة." : "Please select a country.";
    if (!f.city.trim() || (f.city === "Other" && !f.cityOther.trim()))
      e.city = locale === "ar" ? "يرجى اختيار المدينة." : "Please select a city.";
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
    <main className="quote-page min-h-screen">
      <section className="quote-hero border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-14">
          <div>
            <Link
              to="/products"
              className="quote-back-link inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="size-4" /> Back to product catalog
            </Link>
            <Reveal delay={60} direction="up" className="mt-6">
              <span className="eyebrow">COMMERCIAL INQUIRY</span>
              <h1 className="quote-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Request A Wholesale Quote
              </h1>
              <p className="quote-description mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
                Provide your business requirements below to receive verified wholesale pricing,
                container availability, and volume supply terms directly from our team.
              </p>
              <div className="quote-intro mt-5 border-s-2 ps-4">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                  <Building2 aria-hidden="true" className="size-3.5" />
                  B2B Commercial Supply
                </p>
                <p className="quote-intro-title mt-2 text-base font-semibold leading-snug sm:text-lg">
                  Wholesale Automotive Cleaning Products for Your Business.
                </p>
                <p className="quote-description mt-2 max-w-xl text-sm leading-relaxed">
                  Dedicated supply of concentrated car shampoos, waxes, degreasers, and surface
                  chemicals packaged in 20L, 25L, and 20KG commercial containers.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120} direction="up">
            <div className="quote-hero-image group relative overflow-hidden rounded-3xl border">
              <img
                src={quoteImg}
                alt="A polished luxury vehicle in a professional detailing studio"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/25 via-transparent to-white/10"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="quote-form-area px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div className="quote-form-card mx-auto max-w-5xl rounded-3xl p-4 sm:p-6 lg:p-8">
          {!review ? (
            <form
              noValidate
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (validate()) setReview(true);
              }}
            >
              {/* Business Contact Details */}
              <div className="quote-form-section space-y-4 rounded-2xl p-4 sm:p-5">
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
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                    )}
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
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="order-6">
                    <label htmlFor="city" className="mb-1.5 block text-xs font-medium">
                      {locale === "ar" ? "المدينة / المنطقة *" : "City / Region *"}
                    </label>
                    <select
                      id="city"
                      value={selectedCity}
                      disabled={!selectedCountry}
                      onChange={(event) =>
                        setF((current) => ({
                          ...current,
                          city: event.target.value,
                          cityOther: "",
                        }))
                      }
                      className={field}
                    >
                      <option value="">{locale === "ar" ? "اختر المدينة" : "Select a city"}</option>
                      {selectedCities.map((city) => (
                        <option key={city} value={city}>
                          {locale === "ar" ? (ARABIC_CITIES[city] ?? city) : city}
                        </option>
                      ))}
                    </select>
                    {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
                    {selectedCity === "Other" && (
                      <input
                        id="otherCity"
                        className={`${field} mt-2`}
                        value={otherCityValue}
                        onChange={(event) =>
                          setF((current) => ({
                            ...current,
                            city: "Other",
                            cityOther: event.target.value,
                          }))
                        }
                        placeholder={locale === "ar" ? "أدخل اسم المدينة" : "Enter city"}
                      />
                    )}
                  </div>

                  <div className="order-5">
                    <label htmlFor="country" className="mb-1.5 block text-xs font-medium">
                      {locale === "ar" ? "الدولة *" : "Country *"}
                    </label>
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={(event) =>
                        setF((current) => ({
                          ...current,
                          country: event.target.value,
                          countryOther: "",
                          city: "",
                          cityOther: "",
                        }))
                      }
                      className={field}
                    >
                      <option value="">
                        {locale === "ar" ? "اختر الدولة" : "Select a country"}
                      </option>
                      {COUNTRIES.map((country) => (
                        <option key={country.value} value={country.value}>
                          {locale === "ar" ? country.ar : country.value}
                        </option>
                      ))}
                      <option value="Other">{locale === "ar" ? "أخرى" : "Other"}</option>
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-xs text-destructive">{errors.country}</p>
                    )}
                    {selectedCountry === "Other" && (
                      <input
                        id="otherCountry"
                        className={`${field} mt-2`}
                        value={otherCountryValue}
                        onChange={(event) =>
                          setF((current) => ({
                            ...current,
                            country: "Other",
                            countryOther: event.target.value,
                          }))
                        }
                        placeholder={locale === "ar" ? "أدخل اسم الدولة" : "Enter country"}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Product Selection */}
              <div className="quote-form-section space-y-4 rounded-2xl p-4 sm:p-5">
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
                    {items.map((i) => {
                      const preferenceKey = `${i.slug}::${i.variant ?? ""}::${i.paymentOption ?? "full"}`;
                      const preference = installmentPreferences[preferenceKey];
                      const installmentEnabled =
                        preference?.enabled ?? i.paymentOption === "installment-quote";

                      return (
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
                              <div className="mt-2 space-y-2">
                                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <input
                                    type="checkbox"
                                    checked={installmentEnabled}
                                    onChange={(event) =>
                                      setInstallmentPreferences((current) => ({
                                        ...current,
                                        [preferenceKey]: {
                                          enabled: event.target.checked,
                                          months: preference?.months ?? 3,
                                        },
                                      }))
                                    }
                                    className="size-4 accent-primary"
                                  />
                                  {locale === "ar"
                                    ? "طلب عرض سعر بالتقسيط"
                                    : "Request an installment quote"}
                                </label>
                                {installmentEnabled && (
                                  <div className="flex flex-wrap gap-2">
                                    {([3, 5] as const).map((months) => (
                                      <button
                                        key={months}
                                        type="button"
                                        aria-pressed={(preference?.months ?? 3) === months}
                                        onClick={() =>
                                          setInstallmentPreferences((current) => ({
                                            ...current,
                                            [preferenceKey]: { enabled: true, months },
                                          }))
                                        }
                                        className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                                          (preference?.months ?? 3) === months
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border text-muted-foreground hover:border-primary/50"
                                        }`}
                                      >
                                        {locale === "ar" ? `${months} أشهر` : `${months} months`}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
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
                      );
                    })}
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
                Wholesale pricing and stock availability are verified directly by our commercial
                team and sent to you via WhatsApp / email.
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
            <div className="space-y-5">
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
      </section>
    </main>
  );
}
