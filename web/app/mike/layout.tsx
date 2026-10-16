import type { Metadata } from "next";
import { MikeHeader } from "@/components/mike/header";
import { MikeFooter } from "@/components/mike/footer";

export const metadata: Metadata = {
  title: "Market Better | One System. Marketing + Sales.",
  description:
    "Market Better fuses marketing and sales into one system: a video-first content engine built around your ICP.",
};

/*
 * Mike's design, rebuilt from market-better.lovable.app. Self-contained: its
 * own header, footer, palette (mk-* tokens) and Poppins typography, so it can
 * be compared side by side with the in-house version at /.
 */
export default function MikeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-mike">
      <MikeHeader />
      {children}
      <MikeFooter />
    </div>
  );
}
