import SectionTitle from "@/components/shared/SectionTitle";

const reasons = [
  {
    title: "Visited, not just listed",
    body: "Every restaurant on PizzaVerse is reviewed in person by our editorial team before it ever appears in search.",
  },
  {
    title: "No paid placements",
    body: "Rankings reflect quality and diner feedback only — restaurants can't pay their way to the top of a list.",
  },
  {
    title: "Real-time tables",
    body: "Availability updates directly from each restaurant's floor plan, so what you see is what you can book.",
  },
  {
    title: "Built for the regular",
    body: "Save favourites, get notified when a fully-booked table opens up, and track where you've already eaten.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionTitle
        course="Third — The Standard"
        title="Why diners trust PizzaVerse"
        description="A short list of the things we refused to compromise on when we built this."
      />

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => (
          <div key={r.title} className="bg-parchment p-7">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brass/15 font-mono text-xs text-brass-dark">
              ✓
            </span>
            <h3 className="mt-5 font-display text-lg font-medium">
              {r.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              {r.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
