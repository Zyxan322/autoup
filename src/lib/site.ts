// Central business configuration — update contact details here only.
import { translateText, type Locale } from "@/lib/i18n";
import { isTwentyLitreVariant } from "@/lib/installments";

export const SITE = {
  name: "AutoUp",
  tagline: "Care in Every Mile",
  whatsappLocal: "548843368",
  whatsappCountryCode: "966",
  phoneDisplay: "+966 54 884 3368",
  email: "", // add a real email to show it on the site
  address: {
    ar: "حي الربيع، بريدة 52361",
    en: "Al Rabie District, Buraydah 52361",
  },
  hours: "Business hours to be confirmed",
};

export function whatsappNumber() {
  const digits = SITE.whatsappLocal.replace(/\D/g, "").replace(/^0+/, "");
  return `${SITE.whatsappCountryCode}${digits}`;
}

export function whatsappUrl(message?: string, locale: Locale = "en") {
  const base = `https://wa.me/${whatsappNumber()}`;
  const localizedMessage = message && locale === "ar" ? translateText(message, locale) : message;
  return localizedMessage ? `${base}?text=${encodeURIComponent(localizedMessage)}` : base;
}

export type QuoteData = {
  name: string;
  companyName?: string;
  phone: string;
  city: string;
  country?: string;
  email?: string;
  requestType?: string;
  orderVolume?: string;
  products: {
    name: string;
    qty: number;
    variant?: string | undefined;
    paymentOption?: "full" | "installment-quote" | undefined;
    installmentMonths?: 3 | 5 | undefined;
  }[];
  services?: string[];
  notes?: string;
  delivery?: string;
};

export type InstallationPaymentInquiry = {
  name: string;
  companyName: string;
  phone: string;
  city: string;
  productName: string;
  quantity: number;
  installation: "yes" | "no" | "consultation";
  payment: "full" | "installments" | "discuss";
  installmentMonths?: 3 | 5;
  requirements: string;
};

export function buildInstallationPaymentInquiryMessage(
  data: InstallationPaymentInquiry,
  locale: Locale = "en",
) {
  const arabic = locale === "ar";
  const installation = {
    yes: arabic ? "نعم" : "Yes",
    no: arabic ? "لا" : "No",
    consultation: arabic ? "أحتاج إلى استشارة" : "Need consultation",
  }[data.installation];
  const payment =
    data.payment === "installments"
      ? arabic
        ? `خطة تقسيط لمدة ${data.installmentMonths ?? 3} أشهر`
        : `${data.installmentMonths ?? 3}-month installment plan requested`
      : {
          full: arabic ? "الدفع الكامل" : "Full payment",
          discuss: arabic ? "مناقشة الخيارات المتاحة" : "Discuss available options",
        }[data.payment];
  const lines = [
    arabic ? "مرحباً AutoUp،" : "Hello AutoUp,",
    "",
    arabic
      ? "أرغب في استشارة تجارية بشأن منتج 20 لترًا."
      : "I would like a commercial consultation about a 20 L product.",
    "",
    `${arabic ? "الاسم" : "Name"}: ${data.name.trim()}`,
    `${arabic ? "الشركة / المنشأة" : "Business / Workshop"}: ${data.companyName.trim()}`,
    `${arabic ? "الهاتف / واتساب" : "Mobile / WhatsApp"}: ${data.phone.trim()}`,
    `${arabic ? "المدينة / موقع التوصيل" : "City / Delivery location"}: ${data.city.trim()}`,
    `${arabic ? "المنتج" : "Product"}: ${data.productName} (20 L)`,
    `${arabic ? "الكمية المطلوبة" : "Required quantity"}: ${data.quantity}`,
    `${arabic ? "التركيب / الإعداد" : "Installation / setup"}: ${installation}`,
    `${arabic ? "تفضيل الدفع" : "Payment preference"}: ${payment}`,
  ];
  if (data.requirements.trim()) {
    lines.push(
      "",
      `${arabic ? "متطلبات إضافية" : "Additional requirements"}:`,
      data.requirements.trim(),
    );
  }
  lines.push(
    "",
    arabic
      ? "يرجى تأكيد توفر المنتج وإمكانية خدمات التركيب وخيارات الدفع وشروطها. هذا طلب استشارة فقط، ولا يؤكد توفر أي خدمة أو الموافقة على تمويل أو شروط دفع."
      : "Please confirm product availability, any installation service availability, and applicable payment options and terms. This is a consultation request only; it does not confirm service availability, financing approval, or payment terms.",
  );
  return lines.join("\n");
}

