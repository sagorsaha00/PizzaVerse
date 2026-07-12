import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";
import SectionTitle from "@/components/shared/SectionTitle";

export default function Categories() {
  return (
    <section className="bg-parchment-dim py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          course="Second — The Cuisines"
          title="Browse by what you're craving"
          description="From wood-fired seafood to century-old family recipes — six cuisines, all vetted in person."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/`}
              className="group relative flex h-40 flex-col justify-end overflow-hidden rounded-card shadow-ticket transition-shadow hover:shadow-ticket-hover"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="200px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="relative p-3 text-parchment">
                <p className="font-display text-sm font-medium leading-tight">
                  {c.name}
                </p>
                <p className="font-mono text-[11px] text-parchment/60">
                  {c.count} places
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
