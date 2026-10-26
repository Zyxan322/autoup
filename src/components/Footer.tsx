import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import logo from "@/assets/logo.webp";
import { SITE } from "@/lib/site";
import { CATEGORIES } from "@/lib/catalog";
import { useLocale } from "@/lib/i18n";

export function Footer() {
  const { locale } = useLocale();
  const productCategories = CATEGORIES.filter((c) => c !== "All Products");
  const businessValueAlignment = locale === "ar" ? "right" : "left";

  return (
    <footer className="bg-[#05070a] text-white border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-10 lg:px-6 lg:py-14">
        <div>
          <Link
            to="/"
            aria-label="AutoUp"
            className="inline-block transition-opacity hover:opacity-90"
          >
            <img
              src={logo}
              alt="AutoUp"
              width={360}
              height={450}
              loading="lazy"
              decoding="async"
              className="h-20 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/70 leading-relaxed">
            B2B supplier of professional automotive cleaning products, concentrated shampoos, waxes,
            and specialized chemicals for commercial wash operations and detailing studios.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[0.68rem] font-medium text-white/80">
              Commercial Bulk Supply
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[0.68rem] font-medium text-primary">
              Professional Formulations
            </span>
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-4 text-primary">Explore</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary transition-colors">
                Products Catalog
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-primary transition-colors">
                Visual Gallery
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors">
                About AutoUp
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Wholesale Contact
              </Link>
            </li>
            <li>
              <Link
                to="/quote"
                className="hover:text-primary transition-colors font-medium text-white"
              >
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4 text-primary">Product Categories</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {productCategories.map((c) => (
              <li key={c}>
                <Link
                  to="/products"
                  search={{ cat: c }}
                  className="hover:text-primary transition-colors"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4 text-primary">Direct Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <a
                href={`tel:${SITE.whatsappLocal}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="size-4 text-primary shrink-0" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </li>
            <li className="text-xs text-white/60">{SITE.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4 text-primary">{locale === "ar" ? "العنوان" : "Address"}</h4>
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {locale === "ar" ? SITE.address.ar : SITE.address.en}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-6">
          <p>
            © {new Date().getFullYear()} AutoUp.{" "}
            {locale === "ar"
              ? "عناية ترافقك في كل رحلة. جميع الحقوق محفوظة."
              : `${SITE.tagline}. All rights reserved.`}
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/quote" className="hover:text-white transition-colors">
              Instant Quote
            </Link>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="footer-business-details"
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="border-t border-white/10 bg-[#05070a]"
      >
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 sm:pb-28 lg:px-6">
          <h2 id="footer-business-details" className="eyebrow mb-6 text-primary">
            {locale === "ar" ? "معلومات المنشأة والدفع" : "Business Information & Payment Details"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-sm font-semibold text-white">
                {locale === "ar" ? "قسم المبيعات" : "Sales Department"}
              </h3>
              <a
                href="tel:+966548843368"
                dir="ltr"
                style={{ textAlign: businessValueAlignment }}
                className="mt-3 block w-fit text-sm text-white/80 transition-colors hover:text-primary"
              >
                +966 54 884 3368
              </a>
              <p
                dir="ltr"
                style={{ textAlign: businessValueAlignment }}
                className="mt-1 text-sm text-white/60"
              >
                0548843368
              </p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h3 className="text-sm font-semibold text-white">
                {locale === "ar" ? "السجل التجاري" : "Commercial Registration"}
              </h3>
              <p
                dir="ltr"
                style={{ textAlign: businessValueAlignment }}
                className="mt-3 text-sm text-white/70"
              >
                7054513028
              </p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h3 className="text-sm font-semibold text-white">
                {locale === "ar" ? "الرقم الضريبي" : "VAT Registration"}
              </h3>
              <p
                dir="ltr"
                style={{ textAlign: businessValueAlignment }}
                className="mt-3 text-sm text-white/70"
              >
                314834518600003
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 sm:col-span-2 lg:col-span-1">
              <h3 className="text-sm font-semibold text-white">
                {locale === "ar" ? "تفاصيل التحويل البنكي" : "Bank Transfer Details"}
              </h3>
              <p className="mt-3 text-sm text-white/70">Alinma Bank</p>
              <p className="mt-1 text-xs text-white/50">IBAN</p>
              <p
                dir="ltr"
                style={{ textAlign: businessValueAlignment }}
                className="mt-1 select-all break-all font-mono text-sm text-white/80"
              >
                SA1305000068207583708000
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
