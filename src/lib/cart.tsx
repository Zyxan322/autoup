import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = { slug: string; name: string; variant?: string | undefined; qty: number; image: string };

type Ctx = {
  items: CartItem[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: CartItem) => void;
  setQty: (slug: string, variant: string | undefined, qty: number) => void;
  remove: (slug: string, variant: string | undefined) => void;
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
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  const same = (a: CartItem, slug: string, v?: string) => a.slug === slug && a.variant === v;

  const value: Ctx = {
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    open,
    setOpen,
    add: (item) =>
      setItems((prev) =>
        prev.some((p) => same(p, item.slug, item.variant))
          ? prev.map((p) => (same(p, item.slug, item.variant) ? { ...p, qty: p.qty + item.qty } : p))
          : [...prev, item],
      ),
    setQty: (slug, v, qty) =>
      setItems((prev) => prev.map((p) => (same(p, slug, v) ? { ...p, qty: Math.max(1, qty) } : p))),
    remove: (slug, v) => setItems((prev) => prev.filter((p) => !same(p, slug, v))),
    clear: () => setItems([]),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
