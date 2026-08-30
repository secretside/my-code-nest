import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-gold/20 rounded-xl overflow-hidden">
          <Skeleton className="h-56 w-full rounded-none" />
          <div className="p-8 space-y-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PageSkeleton({
  cards = 6,
  detail = false,
}: {
  cards?: number;
  detail?: boolean;
}) {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-5">
          <Skeleton className="h-5 w-40 mx-auto rounded-full" />
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full" />
        </div>
        {detail ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <CardGridSkeleton count={cards} />
        )}
      </div>
    </main>
  );
}
