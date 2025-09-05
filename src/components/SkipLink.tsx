// src/app/components/SkipLink.tsx
"use client";

import React from "react";

/**
 * SkipLink – Tastaturnutzer:innen können direkt zum Main-Content springen.
 * Erwartet ein <main id="main"> in layout.tsx.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only"
    >
      Zum Inhalt springen
    </a>
  );
}
