"use client";

import Link from "next/link";
import { useState } from "react";

// Toggle this to preview logged-in nav state (design only — no auth wired up).
const IS_LOGGED_IN = false;

const loggedOutLinks = [
  { href: "/restaurants", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const loggedInLinks = [
  { href: "/restaurants", label: "Explore" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/items/add", label: "Add Restaurant" },
  { href: "/items/manage", label: "Manage" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = IS_LOGGED_IN ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-parchment/90 backdrop-blur-md">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="group flex items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#E3A857] bg-[#241713]">
            <span className="text-2xl">🔥</span>

            <span className="absolute -bottom-1 h-3 w-3 rounded-full bg-[#C1440E]" />
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-white">
              Pizza
              <span className="text-[#E3A857]">Verse</span>
            </h2>

            <span className="text-xs tracking-[4px] text-gray-400">
              EST. 1999
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {IS_LOGGED_IN ? (
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-xs text-parchment">
              JD
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-ink/80 hover:text-ink"
              >
                Log in
              </Link>
              <Link href="/register" className="btn-primary">
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`h-[1.5px] w-6 bg-ink transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
          />
          <span
            className={`h-[1.5px] w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""
              }`}
          />
          <span
            className={`h-[1.5px] w-6 bg-ink transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-parchment px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-ink/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-ink/10 pt-4">
              <Link href="/login" className="text-sm font-semibold text-ink">
                Log in
              </Link>
              <Link href="/register" className="btn-primary w-full">
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
