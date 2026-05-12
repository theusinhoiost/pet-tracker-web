import { PetCard } from "@/components/pet-card";
import { ChartLineDots } from "@/components/ui/graph-card";
import clsx from "clsx";

export default function PetInfos() {
  return (
    <div className={clsx("flex gap-4 flex-wrap justify-evenly items-center")}>
      <ChartLineDots />
      <PetCard
        id={"43434"}
        name={"Jubao"}
        breed={"swdewretret"}
        nextVaccineDate={"22/03/2025"}
      />
    </div>
  );
}
