// src/components/NavLinks.tsx
"use client";

import Link from "next/link";

export default function NavLinks() {
  return (
    <nav className="nav-links flex items-center gap-3">
      {/* Desktop Links */}
      <Link
        href="/lieferdienste"
        className="hidden sm:inline-block px-3 py-1 rounded-md hover:bg-white/10 transition"
      >
        Liste
      </Link>

      <Link
        href="/guides"
        className="hidden sm:inline-block px-3 py-1 rounded-md hover:bg-white/10 transition"
      >
        Guides
      </Link>

      {/* Kontakt als Primary-Button */}
      <Link
        href="/kontakt"
        className="px-4 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 
                   text-sm font-medium backdrop-blur-sm transition"
      >
        Kontakt
      </Link>

      {/* Mobile CTA-Bar */}
      <div className="sm:hidden flex gap-2">
        <Link
          href="/lieferdienste"
          className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition text-sm"
        >
          Liste
        </Link>
        <Link
          href="/guides"
          className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition text-sm"
        >
          Guides
        </Link>
      </div>
    </nav>
  );
}
