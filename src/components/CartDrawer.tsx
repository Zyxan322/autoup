import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, clear, count } = useCart();
  const navigate = useNavigate();

  return (
    <div className={cn("fixed inset-0 z-[60]", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={cn("absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-500", open ? "opacity-100" : "opacity-0")} />
      <aside
        role="dialog"
        aria-label="Cart"
        className={cn(
          "section-dark glass absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l transition-transform duration-500 ease-[var(--ease-out)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-semibold">Your Cart <span className="text-muted-foreground">({count})</span></h2>
          <button aria-label="Close cart" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-foreground/10">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="size-12 text-primary" />
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Button asChild variant="line" onClick={() => setOpen(false)}>
                <Link to="/products">Browse products</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((i) => (
                <li key={i.slug + i.variant} className="flex gap-4 py-4">
                  <img src={i.image} alt={i.name} width={80} height={80} className="size-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{i.name}</p>
                    {i.variant && <p className="text-xs text-muted-foreground">{i.variant}</p>}
                    <div className="mt-2 flex items-center gap-2">
                      <button aria-label="Decrease" onClick={() => setQty(i.slug, i.variant, i.qty - 1)} className="rounded-full border p-1 hover:border-primary"><Minus className="size-3.5" /></button>
                      <span className="w-6 text-center text-sm">{i.qty}</span>
                      <button aria-label="Increase" onClick={() => setQty(i.slug, i.variant, i.qty + 1)} className="rounded-full border p-1 hover:border-primary"><Plus className="size-3.5" /></button>
                    </div>
                  </div>
                  <button aria-label={`Remove ${i.name}`} onClick={() => remove(i.slug, i.variant)} className="self-start p-1 text-muted-foreground hover:text-destructive">
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3 border-t px-6 py-5">
          <p className="text-xs text-muted-foreground">Prices are confirmed in your quotation. Your request will be sent to AutoUp through WhatsApp.</p>
          <Button
            variant="hero"
            size="xl"
            className="w-full"
            onClick={() => {
              if (!items.length) {
                toast.error("Your cart is empty — add a product first.");
                return;
              }
              setOpen(false);
              navigate({ to: "/quote", search: { from: "cart" } });
            }}
          >
            Proceed to Order
          </Button>
          {items.length > 0 && (
            <button onClick={clear} className="w-full text-center text-xs text-muted-foreground hover:text-foreground">Clear cart</button>
          )}
        </div>
      </aside>
    </div>
  );
}
