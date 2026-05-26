import { PetCard } from "@/components/pet-card";
import { ChartLineDots } from "@/components/ui/graph-card";

export default function PetInfos() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartLineDots />

      <PetCard
        id={"43434"}
        name={"Jubao"}
        breed={"swdewretret"}
        nextVaccineDate={"22/03/2025"}
        showButton={false}
      />
    </div>
  );
}
