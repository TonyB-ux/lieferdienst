// src/components/HeaderFX.tsx
"use client";

import { useEffect } from "react";

export default function HeaderFX() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    const sentinel = document.getElementById("top-sentinel");
    if (!header || !sentinel) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) header.classList.remove("is-scrolled");
        else header.classList.add("is-scrolled");
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );

    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  return null;
}
