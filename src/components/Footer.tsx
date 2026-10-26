import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, Check, Copy, Landmark, MapPin, Phone, ReceiptText } from "lucide-react";
import logo from "@/assets/logo.webp";
import whatsappIcon from "@/assets/products/download (41).svg";
import { PAYMENT_METHODS } from "@/components/PaymentPartners";
import { SITE } from "@/lib/site";
import { useLocale } from "@/lib/i18n";

const BUSINESS_PHONE = "+966548843368";
const BUSINESS_PHONE_DISPLAY = "+966 54 884 3368";
const BUSINESS_PHONE_LOCAL = "0548843368";
const BUSINESS_WHATSAPP_URL = `https://wa.me/${BUSINESS_PHONE.replace("+", "")}`;
const BUSINESS_IBAN = "SA1305000068207583708000";

export function Footer() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyIban() {
    try {
      await navigator.clipboard.writeText(BUSINESS_IBAN);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  const importantLinks = [
    { to: "/" as const, label: isArabic ? "الرئيسية" : "Home" },
    { to: "/products" as const, label: isArabic ? "كتالوج المنتجات" : "Product Catalog" },
    { to: "/about" as const, label: isArabic ? "عن AutoUp" : "About AutoUp" },
    { to: "/contact" as const, label: isArabic ? "تواصل معنا" : "Contact Us" },
    { to: "/quote" as const, label: isArabic ? "اطلب عرض سعر" : "Request a Quote" },
  ];

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="border-t border-white/10 bg-[#080b11] text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-9 px-4 py-10 sm:px-6 md:grid-cols-3 md:gap-8 md:py-12 lg:px-6">
        <section aria-labelledby="footer-brand-heading">
          <Link
            to="/"
            aria-label="AutoUp"
            className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={logo}
              alt="AutoUp"
              width={360}
              height={450}
              loading="lazy"
              decoding="async"
              className="h-14 w-auto object-contain"
            />
          </Link>
          <h2 id="footer-brand-heading" className="sr-only">
            AutoUp
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            {isArabic
              ? "مورد متخصص لمنتجات العناية الاحترافية بالسيارات، ومواد التنظيف المركزة، وحلول التوريد التجاري."
              : "A specialist supplier of professional automotive care products, concentrated cleaners, and commercial supply solutions."}
          </p>
        </section>

        <nav aria-labelledby="footer-links-heading">
          <h2 id="footer-links-heading" className="mb-4 text-sm font-semibold text-white">
            {isArabic ? "روابط مهمة" : "Important Links"}
          </h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/65">
            {importantLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="inline-flex min-h-8 items-center transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="footer-contact-heading">
          <h2 id="footer-contact-heading" className="mb-4 text-sm font-semibold text-white">
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </h2>
          <h3 className="mb-1 text-xs font-medium text-white/55">
            {isArabic ? "قسم المبيعات" : "Sales Department"}
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href={BUSINESS_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-10 items-center gap-3 text-white/75 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <img
                  src={whatsappIcon}
                  alt=""
                  aria-hidden="true"
                  className="size-5 shrink-0 object-contain"
                />
                <span dir="ltr">{BUSINESS_PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${BUSINESS_PHONE}`}
                className="flex min-h-10 items-center gap-3 text-white/75 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0 text-primary" />
                <span dir="ltr">{BUSINESS_PHONE_LOCAL}</span>
              </a>
            </li>
            <li className="flex items-start gap-3 pt-1 text-xs leading-relaxed text-white/50">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary/80" />
              <span>{isArabic ? SITE.address.ar : SITE.address.en}</span>
            </li>
          </ul>
        </section>
      </div>

      <section
        aria-labelledby="footer-business-details"
        className="border-t border-white/10 bg-black/20"
      >
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-6">
          <h2 id="footer-business-details" className="sr-only">
            {isArabic ? "معلومات المنشأة والدفع" : "Business Information & Payment Details"}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0">
            <div className="flex items-start gap-2.5 border-white/10 sm:border-s sm:px-4 sm:first:border-s-0 sm:first:ps-0">
              <Building2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <h3 className="text-xs font-medium text-white/55">
                  {isArabic ? "السجل التجاري" : "Commercial Registration"}
                </h3>
                <p dir="ltr" className="mt-1 text-sm text-white/85">
                  7054513028
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 border-white/10 sm:border-s sm:px-4 sm:first:border-s-0 sm:first:ps-0">
              <ReceiptText aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <h3 className="text-xs font-medium text-white/55">
                  {isArabic ? "الرقم الضريبي" : "VAT Number"}
                </h3>
                <p dir="ltr" className="mt-1 text-sm text-white/85">
                  314834518600003
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 border-white/10 sm:border-s sm:px-4 sm:first:border-s-0 sm:first:ps-0">
              <Landmark aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <h3 className="text-xs font-medium text-white/55">
                  {isArabic ? "اسم البنك" : "Bank Name"}
                </h3>
                <p className="mt-1 text-sm text-white/85">Alinma Bank</p>
              </div>
            </div>
            <div className="flex min-w-0 items-start gap-2.5 border-white/10 sm:border-s sm:px-4 sm:first:border-s-0 sm:first:ps-0">
              <Landmark aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-medium text-white/55">
                  {isArabic ? "التحويل البنكي · رقم الآيبان" : "Bank Transfer · IBAN"}
                </h3>
                <div className="mt-1 flex min-w-0 items-center gap-1.5">
                  <p dir="ltr" className="min-w-0 break-all font-mono text-xs text-white/85">
                    {BUSINESS_IBAN}
                  </p>
                  <button
                    type="button"
                    onClick={copyIban}
                    aria-label={isArabic ? "نسخ رقم الآيبان" : "Copy IBAN"}
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-white/65 transition-colors hover:bg-white/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {copyStatus === "copied" ? (
                      <Check aria-hidden="true" className="size-4 text-emerald-400" />
                    ) : (
                      <Copy aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </div>
                <p
                  role="status"
                  aria-live="polite"
                  className="min-h-4 text-[0.65rem] text-emerald-400"
                >
                  {copyStatus === "copied"
                    ? isArabic
                      ? "تم نسخ رقم الآيبان"
                      : "IBAN copied"
                    : copyStatus === "error"
                      ? isArabic
                        ? "تعذر نسخ رقم الآيبان"
                        : "Could not copy IBAN"
                      : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-xs text-white/50">
                {isArabic ? "طرق الدفع المقبولة" : "Accepted Payment Methods"}
              </span>
              <div className="grid w-fit grid-cols-3 gap-2 sm:grid-cols-6">
                {PAYMENT_METHODS.map(({ name, logo, width, height }) => (
                  <span
                    key={name}
                    className="flex h-8 w-12 items-center justify-center rounded-md bg-white px-1.5"
                  >
                    <img
                      src={logo}
                      alt={name}
                      width={width}
                      height={height}
                      loading="lazy"
                      decoding="async"
                      className="max-h-5 max-w-full object-contain"
                    />
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs leading-relaxed text-white/50">
              © {new Date().getFullYear()} AutoUp.{" "}
              {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
