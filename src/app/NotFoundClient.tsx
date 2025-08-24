"use client";

import { useSearchParams } from "next/navigation";

export default function NotFoundClient() {
  const params = useSearchParams();
  const q = params.get("q"); // Beispiel

  return q ? <p>Gesucht: “{q}” – leider nichts gefunden.</p> : null;
}
