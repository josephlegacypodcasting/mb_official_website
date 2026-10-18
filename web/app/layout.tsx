import type { Metadata } from "next";
import { Archivo, Poppins } from "next/font/google";
import { RoiProvider } from "@/components/roi-context";
import "./globals.css";

// Archivo is the font actually applied throughout the Show site, at these weights.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

// Poppins is what Mike's Lovable build loads — only the /mike routes use it.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Market Better | One System for Marketing + Sales",
  description:
    "Market Better connects video, content, inbound, and outbound into one system built to create pipeline and revenue.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${poppins.variable}`}>
      <body>
        {/* Sits above both versions so an ROI snapshot survives navigation
            between them and reaches whichever contact form is submitted. */}
        <RoiProvider>{children}</RoiProvider>
      </body>
    </html>
  );
}
