import { api } from "./api";

export async function refreshToken() {
  const response = await api.post("/auth/refresh");

  return response.data;
}
