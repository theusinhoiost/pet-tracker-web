"use server";

import { createVaccine } from "@/services/api/vaccine";
import { CreateVaccineSchema, VaccineDto } from "@/types/zod/vaccines";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

type CreateVaccineActionState = {
  vaccine?: Partial<VaccineDto>;
  errors: string[];
  success: boolean;
};

export async function createVaccineAction(
  formData: FormData,
): Promise<CreateVaccineActionState> {
  const nextDueDateRaw = formData.get("nextDueDate");

  const formObj = {
    petId: formData.get("petId"),
    vaccineName: formData.get("vaccineName"),
    applicationDate: formData.get("applicationDate"),
    nextDueDate:
      nextDueDateRaw && String(nextDueDateRaw).trim() !== ""
        ? nextDueDateRaw
        : undefined,
  };

  const parsed = CreateVaccineSchema.safeParse(formObj);

  if (!parsed.success) {
    return {
      vaccine: {
        vaccineName: String(formData.get("vaccineName") || ""),
        applicationDate: formData.get("applicationDate")
          ? new Date(String(formData.get("applicationDate")))
          : undefined,
        nextDueDate:
          nextDueDateRaw && String(nextDueDateRaw).trim() !== ""
            ? new Date(String(nextDueDateRaw))
            : undefined,
      },
      errors: getZodErrorMessages(parsed.error.format()),
      success: false,
    };
  }

  const vaccine = await createVaccine(parsed.data);

  return {
    vaccine,
    errors: [],
    success: true,
  };
}
