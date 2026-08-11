// src/lib/api/vaccine.ts

import { CreateVaccineDto } from "@/types/zod/vaccines";
import { serverFetch } from "../auth/server";

export async function createVaccine(data: CreateVaccineDto) {
  const response = await serverFetch("/vaccines", {
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

export async function getVaccinesByPetId(petId: string) {
  const response = await serverFetch(`/vaccines/${petId}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Status:", response.status);
    console.error("Response:", error);
    throw new Error(error);
  }

  return response.json();
}

export async function deleteVaccine(id: string) {
  const response = await serverFetch(`/vaccines/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Status:", response.status);
    console.error("Response:", error);
    throw new Error(error);
  }
}
