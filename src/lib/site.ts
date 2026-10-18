// Central business configuration — update contact details here only.
export const SITE = {
  name: "AutoUp",
  tagline: "Care in Every Mile",
  whatsappLocal: "0558604161",
  // TODO: confirm the international country code with the business before launch.
  whatsappCountryCode: "971",
  phoneDisplay: "055 860 4161",
  email: "", // add a real email to show it on the site
  address: "Address to be confirmed",
  hours: "Business hours to be confirmed",
};

export function whatsappNumber() {
  const digits = SITE.whatsappLocal.replace(/\D/g, "").replace(/^0+/, "");
  return `${SITE.whatsappCountryCode}${digits}`;
}

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${whatsappNumber()}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
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
  products: { name: string; qty: number; variant?: string | undefined }[];
  services?: string[];
  notes?: string;
  delivery?: string;
};

export function buildQuoteMessage(d: QuoteData) {
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
      ? d.products.map((p) => `- ${p.name}${p.variant ? ` (${p.variant})` : ""} × ${p.qty}`)
      : ["General Product Inquiry"]),
  );

  if (d.notes?.trim()) {
    lines.push("", `Requirements & Message:\n${d.notes.trim()}`);
  }

  lines.push(
    "",
    "Please share product availability, wholesale pricing, and supply information.",
    "",
    "Thank you."
  );
  return lines.join("\n");
}
