import Image from "next/image";
import Link from "next/link";
import { Restaurant } from "@/types/restaurant";

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-brass">
      <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z" />
    </svg>
  );
}

export default function RestaurantCard({
  restaurant,
}: {restaurant: Restaurant}) {
  return (
    <article className="ticket-card group flex h-full flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {restaurant.availableTonight && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-parchment">
            Open tonight
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-parchment/90 px-2.5 py-1 font-mono text-xs text-ink">
          {restaurant.priceTier}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="eyebrow">{restaurant.cuisine}</p>
            <h3 className="mt-1 font-display text-xl font-medium leading-snug text-ink">
              {restaurant.name}
            </h3>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
          {restaurant.shortDescription}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {restaurant.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-parchment-dim px-2.5 py-1 text-[11px] font-medium text-ink/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-dashed border-ink/10 pt-4 mt-4">
          <div className="flex items-center gap-3 text-xs text-ink/60">
            <span className="flex items-center gap-1 font-mono text-ink">
              <Star />
              {restaurant.rating.toFixed(1)}
              <span className="text-ink/40">({restaurant.reviewCount})</span>
            </span>
            <span>{restaurant.neighbourhood}</span>
          </div>
          <Link
            href={`/pizzaInfo/${restaurant.id}`}
            className="text-xs font-semibold text-burgundy underline decoration-brass/50 underline-offset-4 hover:text-ink"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
