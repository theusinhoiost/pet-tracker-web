"use server";

import { serverFetch } from "@/services/auth/server";
import { CreateWeightSchema, UpdateWeightDto } from "@/types/zod/weight";

export async function createWeightAction(formData: FormData) {
  const rawData = {
    petId: formData.get("petId") as string,
    value: Number(formData.get("value")),
    measurementDay: formData.get("measurementDay") as string | undefined,
  };

  const parsed = CreateWeightSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const response = await serverFetch("/weight", {
      method: "POST",
      body: JSON.stringify(parsed.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Status:", response.status);
      console.error("Response:", error);
      return {
        success: false,
        errors: [error || "Erro ao registrar peso"],
      };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: ["Erro interno ao registrar peso"],
    };
  }
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

export async function updateWeight(id: string, data: UpdateWeightDto) {
  const response = await serverFetch(`/weight/${id}`, {
    method: "PATCH",
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

export async function deleteWeight(id: string) {
  await serverFetch(`/weight/${id}`, { method: "DELETE" });
}
