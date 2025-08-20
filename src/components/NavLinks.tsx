// src/components/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="main-nav" aria-label="Hauptnavigation">
      <Link
        href="/lieferdienste"
        className="nav-link"
        aria-current={isActive(pathname, "/lieferdienste") ? "page" : undefined}
        data-active={isActive(pathname, "/lieferdienste") ? "true" : "false"}
      >
        Liste
      </Link>

      <Link
        href="/guides"
        className="nav-link"
        aria-current={isActive(pathname, "/guides") ? "page" : undefined}
        data-active={isActive(pathname, "/guides") ? "true" : "false"}
      >
        Guides
      </Link>

      <Link
        href="/kontakt"
        className="nav-cta btn btn-primary"
        aria-current={isActive(pathname, "/kontakt") ? "page" : undefined}
        data-active={isActive(pathname, "/kontakt") ? "true" : "false"}
      >
        Kontakt
      </Link>
    </nav>
  );
}
