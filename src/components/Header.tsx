import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Languages, Menu, Search, ShoppingBag, X } from "lucide-react";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";

const NAV = [
  { to: "/" as const, label: "Home" },
  { to: "/products" as const, label: "Products" },
  { to: "/gallery" as const, label: "Gallery" },
  { to: "/about" as const, label: "About Us" },
  { to: "/contact" as const, label: "Contact" },
];

export function Header() {
  const { locale, setLocale } = useLocale();
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
        solid ? "header-glass-scrolled shadow-lg shadow-black/20" : "header-glass-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-6">
        {/* Logo */}
        <Link
          to="/"
          aria-label="AutoUp home"
          className="relative h-16 w-28 shrink-0 overflow-hidden transition-opacity hover:opacity-95 sm:h-20 sm:w-36 lg:w-40"
        >
          <img
            src={logo}
            alt="AutoUp — Care in Every Mile"
            width={360}
            height={450}
            fetchPriority="high"
            decoding="async"
            className="absolute left-0 top-[-2.45rem] h-auto w-full max-w-none sm:top-[-2.95rem] lg:top-[-3.3rem]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 xl:gap-9 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="nav-underline text-sm font-medium text-white/90 hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            aria-label={locale === "ar" ? "Switch language to English" : "تغيير اللغة إلى العربية"}
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-xs font-semibold text-white/90 backdrop-blur-md transition-all duration-250 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-white/15 hover:text-white active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Languages className="size-4" />
            <span>{locale === "ar" ? "English" : "العربية"}</span>
          </button>

          {/* Search Toggle Button */}
          <button
            type="button"
            aria-label="Search products"
            onClick={() => setSearch((s) => !s)}
            className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/90 backdrop-blur-md hover:border-primary/60 hover:bg-white/15 hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-250 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {search ? <X className="size-4" /> : <Search className="size-4" />}
          </button>

          {/* Cart / Inquiry List Button with Badge */}
          <button
            type="button"
            aria-label={
              locale === "ar"
                ? `افتح قائمة طلب عرض السعر، ${count} منتجات`
                : `Open quotation inquiry list, ${count} items`
            }
            onClick={() => setOpen(true)}
            className="relative flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/90 backdrop-blur-md hover:border-primary/60 hover:bg-white/15 hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-250 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 h-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground shadow-[0_0_10px_var(--electric)] transition-transform duration-200">
                {count}
              </span>
            )}
          </button>

          {/* Prominent "Request a Quote" CTA Button */}
          <Button
            asChild
            variant="hero"
            size="sm"
            className="hidden sm:inline-flex h-9 sm:h-10 px-3.5 sm:px-5 text-xs sm:text-sm font-semibold shadow-[0_0_20px_-3px_var(--electric)] hover:shadow-[0_0_28px_rgba(22,119,255,0.85)] cursor-pointer whitespace-nowrap"
          >
            <Link to="/quote">Request a Quote</Link>
          </Button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobile((m) => !m)}
            className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/90 backdrop-blur-md hover:border-primary/60 hover:bg-white/15 hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-250 lg:hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {search && (
        <form
          className="mx-auto max-w-3xl px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-300"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/products", search: { q: q || undefined } });
          }}
        >
          <div className="relative">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products or categories (e.g. shampoo, wax, ChemX)..."
              className="h-12 w-full rounded-full border border-white/25 bg-black/80 pl-5 pr-12 text-sm text-white placeholder:text-white/50 backdrop-blur-xl focus:border-primary focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-2 top-1.5 flex size-9 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <Search className="size-4" />
            </button>
          </div>
        </form>
      )}

      {/* Mobile Menu Drawer */}
      {mobile && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-5 pt-3 pb-6 lg:hidden bg-black/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              onClick={() => setMobile(false)}
              className="rounded-lg px-3 py-3 font-display text-base font-medium text-white/90 hover:text-white hover:bg-white/10 hover:translate-x-1 transition-all"
            >
              {n.label}
            </Link>
          ))}
          <Button
            asChild
            variant="hero"
            size="xl"
            className="mt-3 h-12 shadow-[0_0_20px_-3px_var(--electric)]"
            onClick={() => setMobile(false)}
          >
            <Link to="/quote">Request a Quote</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
