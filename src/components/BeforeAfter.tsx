import { useRef, useState, useCallback } from 'react';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';
import before from '@/assets/comparison-before.jpg';
import after from '@/assets/comparison-after.jpg';

export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (rect) {
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(pct);
    }
  }, []);

  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        ref={frame}
        className="comparison relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl shadow-2xl border border-white/10 group select-none cursor-ew-resize"
        onPointerDown={(e) => {
          setIsDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => {
          if (isDragging || e.currentTarget.hasPointerCapture(e.pointerId)) {
            update(e.clientX);
          }
        }}
        onPointerUp={(e) => {
          setIsDragging(false);
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch {}
        }}
        onPointerCancel={() => setIsDragging(false)}
      >
        {/* Before Image (Bottom Layer) */}
        <img
          src={before}
          alt="Dusty sports coupe before professional cleaning"
          width={1536}
          height={1024}
          loading="lazy"
          className="absolute inset-0 size-full object-cover pointer-events-none"
        />

        {/* After Image (Top Layer clipped to right side) */}
        <img
          src={after}
          alt="The same sports coupe with flawless mirror-like gloss after AutoUp detailing"
          width={1536}
          height={1024}
          loading="lazy"
          className="absolute inset-0 size-full object-cover pointer-events-none transition-none"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        />

        {/* Labels */}
        <div className="comparison-label left-4 sm:left-6 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-amber-400" />
          <span>BEFORE</span>
        </div>
        <div className="comparison-label right-4 sm:right-6 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-primary" />
          <span>AFTER</span>
          <Sparkles className="size-3 text-primary ml-0.5" />
        </div>

        {/* Draggable Divider */}
        <div
          className="comparison-divider"
          style={{ left: `${position}%` }}
        >
          <span className="cursor-ew-resize select-none">
            <ChevronsLeftRight className="size-5 text-white" />
          </span>
        </div>

        {/* Accessible range input for screen readers & keyboard focus */}
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(position)}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Interactive before and after comparison slider"
          aria-valuetext={`${Math.round(position)}% Before, ${100 - Math.round(position)}% After`}
          className="comparison-range"
        />
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
        <span>◀ Drag or swipe slider to reveal vehicle transformation ▶</span>
      </p>
    </div>
  );
}
