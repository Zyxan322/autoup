import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "fade" | "scale" | "left" | "right";
  duration?: number;
  style?: CSSProperties;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user's reduced motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    // Immediate check if element is already inside the viewport on initial mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = setTimeout(() => setShown(true), 30);
      return () => clearTimeout(timer);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );
    io.observe(el);

    // Fail-safe fallback so content is never permanently hidden
    const fallbackTimer = setTimeout(() => {
      setShown(true);
    }, 2500);

    return () => {
      io.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const directionClass =
    direction === "fade"
      ? "reveal-fade"
      : direction === "scale"
        ? "reveal-scale"
        : direction === "left"
          ? "reveal-left"
          : direction === "right"
            ? "reveal-right"
            : "reveal-up";

  const dynamicStyles: CSSProperties = {
    ...style,
    transitionDelay: `${delay}ms`,
    ...(duration ? { transitionDuration: `${duration}ms` } : {}),
  };

  return (
    <div
      ref={ref}
      data-shown={shown}
      className={cn("reveal", directionClass, className)}
      style={dynamicStyles}
    >
      {children}
    </div>
  );
}
