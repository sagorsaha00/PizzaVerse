"use client";

import { usePizzaall } from "@/lib/getData";
import PizzaCard from "@/components/home/pizzaCard";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";
import type { Pizza } from "@/types/restaurant";

type PizzaDoc = Pizza & { _id: string };

const FEATURED_COUNT = 8;

export default function FeaturedPizzas() {
  const { data: response, isLoading, isError } = usePizzaall();

  const allPizzas: PizzaDoc[] = response?.data ?? [];
  const featured = allPizzas.slice(0, FEATURED_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionTitle
          course="First — The Selection"
          title="This week's featured pizzas"
          description="Eight signature pies our editors visited in the last thirty days, chosen for what's genuinely worth a booking."
        />
        <Link
          href="/pizzas"
          className="hidden shrink-0 text-sm font-semibold text-[#C1440E] underline decoration-[#E3A857]/50 underline-offset-4 hover:text-[#241713] md:block"
        >
          View all pizzas →
        </Link>
      </div>

      {isLoading && <FeaturedSkeleton />}

      {isError && !isLoading && (
        <p className="mt-12 text-center text-sm text-[#241713]/60">
          Couldn't load this week's pizzas — check back shortly.
        </p>
      )}

      {!isLoading && !isError && (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((pizza) => (
            <PizzaCard key={pizza._id} pizza={pizza} />
          ))}
        </div>
      )}

      <Link
        href="/pizzas"
        className="mt-8 block text-center text-sm font-semibold text-[#C1440E] underline decoration-[#E3A857]/50 underline-offset-4 md:hidden"
      >
        View all pizzas →
      </Link>
    </section>
  );
}

// Matches the card's real dimensions so the page doesn't jump once the
// actual pizzas load in.
function FeaturedSkeleton() {
  const placeholders = Array.from({ length: FEATURED_COUNT });

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {placeholders.map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-[#241713]/10 bg-white/60"
        >
          <div className="h-48 w-full bg-[#241713]/10" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 rounded bg-[#241713]/10" />
            <div className="h-3 w-1/2 rounded bg-[#241713]/10" />
            <div className="h-3 w-full rounded bg-[#241713]/10" />
            <div className="h-3 w-2/3 rounded bg-[#241713]/10" />
          </div>
        </div>
      ))}
    </div>
  );
}