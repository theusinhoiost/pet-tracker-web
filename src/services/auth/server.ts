import { cookies } from "next/headers";

export async function serverFetch(endpoint: string, options?: RequestInit) {
  const token = (await cookies()).get("accessToken")?.value;

  const headers = new Headers(options?.headers);

  headers.set("Authorization", `Bearer ${token}`);

  if (!(options?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}
