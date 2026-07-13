"use server";

import { revalidatePath } from "next/cache";
import { deletePet } from "@/services/api/pet";

export async function deletePetAction(id: string) {
  try {
    await deletePet(id);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard", "page");
    revalidatePath(`/dashboard/pet/${id}/edit`);

    return {
      success: true,
      errors: [],
    };
  } catch (error: unknown) {
    console.error("Erro ao excluir pet:", error);
    return {
      success: false,
      errors: ["Não foi possível excluir o pet. Tente novamente."],
    };
  }
}
