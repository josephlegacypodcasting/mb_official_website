import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SHOW_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            {/* Cream-on-ink variant of the wordmark — the default is near-black
                and would disappear against this footer. */}
            <Image
              src="/mb-logo-dark.png"
              alt="Market Better"
              width={278}
              height={160}
              className="h-9 w-auto"
            />
            <p className="mt-2 max-w-sm text-sm text-white/60">
              One system for marketing + sales.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-accent-bright"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SHOW_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/70 transition-colors hover:text-accent-bright"
            >
              Market Better Show
            </a>
          </nav>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Market Better Studio. Content Funnels™ is
          a trademark of Market Better Studio.
        </p>
      </div>
    </footer>
  );
}
