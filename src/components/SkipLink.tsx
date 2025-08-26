// src/app/components/SkipLink.tsx
"use client";

import React from "react";

/**
 * SkipLink – Tastaturnutzer:innen können direkt zum Main-Content springen.
 * Erwartet, dass dein <main> ein id="main-content" hat.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        fixed left-4 top-4 z-[9999]
        rounded-md bg-white/90 px-3 py-2 text-sm font-medium text-black shadow
      "
    >
      Zum Inhalt springen
    </a>
  );
}
