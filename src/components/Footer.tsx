import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { SITE, whatsappUrl } from "@/lib/site";
import { CATEGORIES } from "@/lib/catalog";

export function Footer() {
  const productCategories = CATEGORIES.filter((c) => c !== "All Products");

  return (
    <footer className="bg-[#05070a] text-white border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" aria-label="AutoUp" className="inline-block transition-opacity hover:opacity-90">
            <img src={logo} alt="AutoUp" width={1080} height={1350} loading="lazy" className="h-20 w-auto object-contain" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/70 leading-relaxed">
            B2B supplier of professional automotive cleaning products, concentrated shampoos, waxes, and specialized chemicals for commercial wash operations and detailing studios.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[0.68rem] font-medium text-white/80">
              Commercial Bulk Supply
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[0.68rem] font-medium text-primary">
              Professional Formulations
            </span>
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-4 text-primary">Explore</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-primary transition-colors">Products Catalog</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About AutoUp</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Wholesale Contact</Link></li>
            <li><Link to="/quote" className="hover:text-primary transition-colors font-medium text-white">Request a Quote</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4 text-primary">Product Categories</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {productCategories.map((c) => (
              <li key={c}>
                <Link to="/products" search={{ cat: c }} className="hover:text-primary transition-colors">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4 text-primary">Direct Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <a href={`tel:${SITE.whatsappLocal}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="size-4 text-primary shrink-0" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
              >
                <MessageCircle className="size-4 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </li>
            <li className="text-xs text-white/60 pt-1 leading-relaxed">{SITE.address}</li>
            <li className="text-xs text-white/60">{SITE.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/60">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-5 py-6 text-xs text-white/50 lg:px-8">
          <p>© {new Date().getFullYear()} AutoUp. {SITE.tagline}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/quote" className="hover:text-white transition-colors">Instant Quote</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
