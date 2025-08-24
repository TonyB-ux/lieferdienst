"use client";

import { useEffect } from "react";
import { useConsent } from "@/components/ConsentProvider";

export default function ConsentEvents() {
  const { openBanner } = useConsent();

  useEffect(() => {
    const handler = () => openBanner();
    window.addEventListener("open-consent", handler as EventListener);
    return () => window.removeEventListener("open-consent", handler as EventListener);
  }, [openBanner]);

  return null;
}
