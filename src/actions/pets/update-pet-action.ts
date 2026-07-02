"use server";

import { serverFetch } from "@/services/auth/server";
import { UpdatePetDto } from "@/types/zod/pets";

export async function updatePet(id: string, data: UpdatePetDto) {
  const response = await serverFetch(`/pet/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao atualizar pet");
  }
  return response.json();
}
