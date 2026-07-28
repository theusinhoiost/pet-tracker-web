"use server";

import { createPet, deletePet, getPetById } from "@/services/api/pet";
import { serverFetch } from "@/services/auth/server";
import { CreatePetSchema, PublicPetDto, UpdatePetDto } from "@/types/zod/pets";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidatePath } from "next/cache";

type CreatePetActionState = {
  pet: PublicPetDto | null;
  errors: string[];
  success: boolean;
};

export async function createPetAction(
  prevState: CreatePetActionState,
  formData: FormData,
): Promise<CreatePetActionState> {
  const formObj = {
    name: formData.get("name"),
    species: formData.get("species"),
    race: formData.get("race"),
    birthDate: formData.get("birthDate"),
    notes: formData.get("notes"),
    image: formData.get("pet-img"),
  };

  const parsedFormData = CreatePetSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    console.error("Zod Errors:", parsedFormData.error.format());
    return {
      pet: null,
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  try {
    const apiFormData = new FormData();
    apiFormData.append("name", parsedFormData.data.name);
    apiFormData.append("species", parsedFormData.data.species);
    apiFormData.append("race", parsedFormData.data.race || "");
    apiFormData.append("notes", parsedFormData.data.notes || "");
    apiFormData.append(
      "birthDate",
      parsedFormData.data.birthDate.toISOString(),
    );

    const imageFile = formData.get("pet-img") as File | null;
    if (imageFile instanceof File && imageFile.size > 0) {
      apiFormData.append("pet-img", imageFile);
    }

    const pet = await createPet(apiFormData);

    console.log("Pet criado com sucesso:", pet);

    return {
      pet,
      errors: [],
      success: true,
    };
  } catch (error: unknown) {
    console.error("Erro ao criar pet:", error);

    let errorMessage = "Erro interno ao salvar o pet. Tente novamente.";

    if (error instanceof Error) {
      errorMessage =
        error.message.length > 200
          ? error.message.substring(0, 200) + "..."
          : error.message;
    }
    return {
      pet: null,
      errors: [errorMessage],
      success: false,
    };
  }
}
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
export async function getPetByIdAction(id: string) {
  return getPetById(id);
}
