import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProfessionalGallonCard } from "@/components/ProfessionalGallonCard";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/catalog";
import { useLocale } from "@/lib/i18n";

type ProductCarouselProps = {
  products: Product[];
  productType: "retail" | "gallon";
};

export function ProductCarousel({ products, productType }: ProductCarouselProps) {
  const { locale } = useLocale();
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    direction: locale === "ar" ? "rtl" : "ltr",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateControls = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateControls();
    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateControls);
    return () => {
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateControls);
    };
  }, [emblaApi, updateControls]);

  const itemBasis =
    productType === "gallon"
      ? "basis-[88%] sm:basis-[70%] md:basis-1/2 lg:basis-1/3"
      : "basis-[82%] min-[480px]:basis-1/2 md:basis-1/3 lg:basis-1/5";
  const PreviousIcon = locale === "ar" ? ArrowRight : ArrowLeft;
  const NextIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div
      className="product-carousel"
      data-product-carousel={productType}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="mb-4 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="product-carousel-arrow"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label={locale === "ar" ? "المنتجات السابقة" : "Previous products"}
        >
          <PreviousIcon className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="product-carousel-arrow"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          aria-label={locale === "ar" ? "المنتجات التالية" : "Next products"}
        >
          <NextIcon className="size-4" />
        </Button>
      </div>

      <div ref={viewportRef} className="overflow-hidden">
        <div className="-ml-4 flex items-stretch">
          {products.map((product) => (
            <div
              key={product.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${product.name}`}
              className={`min-w-0 shrink-0 grow-0 pl-4 ${itemBasis}`}
            >
              {productType === "gallon" ? (
                <ProfessionalGallonCard product={product} />
              ) : (
                <ProductCard p={product} action="cart" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
