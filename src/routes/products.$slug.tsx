import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Minus, Plus, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, productBySlug } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { whatsappUrl } from "@/lib/site";
import { configuredInstallmentPlan, installmentAmount, isTwentyLitreVariant } from "@/lib/installments";
import { useLocale, translateText } from "@/lib/i18n";

import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — AutoUp` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — AutoUp` },
          { property: "og:description", content: loaderData.product.short },
        ]
      : [{ title: "Product unavailable — AutoUp" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-48 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <Button asChild variant="hero" size="xl" className="mt-6"><Link to="/products">Back to products</Link></Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { add } = useCart();
  const { locale } = useLocale();
  const [variant, setVariant] = useState(p.variants[0]);
  const [qty, setQty] = useState(1);
  const [paymentOption, setPaymentOption] = useState<"full" | "installment-quote">("full");
  const eligibleForInstallments = isTwentyLitreVariant(variant);
  const installmentPlan = configuredInstallmentPlan(p, variant);
  const detailImage = p.image;
  const related = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 5);
  const paymentInquiry =
    eligibleForInstallments
      ? locale === "ar"
        ? `\n\nطريقة الدفع المفضلة: ${paymentOption === "installment-quote" ? "طلب عرض تقسيط (الشروط بانتظار التأكيد)." : "الدفع الكامل."}`
        : `\n\nPayment preference: ${paymentOption === "installment-quote" ? "installment quotation requested (terms to be confirmed)." : "full payment."}`
      : "";
  const whatsappInquiry =
    locale === "ar"
      ? `مرحباً AutoUp،\n\nأستفسر عن توريد ${translateText(p.name, locale)} بالجملة للمنشآت (${variant}) × ${qty} عبوات.${paymentInquiry}\n\nيرجى تأكيد التوفر وأسعار الجملة.\n\nشكراً لكم.`
      : `Hello AutoUp,\n\nI am inquiring about commercial wholesale supply for ${p.name} (${variant}) × ${qty} containers.${paymentInquiry}\n\nPlease share availability and wholesale pricing.\n\nThank you.`;

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-28 pb-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted-foreground flex items-center gap-2">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{p.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 shadow-xl" style={{background: '#0c0f15'}}>
            {/* Real product photo — contain so full label is visible */}
            <div className="flex items-center justify-center p-8" style={{aspectRatio: '3/4'}}>
              <img
                src={detailImage}
                alt={p.name}
                width={640}
                height={853}
                className="max-h-full max-w-full object-contain transition-transform duration-700 hover:scale-105"
              />
            </div>
            {p.code && (
              <span className="absolute top-4 right-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold tracking-wider text-white shadow-lg">{p.code}</span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="eyebrow">{translateText(p.category, locale)}</span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">{translateText(p.name, locale)}</h1>
            {p.code && <p className="mt-1 text-sm font-semibold text-primary/70">Product Code: {p.code}</p>}
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{translateText(p.description, locale)}</p>
            <p className="mt-2 text-xs font-semibold text-primary">Price and bulk availability confirmed on WhatsApp quotation.</p>

            <div className="mt-8">
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Size / Package</p>
              <div className="flex flex-wrap gap-2">
                {p.variants.map((v) => (
                  <button
                    key={v}
                    type="button"
                      onClick={() => {
                        setVariant(v);
                        if (!isTwentyLitreVariant(v)) setPaymentOption("full");
                      }}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-medium transition-all cursor-pointer",
                      v === variant
                        ? "border-primary bg-primary text-primary-foreground shadow-[0_0_12px_rgba(22,119,255,0.4)]"
                        : "border-input bg-card hover:border-primary/60",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {eligibleForInstallments && (
              <fieldset className="mt-7 space-y-3 rounded-xl border border-border bg-card p-4">
                <legend className="px-1 text-sm font-semibold">
                  {locale === "ar" ? "طريقة الدفع" : "Payment option"}
                </legend>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="payment-option"
                    value="full"
                    checked={paymentOption === "full"}
                    onChange={() => setPaymentOption("full")}
                  />
                  <span>{locale === "ar" ? "الدفع الكامل" : "Full Payment"}</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="payment-option"
                    value="installment-quote"
                    checked={paymentOption === "installment-quote"}
                    onChange={() => setPaymentOption("installment-quote")}
                  />
                  <span>{locale === "ar" ? "طلب عرض تقسيط" : "Request Installment Quote"}</span>
                </label>
                {paymentOption === "installment-quote" && (
                  <div className="rounded-lg bg-background/70 p-3 text-xs leading-relaxed text-muted-foreground">
                    {installmentPlan ? (
                      <>
                        <p>
                          {locale === "ar" ? "الإجمالي:" : "Total:"} {installmentPlan.totalPrice}{" "}
                          {installmentPlan.currency}
                        </p>
                        <p>
                          {locale === "ar" ? "عدد الدفعات:" : "Installments:"}{" "}
                          {installmentPlan.installmentCount}
                        </p>
                        <p>
                          {locale === "ar" ? "قيمة الدفعة:" : "Amount per installment:"}{" "}
                          {installmentAmount(installmentPlan)} {installmentPlan.currency}
                        </p>
                        <p>
                          {locale === "ar" ? "المواعيد:" : "Schedule:"} {installmentPlan.schedule}
                        </p>
                        <p>
                          {locale === "ar" ? "الشروط:" : "Terms:"} {installmentPlan.terms}
                        </p>
                      </>
                    ) : (
                      <p>
                        {locale === "ar"
                          ? "لم تُحدّد شروط التقسيط بعد. أرسل طلب عرض سعر ليتحقق فريق AutoUp من إمكانية توفير خطة تقسيط. لا توجد حالياً مبالغ أو رسوم أو مواعيد أقساط معلنة."
                          : "Installment terms are not currently configured. Request a quotation and AutoUp will confirm whether an installment plan is available. No installment amount, fees, or schedule are being advertised."}
                      </p>
                    )}
                  </div>
                )}
              </fieldset>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex h-11 items-center rounded-lg border border-input bg-card px-2">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <Button
                variant="hero"
                size="xl"
                className="flex-1 h-11 shadow-[0_0_15px_-3px_var(--electric)] cursor-pointer"
                onClick={() => {
                  add({ slug: p.slug, name: p.name, variant, qty, image: detailImage, paymentOption });
                  toast.success(
                    locale === "ar"
                      ? `تمت إضافة ${translateText(p.name, locale)} إلى قائمة عرض السعر`
                      : `${p.name} added to wholesale quote list`,
                  );
                }}
              >
                Add to Quote List
              </Button>
            </div>

            <Button asChild variant="line" size="xl" className="mt-3 h-11 cursor-pointer">
              <a
                href={whatsappUrl(whatsappInquiry)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4 mr-2" />
                Request Wholesale Quote on WhatsApp
              </a>
            </Button>

            {eligibleForInstallments && (
              <Button
                asChild
                variant="hero"
                size="xl"
                className="mt-3 h-11 cursor-pointer"
              >
                <Link to="/quote/installation" search={{ product: p.slug }}>
                  <Wrench className="mr-2 size-4" />
                  {locale === "ar"
                    ? "طلب استشارة للتركيب وخيارات الدفع"
                    : "Request Installation & Payment Plan"}
                </Link>
              </Button>
            )}

            <div className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary">How to Use & Application</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{translateText(p.usage, locale)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark page-band bg-[#090b10] border-t border-white/5">
        <div className="page-inner">
          <p className="eyebrow">COMPLETE YOUR CARE ROUTINE</p>
          <h2 className="section-title">You May Also Like</h2>
          <div className="card-grid-5 mt-8">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
