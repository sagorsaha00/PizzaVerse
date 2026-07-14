"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";
import SectionTitle from "@/components/shared/SectionTitle";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id='About' className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
      <SectionTitle
        course="Sixth — The Fine Print"
        title="Questions, answered"
        align="center"
      />

      <div className="mt-10 divide-y divide-ink/10 border-t border-b border-ink/10">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id}>
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-base font-medium text-ink sm:text-lg">
                  {faq.question}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/15 font-mono text-sm transition-transform duration-300 ${isOpen ? "rotate-45 border-brass text-brass-dark" : ""
                    }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
              >
                <p className="overflow-hidden text-sm leading-relaxed text-ink/60">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
