import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { photo } from "@/lib/media";
import { Reveal } from "./Reveal";
const GALLERY = [
  ["editorial-13", "Burgundy classic coupe"],
  ["detail-11", "Violet sports car"],
  ["editorial-14", "Silver SUV"],
  ["detail-12", "Classic coupe in a garage"],
  ["editorial-15", "Leather interior"],
  ["detail-14", "Teal sports car on the coast"],
];
export function AutoGallery() {
  const [index, setIndex] = useState(0);
  const active = GALLERY[index];

  return (
    <section className="section-dark page-band bg-[#080a10] border-y border-white/5">
      <div className="page-inner">
        <Reveal>
          <p className="eyebrow">AUTOMOTIVE SHOWCASE</p>
          <h2 className="section-title">Good Care. Great Presence.</h2>
          <p className="section-copy">
            A visual showcase of automotive perfection across sports coupes, luxury SUVs, and
            preserved classics.
          </p>
        </Reveal>

        <Dialog>
          <div className="gallery-grid mt-10">
            {GALLERY.map(([name, alt], n) => (
              <Reveal key={name} delay={n * 60} className={`gallery-item gallery-item-${n}`}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Open photo of ${alt}`}
                    onClick={() => setIndex(n)}
                    className="group relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_-3px_rgba(59,130,246,0.35)] cursor-pointer focus:outline-none"
                  >
                    <img
                      src={photo(name ?? "")}
                      alt={alt}
                      width={640}
                      height={480}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute bottom-3 left-4 text-xs font-medium text-white/90 drop-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {alt}
                    </span>
                  </button>
                </DialogTrigger>
              </Reveal>
            ))}
          </div>

          <DialogContent
            className="section-dark w-[calc(100%-2rem)] max-w-4xl p-6 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-2xl"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setIndex((i) => (i + 1) % GALLERY.length);
              if (e.key === "ArrowLeft") setIndex((i) => (i + GALLERY.length - 1) % GALLERY.length);
            }}
          >
            <DialogTitle className="text-xl font-semibold text-white">{active?.[1]}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Automotive photography showcase · {index + 1} of {GALLERY.length}
            </DialogDescription>

            <div className="relative mt-2 overflow-hidden rounded-lg bg-black/40">
              <img
                src={photo(active?.[0] ?? "")}
                alt={active?.[1]}
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="max-h-[70svh] w-full object-contain mx-auto"
              />
            </div>

            <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10">
              <Button
                variant="outline"
                size="sm"
                aria-label="Previous image"
                onClick={() => setIndex((i) => (i + GALLERY.length - 1) % GALLERY.length)}
                className="border-white/15 text-white hover:bg-white/10 hover:text-primary cursor-pointer"
              >
                <ChevronLeft className="size-4 mr-1" />
                Previous
              </Button>
              <span className="text-xs font-medium text-muted-foreground">
                {index + 1} / {GALLERY.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                aria-label="Next image"
                onClick={() => setIndex((i) => (i + 1) % GALLERY.length)}
                className="border-white/15 text-white hover:bg-white/10 hover:text-primary cursor-pointer"
              >
                Next
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
