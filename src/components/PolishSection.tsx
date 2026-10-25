import { useState } from "react";
import { FileText, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "@/lib/cart";
import { useLocale, translateText } from "@/lib/i18n";
import { POLISH_SECTION_MEDIA } from "@/lib/media";

const polishCardTitles: Record<string, { en: string; ar: string }> = {
  "microfiber-towel": { en: "Microfiber Towel", ar: "منشفة ألياف دقيقة" },
  "car-polishing-cloth": { en: "Car Polishing Cloth", ar: "قطعة تلميع السيارات" },
  "chenille-microfiber": { en: "Chenille Microfiber", ar: "ألياف دقيقة شينيل" },
  "blue-wash-mitt": { en: "Blue Wash Mitt", ar: "قفاز غسيل أزرق" },
  "car-drying-towel": { en: "Car Drying Towel", ar: "منشفة تجفيف السيارات" },
  "microfiber-drying-towel": {
    en: "Microfiber Drying Towel",
    ar: "منشفة تجفيف من الألياف الدقيقة",
  },
  "red-wash-mitt": { en: "Red Wash Mitt", ar: "قفاز غسيل أحمر" },
};

type PolishTitle = (typeof polishCardTitles)[keyof typeof polishCardTitles];
type PolishItem = (typeof POLISH_SECTION_MEDIA)[number];

function PolishProductCard({
  item,
  title,
  index,
  isArabic,
  onAdd,
}: {
  item: PolishItem;
  title: PolishTitle;
  index: number;
  isArabic: boolean;
  onAdd: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const label = isArabic ? title.ar : title.en;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white text-slate-950 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.5)] transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_36px_-22px_rgba(15,23,42,0.38)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={label}
          width={640}
          height={480}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute start-3 top-3 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
          {isArabic ? "العناية الخارجية" : "EXTERIOR CARE"}
        </span>
        <span className="absolute end-3 top-3 grid size-8 place-items-center rounded-md border border-white/70 bg-white/95 text-xs font-bold tabular-nums text-slate-700 shadow-sm backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="min-h-10 text-[15px] font-semibold leading-snug text-slate-900">{label}</h3>

        <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200/80 bg-slate-50 px-3 py-2">
          <span className="text-xs font-medium text-slate-600">
            {isArabic ? "الكمية" : "Quantity"}
          </span>
          <div className="flex h-8 items-center rounded-md border border-slate-200 bg-white">
            <button
              type="button"
              aria-label={isArabic ? `تقليل كمية ${label}` : `Decrease quantity for ${label}`}
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              className="grid size-8 place-items-center text-slate-500 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-semibold tabular-nums text-slate-900">
              {quantity}
            </span>
            <button
              type="button"
              aria-label={isArabic ? `زيادة كمية ${label}` : `Increase quantity for ${label}`}
              onClick={() => setQuantity((current) => current + 1)}
              className="grid size-8 place-items-center text-slate-500 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-auto min-h-10 whitespace-normal rounded-md border-slate-200 px-2 py-2 text-xs font-semibold text-slate-700 hover:border-primary/45 hover:text-primary"
              >
                <FileText className="size-3.5 shrink-0" />
                {isArabic ? "التفاصيل" : "Details"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90svh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-lg border-slate-200 bg-white p-5 text-slate-900 sm:p-6">
              <img
                src={item.image}
                alt={label}
                width={640}
                height={480}
                className="mt-4 aspect-[16/10] w-full rounded-md bg-slate-100 object-cover"
              />
              <div>
                <p className="eyebrow text-[0.65rem]">
                  {isArabic ? "العناية الخارجية" : "EXTERIOR CARE"}
                </p>
                <DialogTitle className="mt-2 text-xl text-slate-900">{label}</DialogTitle>
              </div>
              <DialogDescription className="leading-relaxed text-slate-600">
                {isArabic
                  ? "تتوفر تفاصيل المنتج والمقاسات والسعر عند الطلب، ويؤكدها فريق AutoUp عند تقديم عرض السعر."
                  : "Product details, pack sizes, and pricing are confirmed by the AutoUp team when you request a quote."}
              </DialogDescription>
            </DialogContent>
          </Dialog>

          <Button
            type="button"
            variant="hero"
            size="sm"
            className="h-auto min-h-10 whitespace-normal rounded-md px-2 py-2 text-xs font-semibold shadow-sm transition-shadow group-hover:shadow-md"
            onClick={() => onAdd(quantity)}
          >
            <ShoppingBag className="size-3.5 shrink-0" />
            {isArabic ? "أضف إلى السلة" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export function PolishSection() {
  const { locale } = useLocale();
  const { add, setOpen } = useCart();
  const isArabic = locale === "ar";

  return (
    <section
      id="polish"
      aria-labelledby="polish-section-title"
      className="page-band border-b border-border/60 bg-background"
    >
      <div className="page-inner">
        <Reveal className="max-w-2xl">
          <span className="eyebrow text-primary">
            {locale === "ar" ? "العناية الخارجية" : "EXTERIOR CARE"}
          </span>
          <h2 id="polish-section-title" className="section-title">
            {locale === "ar" ? "التلميع والعناية بالتفاصيل" : "Polish & Detailing"}
          </h2>
          <p className="section-copy">
            {locale === "ar"
              ? "مناشف وقفازات للعناية بسطح السيارة وتجفيفها."
              : "Polishing cloths, wash mitts, and drying towels for vehicle care."}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {POLISH_SECTION_MEDIA.map(({ slug, image }, index) => {
            const title = polishCardTitles[slug];

            return (
              <Reveal key={slug} delay={(index % 4) * 60}>
                <PolishProductCard
                  item={{ slug, image }}
                  title={title}
                  index={index}
                  isArabic={isArabic}
                  onAdd={(quantity) => {
                    add({ slug, name: title.en, qty: quantity, image: image ?? "" });
                    toast.success(
                      locale === "ar"
                        ? `تمت إضافة ${translateText(title.en, locale)} إلى قائمة عرض السعر (${quantity})`
                        : `${title.en} added to the quote list (${quantity})`,
                    );
                    setOpen(true);
                  }}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
