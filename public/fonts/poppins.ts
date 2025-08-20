// src/fonts/poppins.ts
import localFont from "next/font/local";

export const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  src: [
    // Passe die Dateinamen an deine tatsächlichen .woff-Dateien an
    { path: "../../public/fonts/Poppins-Regular.woff",  weight: "400", style: "normal" },
    { path: "../../public/fonts/Poppins-Medium.woff",   weight: "500", style: "normal" },
    { path: "../../public/fonts/Poppins-SemiBold.woff", weight: "600", style: "normal" },
    { path: "../../public/fonts/Poppins-Bold.woff",     weight: "700", style: "normal" },
  ],
});
