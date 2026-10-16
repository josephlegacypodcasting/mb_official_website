"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SHOW_URL } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Stacked wordmark ("market" over "better."), so it needs roughly twice
            the height a single-line lockup would to stay readable. */}
        <Link href="/" aria-label="Market Better — home">
          <Image
            src="/mb-logo.png"
            alt="Market Better"
            width={1247}
            height={717}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-purple ${
                pathname === link.href ? "text-purple" : "text-ink/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Mike's explicit ask: the Show demoted to a top-right button. */}
          <a
            href={SHOW_URL}
            className="btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Market Better Show
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden"
        >
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink/70"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SHOW_URL}
              className="btn btn-primary self-start"
              target="_blank"
              rel="noreferrer"
            >
              Market Better Show
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
