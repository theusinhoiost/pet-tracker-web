"use server";

import {
  CreatePetSchema,
  PublicPetDto,
  PublicPetSchema,
} from "@/types/zod/create-pet";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

// 1. Tipagem exata seguindo o seu padrão de estado
type CreatePetActionState = {
  pet: PublicPetDto;
  errors: string[];
  success: boolean;
};

export async function createPetAction(
  state: CreatePetActionState,
  formData: FormData,
): Promise<CreatePetActionState> {
  if (!(formData instanceof FormData)) {
    return {
      pet: state.pet,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const formObj = {
    name: formData.get("name"),
    species: formData.get("species"),
    race: formData.get("race"),
    birthDate: formData.get("birthDate"),
    image: formData.get("image"),
  };

  const parsedFormData = CreatePetSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      pet: PublicPetSchema.parse(formObj),
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  try {
    const { name, species, race, birthDate, image } = parsedFormData.data;

    // 4. Aqui você faz a lógica do arquivo no servidor
    // const bytes = await image.arrayBuffer();
    // const buffer = Buffer.from(bytes);
    // const imageUrl = await seuServicoDeUpload(buffer);
    // await prisma.pet.create({ data: { name, species, race, birthDate, image: imageUrl } });

    return {
      pet: state.pet,
      errors: [],
      success: true,
    };
  } catch (error) {
    return {
      pet: PublicPetSchema.parse(formObj),
      errors: ["Erro interno ao salvar o pet no banco de dados."],
      success: false,
    };
  }
}
