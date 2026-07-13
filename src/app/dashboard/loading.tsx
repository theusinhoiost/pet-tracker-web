import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Cards do resumo */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-4 rounded-full" />
            </CardHeader>

            <CardContent>
              <Skeleton className="mb-2 h-8 w-12" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-52" />

        <Skeleton className="h-9 w-36 rounded-md" />
      </div>

      {/* Grid de Pets */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="aspect-video w-full" />

            <CardContent className="space-y-4 p-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>

              <Skeleton className="h-4 w-40" />

              <div className="flex justify-between pt-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
