// src/types/zod/create-pet.ts
import { z } from "zod";
import { petSpecies } from "../pet-species";

export const PetBaseSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 letras")
    .max(100, "Nome muito longo")
    .trim(),

  birthDate: z.coerce.date().refine((date) => date <= new Date(), {
    message: "Data não pode ser no futuro!",
  }),

  race: z
    .string()
    .min(3, "Raça deve ter pelo menos 3 letras")
    .max(100, "Raça muito longa")
    .trim(),

  species: z.enum(petSpecies),

  image: z
    .any()
    .transform((file) => {
      if (!file || (file instanceof File && file.size === 0)) {
        return undefined;
      }
      return file;
    })
    .pipe(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= 3 * 1024 * 1024,
          "O arquivo não pode passar de 3MB",
        )
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/webp", "image/jpeg"].includes(
              file.type,
            ),
          "Formato inválido. Envie apenas JPEG, PNG ou WebP",
        )
        .optional(),
    ),
});

export const CreatePetSchema = PetBaseSchema;

export const PublicPetSchema = z.object({
  name: z.string().default(""),
  birthDate: z.string().default(""),
  race: z.string().default(""),
  species: z.enum(petSpecies).default(petSpecies[0]),
  image: z.string().nullable().default(null),
});

export const UpdatePetSchema = PetBaseSchema.omit({
  birthDate: true,
  image: true,
}).partial();

export type CreatePetDto = z.infer<typeof CreatePetSchema>;
export type UpdatePetDto = z.infer<typeof UpdatePetSchema>;
export type PublicPetDto = z.infer<typeof PublicPetSchema>;
