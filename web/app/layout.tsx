import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Archivo is the font actually applied throughout the Show site, at these weights.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
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
    <html lang="en" className={archivo.variable}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
