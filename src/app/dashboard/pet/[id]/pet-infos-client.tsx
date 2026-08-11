"use client";

import { ChartLineDots } from "@/components/ui/graph-card";
import { VaccinesTable } from "@/components/ui/vaccines-table";
import { VaccineDto } from "@/types/zod/vaccines";
import { WeightDto } from "@/types/zod/weight";

interface PetInfosClientProps {
  petId: string;
  weights: WeightDto[];
  vaccines: VaccineDto[];
}

export default function PetInfosClient({
  petId,
  weights,
  vaccines,
}: PetInfosClientProps) {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="min-w-0 w-full">
          <ChartLineDots petId={petId} weights={weights} />
        </div>
        <div className="min-w-0 w-full">
          <VaccinesTable petId={petId} vaccines={vaccines} />
        </div>
      </div>
    </div>
  );
}
