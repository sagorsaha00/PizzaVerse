export function CardSkeleton() {
  return (
    <div className="ticket-card animate-pulse">
      <div className="h-48 w-full bg-ink/10" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 rounded bg-ink/10" />
        <div className="h-5 w-3/4 rounded bg-ink/10" />
        <div className="h-3 w-full rounded bg-ink/10" />
        <div className="h-3 w-2/3 rounded bg-ink/10" />
        <div className="flex justify-between pt-2">
          <div className="h-3 w-16 rounded bg-ink/10" />
          <div className="h-8 w-24 rounded-full bg-ink/10" />
        </div>
      </div>
    </div>
  );
}

export default function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-ink/10 ${className}`} />;
}
