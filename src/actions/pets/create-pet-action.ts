"use server";

import { createPet } from "@/services/api/pet";
import { CreatePetSchema, PublicPetDto } from "@/types/zod/pets";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

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
    return {
      pet: null,
      errors: ["Erro interno ao salvar o pet. Tente novamente."],
      success: false,
    };
  }
}
