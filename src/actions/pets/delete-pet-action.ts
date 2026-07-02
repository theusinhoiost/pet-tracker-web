"use server";

import { deletePet } from "@/services/api/pet";

export async function deletePetAction(id: string) {
  try {
    await deletePet(id);

    return {
      success: true,
      errors: [],
    };
  } catch (error) {
    console.error("Erro ao excluir pet:", error);

    return {
      success: false,
      errors: ["Não foi possível excluir o pet."],
    };
  }
}
