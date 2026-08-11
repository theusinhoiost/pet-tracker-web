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
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartLineDots petId={petId} weights={weights} />
        <VaccinesTable petId={petId} vaccines={vaccines} />
      </div>
    </div>
  );
}
