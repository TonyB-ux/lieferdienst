"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsent } from "@/components/ConsentProvider";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ""; // z.B. "G-XXXXXXX"

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    __gaLoaded?: boolean;
  }
}

export default function GA4() {
  const { consent } = useConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const readyRef = useRef(false);

  // Script nur laden, wenn Analytics erlaubt
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Wenn (noch) keine Einwilligung → nicht laden
    if (!consent.analytics) return;

    // Nur einmal injizieren
    if (!window.__gaLoaded) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(){ window.dataLayer!.push(arguments); };

      // Consent Default + aktueller Stand
      window.gtag("consent", "default", {
        ad_user_data: "denied",
        ad_personalization: "denied",
        ad_storage: "denied",
        analytics_storage: "granted",
        functionality_storage: "granted",
        security_storage: "granted",
      });

      // GA4 Script einfügen
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(s);

      // Grund-Init
      window.gtag("js", new Date());
      // send_page_view: false → wir feuern Pageviews selbst (Router-basiert)
      window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true, send_page_view: false });

      window.__gaLoaded = true;
      readyRef.current = true;
    } else {
      // Wenn bereits geladen und der Nutzer später zustimmt → Consent updaten
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
        functionality_storage: "granted",
        security_storage: "granted",
        ad_user_data: "denied",
        ad_personalization: "denied",
        ad_storage: "denied",
      });
      readyRef.current = true;
    }
  }, [consent.analytics]);

  // Falls Einwilligung widerrufen wird, nur Consent-Mode anpassen (Script bleibt, aber sammelt nichts)
  useEffect(() => {
    if (!window.gtag) return;
    window.gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      functionality_storage: "granted",
      security_storage: "granted",
      ad_user_data: "denied",
      ad_personalization: "denied",
      ad_storage: "denied",
    });
  }, [consent.analytics]);

  // Pageviews bei Route-Changes manuell senden
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    if (!consent.analytics) return;
    if (!window.gtag) return;

    const path = pathname + (searchParams?.toString() ? `?${searchParams!.toString()}` : "");
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: path,
      page_title: document.title,
      send_to: GA_MEASUREMENT_ID,
    });
  }, [pathname, searchParams, consent.analytics]);

  return null;
}
