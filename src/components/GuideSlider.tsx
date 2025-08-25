"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import type { GuidePost } from "@/lib/wp";
import GuideCard from "@/components/GuideCard";

const AUTOPLAY_MS = 5000;

export default function GuideSlider({ posts }: { posts: GuidePost[] }) {
  const options: EmblaOptionsType = { loop: false, align: "start", slidesToScroll: 1 };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const autoplayRef = React.useRef<number | null>(null);

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
      else stopAutoplay();
    }, AUTOPLAY_MS);
  }, [emblaApi, stopAutoplay]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);

    if (!prefersReducedMotion) startAutoplay();
    emblaApi.on("pointerDown", stopAutoplay);

    return () => stopAutoplay();
  }, [emblaApi, startAutoplay, stopAutoplay, prefersReducedMotion]);

  return (
    <section aria-label="Guides Slider" className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {posts.map((post) => (
            <div
              key={post.id}
              className="min-w-0 basis-full p-2 sm:basis-1/2 lg:basis-1/3"
            >
              <GuideCard post={post} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-2 flex justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 w-2 rounded-full ${i === selectedIndex ? "bg-black" : "bg-neutral-300"}`}
            aria-label={`Slide ${i + 1} anzeigen`}
          />
        ))}
      </div>
    </section>
  );
}
