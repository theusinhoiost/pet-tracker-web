"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function refreshToken(): Promise<RefreshResponse> {
  const cookieStore = await cookies();

  const currentRefreshToken = cookieStore.get("refreshToken")?.value;

  if (!currentRefreshToken) {
    throw new Error("Refresh token não encontrado");
  }

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: currentRefreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Não foi possível renovar a sessão");
  }

  const data: RefreshResponse = await response.json();

  if (!data.accessToken || !data.refreshToken) {
    throw new Error("Tokens de renovação ausentes");
  }

  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });

  cookieStore.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return data;
}
