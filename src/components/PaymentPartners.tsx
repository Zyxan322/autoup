import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/lib/i18n";
import emkanLogo from "@/assets/payments icons/images.png";
import madfuLogo from "@/assets/payments icons/images (2).png";
import misPayLogo from "@/assets/payments icons/images (1).png";
import neoLogo from "@/assets/payments icons/images (3).png";
import tabbyLogo from "@/assets/payments icons/images (1).jfif";
import tamaraLogo from "@/assets/payments icons/images.jfif";

const PAYMENT_METHODS = [
  { name: "Tabby", logo: tabbyLogo, width: 708, height: 282 },
  { name: "Tamara", logo: tamaraLogo, width: 738, height: 240 },
  { name: "Neo", logo: neoLogo, width: 600, height: 300 },
  { name: "Emkan", logo: emkanLogo, width: 300, height: 300 },
  { name: "MIS Pay", logo: misPayLogo, width: 447, height: 447 },
  { name: "Madfu", logo: madfuLogo, width: 576, height: 192 },
] as const;

export function PaymentPartners() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      aria-labelledby="payment-partners-title"
      className="relative overflow-hidden border-b border-slate-200 bg-slate-50/70 py-10 sm:py-12 lg:py-14"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
      />
      <div className="page-inner">
        <div className="flex flex-col items-center text-center">
          <Reveal className="payment-partners-intro mx-auto max-w-2xl">
            <h2
              id="payment-partners-title"
              className="font-display text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl"
            >
              {isArabic ? "وسائل الدفع المقبولة" : "WE ACCEPT"}
            </h2>
            <span
              aria-hidden="true"
              className="mx-auto mt-3 block h-1 w-12 rounded-full bg-primary"
            />
            <p className="mt-3 font-display text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
              {isArabic
                ? "خيارات دفع مرنة لراحتك"
                : "Flexible Payment Options for Your Convenience"}
            </p>
          </Reveal>

          <Reveal className="payment-partners-reveal mt-7 w-full max-w-6xl sm:mt-8" delay={100}>
            <div
              role="list"
              aria-label={isArabic ? "شركاء الدفع" : "Payment partners"}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
            >
              {PAYMENT_METHODS.map(({ name, logo, width, height }, index) => (
                <div
                  key={name}
                  role="listitem"
                  className="payment-partner-tile group relative flex min-h-[5.5rem] items-center justify-center overflow-hidden rounded-[8px] border border-slate-200 bg-white px-3 py-3 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-white hover:shadow-[0_18px_30px_-20px_rgba(15,23,42,0.35)] sm:min-h-24 sm:px-4"
                  style={{ "--partner-delay": `${index * 75}ms` } as CSSProperties}
                >
                  <img
                    src={logo}
                    alt={name}
                    width={width}
                    height={height}
                    loading="lazy"
                    decoding="async"
                    className="max-h-14 max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.08]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-1/2 bottom-0 h-0.5 w-6 -translate-x-1/2 bg-primary/20 transition-all duration-300 group-hover:w-3/5 group-hover:bg-primary"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}