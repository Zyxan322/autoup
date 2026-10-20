import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type PaymentOption = "full" | "installment-quote";
export type CartItem = {
  slug: string;
  name: string;
  variant?: string | undefined;
  qty: number;
  image: string;
  paymentOption?: PaymentOption;
};

type Ctx = {
  items: CartItem[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: CartItem) => void;
  setQty: (
    slug: string,
    variant: string | undefined,
    qty: number,
    paymentOption?: PaymentOption,
  ) => void;
  remove: (slug: string, variant: string | undefined, paymentOption?: PaymentOption) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "autoup-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (error) {
      console.error("Unable to restore the saved AutoUp quote list.", error);
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  const same = (a: CartItem, slug: string, v?: string, paymentOption?: PaymentOption) =>
    a.slug === slug &&
    a.variant === v &&
    (a.paymentOption ?? "full") === (paymentOption ?? "full");

  const value: Ctx = {
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    open,
    setOpen,
    add: (item) =>
      setItems((prev) =>
        prev.some((p) => same(p, item.slug, item.variant, item.paymentOption))
          ? prev.map((p) =>
              same(p, item.slug, item.variant, item.paymentOption)
                ? { ...p, qty: p.qty + item.qty }
                : p,
            )
          : [...prev, item],
      ),
    setQty: (slug, v, qty, paymentOption = "full") =>
      setItems((prev) =>
        prev.map((p) =>
          same(p, slug, v, paymentOption) ? { ...p, qty: Math.max(1, qty) } : p,
        ),
      ),
    remove: (slug, v, paymentOption = "full") =>
      setItems((prev) => prev.filter((p) => !same(p, slug, v, paymentOption))),
    clear: () => setItems([]),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
