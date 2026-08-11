import { z } from "zod";

export const CreateWeightSchema = z.object({
  id: z.uuid("ID do pet inválido"),

  value: z
    .number()
    .positive("O peso deve ser maior que zero")
    .max(999, "Peso muito alto"),

  measurementDay: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: "A data de medição não pode ser no futuro",
    })
    .optional(),
});

export const UpdateWeightSchema = CreateWeightSchema.partial().omit({
  id: true,
});

export const WeightSchema = z.object({
  id: z.uuid(),
  value: z.number(),
  measurementDay: z.date(),
});

export type CreateWeightDto = z.infer<typeof CreateWeightSchema>;
export type UpdateWeightDto = z.infer<typeof UpdateWeightSchema>;
export type WeightDto = z.infer<typeof WeightSchema>;
