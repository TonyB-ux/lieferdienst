// src/app/page.tsx
import dynamic from "next/dynamic";

const GlassStarter = dynamic(() => import("@/components/GlassStarter"), { ssr: true });

export default function Page() {
  return <GlassStarter />;
}
