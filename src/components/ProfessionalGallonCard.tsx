import { Link } from "@tanstack/react-router";
import { FileText, MessageCircle, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useLocale, translateText } from "@/lib/i18n";
import { gallonProductPhoto } from "@/lib/media";

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
    <article className="professional-gallon-card group flex h-full flex-col">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        aria-label={
          locale === "ar"
            ? `تفاصيل ${translateText(product.name, locale)}`
            : `Product details: ${product.name}`
        }
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-border bg-[#f3f6fa] p-3 sm:p-4"
      >
        <img
          src={gallonProductPhoto(product.slug) ?? product.image}
          alt={translateText(product.name, locale)}
          width={640}
          height={480}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-primary/20 bg-white/95 px-2.5 py-1 text-[10px] font-bold text-primary shadow-sm">
          20 L
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          {translateText(product.category, locale)}
        </p>
        <h3 className="mt-1.5 font-display text-base font-bold text-foreground">
          {translateText(product.name, locale)}
        </h3>
        <p className="mt-1.5 min-h-[3rem] line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {translateText(product.short, locale)}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs">
          <span className="font-semibold text-foreground">
            {locale === "ar" ? "السعة" : "Capacity"}
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
            20 L
          </span>
        </div>
        <p className="mt-1.5 text-[10px] text-muted-foreground">
          {locale === "ar" ? "السعر عند الطلب" : "Price on request"}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-1.5 pt-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-9 min-w-0 border-border bg-white px-1.5 text-[10px] text-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary xl:px-1"
          >
            <Link to="/products/$slug" params={{ slug: product.slug }}>
              <FileText className="mr-1 size-3 xl:hidden" />
              {locale === "ar" ? "تفاصيل المنتج" : "Product Details"}
            </Link>
          </Button>
          <Button
            variant="line"
            size="sm"
            className="h-9 min-w-0 border-primary/30 px-1.5 text-[10px] text-primary hover:border-primary/60 hover:bg-primary/5 xl:px-1"
            onClick={addToQuote}
          >
            <MessageCircle className="mr-1 size-3 xl:hidden" />
            {locale === "ar" ? "اطلب عرض سعر" : "Request a Quote"}
          </Button>
        </div>
        <Button
          asChild
          variant="hero"
          size="sm"
          className="mt-1.5 min-h-9 h-auto w-full whitespace-normal py-2 text-[10px] leading-tight xl:px-1.5"
        >
          <Link to="/quote/installation" search={{ product: product.slug }}>
            <Wrench className="mr-1 size-3 xl:hidden" />
            {locale === "ar"
              ? "طلب استشارة للتركيب وخيارات الدفع"
              : "Request Installation & Payment Plan"}
          </Link>
        </Button>
      </div>
    </article>
  );
}
