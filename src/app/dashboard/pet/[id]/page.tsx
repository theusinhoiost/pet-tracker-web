import { getLastWeightsByPetId } from "@/services/api/weight";
import PetInfosClient from "./pet-infos-client";
import { getVaccinesByPetId } from "@/services/api/vaccine";

interface PetInfosPageProps {
  params: Promise<{ id: string }>;
}

export default async function PetInfosPage({ params }: PetInfosPageProps) {
  const { id } = await params;

  const [weights, vaccines] = await Promise.all([
    getLastWeightsByPetId(id),
    getVaccinesByPetId(id),
  ]);

  return <PetInfosClient petId={id} weights={weights} vaccines={vaccines} />;
}
