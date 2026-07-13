import { z } from "zod";
import { petSpecies } from "../pet-species";

export const PetBaseSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 letras")
    .max(100, "Nome muito longo")
    .trim(),

  birthDate: z
    .string({ message: "Data de nascimento é obrigatória" })
    .transform((val) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        throw new Error("Data inválida");
      }
      return date;
    })
    .pipe(
      z.date().refine(
        (date) => {
          const today = new Date();
          const selectedDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          );
          const todayNormalized = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          );

          return selectedDate <= todayNormalized;
        },
        {
          message: "Data não pode ser no futuro!",
        },
      ),
    ),
  notes: z
    .string()
    .max(1000, "Observações muito longas (máximo 1000 caracteres)")
    .optional()
    .or(z.literal("")),
  race: z
    .string()
    .min(1, "Raça é obrigatória")
    .min(3, "Raça deve ter pelo menos 3 letras")
    .max(100, "Raça muito longa")
    .trim(),

  species: z.enum(petSpecies),

  // Imagem simplificada
  image: z
    .any()
    .optional()
    .transform((val) => {
      if (!val || (val instanceof File && val.size === 0)) {
        return undefined;
      }
      return val;
    })
    .pipe(
      z
        .instanceof(File)
        .optional()
        .refine(
          (file) => !file || file.size <= 3 * 1024 * 1024,
          "O arquivo não pode passar de 3MB",
        )
        .refine(
          (file) =>
            !file ||
            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
          "Formato inválido. Envie apenas JPEG, PNG ou WebP",
        ),
    ),
});

export const CreatePetSchema = PetBaseSchema;

export const PublicPetSchema = z.object({
  id: z.string().optional(),
  name: z.string().default(""),
  birthDate: z.string().default(""),
  race: z.string().default(""),
  species: z.enum(petSpecies).default(petSpecies[0]),
  imageUrl: z.string().nullable().default(null),
  notes: z.string().optional().default(""),
});

export const UpdatePetSchema = PetBaseSchema.omit({
  birthDate: true,
  species: true,
  name: true,
}).partial();

export type CreatePetDto = z.infer<typeof CreatePetSchema>;
export type UpdatePetDto = z.infer<typeof UpdatePetSchema>;
export type PublicPetDto = z.infer<typeof PublicPetSchema>;
