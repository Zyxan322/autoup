import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Minus, Plus, ShoppingBag } from "lucide-react";
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
    <article className="product-card-compact group flex flex-col justify-between">
      <div>
        {/* Image area — object-contain so full label and container remain visible */}
        <Link
          to="/products/$slug"
          params={{ slug: p.slug }}
          aria-label={`View details for ${p.name}`}
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
          <span className="absolute bottom-2 left-2.5 rounded-full bg-black/70 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm border border-white/10">
            {p.category}
          </span>
          {/* Product code badge */}
          {p.code && (
            <span className="absolute top-2 right-2.5 rounded-full bg-primary/90 px-2 py-0.5 text-[0.6rem] font-bold tracking-wider text-white shadow-md">
              {p.code}
            </span>
          )}
        </Link>

        <div className="p-3.5 pb-0">
          <Link
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="font-display text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
          >
            {p.name}
          </Link>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {p.short}
          </p>

          <div className="mt-2.5 flex items-center justify-between text-[0.7rem] text-muted-foreground pt-2 border-t border-border/40">
            <span className="font-medium text-foreground/80">{p.variants[0]}</span>
            <span className="text-[0.65rem] font-semibold text-primary/90 uppercase tracking-wide">
              Wholesale Pricing
            </span>
          </div>
        </div>
      </div>

      <div className="p-3.5 pt-3 space-y-2">
        {/* Quantity selector */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[0.68rem] text-muted-foreground font-medium">Quantity:</span>
          <div className="flex h-7 items-center rounded-md border border-input bg-background/50">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-2 py-0.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <Minus className="size-2.5" />
            </button>
            <span className="w-5 text-center text-xs font-semibold text-foreground">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="px-2 py-0.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
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
            className="h-8 text-[0.68rem] font-semibold px-1.5 border-border/80 hover:border-primary/60 hover:text-primary bg-background/40 cursor-pointer"
          >
            <Link to="/products/$slug" params={{ slug: p.slug }}>
              <FileText className="size-3 mr-1" />
              View Details
            </Link>
          </Button>

          <Button
            variant="hero"
            size="sm"
            className="h-8 text-[0.68rem] font-semibold px-1.5 shadow-sm hover:shadow-[0_0_12px_rgba(22,119,255,0.45)] cursor-pointer"
            onClick={() => {
              add({ slug: p.slug, name: p.name, variant: p.variants[0], qty, image: cardImage });
              toast.success(`${p.name} added to quote list (${qty})`);
              setQty(1);
            }}
          >
            <ShoppingBag className="size-3 mr-1" />
            Inquire
          </Button>
        </div>
      </div>
    </article>
  );
}
