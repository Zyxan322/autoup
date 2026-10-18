import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/" as const, label: "Home" },
  { to: "/products" as const, label: "Products" },
  { to: "/products" as const, hash: "categories", label: "Product Categories" },
  { to: "/about" as const, label: "About Us" },
  { to: "/contact" as const, label: "Contact" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setMobile(false);
    setSearch(false);
  }, [path]);

  const solid = scrolled || mobile || search;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "header-glass-scrolled" : "header-glass-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link to="/" aria-label="AutoUp home" className="shrink-0 transition-opacity hover:opacity-95">
          <img src={logo} alt="AutoUp — Care in Every Mile" width={1080} height={1350} className="h-16 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              activeOptions={{ exact: n.to === "/" }}
              className="nav-underline text-sm font-medium text-white/90 hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            aria-label="Search products"
            onClick={() => setSearch((s) => !s)}
            className="rounded-full p-2.5 text-white/90 hover:bg-white/10 hover:text-primary transition-colors cursor-pointer"
          >
            <Search className="size-5" />
          </button>
          <button
            aria-label={`Open cart, ${count} items`}
            onClick={() => setOpen(true)}
            className="relative rounded-full p-2.5 text-white/90 hover:bg-white/10 hover:text-primary transition-colors cursor-pointer"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground shadow-[0_0_10px_var(--electric)]">
                {count}
              </span>
            )}
          </button>
          <Button asChild variant="hero" size="sm" className="ml-2 hidden h-10 px-5 sm:inline-flex shadow-[0_0_20px_-3px_var(--electric)]">
            <Link to="/quote">Request a Quote</Link>
          </Button>
          <button
            aria-label="Menu"
            onClick={() => setMobile((m) => !m)}
            className="rounded-full p-2.5 text-white/90 hover:bg-white/10 hover:text-primary transition-colors lg:hidden cursor-pointer"
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {search && (
        <form
          className="mx-auto max-w-3xl px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-300"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/products", search: { q: q || undefined } });
          }}
        >
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products or categories…"
            className="h-12 w-full rounded-full border border-white/20 bg-black/60 px-5 text-white placeholder:text-white/50 backdrop-blur-md focus:border-primary focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:outline-none"
          />
        </form>
      )}

      {mobile && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-5 pt-3 pb-6 lg:hidden bg-black/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              className="rounded-lg px-3 py-3 font-display text-lg text-white/90 hover:text-white hover:bg-white/10 hover:translate-x-1 transition-all"
            >
              {n.label}
            </Link>
          ))}
          <Button asChild variant="hero" size="xl" className="mt-3 shadow-[0_0_20px_-3px_var(--electric)]">
            <Link to="/quote">Request a Quote</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
