"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CreateLoginSchema, LoginResponseDto } from "@/types/zod/login";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type LoginActionState = {
  user: LoginResponseDto["user"] | null;
  errors: string[];
  success: boolean;
};

export async function loginAction(
  state: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());

  const parsedFormData = CreateLoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: null,
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  let data: LoginResponseDto;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedFormData.data),
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Credenciais inválidas" }));

      return {
        user: null,
        errors: [error.message ?? "Credenciais inválidas"],
        success: false,
      };
    }

    data = await response.json();
  } catch (error) {
    console.error(error);

    return {
      user: null,
      errors: ["Erro ao conectar com o servidor"],
      success: false,
    };
  }

  if (!data.accessToken) {
    return {
      user: null,
      errors: ["Token de acesso ausente"],
      success: false,
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600,
    path: "/",
  });

  cookieStore.set("user", JSON.stringify(data.user), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/dashboard");
}
