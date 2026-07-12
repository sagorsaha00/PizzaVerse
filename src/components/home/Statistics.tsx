const stats = [
  { value: "240+", label: "Restaurants curated" },
  { value: "18,400", label: "Tables booked in 2026" },
  { value: "96%", label: "Diners who rebook within 60 days" },
  { value: "12 min", label: "Average time to confirm a table" },
];

export default function Statistics() {
  return (
    <section className="relative overflow-hidden bg-burgundy py-20 text-parchment">
      <div className="pointer-events-none absolute inset-0 bg-grain" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="course-marker">
          <span className="course-marker__index text-brass-light">
            Fourth — The Numbers
          </span>
          <span className="course-marker__line bg-parchment/20" />
        </div>
        <h2 className="max-w-lg font-display text-3xl font-medium leading-tight sm:text-4xl">
          A year of good tables, measured
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-parchment/20 pl-5">
              <p className="font-display text-4xl font-medium">{s.value}</p>
              <p className="mt-2 text-sm text-parchment/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
