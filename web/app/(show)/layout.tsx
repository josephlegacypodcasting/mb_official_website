import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/*
 * The in-house rebuild: mbgrowth colours, the Show's Archivo typography.
 * Lives in a route group so its chrome doesn't leak into /mike, which is
 * Mike's Lovable design and carries its own header, footer, and palette.
 */
export default function ShowThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
