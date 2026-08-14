"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ACCESS_TOKEN_COOKIE = "__Host-accessToken";
const REFRESH_TOKEN_COOKIE = "__Host-refreshToken";

async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
}

async function refreshAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return undefined;
  }

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return undefined;
    }

    const data: {
      accessToken: string;
      refreshToken: string;
    } = await response.json();

    if (!data.accessToken || !data.refreshToken) {
      return undefined;
    }

    cookieStore.set(ACCESS_TOKEN_COOKIE, data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    cookieStore.set(REFRESH_TOKEN_COOKIE, data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return data.accessToken;
  } catch (error) {
    console.error("REFRESH ERROR:", error);

    return undefined;
  }
}

export async function serverFetch(endpoint: string, options?: RequestInit) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("Usuário não autenticado");
  }

  const makeRequest = async (token: string) => {
    const headers = new Headers(options?.headers);

    headers.set("Authorization", `Bearer ${token}`);

    if (!(options?.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    return fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      cache: "no-store",
    });
  };

  let response = await makeRequest(accessToken);

  if (response.status !== 401) {
    return response;
  }

  const newAccessToken = await refreshAccessToken();

  if (!newAccessToken) {
    throw new Error("Sessão expirada");
  }

  response = await makeRequest(newAccessToken);

  return response;
}
