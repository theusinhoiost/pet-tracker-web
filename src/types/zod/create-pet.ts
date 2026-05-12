import { z } from "zod";
import { petSpecies } from "../pet-species";

export const PetBaseSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo")
    .trim(),
  birthDate: z.coerce.date({}).max(new Date(Date.now() + 24 * 60 * 60 * 1000), {
    error: "Data não pode ser no futuro!",
  }),
  race: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo")
    .trim(),
  species: z.enum(petSpecies),
});

export const CreatePetSchema = PetBaseSchema;

export const PublicPetSchema = z.object({
  name: z.string().default(""),
  birthDate: z.date().default(new Date()),
  race: z.string().default(""),
  species: z.enum(petSpecies).default("dog"),
});

export const UpdatePetSchema = PetBaseSchema.omit({
  birthDate: true,
}).partial();
export type CreatePetDto = z.infer<typeof CreatePetSchema>;
export type UpdatePetDto = z.infer<typeof UpdatePetSchema>;
export type PublicPetDto = z.infer<typeof PublicPetSchema>;
