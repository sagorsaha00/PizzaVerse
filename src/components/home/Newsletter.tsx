"use client";

export default function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
      <div className="relative overflow-hidden rounded-card bg-ink px-8 py-14 text-parchment sm:px-14">
        <div className="pointer-events-none absolute inset-0 bg-grain" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brass/20 blur-3xl" />
        <div className="relative mx-auto max-w-xl text-center">
          <span className="eyebrow text-brass-light">
            Seventh — Last Call
          </span>
          <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">
            One good table in your inbox, every Friday
          </h2>
          <p className="mt-3 text-sm text-parchment/60">
            New openings, chef interviews, and the week's most-booked
            reservations — no spam, unsubscribe anytime.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@email.com"
              className="w-full flex-1 rounded-full border border-parchment/20 bg-parchment/5 px-5 py-3 text-sm text-parchment placeholder:text-parchment/40 focus:border-brass focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary bg-brass text-ink hover:bg-brass-light"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
