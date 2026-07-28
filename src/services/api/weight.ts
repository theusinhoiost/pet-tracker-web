import { serverFetch } from "@/services/auth/server";
import { CreateWeightDto } from "@/types/zod/weight";

export async function createWeight(data: CreateWeightDto) {
  const response = await serverFetch("/weight", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Status:", response.status);
    console.error("Response:", error);
    throw new Error(error);
  }

  return response.json();
}

export async function getAllWeights() {
  const response = await serverFetch("/weight", { method: "GET" });
  return response.json();
}

export async function getWeightsByPetId(petId: string) {
  const response = await serverFetch(`/weight/${petId}`, { method: "GET" });
  return response.json();
}

export async function getLastWeightsByPetId(petId: string, limit = 10) {
  const response = await serverFetch(`/weight/${petId}/last?limit=${limit}`, {
    method: "GET",
  });
  return response.json();
}

export async function deleteWeight(id: string) {
  await serverFetch(`/weight/${id}`, { method: "DELETE" });
}
