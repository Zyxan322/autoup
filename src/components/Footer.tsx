import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, Copy, Landmark, MapPin, Phone, ReceiptText } from "lucide-react";
import arabicLogo from "@/assets/autoup-final-logo.webp";
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
      className="autoup-footer relative isolate overflow-hidden border-t text-white"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--footer-pointer-x",
          `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
        );
        event.currentTarget.style.setProperty(
          "--footer-pointer-y",
          `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
        );
      }}
    >
      <span aria-hidden="true" className="autoup-footer__ambient-layer" />
      <div className="autoup-footer__main relative z-10 mx-auto max-w-7xl px-4 py-7 sm:px-6 md:py-8 lg:px-8">
        <div className="autoup-footer__grid grid gap-4 sm:gap-x-8 sm:gap-y-6 md:items-start">
          <section
            aria-labelledby="footer-contact-heading"
            className="autoup-footer__column autoup-footer__contact order-2 text-start"
          >
            <h2
              id="footer-contact-heading"
              className="autoup-footer__heading mb-5 text-lg font-bold text-white"
            >
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </h2>

            <div className="space-y-3 text-sm text-white/75">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/55">
                {isArabic ? "قسم المبيعات" : "Sales Department"}
              </h3>

              <a
                href={BUSINESS_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="autoup-footer__contact-link flex min-h-11 items-center justify-start gap-3 px-1 py-2 text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <img
                    src={whatsappIcon}
                    alt=""
                    aria-hidden="true"
                    className="size-4 object-contain"
                  />
                </span>
                <span dir="ltr">{BUSINESS_PHONE_DISPLAY}</span>
              </a>

              <a
                href={`tel:${BUSINESS_PHONE}`}
                className="autoup-footer__contact-link flex min-h-11 items-center justify-start gap-3 px-1 py-2 text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-white/5 text-primary">
                  <Phone aria-hidden="true" className="size-4" />
                </span>
                <span dir="ltr">{BUSINESS_PHONE_LOCAL}</span>
              </a>

              <div className="flex items-center justify-start gap-3 pt-1 text-sm leading-6 text-white/65">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
                <span>{isArabic ? SITE.address.ar : SITE.address.en}</span>
              </div>
            </div>
          </section>

          <nav
            aria-labelledby="footer-links-heading"
            className="autoup-footer__column autoup-footer__navigation order-3 text-start"
          >
            <h2
              id="footer-links-heading"
              className="autoup-footer__heading mb-5 text-lg font-bold text-white"
            >
              {isArabic ? "روابط مهمة" : "Important Links"}
            </h2>
            <ul className="flex flex-col gap-1 text-sm text-white/75">
              {importantLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="autoup-footer__link group inline-flex min-h-9 items-center gap-2 rounded-md px-2 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-primary/70 transition-transform group-hover:scale-125"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section
            aria-labelledby="footer-brand-heading"
            className="autoup-footer__column autoup-footer__brand order-1 flex flex-col items-start gap-3 text-start md:order-1"
          >
            <Link
              to="/"
              aria-label="AutoUp"
              className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={arabicLogo}
                alt="AutoUp"
                width={isArabic ? 900 : 1200}
                height={isArabic ? 650 : 896}
                loading="lazy"
                decoding="async"
                className="autoup-footer__logo w-auto object-contain"
              />
            </Link>
            <h2 id="footer-brand-heading" className="sr-only">
              AutoUp
            </h2>
            <p className="max-w-sm text-sm leading-7 text-white/70">
              {isArabic
                ? "مورد متخصص لمنتجات العناية الاحترافية بالسيارات، ومواد التنظيف المركزة، وحلول التوريد التجاري."
                : "A specialist supplier of professional automotive care products, concentrated cleaners, and commercial supply solutions."}
            </p>
          </section>
        </div>
      </div>

      <section
        aria-labelledby="footer-business-details"
        className="autoup-footer__business relative z-10 border-t border-white/[0.08]"
      >
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <h2 id="footer-business-details" className="sr-only">
            {isArabic ? "معلومات المنشأة والدفع" : "Business Information & Payment Details"}
          </h2>
          <div className="autoup-footer__details grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-0">
            <div className="autoup-footer__detail flex items-start gap-2.5">
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
            <div className="autoup-footer__detail flex items-start gap-2.5">
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
            <div className="autoup-footer__detail flex items-start gap-2.5">
              <Landmark aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <h3 className="text-xs font-medium text-white/55">
                  {isArabic ? "اسم البنك" : "Bank Name"}
                </h3>
                <p dir="ltr" className="mt-1 text-sm text-white/85">
                  Alinma Bank
                </p>
              </div>
            </div>
            <div className="autoup-footer__detail flex min-w-0 items-start gap-2.5">
              <Landmark aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-medium text-white/55">
                  {isArabic ? "التحويل البنكي · رقم الآيبان" : "Bank Transfer · IBAN"}
                </h3>
                <div className="mt-1 flex min-w-0 items-center gap-2">
                  <p dir="ltr" className="min-w-0 flex-1 truncate text-sm text-white/85">
                    {BUSINESS_IBAN}
                  </p>
                  <button
                    type="button"
                    onClick={copyIban}
                    className="autoup-footer__copy-button inline-flex shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={isArabic ? "نسخ رقم الآيبان" : "Copy IBAN"}
                  >
                    <Copy className="size-3.5" />
                    {copyStatus === "copied"
                      ? isArabic
                        ? "تم"
                        : "Copied"
                      : isArabic
                        ? "نسخ"
                        : "Copy"}
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

          <div className="autoup-footer__bottom mt-4 flex flex-col gap-4 border-t border-white/[0.08] pt-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-xs text-white/50">
                {isArabic ? "طرق الدفع المقبولة" : "Accepted Payment Methods"}
              </span>
              <div className="autoup-footer__payments grid w-fit grid-cols-3 gap-2 sm:grid-cols-6">
                {PAYMENT_METHODS.map(({ name, logo, width, height }) => (
                  <span
                    key={name}
                    className="autoup-footer__payment-tile flex h-8 w-12 items-center justify-center rounded-md bg-white px-1.5"
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
            <p className="text-xs leading-relaxed text-white/60">
              © {new Date().getFullYear()} AutoUp.{" "}
              {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
