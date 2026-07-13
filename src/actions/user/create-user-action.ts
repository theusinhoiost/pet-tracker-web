"use server";

import { createUser } from "@/services/api/user";
import { CreateUserSchema, PublicUserDto } from "@/types/zod/accounts";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

type CreateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  const formObj = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = CreateUserSchema.safeParse(formObj);

  if (!parsed.success) {
    return {
      user: {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
      },
      errors: getZodErrorMessages(parsed.error.format()),
      success: false,
    };
  }
  const user = await createUser(parsed.data);

  return {
    user,
    errors: [],
    success: true,
  };
}
