"use client";

import * as React from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import type { GuidePost } from "@/lib/wp";
import GuideCard from "@/components/GuideCard";

const AUTOPLAY_MS = 5000;

export default function GuideSlider({ posts }: { posts: GuidePost[] }) {
  const options: EmblaOptionsType = { loop: false, align: "start", slidesToScroll: 1 };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const autoplayRef = React.useRef<number | null>(null);

  // Respect reduced motion → Autoplay nur starten, wenn erlaubt
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      else stopAutoplay(); // Ende erreicht
    }, AUTOPLAY_MS);
  }, [emblaApi, stopAutoplay]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });

    if (!prefersReducedMotion) startAutoplay();
    emblaApi.on("pointerDown", stopAutoplay);

    const onKey = (e: KeyboardEvent) => {
      if (!emblaApi) return;
      if (e.key === "ArrowLeft") { stopAutoplay(); emblaApi.scrollPrev(); }
      if (e.key === "ArrowRight") { stopAutoplay(); emblaApi.scrollNext(); }
    };
    window.addEventListener("keydown", onKey);

    const onVisibility = () => { if (document.hidden) stopAutoplay(); };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopAutoplay();
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [emblaApi, startAutoplay, stopAutoplay, prefersReducedMotion]);

  const scrollTo = (i: number) => { if (!emblaApi) return; stopAutoplay(); emblaApi.scrollTo(i); };

  return (
    <section aria-label="Guides Slider" className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {posts.map((post) => (
            <div
              key={post.id}
              className="min-w-0 flex-[0_0_100%] p-2 lg:flex-[0_0_calc(33.333%_-_0px)]"
            >
              {/* h-full, damit die Card die ganze Slide-Höhe nutzt */}
              <div className="h-full">
                <GuideCard post={post} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pfeile + Dots */}
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { stopAutoplay(); emblaApi?.scrollPrev(); }}
            disabled={!emblaApi?.canScrollPrev()}
            className="rounded-full border px-3 py-1 text-sm disabled:opacity-40"
            aria-label="Vorherige"
          >←</button>
          <button
            type="button"
            onClick={() => { stopAutoplay(); emblaApi?.scrollNext(); }}
            disabled={!emblaApi?.canScrollNext()}
            className="rounded-full border px-3 py-1 text-sm disabled:opacity-40"
            aria-label="Nächste"
          >→</button>
        </div>

        <div className="ml-auto flex items-center gap-1">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 w-2 rounded-full ${i === selectedIndex ? "bg-black" : "bg-neutral-300"}`}
              aria-label={`Slide ${i + 1} anzeigen`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
