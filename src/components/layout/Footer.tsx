import Link from "next/link";

const columns = [
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export default function Footer() {
  return (
    <footer id='contact' className="border-t border-parchment/10 bg-ink text-parchment">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <span className="font-display text-2xl font-medium">PizzaVerse</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-parchment/60">
              Independent restaurants, chef&apos;s counters, and neighbourhood
              kitchens worth booking — curated weekly by people who eat out
              for a living.
            </p>
            <div className="mt-6 space-y-1 text-sm text-parchment/70">
              <p>128 Harbour Row, Chattogram 4000</p>
              <p>
                <a href="mailto:hello@PizzaVerse.app" className="hover:text-brass-light">
                  hello@PizzaVerse.app
                </a>
              </p>
              <p>
                <a href="tel:+8801700000000" className="hover:text-brass-light">
                  +880 1700-000000
                </a>
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-brass-light">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-parchment/70 transition-colors hover:text-parchment"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-parchment/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-parchment/50">
            © {new Date().getFullYear()} PizzaVerse Technologies Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium tracking-wide text-parchment/60 hover:text-brass-light"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