export function buildQuoteMessage(d: QuoteData, locale: Locale = "en") {
  const lines = [
    "Hello AutoUp,",
    "",
    "I would like to request a wholesale quotation for automotive cleaning products for business use.",
    "",
    `Contact Name: ${d.name}`,
  ];
  if (d.companyName?.trim()) lines.push(`Company / Business: ${d.companyName.trim()}`);
  lines.push(`Phone / WhatsApp: ${d.phone}`);
  if (d.email?.trim()) lines.push(`Business Email: ${d.email.trim()}`);
  lines.push(`Location: ${d.city}${d.country ? `, ${d.country}` : ""}`);
  if (d.orderVolume?.trim()) lines.push(`Estimated Order Volume: ${d.orderVolume.trim()}`);

  lines.push("", "Requested Products:");
  lines.push(
    ...(d.products.length
      ? d.products.map((p) => {
          const base = `- ${p.name}${p.variant ? ` (${p.variant})` : ""} × ${p.qty}`;
          if (!isTwentyLitreVariant(p.variant)) return base;
          return p.paymentOption === "installment-quote"
            ? `${base} — Installment quote requested${p.installmentMonths ? ` (${p.installmentMonths} months)` : " (terms to be confirmed)"}`
            : `${base} — Full payment`;
        })
      : ["General Product Inquiry"]),
  );

  if (d.notes?.trim()) {
    lines.push("", `Requirements & Message:\n${d.notes.trim()}`);
  }

  lines.push(
    "",
    "Please share product availability, wholesale pricing, and supply information.",
    "",
    "Thank you.",
  );
  if (locale === "en") return lines.join("\n");

  let productLineIndex = 0;
  return lines
    .map((line) => {
      if (line.startsWith("Contact Name: ")) return `اسم مسؤول التواصل: ${line.slice(14)}`;
      if (line.startsWith("Company / Business: ")) return `الشركة / المنشأة: ${line.slice(20)}`;
      if (line.startsWith("Phone / WhatsApp: ")) return `الهاتف / واتساب: ${line.slice(18)}`;
      if (line.startsWith("Business Email: "))
        return `البريد الإلكتروني للمنشأة: ${line.slice(16)}`;
      if (line.startsWith("Location: ")) return `الموقع: ${line.slice(10)}`;
      if (line.startsWith("Estimated Order Volume: "))
        return `حجم الطلب التقديري: ${line.slice(24)}`;
      if (line.startsWith("Requirements & Message:\n")) {
        return `المتطلبات والرسالة:\n${line.slice("Requirements & Message:\n".length)}`;
      }
      if (productLineIndex < d.products.length && line.startsWith("- ") && line.includes(" × ")) {
        const product = d.products[productLineIndex++];
        if (product) {
          const option = isTwentyLitreVariant(product.variant)
            ? product.paymentOption === "installment-quote"
              ? ` — طلب عرض تقسيط${product.installmentMonths ? ` لمدة ${product.installmentMonths} أشهر` : " (الشروط بانتظار التأكيد)"}`
              : " — الدفع الكامل"
            : "";
          return `- ${translateText(product.name, locale)}${product.variant ? ` (${product.variant})` : ""} × ${product.qty}${option}`;
        }
        return `- ${translateText(line.slice(2), locale)}`;
      }
      return translateText(line, locale);
    })
    .join("\n");
}
