interface SectionTitleProps {
  course: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionTitle({
  course,
  title,
  description,
  align = "left",
  light = false,
}: SectionTitleProps) {
  return (
    <div
      className={`max-w-2xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <div
        className={`course-marker ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span
          className={`course-marker__index ${
            light ? "text-brass-light" : ""
          }`}
        >
          {course}
        </span>
        {align !== "center" && (
          <span
            className={`course-marker__line ${
              light ? "bg-parchment/20" : ""
            }`}
          />
        )}
      </div>
      <h2
        className={`text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] font-medium ${
          light ? "text-parchment" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-parchment/70" : "text-ink/60"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
