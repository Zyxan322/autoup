import { Link } from '@tanstack/react-router';
import { Check, ArrowRight, ShoppingBag, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { HOME_SERVICES } from '@/lib/home-services';
import { useCart } from '@/lib/cart';
import { Reveal } from './Reveal';

const SERVICE_BENEFITS: Record<string, string[]> = {
  'car-shampoo': [
    'High-lubricity foam prevents swirl marks and wash scratches',
    'pH-neutral formula safe for ceramic coatings, waxes and sealants',
    'Effortlessly breaks down road film, grime, and environmental dust'
  ],
  'cleaning-chemicals': [
    'Concentrated professional-grade formulas for maximum value',
    'Rapidly dissolves stubborn grease, brake fallout, and bug splatter',
    'Safe for delicate automotive rubbers, alloys, plastics and paint'
  ],
  'wax-shine': [
    'Deep optical gloss with mirror-like carnauba wet look',
    'Hydrophobic ceramic-infused water beading protection',
    'Shields automotive clear coats from UV fading and acid rain'
  ],
  'interior-cleaning': [
    'Restores OEM satin finish without greasy, slippery residue',
    'Deep condition and nourish leather, vinyl, and modern trims',
    'Eliminates odors and blocks harsh sun degradation'
  ],
  'exterior-care': [
    'Streak-free spot detailing on glass, body panels and chrome',
    'Anti-static dust-repelling formula keeps surfaces cleaner longer',
    'Safe for vinyl wraps, badges, matte finishes and rubber moldings'
  ],
};

export function HomeServices() {
  const { add } = useCart();

  return (
    <section className="page-band bg-background">
      <div className="page-inner">
        <Reveal>
          <p className="eyebrow">TARGETED AUTOMOTIVE CARE</p>
          <h2 className="section-title">Explore Our Car-Care Services</h2>
          <p className="section-copy">
            Explore dedicated categories engineered to clean, refresh, and protect every surface of your vehicle.
          </p>
        </Reveal>

        <div className="service-grid mt-10">
          {HOME_SERVICES.map((s, n) => {
            const addProduct = () => {
              add({
                slug: s.product.slug,
                name: s.product.name,
                variant: s.product.variants[0],
                qty: 1,
                image: s.product.image
              });
              toast.success(`${s.product.name} added to cart`);
            };

            const benefits = SERVICE_BENEFITS[s.slug] ?? [
              'Fits effortlessly into your regular detailing routine',
              'Formulated specifically for the targeted vehicle surface',
              'Direct quotation support with guaranteed product quality'
            ];

            return (
              <Reveal key={s.slug} delay={n * 60}>
                <article className="group service-card-compact">
                  <div className="relative aspect-[16/11] overflow-hidden bg-black/10">
                    <img
                      src={s.image}
                      alt={s.title}
                      width={480}
                      height={330}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[0.65rem] font-bold uppercase tracking-wider text-white/90 drop-shadow">
                      {s.title}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-3.5">
                    <h3 className="text-sm font-semibold text-foreground tracking-tight line-clamp-1">{s.title}</h3>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {s.description}
                    </p>

                    <div className="mt-4 space-y-2">
                      <Button
                        onClick={addProduct}
                        className="w-full h-8 text-xs font-medium cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all"
                        size="sm"
                      >
                        <ShoppingBag className="size-3.5 mr-1.5" />
                        Add to Cart
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full h-8 text-xs font-medium border-primary/30 hover:border-primary hover:bg-primary/5 text-foreground hover:text-primary transition-all cursor-pointer"
                          >
                            <Eye className="size-3.5 mr-1.5" />
                            View Details
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="section-dark max-h-[92svh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-xl p-6 border border-white/10 shadow-2xl backdrop-blur-2xl">
                          <img
                            src={s.modalImage}
                            alt={`${s.title} care detail`}
                            width={560}
                            height={320}
                            loading="lazy"
                            className="mt-3 aspect-[16/9] w-full rounded-lg object-cover border border-white/10 shadow-md"
                          />

                          <div className="mt-2">
                            <span className="eyebrow text-[0.68rem]">AUTOMOTIVE CARE CATEGORY</span>
                            <DialogTitle className="text-2xl mt-1">{s.title}</DialogTitle>
                          </div>

                          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                            {s.description} All formulations are tested for maximum surface safety and long-lasting optical clarity. Follow container dilution and application guidelines for optimum results.
                          </DialogDescription>

                          <div className="space-y-2 rounded-lg bg-white/5 p-4 border border-white/5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Key Advantages & Benefits</p>
                            <ul className="space-y-2 text-sm text-foreground/90">
                              {benefits.map((b) => (
                                <li key={b} className="flex items-start gap-2.5">
                                  <Check className="size-4 shrink-0 text-primary mt-0.5" />
                                  <span className="text-xs leading-normal">{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-white/10">
                            <span>Featured Product:</span>
                            <Link
                              to="/products/$slug"
                              params={{ slug: s.product.slug }}
                              className="font-medium text-primary hover:underline"
                            >
                              {s.product.name}
                            </Link>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Button
                              onClick={addProduct}
                              className="flex-1 cursor-pointer shadow-[0_0_15px_-3px_var(--electric)]"
                            >
                              <ShoppingBag className="size-4 mr-2" />
                              Add to Cart
                            </Button>
                            <Button asChild variant="line" className="flex-1 cursor-pointer">
                              <Link to="/quote" search={{ service: s.slug }}>
                                Request Category Quote
                              </Link>
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="line" size="lg">
            <Link to="/services">
              View All Services <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
