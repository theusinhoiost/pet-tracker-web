import { z } from "zod";

export const VaccineStatusSchema = z.enum(["APPLIED", "PENDING", "OVERDUE"]);

export const CreateVaccineSchema = z
  .object({
    petId: z.uuid("ID do pet inválido"),
    name: z
      .string()
      .min(1, "O nome da vacina é obrigatório")
      .max(100, "Nome da vacina muito longo"),
    applicationDate: z
      .string()
      .pipe(z.coerce.date())
      .refine((date) => date <= new Date(), {
        message: "A data de aplicação não pode ser no futuro",
      }),
    nextDueDate: z.string().pipe(z.coerce.date()).optional(),
  })
  .refine(
    (data) => {
      if (!data.nextDueDate) return true;
      return data.nextDueDate >= data.applicationDate;
    },
    {
      message: "A próxima dose não pode ser antes da data de aplicação",
      path: ["nextDueDate"],
    },
  );

export const UpdateVaccineSchema = CreateVaccineSchema.partial().omit({
  petId: true,
});

export const VaccineSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  applicationDate: z.date(),
  nextDueDate: z.date().optional(),
  status: VaccineStatusSchema,
});

export type CreateVaccineDto = z.infer<typeof CreateVaccineSchema>;
export type UpdateVaccineDto = z.infer<typeof UpdateVaccineSchema>;
export type VaccineDto = z.infer<typeof VaccineSchema>;
