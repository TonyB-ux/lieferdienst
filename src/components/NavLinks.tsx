"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/lieferdienste", label: "Liste" },
    { href: "/guides", label: "Guides" },
    { href: "/kontakt", label: "Kontakt", primary: true },
  ];

  return (
    <nav className="site-nav">
      {links.map((l) => {
        const isActive =
          pathname === l.href || pathname?.startsWith(l.href + "/");
        const base = l.primary ? "btn btn-primary" : "nav-link";
        const cls = !l.primary && isActive ? base + " is-active" : base;

        return (
          <Link
            key={l.href}
            href={l.href}
            className={cls}
            aria-current={isActive ? "page" : undefined}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
