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
    <div
      className={cn("fixed inset-0 z-[60]", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-label="Wholesale Quote List"
        className={cn(
          "section-dark glass absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l transition-transform duration-500 ease-[var(--ease-out)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-semibold">
            Wholesale Quote List <span className="text-muted-foreground font-normal text-sm">({count} items)</span>
          </h2>
          <button
            aria-label="Close quote drawer"
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-foreground/10 cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="size-12 text-primary/70" />
              <p className="text-muted-foreground text-sm">Your wholesale quote list is empty.</p>
              <Button asChild variant="line" onClick={() => setOpen(false)}>
                <Link to="/products">Browse products</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((i) => (
                <li key={i.slug + i.variant} className="flex gap-4 py-4 items-center">
                  <div className="size-20 shrink-0 rounded-lg bg-black/40 border border-white/5 p-1.5 flex items-center justify-center">
                    <img
                      src={i.image}
                      alt={i.name}
                      width={80}
                      height={80}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{i.name}</p>
                    {i.variant && <p className="text-xs text-primary font-medium">{i.variant}</p>}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQty(i.slug, i.variant, i.qty - 1)}
                        className="rounded-full border p-1 hover:border-primary cursor-pointer"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold">{i.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQty(i.slug, i.variant, i.qty + 1)}
                        className="rounded-full border p-1 hover:border-primary cursor-pointer"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    aria-label={`Remove ${i.name}`}
                    onClick={() => remove(i.slug, i.variant)}
                    className="self-start p-1 text-muted-foreground hover:text-destructive cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3 border-t px-6 py-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Wholesale prices and order availability are confirmed directly by AutoUp on WhatsApp.
          </p>
          <Button
            variant="hero"
            size="xl"
            className="w-full font-semibold cursor-pointer"
            onClick={() => {
              if (!items.length) {
                toast.error("Your quote list is empty — add a product first.");
                return;
              }
              setOpen(false);
              navigate({ to: "/quote", search: { from: "cart" } });
            }}
          >
            Request Wholesale Quote
          </Button>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Clear quote list
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
