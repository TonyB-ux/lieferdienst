// src/app/page.tsx
import dynamic from "next/dynamic";
import GuidesRow from "@/components/GuidesRow";

// Startseite aktualisiert sich alle 10 Minuten
export const revalidate = 600;

const GlassStarter = dynamic(() => import("@/components/GlassStarter"), { ssr: true });

export default function Page() {
  return (
    <>
      <GlassStarter />
      <GuidesRow showHeading={false} />
    </>
  );
}
