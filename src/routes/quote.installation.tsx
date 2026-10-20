import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { ArrowLeft, Building2, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GALLON_PRODUCTS } from "@/lib/catalog";
import { useLocale } from "@/lib/i18n";
import { buildInstallationPaymentInquiryMessage, whatsappUrl } from "@/lib/site";

export const Route = createFileRoute("/quote/installation")({
  validateSearch: z.object({ product: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "20L Commercial Installation & Payment Inquiry — AutoUp" },
      {
        name: "description",
        content:
          "Request a commercial consultation for 20L AutoUp products, including installation requirements and payment options.",
      },
    ],
  }),
  component: InstallationInquiryPage,
});

const field =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function InstallationInquiryPage() {
  const { locale } = useLocale();
  const { product } = Route.useSearch();
  const defaultProduct = useMemo(
    () => (product ? GALLON_PRODUCTS.find((item) => item.slug === product) : GALLON_PRODUCTS[0]) ?? GALLON_PRODUCTS[0],
    [product],
  );

  const [form, setForm] = useState({
    name: "",
    companyName: "",
    phone: "",
    city: "",
    productSlug: defaultProduct?.slug ?? "",
    quantity: "1",
    installation: "consultation",
    payment: "discuss",
    requirements: "",
  });

  const [errors, setErrors] = useState<Partial<Record<"name" | "companyName" | "phone" | "city" | "productSlug", string>>>({});

  useEffect(() => {
    if (defaultProduct?.slug) {
      setForm((draft) => ({ ...draft, productSlug: draft.productSlug || defaultProduct.slug }));
    }
  }, [defaultProduct]);

  const selectedProduct = GALLON_PRODUCTS.find((item) => item.slug === form.productSlug) ?? defaultProduct;

  const handleChange = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<"name" | "companyName" | "phone" | "city" | "productSlug", string>> = {};
    if (!form.name.trim()) nextErrors.name = locale === "ar" ? "يرجى إدخال الاسم." : "Please enter your name.";
    if (!form.companyName.trim()) nextErrors.companyName = locale === "ar" ? "يرجى إدخال اسم المنشأة." : "Please enter your business or workshop name.";
    if (!/^[+\d\s()-]{7,}$/.test(form.phone)) nextErrors.phone = locale === "ar" ? "يرجى إدخال رقم هاتف/واتساب صحيح." : "Please enter a valid mobile / WhatsApp number.";
    if (!form.city.trim()) nextErrors.city = locale === "ar" ? "يرجى إدخال المدينة أو موقع التوصيل." : "Please enter the city or delivery location.";
    if (!selectedProduct) nextErrors.productSlug = locale === "ar" ? "يرجى اختيار منتج." : "Please select a product.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const message = buildInstallationPaymentInquiryMessage(
    {
      name: form.name,
      companyName: form.companyName,
      phone: form.phone,
      city: form.city,
      productName: selectedProduct?.name ?? "20 L product",
      quantity: Number(form.quantity) || 1,
      installation: form.installation as "yes" | "no" | "consultation",
      payment: form.payment as "full" | "installments" | "discuss",
      requirements: form.requirements,
    },
    locale,
  );

  const submit = () => {
    if (!validate()) return;
    window.open(whatsappUrl(message, locale), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 lg:px-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {locale === "ar" ? "العودة إلى المنتجات" : "Back to products"}
      </Link>

      <div className="mt-8 rounded-3xl border border-primary/20 bg-card/70 p-6 shadow-[0_20px_40px_-24px_rgba(22,119,255,0.65)] backdrop-blur-sm sm:p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">
              {locale === "ar" ? "استشارة تجارية" : "Commercial consultation"}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {locale === "ar" ? "طلب تركيب وخطة دفع" : "Installation & Payment Request"}
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="size-3.5" />
            {locale === "ar"
              ? "هذا طلب استشارة فقط، لا يضمن الموافقة أو الشروط"
              : "This is a consultation request only; it does not confirm approval or terms"}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ar" ? "اسم العميل" : "Customer name"}
                </label>
                <input value={form.name} onChange={handleChange("name")} className={field} placeholder={locale === "ar" ? "مثل: علي محمد" : "e.g. Ali Mohammed"} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ar" ? "اسم المنشأة أو الورشة" : "Business / workshop name"}
                </label>
                <input value={form.companyName} onChange={handleChange("companyName")} className={field} placeholder={locale === "ar" ? "اسم المنشأة" : "Business name"} />
                {errors.companyName && <p className="mt-1 text-xs text-destructive">{errors.companyName}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ar" ? "الهاتف / واتساب" : "Mobile / WhatsApp"}
                </label>
                <input value={form.phone} onChange={handleChange("phone")} className={field} placeholder={locale === "ar" ? "+966500000000" : "+966500000000"} />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ar" ? "المدينة أو موقع التوصيل" : "City / delivery location"}
                </label>
                <input value={form.city} onChange={handleChange("city")} className={field} placeholder={locale === "ar" ? "الرياض" : "Riyadh"} />
                {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ar" ? "المنتج المختار" : "Selected 20L product"}
                </label>
                <select value={form.productSlug} onChange={handleChange("productSlug")} className={field}>
                  {GALLON_PRODUCTS.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.productSlug && <p className="mt-1 text-xs text-destructive">{errors.productSlug}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ar" ? "الكمية المطلوبة" : "Required quantity"}
                </label>
                <input type="number" min={1} value={form.quantity} onChange={handleChange("quantity")} className={field} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ar" ? "هل تحتاج تركيب؟" : "Installation required"}
                </label>
                <select value={form.installation} onChange={handleChange("installation")} className={field}>
                  <option value="yes">{locale === "ar" ? "نعم" : "Yes"}</option>
                  <option value="no">{locale === "ar" ? "لا" : "No"}</option>
                  <option value="consultation">{locale === "ar" ? "أحتاج إلى استشارة" : "Need consultation"}</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {locale === "ar" ? "تفضيل الدفع" : "Payment preference"}
                </label>
                <select value={form.payment} onChange={handleChange("payment")} className={field}>
                  <option value="full">{locale === "ar" ? "الدفع الكامل" : "Full payment"}</option>
                  <option value="installments">{locale === "ar" ? "خطة تقسيط" : "Installment plan"}</option>
                  <option value="discuss">{locale === "ar" ? "مناقشة الخيارات المتاحة" : "Discuss available options"}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {locale === "ar" ? "متطلبات إضافية" : "Additional requirements"}
              </label>
              <textarea
                value={form.requirements}
                onChange={handleChange("requirements")}
                className={`${field} min-h-[120px] py-3`}
                placeholder={locale === "ar" ? "أضف أي تفاصيل مثل الموقع أو التوزيع أو مواعيد التوصيل..." : "Add any details such as delivery timing, installation notes, or quantity requirements..."}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="flex size-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <Building2 className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">20L</p>
                <p className="font-semibold text-foreground">{selectedProduct?.name ?? "20L commercial product"}</p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-primary/20 bg-[#090b10] p-3">
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.name ?? "20L product"}
                className="h-64 w-full rounded-xl object-contain"
              />
            </div>

            <div className="mt-5 space-y-3 rounded-2xl border border-border bg-background/40 p-4 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <Wrench className="mt-0.5 size-4 text-primary" />
                {locale === "ar"
                  ? "يمكن التحقق من خدمات التركيب والمواعيد في وقت لاحق عبر فريق AutoUp. لا يتم تأكيد أي خطة دفع أو رسوم إلا بعد مراجعة الطلب."
                  : "Installation service availability and schedule can be confirmed later by the AutoUp team. No payment plan, fee, or schedule is confirmed until reviewed."}
              </p>
              <p className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 size-4 text-primary" />
                {locale === "ar"
                  ? "يتم تجهيز الرسالة عبر واتساب وتحتوي على تفاصيل المنتج والكمية واحتياجات التركيب والدفعات."
                  : "The inquiry is prepared in WhatsApp format and includes product, quantity, installation, and payment details."}
              </p>
            </div>

            <Button variant="hero" size="xl" className="mt-6 w-full" onClick={submit}>
              <MessageCircle className="mr-2 size-4" />
              {locale === "ar" ? "إرسال الطلب عبر واتساب" : "Submit Request via WhatsApp"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
