'use client';

import React, { useMemo, useState } from "react";

/** Datentypen */
type CountryCode = "ALL" | "DE" | "AT" | "CH";

type Supplier = {
  id: string;
  name: string;
  city: string;
  country: Exclude<CountryCode, "ALL">;
  categories: string[];
  minOrder: number;
  shipping: number;
  badges: string[];
  logo: string;
  url: string;
};

/** Mockdaten nur für das Frontend-Demo */
const MOCK_SUPPLIERS: Supplier[] = [
  { id: "1", name: "BioKiste Berlin", city: "Berlin", country: "DE", categories: ["Gemüsekiste","Abo"], minOrder: 25, shipping: 3.9, badges: ["Abo verfügbar","Regional"], logo: "https://images.unsplash.com/photo-1514511547113-1be72277b32f?q=80&w=400&auto=format&fit=crop", url: "https://example.com/biokiste-berlin" },
  { id: "2", name: "Alpen BioBox", city: "München", country: "DE", categories: ["Gemüsekiste","Obstkiste","Familie"], minOrder: 29, shipping: 0, badges: ["Gratis Lieferung","Saisonal"], logo: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400&auto=format&fit=crop", url: "https://example.com/alpen-biobox" },
  { id: "3", name: "Vienne Bio Panier", city: "Wien", country: "AT", categories: ["Abo","Vegan"], minOrder: 22, shipping: 4.5, badges: ["Vegan","Demeter"], logo: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=400&auto=format&fit=crop", url: "https://example.com/vienne-bio" },
  { id: "4", name: "Züri Grünkorb", city: "Zürich", country: "CH", categories: ["Obstkiste","Büro-Obst"], minOrder: 35, shipping: 5.9, badges: ["Büro-Obst","Regional"], logo: "https://images.unsplash.com/photo-1604908176997-4316517b1a8b?q=80&w=400&auto=format&fit=crop", url: "https://example.com/zueri-gruenkorb" },
  { id: "5", name: "RheinBio", city: "Köln", country: "DE", categories: ["Gemüsekiste","Vegan"], minOrder: 24, shipping: 2.9, badges: ["EU-Bio","Abo verfügbar"], logo: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400&auto=format&fit=crop", url: "https://example.com/rheinbio" },
  { id: "6", name: "AlpGreen", city: "Bern", country: "CH", categories: ["Gemüsekiste","Regional"], minOrder: 27, shipping: 0, badges: ["Gratis Lieferung","Bioland"], logo: "https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?q=80&w=400&auto=format&fit=crop", url: "https://example.com/alpgreen" }
];

const ALL_CATEGORIES = ["Gemüsekiste","Obstkiste","Abo","Vegan","Familie","Büro-Obst","Regional"] as const;

function clsx(...x: (string | false | null | undefined)[]) {
  return x.filter(Boolean).join(" ");
}

function GlassCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md",
        "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1.5 rounded-full text-sm",
        active ? "bg-white/90 text-slate-900" : "bg-white/10 text-white/90 hover:bg-white/20",
        "border border-white/20 transition"
      )}
    >
      {c
