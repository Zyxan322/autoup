import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import { useLocale } from "@/lib/i18n";

const DEFAULT_B2B_MESSAGE =
  "Hello AutoUp, I am interested in your automotive cleaning products for business use. Please share product availability and pricing information.";

export function StickyWhatsApp() {
  const { locale } = useLocale();
  const url = whatsappUrl(
    locale === "ar"
      ? "مرحباً AutoUp، أهتم بمنتجات تنظيف السيارات للاستخدام التجاري. يرجى تزويدي بمعلومات توفر المنتجات والأسعار."
      : DEFAULT_B2B_MESSAGE,
  );

  return (
    <aside
      aria-label={locale === "ar" ? "تواصل مع AutoUp عبر واتساب" : "Contact AutoUp on WhatsApp"}
      className="fixed bottom-6 right-6 z-40 print:hidden"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={locale === "ar" ? "تواصل مع AutoUp عبر واتساب" : "Contact AutoUp on WhatsApp"}
        className="group relative flex items-center justify-center size-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:bg-[#20ba59] hover:shadow-[0_12px_28px_rgba(37,211,102,0.6)] hover:scale-108 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Pulsing ring behind button */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10"
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <MessageCircle className="size-7 fill-white stroke-none transition-transform duration-300 group-hover:scale-110" />

        {/* Tooltip on hover (desktop) */}
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3 hidden md:flex items-center whitespace-nowrap rounded-lg bg-neutral-900/95 border border-white/10 px-3 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        >
          {locale === "ar" ? "تحدث مع AutoUp عبر واتساب" : "Chat with AutoUp on WhatsApp"}
        </span>
      </a>
    </aside>
  );
}
