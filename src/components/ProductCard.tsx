import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/catalog";
import { useLocale, translateText } from "@/lib/i18n";

export function ProductCard({
  p,
  image,
  action = "inquire",
}: {
  p: Product;
  image?: string;
  action?: "inquire" | "cart";
}) {
  const { add, setOpen } = useCart();
  const { locale } = useLocale();
  const [qty, setQty] = useState(1);
  // Always prefer the real product photo from the catalog record
  const cardImage = p.image || image || "";

  return (
    <article className="product-card-compact group flex h-full flex-col">
      <div className="flex flex-1 flex-col">
        {/* Image area — object-contain so full label and container remain visible */}
        <Link
          to="/products/$slug"
          params={{ slug: p.slug }}
          aria-label={
            locale === "ar"
              ? `عرض تفاصيل ${translateText(p.name, locale)}`
              : `View details for ${p.name}`
          }
          className="product-card-image-link"
        >
          <img
            src={cardImage}
            alt={translateText(p.name, locale)}
            width={480}
            height={540}
            loading="lazy"
            decoding="async"
            className="product-card-img"
          />
          {/* Category badge */}
          <span className="absolute bottom-2 left-2.5 rounded-full bg-black/70 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm border border-white/10">
            {translateText(p.category, locale)}
          </span>
          {/* Product code badge */}
          {p.code && (
            <span className="absolute top-2 right-2.5 rounded-full bg-primary/90 px-2 py-0.5 text-[0.6rem] font-bold tracking-wider text-white shadow-md">
              {p.code}
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col p-3.5 pb-0">
          <Link
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="font-display text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
          >
            {translateText(p.name, locale)}
          </Link>
          <p className="product-card-description mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {translateText(p.short, locale)}
          </p>

          <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[0.7rem] text-muted-foreground">
            <span className="font-medium text-foreground/80">{p.variants[0]}</span>
            <span className="text-[0.65rem] font-semibold text-primary/90 uppercase tracking-wide">
              {typeof p.price === "number"
                ? p.price
                : locale === "ar"
                  ? "السعر عند الطلب"
                  : "Price on request"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-2 p-3.5 pt-3">
        {/* Quantity selector */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[0.68rem] font-medium text-muted-foreground">
            {locale === "ar" ? "الكمية:" : "Quantity:"}
          </span>
          <div className="flex h-7 items-center rounded-md border border-input bg-background/50">
            <button
              type="button"
              aria-label={locale === "ar" ? "تقليل الكمية" : "Decrease quantity"}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-2 py-0.5 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
            >
              <Minus className="size-2.5" />
            </button>
            <span className="w-5 text-center text-xs font-semibold text-foreground">{qty}</span>
            <button
              type="button"
              aria-label={locale === "ar" ? "زيادة الكمية" : "Increase quantity"}
              onClick={() => setQty((q) => q + 1)}
              className="px-2 py-0.5 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
            >
              <Plus className="size-2.5" />
            </button>
          </div>
        </div>

        {/* Action Buttons: View Details & Request Pricing / Inquire */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="product-card-action h-auto min-h-10 whitespace-normal border-border/80 bg-background/40 px-1.5 py-1.5 text-[0.68rem] font-semibold leading-tight hover:border-primary/60 hover:text-primary"
          >
            <Link to="/products/$slug" params={{ slug: p.slug }}>
              <FileText className="mr-1 size-3 shrink-0" />
              {locale === "ar" ? "عرض التفاصيل" : "View Details"}
            </Link>
          </Button>

          <Button
            variant="hero"
            size="sm"
            className="product-card-action h-auto min-h-10 whitespace-normal px-1.5 py-1.5 text-[0.68rem] font-semibold leading-tight shadow-sm hover:shadow-[0_0_12px_rgba(22,119,255,0.45)]"
            onClick={() => {
              add({ slug: p.slug, name: p.name, variant: p.variants[0], qty, image: cardImage });
              toast.success(
                action === "cart"
                  ? locale === "ar"
                    ? `تمت إضافة ${translateText(p.name, locale)} إلى السلة (${qty})`
                    : `${p.name} added to cart (${qty})`
                  : locale === "ar"
                    ? `تمت إضافة ${translateText(p.name, locale)} إلى قائمة عرض السعر (${qty})`
                    : `${p.name} added to quote list (${qty})`,
              );
              if (action === "cart") setOpen(true);
              setQty(1);
            }}
          >
            <ShoppingBag className="mr-1 size-3 shrink-0" />
            {action === "cart"
              ? locale === "ar"
                ? "أضف إلى السلة"
                : "Add to Cart"
              : locale === "ar"
                ? "استفسر"
                : "Inquire"}
          </Button>
        </div>
      </div>
    </article>
  );
}
