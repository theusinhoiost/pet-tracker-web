"use server";
import { createPet } from "@/services/api/pet";
import { CreatePetSchema, PublicPetDto } from "@/types/zod/create-pet";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

type CreatePetActionState = {
  pet: PublicPetDto;
  errors: string[];
  success: boolean;
};

export async function createPetAction(
  state: CreatePetActionState,
  formData: FormData,
): Promise<CreatePetActionState> {
  const currentPet: PublicPetDto = {
    name: String(formData.get("name") ?? ""),
    species: String(
      formData.get("species") ?? "dog",
    ) as PublicPetDto["species"],
    race: String(formData.get("race") ?? ""),
    birthDate: String(formData.get("birthDate") ?? ""),
    image: null,
  };
  const formObj = {
    name: formData.get("name"),
    species: formData.get("species"),
    race: formData.get("race"),
    birthDate: formData.get("birthDate"),
    image: formData.get("pet-img"),
  };

  const parsedFormData = CreatePetSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      pet: currentPet,
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  try {
    const apiFormData = new FormData();
    apiFormData.append("name", parsedFormData.data.name);
    apiFormData.append("species", parsedFormData.data.species);
    apiFormData.append(
      "birthDate",
      parsedFormData.data.birthDate.toISOString(),
    );
    apiFormData.append("race", parsedFormData.data.race);
    const imageFile = formData.get("pet-img") as File | null;
    if (imageFile instanceof File && imageFile.size > 0) {
      apiFormData.append("pet-img", imageFile);
    }

    const pet = await createPet(apiFormData);

    return {
      pet,
      errors: [],
      success: true,
    };
  } catch (error: unknown) {
    console.error("Erro ao criar pet:", error);
    return {
      pet: currentPet,
      errors: ["Erro interno ao salvar o pet. Tente novamente."],
      success: false,
    };
  }
}
