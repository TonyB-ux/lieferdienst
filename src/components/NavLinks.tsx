"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function NavLinks() {
  const pathname = usePathname();

  const listActive   = isActivePath(pathname, "/lieferdienste");
  const guidesActive = isActivePath(pathname, "/guides");
  const kontaktActive= isActivePath(pathname, "/kontakt");

  return (
    <>
      {/* Desktop-Nav */}
      <nav className="nav-desktop" aria-label="Hauptnavigation">
        <Link
          href="/lieferdienste"
          className="nav-link"
          aria-current={listActive ? "page" : undefined}
          data-active={listActive ? "true" : "false"}
        >
          Liste
        </Link>
        <Link
          href="/guides"
          className="nav-link"
          aria-current={guidesActive ? "page" : undefined}
          data-active={guidesActive ? "true" : "false"}
        >
          Guides
        </Link>
        <Link
          href="/kontakt"
          className="btn btn-primary nav-cta"
          aria-current={kontaktActive ? "page" : undefined}
          data-active={kontaktActive ? "true" : "false"}
        >
          Kontakt
        </Link>
      </nav>

      {/* Mobile CTA-Bar */}
      <nav className="mobile-cta-bar" aria-label="Schnellzugriff">
        <Link
          href="/lieferdienste"
          className="btn btn-cta"
          aria-current={listActive ? "page" : undefined}
          data-active={listActive ? "true" : "false"}
        >
          Liste
        </Link>
        <Link
          href="/guides"
          className="btn btn-cta"
          aria-current={guidesActive ? "page" : undefined}
          data-active={guidesActive ? "true" : "false"}
        >
          Guides
        </Link>
        <Link
          href="/kontakt"
          className="btn btn-cta btn-primary"
          aria-current={kontaktActive ? "page" : undefined}
          data-active={kontaktActive ? "true" : "false"}
        >
          Kontakt
        </Link>
      </nav>
    </>
  );
}
