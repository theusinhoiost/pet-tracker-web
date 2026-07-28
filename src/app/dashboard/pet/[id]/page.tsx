import { getLastWeightsByPetId } from "@/services/api/weight";
import PetInfosClient from "./pet-infos-client";

interface PetInfosPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PetInfosPage({ params }: PetInfosPageProps) {
  const { id } = await params;

  const weights = await getLastWeightsByPetId(id);

  return <PetInfosClient petId={id} weights={weights} />;
}
