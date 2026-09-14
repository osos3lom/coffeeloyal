import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <Card className="p-5">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === 0 ? "" : "mt-2.5"} ${
            i === lines - 1 ? "w-2/3" : "w-full"
          }`}
        />
      ))}
    </Card>
  );
}

export function SkeletonStat() {
  return (
    <Card className="p-4">
      <Skeleton className="h-2.5 w-14" />
      <Skeleton className="mt-2 h-7 w-12 bg-[#DDD9CC]" />
      <Skeleton className="mt-1.5 h-2.5 w-16" />
    </Card>
  );
}

export function SkeletonLine() {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-24 bg-[#DDD9CC]" />
        <Skeleton className="h-2.5 w-32" />
      </div>
      <Skeleton className="h-4 w-14 rounded-full" />
    </div>
  );
}

export { Skeleton };
