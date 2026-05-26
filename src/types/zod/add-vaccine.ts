import { z } from "zod";

export const VaccineBaseSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo")
    .trim(),
  applicationDate: z.coerce
    .date({})
    .max(new Date(Date.now() + 24 * 60 * 60 * 1000), {
      error: "Data não pode ser no futuro!",
    }),
});

export const CreateVaccineSchema = VaccineBaseSchema;

export const PublicVaccineSchema = z.object({
  name: z.string().default(""),
  applicationDate: z.date().default(new Date()),
});

export type CreatePetDto = z.infer<typeof CreateVaccineSchema>;
export type PublicPetDto = z.infer<typeof PublicVaccineSchema>;
