import { cookies } from "next/headers";

export async function serverFetch(endpoint: string, options?: RequestInit) {
  const token = (await cookies()).get("accessToken")?.value;

  return fetch(`${process.env.API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
