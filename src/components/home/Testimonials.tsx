import Image from "next/image";
import { testimonials } from "@/lib/data";
import SectionTitle from "@/components/shared/SectionTitle";

export default function Testimonials() {
  return (
    <section className="bg-parchment-dim py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle
          course="Fifth — The Word of Mouth"
          title="What regulars are saying"
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="ticket-card flex h-full flex-col p-7">
              <svg
                viewBox="0 0 32 24"
                className="h-6 w-8 fill-brass/40"
                aria-hidden
              >
                <path d="M0 24V13.6C0 6.4 4.4 1.2 12 0l1.6 3.6C8.8 5.2 6.4 8 6.4 11.6H12V24H0zm18.4 0V13.6c0-7.2 4.4-12.4 12-13.6l1.6 3.6c-4.8 1.6-7.2 4.4-7.2 8h5.6V24H18.4z" />
              </svg>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-dashed border-ink/10 pt-5">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {t.author}
                  </p>
                 
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
