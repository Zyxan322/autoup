import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({
  image,
  eyebrow,
  title,
  children,
  crumb,
}: {
  image?: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  crumb: string;
}) {
  return (
    <section className="section-dark relative flex min-h-[62svh] items-end overflow-hidden">
      {image && (
        <img
          src={image}
          alt=""
          width={1920}
          height={1000}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover animate-kenburns"
        />
      )}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-fade-bottom" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-36 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>{" "}
          <span className="mx-2">/</span> <span className="text-foreground">{crumb}</span>
        </nav>
        <Reveal delay={60} direction="up">
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={130} direction="up">
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.02] sm:text-6xl">{title}</h1>
        </Reveal>
        {children && (
          <Reveal delay={210} direction="up">
            <div className="mt-5 max-w-xl text-base text-foreground/80 sm:text-lg">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
