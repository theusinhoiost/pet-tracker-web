import { api } from "../../services/api/api";

export async function logout() {
  const response = await api.post("/auth/logout");

  return response.data;
}
