"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  CreateLoginSchema,
  LoginResponseDto,
  LoginResponseSchema,
} from "@/types/zod/login";

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
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Credenciais inválidas",
      }));

      return {
        user: null,
        errors: [error.message ?? "Credenciais inválidas"],
        success: false,
      };
    }

    const responseData = await response.json();

    const parsedResponse = LoginResponseSchema.safeParse(responseData);

    if (!parsedResponse.success) {
      console.error(
        "Resposta inválida do endpoint /auth/login:",
        parsedResponse.error,
      );

      return {
        user: null,
        errors: ["Resposta inválida do servidor"],
        success: false,
      };
    }

    data = parsedResponse.data;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return {
      user: null,
      errors: ["Erro ao conectar com o servidor"],
      success: false,
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("__Host-accessToken", data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });

  cookieStore.set("__Host-refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  cookieStore.set("user", JSON.stringify(data.user), {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  redirect("/dashboard");
}
