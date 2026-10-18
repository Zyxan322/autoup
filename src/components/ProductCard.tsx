import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/catalog";

export function ProductCard({ p, image }: { p: Product; image?: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  // Always prefer the real product photo from the catalog record
  const cardImage = p.image || image || "";

  return (
    <article className="product-card-compact group">
      {/* Image area — object-contain so full label and container remain visible */}
      <Link
        to="/products/$slug"
        params={{ slug: p.slug }}
        aria-label={`View ${p.name}`}
        className="product-card-image-link"
      >
        <img
          src={cardImage}
          alt={p.name}
          width={480}
          height={540}
          loading="lazy"
          className="product-card-img"
        />
        {/* Category badge */}
        <span className="absolute bottom-2 left-2.5 rounded-full bg-black/65 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm border border-white/10">
          {p.category}
        </span>
        {/* Product code badge */}
        {p.code && (
          <span className="absolute top-2 right-2.5 rounded-full bg-primary/90 px-2 py-0.5 text-[0.6rem] font-bold tracking-wider text-white">
            {p.code}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <Link
          to="/products/$slug"
          params={{ slug: p.slug }}
          className="font-display text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
        >
          {p.name}
        </Link>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {p.short}
        </p>

        <div className="mt-2.5 flex items-center justify-between text-[0.7rem] text-muted-foreground pt-2 border-t border-border/40">
          <span>{p.variants[0]}</span>
          {p.price ? <span className="font-semibold text-primary">SAR {p.price}</span> : <span className="text-[0.65rem] text-primary/80">Quote on WhatsApp</span>}
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex h-8 items-center rounded-md border border-input bg-background/50 text-xs">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-2 py-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-5 text-center font-medium text-foreground">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="px-2 py-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <Plus className="size-3" />
            </button>
          </div>

          <Button
            variant="hero"
            size="sm"
            className="flex-1 h-8 text-xs font-semibold shadow-sm hover:shadow-[0_0_12px_rgba(22,119,255,0.45)] cursor-pointer"
            onClick={() => {
              add({ slug: p.slug, name: p.name, variant: p.variants[0], qty, image: cardImage });
              toast.success(`${p.name} added to cart`);
              setQty(1);
            }}
          >
            <ShoppingBag className="size-3 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
