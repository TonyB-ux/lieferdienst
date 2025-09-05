"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import type { GuidePost } from "@/lib/wp";
import GuideCard from "@/components/GuideCard";

const AUTOPLAY_MS = 5000;

export default function GuideSlider({ posts }: { posts: GuidePost[] }) {
  // Keine Endlosschleife (endet am letzten Slide), ausgerichtet links
  const options: EmblaOptionsType = { loop: false, align: "start", slidesToScroll: 1 };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);
  const autoplayRef = React.useRef<number | null>(null);

  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  const stopAutoplay = React.useCallback(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = React.useCallback(() => {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      if (!emblaApi) return;
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else stopAutoplay(); // Ende: kein Loop
    }, AUTOPLAY_MS);
  }, [emblaApi, stopAutoplay]);

  // Hardening: Track bleibt sichtbar/flex – überschreibt evtl. globale Regeln
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    if (cs.display === "none") el.style.display = "flex";
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);

    if (!prefersReducedMotion) startAutoplay();
    emblaApi.on("pointerDown", stopAutoplay);

    return () => stopAutoplay();
  }, [emblaApi, startAutoplay, stopAutoplay, prefersReducedMotion]);

  if (!posts?.length) return null;

  return (
    <section
      aria-label="Guides Slider"
      className="embla relative"
      onKeyDown={(e) => {
        if (!emblaApi) return;
        if (e.key === "ArrowLeft") emblaApi.scrollPrev();
        if (e.key === "ArrowRight") emblaApi.scrollNext();
      }}
      tabIndex={0}
    >
      {/* Controls ausserhalb + Viewport */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Vorheriger Slide"
          className="btn btn-ghost btn-sm hidden md:inline-flex"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
        >
          &lsaquo;
        </button>
      <div className="embla__viewport overflow-hidden w-full" ref={emblaRef}>
        {/* Track */}
        <div
          ref={trackRef}
          className="embla__container flex gap-4"
          style={{ display: "flex" }} // überschreibt fremde Regeln zuverlässig
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="embla__slide min-w-0 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <GuideCard post={post} />
            </div>
          ))}
        </div>
      </div>
        <button
          type="button"
          aria-label="Naechster Slide"
          className="btn btn-ghost btn-sm hidden md:inline-flex"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
        >
          &rsaquo;
        </button>
      </div>

      

      {/* Dots */}
      <div className="embla__dots mt-2 flex justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 w-2 rounded-full ${
              i === selectedIndex ? "bg-black" : "bg-neutral-300"
            }`}
            aria-label={`Slide ${i + 1} anzeigen`}
          />
        ))}
      </div>
    </section>
  );
}

