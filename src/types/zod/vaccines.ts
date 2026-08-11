import { z } from "zod";

export const VaccineStatusSchema = z.enum(["APPLIED", "PENDING", "OVERDUE"]);

const BaseVaccineSchema = z.object({
  petId: z.uuid("ID do pet inválido"),
  vaccineName: z
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
});

export const CreateVaccineSchema = BaseVaccineSchema.refine(
  (data) => {
    if (!data.nextDueDate) return true;
    return data.nextDueDate >= data.applicationDate;
  },
  {
    message: "A próxima dose não pode ser antes da data de aplicação",
    path: ["nextDueDate"],
  },
);

// Schema de update (agora funciona)
export const UpdateVaccineSchema = BaseVaccineSchema.partial()
  .omit({
    petId: true,
  })
  .refine(
    (data) => {
      if (!data.nextDueDate || !data.applicationDate) return true;
      return data.nextDueDate >= data.applicationDate;
    },
    {
      message: "A próxima dose não pode ser antes da data de aplicação",
      path: ["nextDueDate"],
    },
  );

export const VaccineSchema = z.object({
  id: z.uuid(),
  vaccineName: z.string(),
  applicationDate: z.date(),
  nextDueDate: z.date().optional(),
  status: VaccineStatusSchema,
});

export type CreateVaccineDto = z.infer<typeof CreateVaccineSchema>;
export type UpdateVaccineDto = z.infer<typeof UpdateVaccineSchema>;
export type VaccineDto = z.infer<typeof VaccineSchema>;
