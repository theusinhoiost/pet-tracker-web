"use server";

import { serverFetch } from "@/services/auth/server";

export async function deletePet(id: string) {
  const response = await serverFetch(`/pet/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Falha ao excluir pet");
  }

  return response.json();
}
