import { Link } from "@tanstack/react-router";
import { FileText, MessageCircle, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useLocale, translateText } from "@/lib/i18n";

export function ProfessionalGallonCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const { locale } = useLocale();

  const addToQuote = () => {
    add({
      slug: product.slug,
      name: product.name,
      variant: "20 L",
      qty: 1,
      image: product.image,
    });
    toast.success(
      locale === "ar"
        ? `تمت إضافة ${translateText(product.name, locale)} إلى قائمة عرض السعر`
        : `${product.name} added to the quote list`,
    );
    setOpen(true);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/25 bg-card/80 shadow-lg shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_18px_44px_-22px_rgba(22,119,255,0.6)]">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        aria-label={
          locale === "ar"
            ? `تفاصيل ${translateText(product.name, locale)}`
            : `Product details: ${product.name}`
        }
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-white/10 bg-[#090b10] p-5 sm:p-7"
      >
        <img
          src={product.image}
          alt={translateText(product.name, locale)}
          width={640}
          height={480}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-primary/40 bg-black/70 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
          20 L
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {translateText(product.category, locale)}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold text-foreground">
          {translateText(product.name, locale)}
        </h3>
        <p className="mt-2 min-h-[3.75rem] line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {translateText(product.short, locale)}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
          <span className="font-semibold text-foreground/80">
            {locale === "ar" ? "السعة" : "Capacity"}
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
            20 L
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {locale === "ar" ? "السعر عند الطلب" : "Price on request"}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button asChild variant="outline" size="sm" className="h-10 px-2 text-xs">
            <Link to="/products/$slug" params={{ slug: product.slug }}>
              <FileText className="mr-1.5 size-3.5" />
              {locale === "ar" ? "تفاصيل المنتج" : "Product Details"}
            </Link>
          </Button>
          <Button variant="line" size="sm" className="h-10 px-2 text-xs" onClick={addToQuote}>
            <MessageCircle className="mr-1.5 size-3.5" />
            {locale === "ar" ? "اطلب عرض سعر" : "Request a Quote"}
          </Button>
        </div>
        <Button asChild variant="hero" size="sm" className="mt-2 h-10 w-full text-xs">
          <Link to="/quote/installation" search={{ product: product.slug }}>
            <Wrench className="mr-1.5 size-3.5" />
            {locale === "ar"
              ? "طلب استشارة للتركيب وخيارات الدفع"
              : "Request Installation & Payment Plan"}
          </Link>
        </Button>
      </div>
    </article>
  );
}
