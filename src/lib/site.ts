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
  phone: string;
  city: string;
  email?: string;
  requestType: string;
  products: { name: string; qty: number; variant?: string | undefined }[];
  services: string[];
  notes?: string;
  delivery?: string;
};

export function buildQuoteMessage(d: QuoteData) {
  const lines = [
    "Hello AutoUp,",
    "",
    "I would like to request a quotation.",
    "",
    `Customer Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `City: ${d.city}`,
  ];
  if (d.email) lines.push(`Email: ${d.email}`);
  lines.push(`Request Type: ${d.requestType}`, "", "Requested Products:");
  lines.push(
    ...(d.products.length
      ? d.products.map((p) => `${p.name}${p.variant ? ` (${p.variant})` : ""} × ${p.qty}`)
      : ["None"]),
  );
  lines.push("", "Requested Services:", d.services.length ? d.services.join(", ") : "None");
  lines.push("", "Additional Requirements:", d.notes?.trim() || "None");
  if (d.delivery?.trim()) lines.push("", "Delivery / Service Details:", d.delivery.trim());
  lines.push("", "Please share your quotation, availability and delivery/service details.", "", "Thank you.");
  return lines.join("\n");
}
