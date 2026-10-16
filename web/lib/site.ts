/**
 * Centralized so the domain cutover (docs/03-plan.md, phase 3) is a one-line
 * change rather than a hunt through components.
 */
export const SHOW_URL = "https://www.marketbetter.xyz/";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/roi", label: "ROI" },
] as const;
