const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type GoogleExchangeResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export async function exchangeGoogleCode(
  code: string,
): Promise<GoogleExchangeResponse> {
  const response = await fetch(`${API_URL}/auth/google/exchange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Falha ao trocar código do Google");
  }

  return response.json();
}
